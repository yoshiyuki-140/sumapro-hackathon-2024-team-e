// デートで訪れる場所を定義する
export type Facility = {
  // 施設名
  name: string,
  // 緯度
  latitude: number;
  // 経度
  longitude: number;
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

// 今までの会話内容を格納する型
export type ChatLog = Message[];


// AIからのデートプランの提案を格納する型
export type SuggestMessage = {
  facilitys: Facility[];
  description: string;
};
