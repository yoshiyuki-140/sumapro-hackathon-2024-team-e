# sumapro-hackathon-2024-team-e
スマプロハッカソン2024成果物


---
# 開発者向け

## OPENAI_API_KEY設置場所

プロジェクトルートにBoxで配信している`.env`を配置してください。
配置するだけで`python-dotenv`というライブラリが`backend/main.py`実行時に読み込んでくれます。

例：
```bash
.
├── .env # <= ここ！
├── .git
├── .gitignore
├── README.md
├── backend
├── docs
└── frontend
```

## フォルダ説明

```bash
.
├── .env            # 環境変数定義
├── .git            # gitコマンドが参照する諸々が入ってる
├── .gitignore      # gitが追跡しないファイル・ディレクトリを定義
├── README.md       # リポジトリドキュメント
├── backend         # バックエンドのコード(fastapi/openai/etc...)
├── docs            # API仕様書等(swagger)等
└── frontend        # フロントエンドのコード(Next.js)
```




## Web API仕様書

- https://yoshiyuki-140.github.io/sumapro-hackathon-2024-team-e/swagger/

