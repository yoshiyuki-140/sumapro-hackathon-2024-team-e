# sumapro-hackathon-2024-team-e
スマプロハッカソン2024成果物

# Web API仕様書

- https://yoshiyuki-140.github.io/sumapro-hackathon-2024-team-e/swagger/

# OPENAI_API_KEY設置場所

プロジェクトルートにBoxで配信している`.env`を配置してください。
配置するだけで`python-dotenv`というライブラリが`backend/main.py`実行時に読み込んでくれます。

例：
```
.
├── .env # <= ここ！
├── .git
├── .gitignore
├── README.md
├── backend
├── docs
└── frontend
```
