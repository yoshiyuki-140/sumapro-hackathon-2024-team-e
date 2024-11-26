'use client';

import React from "react";
import { Facility } from "@/types/api";
import CustomizedGoogleMap from "@/components/CustomizedGoogleMap";


// 訪れる地点のリスト
const locations: Facility[] = [
    { latitude: 34.6937, longitude: 135.5023, name: "大阪駅" },
    { latitude: 34.7025, longitude: 135.4959, name: "梅田スカイビル" },
    // 他の地点を追加
];



export default function Map() {

    // マップ中心部の画像
    const center: Facility = {
        name: "",
        latitude: 34.7293466708865,
        longitude: 135.49939605607292
    };


    // api key
    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
    if (apiKey === "") {
        console.error("Google Map呼び出しのAPIキーがきちんと読み込まれていません");
    }


    return (
        <div>
            <CustomizedGoogleMap
                center={center}
                facilities={locations}
            ></CustomizedGoogleMap>
        </div>
    )


}