"use client";

import { useState } from "react";
import { ChatRequestBody, ChatResponseBody, Message } from "@/types/api";

export default function Chat() {
  const [chatRequestBody, setRequestBody] = useState<ChatRequestBody>([]);
  const [input, setInput] = useState("");
  // useEffect(() => {
  // console.log("Updated chatRequestBody:", chatRequestBody);
  // }, [chatRequestBody]);

  const sendRequestBody = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      role: "user",
      message: trimmedInput,
      facilitys: [],
      description: "",
    };

    const updatedRequestBody = [...chatRequestBody, userMessage]
    setRequestBody(updatedRequestBody);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/api/datePlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRequestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status code : ${response.status}`)
      }

      const serverMessage: ChatResponseBody = await response.json();

      setRequestBody((prev) => [
        ...prev,
        {
          role: "system",
          message: "",
          facilitys: serverMessage.facilitys,
          description: serverMessage.description,
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-red-50">
      {/* チャットエリア */}
      <div className="flex-grow overflow-y-auto bg-white p-4 rounded shadow">
        {chatRequestBody?.map((msg, index) => (
          <div key={index} className="mb-4">
            {msg.role === "system" ? (
              // roleがsystemの場合（左寄せ）
              <div className="flex flex-row">
                <div className="inline-block px-4 py-2 rounded-lg bg-red-100 text-black">
                  <span>
                    {msg.facilitys?.map((facility, index) => (
                      <div key={index} className="item bg-red-300 my-3 mx-0 p-3 rounded-lg">
                        {facility.name}
                      </div>
                    ))}
                  </span>
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
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendRequestBody()}
          className="flex-grow p-2 border rounded-l shadow-sm text-black"
          placeholder="メッセージを入力"
        />
        <button
          onClick={sendRequestBody}
          className="px-4 py-2 bg-red-400 text-white rounded-r shadow hover:bg-blue-600"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>

          {/* 送信 */}
        </button>
      </div>
    </div>
  );
}
