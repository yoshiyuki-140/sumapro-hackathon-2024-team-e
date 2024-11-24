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
            {"role": "system", "content": question_description(Request)
            },
        ],
    )
    return Name_response.choices[0].message.content




## 取得した場所のみのデータをname: nameの形に整形する
def Change_Data(Name_content):

    # 取得した場所のみのデータを不要な空白を取り除く、改行区切りでリストに格納
    facility_list = [
        line.split(". ", 1)[1].strip()
        for line in Name_content.split("\n")
        if line.strip()
    ]

    # リストに格納したデータをname: nameの形で返す
    Facility_names = [{"name": name} for name in facility_list]

    return Facility_names