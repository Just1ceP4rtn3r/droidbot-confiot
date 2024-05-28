from openai import OpenAI
from base64 import b64encode
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR + "/../../")

from Confiot_main.settings import settings
import shutil

os.environ["https_proxy"] = "http://192.168.72.1:1083"


# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return b64encode(image_file.read()).decode('utf-8')


def is_back_button(image_path):
    # Getting the base64 string
    base64_image = encode_image(image_path)

    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role":
                "user",
            "content": [{
                "type":
                    "text",
                "text":
                    "I'll provide a screenshot of a button in the mobile app in the next message. Can you help me determine if it might be a back button that, when clicked, takes you back to the previous page? If it seems like a back button, please reply 'yes'; if not, reply 'no'."
            }, {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            }]
        }],
        max_tokens=300,
    )

    try:
        print(response.choices[0])

        if response.choices[0].message.content.lower() == "yes":
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False


def resource_mapping(image_path):
    # Getting the base64 string
    base64_image = encode_image(image_path)

    client = OpenAI()

    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[{
            "role":
                "user",
            "content": [{
                "type":
                    "text",
                "text":
                    "I'll provide a screenshot of a button in the mobile app in the next message. Can you help me determine if it might be a back button that, when clicked, takes you back to the previous page? If it seems like a back button, please reply 'yes'; if not, reply 'no'."
            }, {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
            }]
        }],
        max_tokens=300,
    )

    try:
        print(response.choices[0])

        if response.choices[0].message.content.lower() == "yes":
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False


# is_back_button("/root/documents/droidbot-new/droidbot-confiot/Confiot_main/gpt_test/BackButtons/back.png")
