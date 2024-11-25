import re

from dotenv import load_dotenv
from openai import OpenAI
from Request import MessageData

load_dotenv()
client = OpenAI()


# デートプラン情報を提案するアシスタント機能
def question_description(Request: MessageData):

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


# デートの中で訪れる場所の名前だけを取得する機能
def question_name(Request: MessageData):
    Name_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "デートの中で訪れる場所の名前だけを取得する。",
            },
            {"role": "system", "content": question_description(Request)},
        ],
    )
    return Name_response.choices[0].message.content


import re


def clean_description(description_content):
    # 不要な部分のパターンを定義
    patterns = [
        r"\*\*.*?\*\*",  # **で囲まれた部分（太字）
        r"###.*",  # ### で始まる行
        r"\n[0-9]\.",  # 数字付きリスト
        r"（.*?）",  # （）で囲まれた内容
    ]

    # 各パターンを削除
    for pattern in patterns:
        description_content = re.sub(pattern, "", description_content)

    # 空白行の削除と整形
    description_content = re.sub(r"\n+", "\n", description_content).strip()

    return description_content
