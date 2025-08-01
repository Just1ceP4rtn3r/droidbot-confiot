import os, requests, json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import precision_score, recall_score
from sklearn.metrics import classification_report, accuracy_score
from sklearn.utils import shuffle
from gensim.models import Word2Vec, KeyedVectors
import numpy as np
from transformers import AutoTokenizer
import torch
from transformers import AutoModelForSequenceClassification
from torch.utils.data import DataLoader
from transformers import AdamW, get_scheduler
from tqdm import tqdm

def GetDataList(current_dir, file):
    with open(os.path.join(current_dir, file), 'r') as f:
        content = json.load(f)
    data = []
    for key in content.keys():
        for items in content[key]:
            data.append(items)
    return data

def GetDataset(current_dir, privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file):
    privacy_training_data = GetDataList(current_dir, privacy_training_file)
    non_privacy_training_data = GetDataList(current_dir, non_privacy_training_file)
    X_train = privacy_training_data + non_privacy_training_data
    y_train = [1] * len(privacy_training_data) + [0] * len(non_privacy_training_data)
    
    privacy_testing_data = GetDataList(current_dir, privacy_testing_file)
    non_privacy_testing_data = GetDataList(current_dir, non_privacy_testing_file)
    X_test = privacy_testing_data + non_privacy_testing_data
    y_test = [1] * len(privacy_testing_data) + [0] * len(non_privacy_testing_data)

    return X_train, y_train, X_test, y_test

def ClassifierGPT(privacy_file, non_privacy_file):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        privacy_data = GetDataList(current_dir, privacy_file)
        non_privacy_data = GetDataList(current_dir, non_privacy_file)
        
        with open(os.path.join(current_dir, "dataset/testDataset.json"), 'r') as f:
            content = json.load(f)

        items = list(content.keys())
        print(privacy_data)
        print(non_privacy_data)
        print(items)
        api_key = os.environ.get("OPENAI_API_KEY")
        headers = {"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"}


        payload = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You are an assistant tasked with identifying privacy-sensitive terms based on a provided list. Use the list provided by the user to make decisions."
                },
                {
                    "role": "user",
                    "content": f"Here is the table of privacy-sensitive texts: {privacy_data}, and a table of not privacy-sensitive texts: {non_privacy_data}."
                },
                {
                    "role": "user",
                    "content": "Evaluate the following terms: ['apnea duration', 'terms of service']."
                },
                {
                    "role": "assistant",
                    "content": "{'apnea duration': 'true', 'terms of service': 'fause'}"
                },
                {
                    "role": "user",
                    "content": f"Evaluate the following terms: {items}."
                }],
            "max_tokens": 2000
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

        with open(os.path.join(current_dir, "gpt_similarity.json"), 'w') as f:
            f.write(response.text)

        # print(response.json()["choices"][0]["message"]["content"])

        # try:
        #     if ("succeed" in response.json()["choices"][0]["message"]["content"]) or (
        #             "Succeed" in response.json()["choices"][0]["message"]["content"]):
        #         return "succeed"
        #     elif ("fail" in response.json()["choices"][0]["message"]["content"]) or (
        #             "Fail" in response.json()["choices"][0]["message"]["content"]):
        #         return "fail"
        #     else:
        #         return "unknown"
        # except Exception as e:
        #     return "unknown"

def GPTResult(result_file, test_file):
    # Chatgpt result format: {"feedback": "false", "what we recommend": "false"}
    current_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(current_dir, result_file), 'r') as f:
        content = json.load(f)
    result_label = []
    for key in content.keys():
        if content[key] == "true":
            result_label.append(1)
        else:
            result_label.append(0)
    
    with open(os.path.join(current_dir, test_file), 'r') as f:
        content = json.load(f)
    test_label = []
    for key in content.keys():
        if content[key] == "true":
            test_label.append(1)
        else:
            test_label.append(0)

    precision = precision_score(test_label, result_label)
    recall = recall_score(test_label, result_label)

    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    print("Classification Report:\n", classification_report(test_label, result_label))
    


def ClassifierSVM(privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file):
    # prepare dataset
    current_dir = os.path.dirname(os.path.abspath(__file__))
    X_train, y_train, X_test, y_test = GetDataset(current_dir, privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file)
    X_train, y_train = shuffle(X_train, y_train, random_state=42)

    # feature extraction
    tfidf = TfidfVectorizer(max_features=1000)  
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)

    # 3. Train the SVM Classifier
    svm = SVC(kernel='linear', random_state=42)  # Use 'linear' kernel for text classification
    svm.fit(X_train_tfidf, y_train)

    # 4. Evaluate the Model
    y_pred = svm.predict(X_test_tfidf)

    # Calculate precision and recall
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)

    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    print("Classification Report:\n", classification_report(y_test, y_pred))

    # Save the model and vectorizer for future use
    import joblib
    with open(os.path.join(current_dir, "model/svm_model.pkl"), 'wb') as f:
        joblib.dump(svm, f)
    with open(os.path.join(current_dir, "model/tfidf_vectorizer.pkl"), 'wb') as f:
        joblib.dump(tfidf, f)

def GetEmbedding(words, model, embedding_dim=100):
    embeddings = []
    for word in words:
        if word in model:  # Check if the word is in the Word2Vec vocabulary
            embeddings.append(model[word])
    if embeddings:
        return np.mean(embeddings, axis=0)  # Average the word embeddings for the sentence
    else:
        return np.zeros(embedding_dim)  # Return a zero vector if no words are found

def WordClassifierSVM(word_emb, privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    training_data, y_train, testing_data, y_test = GetDataset(current_dir, privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file)
    
    if word_emb == "Word2Vec":
        train_tokens = [text.split() for text in training_data]
        test_tokens = [text.split() for text in testing_data]
        # Train a Word2Vec model
        # model = Word2Vec(sentences=train_tokens, vector_size=100, window=5, min_count=1, workers=4)
        model = KeyedVectors.load_word2vec_format('/Users/tracy/Downloads/GoogleNews-vectors-negative300.bin', binary=True)
        # with open(os.path.join(current_dir, "model/word2vec_privacy.model"), 'wb') as f:
        #     model.save(f)
        # model = Word2Vec.load("word2vec_privacy.model")

        X_train = np.array([GetEmbedding(sentence, model, embedding_dim=100) for sentence in training_data])
        print("X_train shape:", X_train.shape)
        X_test = np.array([GetEmbedding(sentence, model, embedding_dim=100) for sentence in testing_data])

        X_train, y_train = shuffle(X_train, y_train, random_state=42)

        # Train SVM classifier
        svm = SVC(kernel='linear', random_state=42)
        svm.fit(X_train, y_train)

        # Predict and evaluate
        y_pred = svm.predict(X_test)  # Example on training data for demonstration

        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)

        print(f"Precision: {precision:.2f}")
        print(f"Recall: {recall:.2f}")
        print("Classification Report:\n", classification_report(y_test, y_pred))

class CustomDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        item = {key: val[idx] for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

def ClassifierBert(privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file):
    # prepare dataset
    current_dir = os.path.dirname(os.path.abspath(__file__))
    X_train, y_train, X_test, y_test = GetDataset(current_dir, privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file)
    X_train, y_train = shuffle(X_train, y_train, random_state=42)

    # tokenize data
    checkpoint = "bert-base-uncased"
    tokenizer = AutoTokenizer.from_pretrained(checkpoint)
    # tokenizer = AutoTokenizer.from_pretrained("roberta-base")
    train_encodings = tokenizer(X_train, padding=True, truncation=True, max_length=10, return_tensors="pt") # Returns PyTorch tensors
    test_encodings = tokenizer(X_test, padding=True, truncation=True, max_length=10, return_tensors="pt") # Returns PyTorch tensors

    # create dataset in torch format
    train_dataset = CustomDataset(train_encodings, y_train)
    test_dataset = CustomDataset(test_encodings, y_test)

    # load pre-trained model
    model = AutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)  # binary classification

    # create dataloader
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=16)

    optimizer = AdamW(model.parameters(), lr=5e-5)
    num_training_steps = len(train_loader) * 5  # 5 epochs is better than 3
    lr_scheduler = get_scheduler("linear", optimizer=optimizer, num_warmup_steps=0, num_training_steps=num_training_steps)

    # set device
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model.to(device)

    # train the model
    epochs = 5
    for epoch in range(epochs):
        model.train()
        loop = tqdm(train_loader, leave=True)
        for batch in loop:
            # move data to device
            batch = {key: val.to(device) for key, val in batch.items()}

            # forward pass
            outputs = model(**batch)
            loss = outputs.loss

            # backward pass
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            lr_scheduler.step()

            # print loss
            loop.set_description(f"Epoch {epoch}")
            loop.set_postfix(loss=loss.item())

    # Save the trained model and tokenizer
    output_dir = os.path.join(current_dir, "model/fine_tuned_bert") 
    os.makedirs(output_dir, exist_ok=True)
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print(f"Fine-tuned model and tokenizer are saved to {output_dir}")

    model.eval()
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for batch in test_loader:
            batch = {key: val.to(device) for key, val in batch.items()}
            outputs = model(**batch)
            logits = outputs.logits
            predictions = torch.argmax(logits, dim=-1)
            all_preds.extend(predictions.cpu().numpy())
            all_labels.extend(batch['labels'].cpu().numpy())

    # Calculate metrics
    accuracy = accuracy_score(all_labels, all_preds)
    precision = precision_score(all_labels, all_preds)
    recall = recall_score(all_labels, all_preds)

    print(f"Accuracy: {accuracy:.2f}")
    print(f"Precision: {precision:.2f}")
    print(f"Recall: {recall:.2f}")
    print("Classification Report:\n", classification_report(all_labels, all_preds))




if __name__ == "__main__":
    # ClassifierGPT("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json")
    # ClassifierSVM("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json", "dataset/privacy_testing_data.json", "dataset/non_privacy_testing_data.json")
    # WordClassifierSVM("Word2Vec", "dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json", "dataset/privacy_testing_data.json", "dataset/non_privacy_testing_data.json")

    # GPTResult("result/gpt_result.json", "dataset/testDataset.json")
    ClassifierBert("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json", "dataset/privacy_testing_data.json", "dataset/non_privacy_testing_data.json")