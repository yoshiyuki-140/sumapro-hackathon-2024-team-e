from dotenv import load_dotenv
from fastapi import FastAPI

from chatgpt import question_description, question_name, Change_Data
from openai import OpenAI
from Request import MessageData
from Response import ResponseBodyData

app = FastAPI()
load_dotenv()
client = OpenAI()


@app.post("/api/datePlan")
def question(Request: MessageData):

    # デートプラン情報を提案する説明文取得
    Description_content = question_description(Request)

    # デートの中で訪れる場所の名前だけを取得
    Name_content = question_name(Request)
    
    # 取得した場所のみのデータをname: nameの形で返す
    facility_names = Change_Data(Name_content)

    return ResponseBodyData(
        facilitys=facility_names,
        description=Description_content,
    )
