from dotenv import load_dotenv
from fastapi import FastAPI
from openai import OpenAI

from chatgpt import clean_description, question_description, question_name
from googlemap_api import get_change_data, get_place_all, get_place_data
from request import MessageRequestBody
from response import MessageResponseBody

app = FastAPI()
load_dotenv()
client = OpenAI()


@app.post("/api/datePlan")
def question(Request: MessageRequestBody):
    """
    取得したデートプラン情報をMessageRequestBodyDataの型にはめ込む関数
    """

    # デートプラン情報を提案する説明文取得
    Description_content = question_description(Request)

    # 取得した説明文を整形する
    Clean_description = clean_description(Description_content)

    # デートの中で訪れる場所の名前だけを取得
    name_content = question_name(Request)

    # 取得した場所のみのデータを整形してリストに格納
    place_names = get_change_data(name_content)

    # 取得した場所のみの緯度経度を取得する
    place_data = get_place_data(place_names)

    # 取得した場所の名前とその場所の緯度経度を合体
    place_all = get_place_all(place_names, place_data)


    return MessageResponseBody(
        facilitys=place_all,
        description=Clean_description,
    )
