'use client';

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Facility } from "@/types/api";

type coordinate = {
    lat: number;
    lng: number;
};

// 訪れる地点のデータ型を定義（名前付き）
type Location = {
    lat: number;
    lng: number;
    name: string;
};

// 訪れる地点のリスト
const locations: Facility[] = [
    { latitude: 34.6937, logitude: 135.5023, name: "大阪駅" },
    { latitude: 34.7025, logitude: 135.4959, name: "梅田スカイビル" },
    // 他の地点を追加
];


// Mapコンポーネントが受け取る型
type MapProps = {
    center: Facility;
    facilities: Facility[]; // 訪れる施設一覧
}

export default function Map() {

    // マップのコンテナスタイル
    const containerStyle = {
        width: "100%",
        height: "86vh",
    };

    // マップ中心部の画像
    const center: coordinate = {
        lat: 34.7293466708865,
        lng: 135.49939605607292
    };

    const zoom = 13;

    // api key
    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
    if (apiKey === "") {
        console.error("Google Map呼び出しのAPIキーがきちんと読み込まれていません");
    }


    return (
        <div>
            <div>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                    >
                        {locations.map((location, index) => (
                            <Marker
                                key={index}
                                position={{ lat: location.latitude, lng: location.latitude }}
                                label={location.name} // マーカーにラベルを表示（任意）
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    )


}