from dotenv import load_dotenv
from fastapi import FastAPI
from openai import OpenAI

from Request import RequestBodyData
from Response import ResponseBodyData

app = FastAPI()
load_dotenv()
client = OpenAI()


@app.post("/DatePlan")
def question(Request: RequestBodyData):
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
    # デートの中で訪れる場所の名前だけを取得する機能
    Name_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "デートの中で訪れる場所の名前だけを取得する。",
            },
            {
                "role": "system",
                "content": Description_response.choices[0].message.content,
            },
        ],
    )

    print(Name_response.choices[0].message.content)
    print(Description_response.choices[0].message.content)

    # 提案された建物名だけを取得
    Name_content = Name_response.choices[0].message.content

    # 提案された説明文を取得
    Description_content = Description_response.choices[0].message.content

    # 取得した場所のみのデータを不要な空白を取り除く、改行区切りでリストに格納
    facility_list = [
        line.split(". ", 1)[1].strip()
        for line in Name_content.split("\n")
        if line.strip()
    ]

    # リストに格納したデータをname: nameの形で返す
    facility_names = [{"name": name} for name in facility_list]

    return ResponseBodyData(
        facilitys=facility_names,
        description=Description_content,
    )
