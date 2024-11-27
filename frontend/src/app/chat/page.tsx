"use client";

import { useEffect, useState } from "react";
import { Messages, SuggestMessage, Message } from "@/types/api";
import CustomizedGoogleMap from "@/components/CustomizedGoogleMap";
import { useRouter } from "next/navigation";


export default function Chat() {
  // リダイレクトを実現するためにuseRouterを使う
  const router = useRouter();

  // ユーザーからのメッセージを格納する変数
  const [chatMessages, setMessages] = useState<Messages>([]);

  // メッセージ送信フォームの入力内容を一時的に格納する変数
  const [input, setInput] = useState("");

  // AIからのメッセージを格納する変数
  const [suggestMessage, setSuggestMessage] = useState<SuggestMessage | null>(null);

  // デートスポットが読み込まれたか否かという情報を格納するフラグ変数
  const [isLoaded, setIsLoaded] = useState(false);

  // リクエストボディーを送信する関数を定義
  const sendMessages = async () => {
    // inputの中身を読み取り
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      role: "user",
      message: trimmedInput,
      facilitys: [],
      description: "",
    };

    // userメッセージを保存
    const updatedMessages = [...chatMessages, userMessage]
    setMessages(updatedMessages);

    // input変数の中身を空文字列で初期化
    setInput("");

    // isLoaded変数の中身をfalseで初期化
    setIsLoaded(false);

    // APIエントリポイントにリクエスト
    try {
      // エントリポイントリクエスト
      const response = await fetch("http://localhost:8000/api/datePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMessages),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status code : ${response.status}`)
      }

      const suggest: SuggestMessage = await response.json();

      // サーバーメッセージを状態として保存
      setSuggestMessage(suggest);

      console.log("This is facilitys : " + suggestMessage?.facilitys);
      console.log("This is description : " + suggestMessage?.description);


      // AIからのデートプラン提案内容を保存
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          message: "",
          facilitys: suggest.facilitys,
          description: suggest.description,
        },
      ]);

    } catch (error) {
      console.error("Failed to fetch response:", error);
    }
  };

  // suggestMessageの更新を監視し`isLoaded`を更新
  // これがないと、デートスポットの情報がロードされないままGoogleMapAPIを呼び出してしまって、描写が失敗する
  useEffect(
    () => {
      if (suggestMessage != undefined) {
        setIsLoaded(true);
      }
    },
    [suggestMessage]
  );

  // sessionStrageに最新のデートプランを保存して画面遷移を行う関数
  const saveDatePlan = () => {
    // セッションストレージにAIからのデートプラン情報を保存する
    sessionStorage.setItem("datePlan", JSON.stringify(suggestMessage));

    // 画面遷移
    router.push("/planDetail");
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-red-50">
      {/* チャットエリア */}
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow">
        {chatMessages?.map((msg, index) => (
          <div key={index} className="mb-4">
            {msg.role === "system" ? (
              // roleがsystemの場合（左寄せ）
              <div className="flex flex-row">
                <div className="inline-block px-4 py-4 rounded-lg bg-red-100 text-black w-4/5">
                  <div>
                    {/* GoogleMapを表示 */}
                    {/* 一番最初に訪れる場所を初期レンダリング時の中心に据える */}
                    {suggestMessage && isLoaded ? (
                      <CustomizedGoogleMap
                        center={{
                          name: suggestMessage.facilitys[0]?.name || "Default Center",
                          latitude: suggestMessage.facilitys[0]?.latitude || 36.5287888480469,
                          longitude: suggestMessage.facilitys[0]?.longitude || 136.62829796528777,
                        }}
                        facilities={suggestMessage?.facilitys}
                      />
                    ) : (
                      <p>Loading map...</p> // ローディング中の表示
                    )}
                  </div>
                  <span>
                    {/* Mapにピンを配置 */}
                    {msg.facilitys?.map((facility, index) => (
                      <div key={index} className="item bg-red-300 my-3 mx-0 p-3 rounded-lg">
                        {facility.name}
                      </div>
                    ))}
                  </span>
                  <div>
                    {/* デートプランの説明 */}
                    {isLoaded ? suggestMessage?.description : (<p>Loading Description...</p>)}
                  </div>
                  <div className="flex flex-row justify-center my-10">
                    <button
                      onClick={saveDatePlan}
                      className="bg-red-400 p-3 rounded-full border-black border-2"
                    >
                      詳細確認ボタン
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // roleがuserの場合（右寄せ）
              <div className="flex flex-row-reverse w-full">
                <div className="inline-block px-4 py-2 rounded-lg bg-red-100 text-black">
                  <span>{msg.message}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="flex justify-center">
        <div className="mt-4 flex items-center w-4/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessages()}
            className="flex-grow p-2 border rounded-l shadow-sm text-black focus:outline-none"
            placeholder="メッセージを入力"
          />
          <button
            onClick={sendMessages}
            className="px-4 py-2 bg-red-400 text-white rounded-r shadow hover:bg-blue-600"
          >
            {/* 矢印アイコン */}
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
