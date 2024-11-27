'use client'
import CustomizedGoogleMap from "@/components/CustomizedGoogleMap";
import { Facility, SuggestMessage } from "@/types/api";
import React, { useEffect, useState } from "react";

// デートプラン詳細ページの関数コンポーネント
const Detail: React.FC = () => {
  // セッションストレージからデータ読み出し
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



  return (
    <div className="flex h-screen">
      {/* 左側: デートプランの詳細情報 */}
      <div className="w-1/2 bg-gray-100 p-6 overflow-y-scroll">

        {/* 地点情報カード */}
        {facilities.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 mb-4"
          >
            <h2 className="text-xl font-semibold text-black">{item.name}</h2>
          </div>
        ))}
      </div>

      {/* 右側: Google Map */}
      <div className="w-1/2">
        <CustomizedGoogleMap center={mapCenter} facilities={facilities} />
      </div>
    </div>
  )
}

export default Detail;