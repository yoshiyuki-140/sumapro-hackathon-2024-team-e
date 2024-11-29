'use client'
import CustomizedGoogleMap from "@/components/CustomizedGoogleMap";
import { Facility, SuggestMessage, RestArea } from "@/types/api";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";




// デートプラン詳細ページの関数コンポーネント
const Detail: React.FC = () => {
  // リダイレクトを実現するためにuseRouterを使う
  const router = useRouter();

  // 各拠点の近くの休憩場所(トイレ・コンビニ・カフェ)を保存する変数
  const [restAreas, setRestAreas] = useState<RestArea[]>([]);

  // セッションストレージから読み出したデートの行き先情報を格納する変数
  const [suggestDatePlan, setSuggestDatePlan] = useState<SuggestMessage | null>(null);

  useEffect(() => {
    try {
      // セッションストレージからデータ読み出し
      const storedData = sessionStorage.getItem("datePlan");
      if (storedData) {
        const parsedData = JSON.parse(storedData) as SuggestMessage;
        setSuggestDatePlan(parsedData);
      } else {
        console.warn("セッションストレージにデータがありません。");
      }
    } catch (error) {
      console.error("セッションストレージのデータ解析中にエラーが発生しました。", error);
    }
  }, []);

  // 初期値（データが読み込まれる前に表示する内容）
  const defaultFacilities: Facility[] = [];
  const facilities = suggestDatePlan?.facilitys || defaultFacilities;


  // Mapへの初期表示地点の中心点を決める
  // セッションストレージから読み出したデータの先頭のものを使えばいい
  const mapCenter: Facility = {
    name: facilities[0]?.name,
    latitude: facilities[0]?.latitude,
    longitude: facilities[0]?.longitude,
  };


  // 拠点情報から各々の近くの休憩所を検索する。APIの呼び出し
  const getRestArea = async () => {
    // APIエントリポイントにリクエスト
    for (const facility of facilities) {
      try {
        const response = await fetch("http://localhost:8000/api/datePlan/restArea", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(facility),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status code : ${response.status}`);
        }

        const restArea: RestArea = await response.json();

        // レスポンスボディーを保存
        setRestAreas([...restAreas, restArea]);
      } catch (error) {
        console.error("Failed to fetch response:", error);
      }
    };

  // Todo : 
  //　画面リロード時に休憩場所を呼び出さないといけない
  // 問題点facilitysには順序がない
  // 新しいデータ構造作らないといけないかも
  useEffect(() => {
    getRestArea();
  }, [getRestArea]);


  return (
    <div className="flex h-screen">
      {/* 左側: デートプランの詳細情報 */}
      <div className="w-1/2 h-screen flex flex-col">
        <div className="h-5/6 bg-red-100 p-6 overflow-y-scroll">

          {/* 地点情報カード */}
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-red-300 rounded-md p-4 mb-4"
            >
              <h2 className="text-xl font-semibold text-black">{item.name}</h2>
            </div>
          ))}
        </div>

        {/* 戻るボタンとか配置する場所 */}
        <div className="h-1/6 md p-4 flex items-center justify-around bg-red-100">
          {/* ボタンを押すとチャット画面にリダイレクトする */}
          <button
            onClick={() => { router.push("/chat") }}
            className="bg-red-400 p-3 rounded-md border-black border-2 w-20 h-14 text-black text-2xl"
          >
            {/* リターン記号のUnicode */}
            &#x21A9;
          </button>
          {/* デートプランをPDFでダウンロードするボタン */}
          <button
            className="bg-red-400 p-3 rounded-md border-black border-2 w-20 h-14 text-black text-2xl flex justify-center items-center"
          >
            {/* ダウンロードアイコン */}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.92 12.08L12 20l-7.92-7.92l1.42-1.41l5.5 5.5V2h2v14.17l5.5-5.51zM12 20H2v2h20v-2z" /></svg>
          </button>
        </div>
      </div>

      {/* 右側: Google Map */}
      <div className="w-1/2">
        <CustomizedGoogleMap center={mapCenter} facilities={facilities} />
      </div>
    </div>
  )
}

export default Detail;