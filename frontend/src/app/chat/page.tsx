"use client";

import { useEffect, useState } from "react";
import { ChatLog, SuggestMessage, Message } from "@/types/api";
import CustomizedGoogleMap from "@/components/CustomizedGoogleMap";
import { useRouter } from "next/navigation";

export default function Chat() {
  // リダイレクトを実現するためにuseRouterを使う
  const router = useRouter();

  // ユーザーからのメッセージを格納する変数
  const [chatLog, setChatLog] = useState<ChatLog>([]);

  // メッセージ送信フォームの入力内容を一時的に格納する変数
  const [input, setInput] = useState("");

  // AIからのメッセージを格納する変数
  const [suggestMessage, setSuggestMessage] = useState<SuggestMessage | null>(
    null
  );

  // デートスポットが読み込まれたか否かという情報を格納するフラグ変数
  const [isLoaded, setIsLoaded] = useState(false);

  // チャットログがロードされたか否かを保存するフラグ
  const [isChatLogLoaded, setIsChatLogLoaded] = useState(false);

  // セッションストレージからチャットログを取り出す関数
  const loadChatLogFromSessionStorage = () => {
    try {
      // セッションストレージからチャットログを取り出す
      const storedChatLog = sessionStorage.getItem("chatLog");

      if (storedChatLog) {
        // パースされたチャットログをChatLog型の変数として格納
        const parsedChatLog = JSON.parse(storedChatLog) as ChatLog;
        // 結果をchatLog変数に保存する
        setChatLog(parsedChatLog);
        // isLoaded -> true
        setIsLoaded(true);
        // 前回の会話の最終的な提案内容をsuggestMessage変数にセットする
        const lastMessage = parsedChatLog[parsedChatLog.length - 1];
        setSuggestMessage({
          facilitys: lastMessage.facilitys,
          description: lastMessage.description,
        });
      } else {
        // 会話履歴がなければ、新規の会話なので、フローを止めずに一応コンソールログに警告だけ出しておく
        console.warn("会話履歴はありません。");
        // 新規会話開始の場合はチャットログをクリア
        setChatLog([]);
        // 新規会話開始の場合はセッションストレージの会話内容をクリア
        sessionStorage.removeItem("chatLog");
      }
    } catch (error) {
      console.error(
        "セッションストレージのデータ解析中にエラーが発生しました。",
        error
      );
      // エラー時もチャットログをクリア
      setChatLog([]);
      sessionStorage.removeItem("chatLog");
    } finally {
      // チャットログをロードしたというフラグを立てる
      setIsChatLogLoaded(true);
    }
  };

  // セッションストレージにチャットログを保存する関数
  const saveChatLogToSessionStorage = (log: ChatLog) => {
    sessionStorage.setItem("chatLog", JSON.stringify(log));
  };

  // セッションストレージからチャットログを取り出す
  useEffect(() => {
    loadChatLogFromSessionStorage();
  }, []);

  // リクエストボディーを送信する関数を定義
  const sendChatLog = async () => {
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
    const updatedChatLog = [...chatLog, userMessage];
    setChatLog(updatedChatLog);
    // チャットログをセッションストレージに保存
    saveChatLogToSessionStorage(updatedChatLog);

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
        body: JSON.stringify(updatedChatLog),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status code : ${response.status}`);
      }

      const suggest: SuggestMessage = await response.json();

      // サーバーメッセージを状態として保存
      setSuggestMessage(suggest);

      console.log("This is facilitys :", suggest.facilitys);
      console.log("This is description :", suggest.description);

      // AIからのデートプラン提案内容を保存
      setChatLog((prev) => {
        const newChatLog = [
          ...prev,
          {
            role: "system",
            message: "",
            facilitys: suggest.facilitys,
            description: suggest.description,
          },
        ];
        // チャットログをセッションストレージに保存
        saveChatLogToSessionStorage(newChatLog);
        return newChatLog;
      });
    } catch (error) {
      console.error("Failed to fetch response:", error);
    }
  };

  // suggestMessageの更新を監視し`isLoaded`を更新
  // これがないと、デートスポットの情報がロードされないままGoogleMapAPIを呼び出してしまって、描写が失敗する
  useEffect(() => {
    if (suggestMessage != null) {
      setIsLoaded(true);
    }
  }, [suggestMessage]);

  /**
   * セッションストレージにチャット画面の情報を保存する関数
   * 1. セッションストレージに最新のデートプランを保存する
   * 2. セッションストレージに今までの対話内容を保存する
   * 3. 画面遷移を行う
   */
  const saveDatePlan = () => {
    // セッションストレージにAIからのデートプラン情報を保存する
    sessionStorage.setItem("datePlan", JSON.stringify(suggestMessage));

    // セッションストレージに今までの会話内容を保存する
    saveChatLogToSessionStorage(chatLog);

    // 画面遷移
    router.push("/planDetail");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-red-50">
      {/* チャットエリア */}
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow">
        {/* 描写開始条件 : isChatLogLoadedがtrueであること -> セッションストレージからのデータ読込が成功したこと */}
        {!isChatLogLoaded ? (
          <p className="text-gray-500">Loading chat history...</p>
        ) : (
          chatLog.map((msg, index) => (
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
                          // 万一緯度経度が読み込めなかったら、DMM金沢事業所がDefaultCenterとして表示される
                          center={{
                            name: suggestMessage.facilitys[0]?.name || "Default Center",
                            latitude:
                              suggestMessage.facilitys[0]?.latitude || 36.59438316927364,
                            longitude:
                              suggestMessage.facilitys[0]?.longitude || 136.68282470468046,
                          }}
                          facilities={suggestMessage.facilitys}
                        />
                      ) : (
                        <p>Loading map...</p> // ローディングメッセージの表示
                      )}
                    </div>
                    <span>
                      {msg.facilitys?.map((facility, idx) => (
                        <div
                          key={idx}
                          className="item bg-red-300 my-3 mx-0 p-3 rounded-lg"
                        >
                          {facility.name}
                        </div>
                      ))}
                    </span>
                    <div>
                      {/* デートプランの説明 */}
                      {isLoaded ? (
                        suggestMessage?.description
                      ) : (
                        <p>Loading Description...</p>
                      )}
                    </div>
                    <div className="flex flex-row justify-center my-10">
                      <button
                        onClick={saveDatePlan}
                        className="bg-red-400 p-5 rounded-2xl border-black border-2 text-6xl"
                      >
                        {/* 詳細ページへのリンクを表すSVGアイコン */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 12c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1v7l2.5-1.5L12 9V2h6a2 2 0 0 1 2 2v7.81A6.48 6.48 0 0 0 15.5 10A6.5 6.5 0 0 0 9 16.5c0 2.31 1.21 4.35 3.03 5.5z" /></svg>
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
          ))
        )}
      </div>

      {/* 入力フォーム */}
      <div className="flex justify-center">
        <div className="mt-4 flex items-center w-4/5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendChatLog()}
            className="flex-grow p-2 border rounded-l shadow-sm text-black focus:outline-none"
            placeholder="メッセージを入力"
          />
          <button
            onClick={sendChatLog}
            className="px-4 py-2 bg-red-400 text-white rounded-r shadow hover:bg-blue-600"
          >
            {/* 矢印アイコン */}
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
