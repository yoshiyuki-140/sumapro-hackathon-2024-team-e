from dotenv import load_dotenv
from fastapi import FastAPI

from chatgpt import question_description, question_name
from openai import OpenAI
from Request import MessageData
from Response import ResponseBodyData

app = FastAPI()
load_dotenv()
client = OpenAI()


@app.post("/api/datePlan")
def question(Request: MessageData):

    # デートプラン情報を提案する説明文取得
    Description_content = question_description(Request.message)

    # デートの中で訪れる場所の名前だけを取得
    Name_content = question_name(Request.message)

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
