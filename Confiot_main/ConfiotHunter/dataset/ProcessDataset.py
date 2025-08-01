import json, random, os

def mixTestDataset(privacy_file, non_privacy_file):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    with open(os.path.join(current_dir, privacy_file), 'r') as f:
        privacy_dataset = json.load(f)

    with open(os.path.join(current_dir, non_privacy_file), 'r') as f:
        non_privacy_dataset = json.load(f)

    privacy_data, non_privacy_data = {}, {}
    for key in privacy_dataset.keys():
        for i in privacy_dataset[key]:
            privacy_data[i] = "true"
    for key in non_privacy_dataset.keys():
        for i in non_privacy_dataset[key]:
            non_privacy_data[i] = "false"

    print(privacy_data)

    test_dataset = list(privacy_data.items()) + list(non_privacy_data.items())
    number = len(test_dataset)
    random.shuffle(test_dataset)
    test_dataset = dict(test_dataset)

    with open(os.path.join(current_dir, "testDataset.json"), 'w') as f:
        f.write(json.dumps(test_dataset, indent=4))

if __name__ == "__main__":
    mixTestDataset("privacy_test_data.json", "non_privacy_test_data.json")