import re

from dotenv import load_dotenv
from openai import OpenAI

import schemas

load_dotenv()
client = OpenAI()


def question_description(Request: schemas.MessageRequestBody):
    """
    デートプラン情報を提案するアシスタント機能
    """
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


def question_name(Request: schemas.MessageRequestBody):
    """
    デートの中で訪れる場所の名前だけを取得する機能
    """
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


def clean_description(description_content):
    """
    不要な文字のパターンを定義し削除する
    """
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

    # \nの文字削除
    description_content = description_content.replace("\n", "")

    return description_content
