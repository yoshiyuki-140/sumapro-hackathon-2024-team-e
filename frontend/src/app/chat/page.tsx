import { useState } from "react";

export default function Chat() {
  // ?
  // 右辺がわからん
  const [messages, setMessage] = useState<{ user: string, bot: string }[]>([]);
  // ?
  // わかるけど、`useState`への理解が足りない
  const [input, setInput] = useState("");

  const sendMessage = async () => {

    // 文字列の先頭と末尾の余分な空白(スペース、タブ、改行)を削除する。
    if (!input.trim()) return;

    // userMessageにユーザーからの入力を代入する
    const userMessage = input;

    // 
    setMessage([...messages, { user: userMessage, bot: "" }]);

    // inputの中身を""で初期化
    setInput("");


    // プロトコル
    const protocol = "http"

    // オリジン
    const origin = "localhost:8000"

    // サーバーへHTTPリクエストを行い、レスポンスをresponseに格納する
    // このときは単なる文字列として格納される
    const response = await fetch(protocol + origin + "/api/chat", {
      // HTTP request POST
      method: "POST",

      // レスポンスボディー
      // json形式のデータ構造を送信する旨をヘッダー情報に記述
      headers: { "Content-Type": "application/json" },

      // リクエストボディー
      // JavaScriptオブジェクトをJSON形式の文字列へ変換する。
      body: JSON.stringify({ message: userMessage }),
    });


    // サーバーからのレスポンスをJSON形式で取り出し、それを変数dataに格納する
    // response.jsonは非同期のメソッドなので、awaitを使って結果を待たないといけない
    const data = await response.json();


    // prevは更新前の状態を表す
    // 今までのやり取りを残したまま、リプライを更新する
    setMessage((prev) => [
      // スプレッド構文で現在の配列をすべてコピー
      ...prev,
      // 配列の最後に、botから帰ってきたデータを追加
      { user: "", bot: data.reply }
    ]);
  };


  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* チャットエリア */}
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className="text-right">
              <span className="inline-block px-4 py-2 bg-blue-500 text-white rouneded-lg">
                {msg.user}
              </span>
            </div>
            {msg.bot && (
              <div className="text-left mt-2">
                <span className="inline-block px-4 py-2 bg-gray-200 text-black rounded-lg">
                  {msg.bot}
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 border rounded-l shadow-sm"
          placeholder="メッセージを入力"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r shadow hover:bg-blue-600"
        >
          送信
        </button>
      </div>
    </div>
  );
}
