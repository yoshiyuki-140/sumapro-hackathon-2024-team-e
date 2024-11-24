from dotenv import load_dotenv

from openai import OpenAI
from Request import MessageData

load_dotenv()
client = OpenAI()


def question_description(Request: MessageData):
    # デートプラン情報を提案するアシスタント機能
    Description_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "デートプラン情報を提案するアシスタントです。",
            },
            {"role": "user", "content": Request.message},
        ],
    )
    return Description_response.choices[0].message.content


def question_name(Request: MessageData):
    # デートの中で訪れる場所の名前だけを取得する機能
    Name_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "デートの中で訪れる場所の名前だけを取得する。",
            },
            {"role": "system", "content": Request},
        ],
    )
    return Name_response.choices[0].message.content
