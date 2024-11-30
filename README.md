# サービス名

- 一枚の画像
<!-- [![IMAGE ALT TEXT HERE](./app_image.png)](https://youtu.be/TZA6EsNIHM0) -->


## 製品概要

### 背景(製品開発のきっかけ、課題等）


### 製品説明（具体的な製品の説明）


#### デモ動画


### 特長
#### 1. xxx
#### 2. yyy
#### 3. zzz

### 解決出来ること


### 今後の展望

- 実装できていない機能
    

### 注力したこと（こだわり等）

[@yoshiyuki-140](https://github.com/yoshiyuki-140)

[@YamagamiFuga](https://github.com/YamagamiFuga)

## 開発技術

### コンポーネント接続図


### 活用した技術

#### フレームワーク・ライブラリ・モジュール

#### ハッカソンで開発した独自機能・技術


---

# 開発者向け

## API KEY設置場所

### backend

バックエンドコンポーネントで使うAPIキーは`backend`フォルダ直下に`.env`ファイルを配置してください。

```bash
backend
├── .env # <= ここ!
├── chatgpt.py
├── googlemap_api.py
├── main.py
├── makefile
├── request.py
├── requirements.txt
└── response.py
```

.envの例
```bash
OPENAI_API_KEY="うんたらかんたら"
GOOGLE_MAPS_API_KEY="うんたらかんたら"
```

### frontend

フロントエンドコンポーネントで使うAPIキーは`frontend`フォルダ直下に`.env.local`ファイルを配置してください。

```bash
frontend
├── .env.local # <= ここ!
├── README.md
├── makefile
├── next-env.d.ts
├── next.config.ts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
├── src
├── tailwind.config.ts
└── tsconfig.json
```

.env.localの例
```bash
NEXT_PUBLIC_GOOGLE_MAP_KEY="うんたらかんたら"
```


## フォルダ説明

```bash

sumapro-hackathon-2024-team-e/
├── .git            # gitコマンドが参照する諸々が入ってる
├── .gitignore      # gitが追跡しないファイル・ディレクトリを定義
├── README.md       # リポジトリドキュメント
├── backend         # バックエンドのコード(fastapi/openai/googlemaps/etc...)
├── backend_mock    # バックエンドのハリボテ
├── docs            # API仕様書(swagger)等
├── frontend        # フロントエンドのコード(Next.js)
└── makefile        # makefile
```

## サービスのワイヤーフレーム(Figma)

- https://www.figma.com/design/vPFKduSEm0pkDBJ64GnLN6/%E3%82%B9%E3%83%9E%E3%83%97%E3%83%AD%E3%83%8F%E3%83%83%E3%82%AB%E3%82%BD%E3%83%B32024-%E6%88%90%E6%9E%9C%E7%89%A9?node-id=0-1&t=OqXdADgUJyfpEI5m-1


## Web API仕様書(Swagger/GithubPages)

- https://yoshiyuki-140.github.io/sumapro-hackathon-2024-team-e/swagger/

