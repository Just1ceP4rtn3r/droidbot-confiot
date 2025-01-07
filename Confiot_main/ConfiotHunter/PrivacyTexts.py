import os, base64, requests, json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import precision_score, recall_score
from sklearn.metrics import classification_report, accuracy_score
from sklearn.utils import shuffle

def GetDataList(current_dir, file):
    with open(os.path.join(current_dir, file), 'r') as f:
        content = json.load(f)
    data = []
    for key in content.keys():
        for items in content[key]:
            data.append(items)
    return data

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

# def GPTResult():



def ClassifierSVMTraining(privacy_training_file, non_privacy_training_file, privacy_testing_file, non_privacy_testing_file):
    # 1. Data Preparation
    # Assume `texts` is a list of 1000 text samples and `labels` is a list of binary labels (1 for privacy, 0 for non-privacy)
    # Example: texts = ["Privacy text 1", "Non-privacy text 2", ...]
    # labels = [1, 0, ...]
    current_dir = os.path.dirname(os.path.abspath(__file__))
    privacy_training_data = GetDataList(current_dir, privacy_training_file)
    non_privacy_training_data = GetDataList(current_dir, non_privacy_training_file)
    X_train = privacy_training_data + non_privacy_training_data
    y_train = [1] * len(privacy_training_data) + [0] * len(non_privacy_training_data)

    privacy_testing_data = GetDataList(current_dir, privacy_testing_file)
    non_privacy_testing_data = GetDataList(current_dir, non_privacy_testing_file)
    X_test = privacy_testing_data + non_privacy_testing_data
    y_test = [1] * len(privacy_testing_data) + [0] * len(non_privacy_testing_data)

    X_train, y_train = shuffle(X_train, y_train, random_state=42)

    # 2. Feature Extraction
    tfidf = TfidfVectorizer(max_features=1000)  # You can adjust `max_features` for dimensionality
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


if __name__ == "__main__":
    # ClassifierGPT("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json")
    ClassifierSVMTraining("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json", "dataset/privacy_testing_data.json", "dataset/non_privacy_testing_data.json")

