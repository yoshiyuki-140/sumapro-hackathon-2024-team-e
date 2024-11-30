'use client';

import { Facility } from "@/types/api";
import { RestArea } from "@/types/api";
import { useState } from "react";


// 詳細画面の休憩場所表示部分
const FacilityCard = ({ facility, index }: { facility: Facility, index: number }) => {

  // 各拠点の近くの休憩場所を格納する変数
  const [restArea, setRestArea] = useState<RestArea>();

  // 拠点情報から近くの休憩所を探索する。APIの呼び出し
  const getRestArea = async () => {
    // APIエントリポイントにリクエスト
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
      setRestArea(restArea);

      return restArea;
    } catch (error) {
      console.error("Failed to fetch response:", error);
    }
  };
  return (
    <div
      key={index}
      className="bg-red-300 rounded-md p-4 mb-4"
    >
      <h2
        onClick={getRestArea}
        className="text-xl font-semibold text-black"
      >{facility.name}</h2>
      {restArea ? (
        <div>
          <div>{restArea?.cafe.name}</div>
          <div>{restArea?.convenienceStore.name}</div>
          <div>{restArea?.toilet.name}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default FacilityCard;