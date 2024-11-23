import os
from dotenv import load_dotenv 
from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()
client = OpenAI()

load_dotenv()
OpenAI_API_Key = os.environ['OPENAI_API_KEY']

@app.post("/DatePlan")
async def AI(Request):
    response = await OpenAI.ChatCompletion.create( 
        model = "gpt-4o-mini",
        massages = [{
            "role": "system",
            "content": "デートプラン情報を提案するアシスタントです。"
        }, {
            "role": "user",
            "content": f'{Request}'
        }
        ]
    )
    return response['choices'][0]['massege']['content']