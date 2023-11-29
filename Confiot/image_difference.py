import base64
import requests

def identify_alert(image_path):
    # Function to encode the image
    def encode_image(image_path):
      with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

    # Getting the base64 string
    base64_image = encode_image(image_path)

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
              "text": "Can you identify the alert? If so, does this mean fail or succeed? You can tell me 'no alert', 'fail' or 'succeed'. I just need the result."
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
              }
            }
          ]
        }
      ],
      "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    print(response.json()["choices"][0]["message"]["content"])

    if "no alert" or "No alert" or "succeed" or "Succeed" in response.json()["choices"][0]["message"]["content"]:
        return "succeed"
    elif "fail" or "Fail" in response.json()["choices"][0]["message"]["content"]:
        return "fail"
    else:
        return "unknown"
    
def test_identify_alert():
    # Path to your image
    image_path_alert_test = "/Users/tracy/Documents/GitHub/droidbot/Confiot/screenshot_1.png"
    image_path_no_alert_test = "/Users/tracy/Documents/GitHub/droidbot/mihome/pixel5/states/screen_2023-11-20_174510.   png"
    result = identify_alert(image_path_no_alert_test)

    print(result)

test_identify_alert()