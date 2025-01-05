import os, base64, requests, json

def similarityGPT(privacy_file, non_privacy_file):
        current_dir = os.path.dirname(os.path.abspath(__file__))
    
        with open(os.path.join(current_dir, privacy_file), 'r') as f:
            content = json.load(f)
        privacy_data = []
        for key in content.keys():
             for items in content[key]:
                  privacy_data.append(items)

        with open(os.path.join(current_dir, non_privacy_file), 'r') as f:
            content = json.load(f)
        non_privacy_data = []
        for key in content.keys():
            for items in content[key]:
                non_privacy_data.append(items)
        
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

if __name__ == "__main__":
    similarityGPT("dataset/privacy_training_data.json", "dataset/non_privacy_training_data.json")