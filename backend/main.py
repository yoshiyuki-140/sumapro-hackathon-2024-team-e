from typing import List

from chatgpt import clean_description, question_description, question_name, true_description
from dotenv import load_dotenv
from fastapi import FastAPI
from googlemap_api import (get_cafe_restArea, get_change_data,
                           get_convenienceStore_restArea, get_place_all,
                           get_place_data, get_toilet_restArea, get_true_place)
from openai import OpenAI
from request import MessageRequestBody, PlanRequestBody
from response import MessageResponseBody, PlanResponseBody
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
client = OpenAI()


@app.post("/api/datePlan", response_model=MessageResponseBody)
def question(requests: List[MessageRequestBody]):
    """
    対話内容からデートプラン情報を返却する
    """

    # デートプラン情報を提案する説明文取得
    Description_content = question_description(requests)

    # 取得した説明文を整形する
    Cleaned_description = clean_description(Description_content)

    # デートの中で訪れる場所の名前だけを取得
    name_content = question_name(Cleaned_description)
    
    # 取得した場所のみのデータを整形してリストに格納
    place_names = get_change_data(name_content)
    
    # 取得した場所のみの緯度経度を取得する
    place_data, clean_place_names = get_place_data(place_names)

    # 取得した場所の名前とその場所の緯度経度を合体
    place_all = get_place_all(clean_place_names, place_data)
    
    # 場所情報を一つも提供できない場合は"提案するデートプラン情報が見つかりませんでした。" と表示
    True_description = true_description(place_all, Cleaned_description)
    
    return MessageResponseBody(
        facilitys=place_all,
        description=True_description,
    )


@app.post("/api/datePlan/restArea", response_model=PlanResponseBody)
def post_restArea(request: PlanRequestBody):
    """
    デートの中で訪れる場所周辺の休憩スポットを返却する
    """
    true_place = get_true_place(request)

    # デートの中で訪れる場所周辺のカフェ情報を取得
    place_restArea_cafe = get_cafe_restArea(true_place)

    # デートの中で訪れる場所周辺のトイレ情報を取得
    place_restArea_toilet = get_toilet_restArea(true_place)

    # デートの中で訪れる場所周辺のコンビニ情報を取得
    place_restArea_convenienceStore = get_convenienceStore_restArea(true_place)

    return PlanResponseBody(
        cafe=place_restArea_cafe,
        toilet=place_restArea_toilet,
        convenienceStore=place_restArea_convenienceStore,
    )
