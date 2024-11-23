"use client";
import { useState } from "react";
import { ChatRequestBody, Message } from "@/types/api";

export default function Chat() {
  // requestBodyを定義
  const [chatRequestBody, setRequestBody] = useState<ChatRequestBody>([]);
  // ユーザーのinputを格納
  const [input, setInput] = useState("");

  // リクエストボディーを送信する関数
  const sendRequestBody = async () => {

    // 文字列の先頭と末尾の余分な空白(スペース、タブ、改行)を削除する。
    if (!input.trim()) return;

    const message: Message = {
      role: "user",
      message: input,
      facilitys: [],
      description: ""
    };


    // messageをappend
    setRequestBody([...chatRequestBody, message]);

    // inputの中身を""で初期化
    setInput("");


    // サーバーへHTTPリクエストを行い、レスポンスをresponseに格納する
    // このときは単なる文字列として格納される
    const response = await fetch("http://localhost:8000" + "/api/datePlan", {
      // HTTP request POST
      method: "POST",

      // json形式のデータ構造を送信する旨をヘッダー情報に記述
      headers: { "Content-Type": "application/json" },

      // リクエストボディー
      // JavaScriptオブジェクトをJSON形式の文字列へ変換する。
      body: JSON.stringify(chatRequestBody),
    });


    // サーバーからのレスポンスをJSON形式で取り出し、それを変数dataに格納する
    // response.jsonは非同期のメソッドなので、awaitを使って結果を待たないといけない
    const data: Message = await response.json();


    console.log("This is data : ", data);
    // prevは更新前の状態を表す
    // 今までのやり取りを残したまま、リプライを更新する
    setRequestBody((prev) => [
      // 今までのやり取りをコピー
      ...prev,
      // 今回のレスポンスを末尾に格納
      { role: "system", message: data.message, facilitys: data.facilitys, description: data.description }
    ]);
  };


  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* チャットエリア */}
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow">
        {chatRequestBody.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className="text-right">
              <span className="inline-block px-4 py-2 bg-blue-500 text-white rouneded-lg">
                {msg.message}
              </span>
            </div>
            {(msg.role == "system") && (
              <div className="text-left mt-2">
                <span className="inline-block px-4 py-2 bg-gray-200 text-black rounded-lg">
                  {msg.message}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          // inputタグに中身が挿入されたら、その中身をinput変数に格納する
          // eはこのタグ自身(ここではinput)
          onChange={(e) => setInput(e.target.value)}
          // キーが入力されて、そのキーがEnterキーだったら、メッセージを送信する
          // eはこのタグ自身(ここではinput)
          onKeyDown={(e) => e.key === "Enter" && sendRequestBody()}
          className="flex-grow p-2 border rounded-l shadow-sm text-black"
          placeholder="メッセージを入力"
        />
        <button
          onClick={sendRequestBody}
          className="px-4 py-2 bg-blue-500 text-white rounded-r shadow hover:bg-blue-600"
        >
          送信
        </button>
      </div>
    </div>
  );
}
