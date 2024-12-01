import re
from typing import List

from dotenv import load_dotenv
from openai import OpenAI
from request import MessageRequestBody

load_dotenv()
client = OpenAI()


def question_description(Requests: List[MessageRequestBody]):
    """
    デートプラン情報を提案するアシスタント機能
    """
    # プロンプトが記述してあるdescription.txtをファイル呼び出す
    with open("./scripts/description.txt", "r", encoding="utf-8") as file:
        description_txt = file.read()

    # 今までの会話履歴を取り出す
    messages = [
        {"role": request.role, "content": request.message} for request in Requests
    ]

    # messagesの先頭に役割を定義する
    messages.insert(
        0,
        {
            "role": "system",
            "content": description_txt,
        },
    )
    Description_response = client.chat.completions.create(
        model="gpt-4o-mini", messages=messages
    )

    Description_content = Description_response.choices[0].message.content

    return Description_content


def question_name(cleaned_description: str):
    """
    デートの中で訪れる場所の名前だけを取得する機能
    """

    # プロンプトが記述してあるplace.txtをファイル呼び出す
    with open("./scripts/place.txt", "r", encoding="utf-8") as file:
        place_txt = file.read()

    Name_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": place_txt},
            {"role": "system", "content": cleaned_description},
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
