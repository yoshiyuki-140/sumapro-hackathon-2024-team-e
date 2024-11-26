from dotenv import load_dotenv
from fastapi import FastAPI
from openai import OpenAI

from chatgpt import clean_description, question_description, question_name
from googlemap_api import Change_Data, Place_All, Place_Data
from Request import MessageData
from Response import ResponseBodyData

app = FastAPI()
load_dotenv()
client = OpenAI()


@app.post("/api/datePlan")
def question(Request: MessageData):

    # デートプラン情報を提案する説明文取得
    Description_content = question_description(Request)

    # 取得した説明文を整形する
    Clean_description = clean_description(Description_content)

    # デートの中で訪れる場所の名前だけを取得
    name_content = question_name(Request)

    # 取得した場所のみのデータを整形してリストに格納
    place_names = Change_Data(name_content)

    # 取得した場所のみの緯度経度を取得する
    place_data = Place_Data(place_names)

    # 取得した場所の名前とその場所の緯度経度を合体
    place_all = Place_All(place_names, place_data)

    return ResponseBodyData(
        facilitys=place_all,
        description=Clean_description,
    )
