import base64
import requests

def identify_alert(before_image_path, after_image_path):
    # Function to encode the image
    def encode_image(image_path):
      with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

    # Getting the base64 string
    before_base64_image = encode_image(before_image_path)
    after_base64_image = encode_image(after_image_path)

    headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {api_key}"
    }

    payload = {
      "model": "gpt-4-vision-preview",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "I give you 2 android app ui pictures. If the 2 pictures are the same, answer 'unknown'. Otherwise, if there is an error message in the second picture, based on the meaning of the message, answer 'fail' if the message shows lack permission, and answer 'succeed' if the message is just showing the status. Otherwise, answer 'succeed'. I just need the result."
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{before_base64_image}"
              },
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{after_base64_image}"
              },
            },
          ]
        }
      ],
      "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    # print(response.json()["choices"][0]["message"]["content"])

    if ("succeed" in response.json()["choices"][0]["message"]["content"]) or ("Succeed" in response.json()["choices"][0]["message"]["content"]):
        return "succeed"
    elif ("fail" in response.json()["choices"][0]["message"]["content"]) or ("Fail" in response.json()["choices"][0]["message"]["content"]):
        return "fail"
    else:
        return "unknown"
    
def test_identify_alert():
    # Path to your image
    before_image_path = "/Users/tracy/Documents/GitHub/droidbot/Confiot/screenshot_0.png"
    after_image_path_test1 = "/Users/tracy/Documents/GitHub/droidbot/Confiot/screenshot_1.png"
    after_image_path_test2 = "/Users/tracy/Documents/GitHub/droidbot/Confiot/screenshot_2.png"
    # image_path_no_alert_test = "/Users/tracy/Documents/GitHub/droidbot/mihome/pixel5/states/screen_2023-11-20_174510.png"

    print(identify_alert(before_image_path, before_image_path))
    print(identify_alert(before_image_path, after_image_path_test1))
    print(identify_alert(before_image_path, after_image_path_test2))

test_identify_alert()