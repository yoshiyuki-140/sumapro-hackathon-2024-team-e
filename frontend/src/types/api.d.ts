// デートで訪れる場所を定義する
export type Facility = {
  // 施設名
  name: string,
  // 緯度
  latitude: number;
  // 経度
  logitude: number;
}

// メッセージ
export type Message = {
  // 役割：system | user
  role: string,
  // メッセージ
  message: string;
  // デートプランで訪れる施設一覧
  facilitys: Facility[];
  // デートプランの説明
  description: string;
}

// Chat画面のリクエストボディー
export type ChatRequestBody = Message[];


// Chat画面のレスポンスボディー
export type ChatResponseBody = {
  facilitys: Facility[];
  description: string;
};
