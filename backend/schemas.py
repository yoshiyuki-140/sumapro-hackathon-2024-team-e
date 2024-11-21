from pydantic import BaseModel  # リクエストbodyを定義するために必要


# リクエストbodyを定義
class RequestBodyData(BaseModel):
    role: str
    message: str
    age: int


# レスポンスbody定義
class ResponseBodyData(BaseModel):
    facilitys: str
    description: str
