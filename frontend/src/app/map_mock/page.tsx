'use client';

import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

type coordinate = {
    lat: number;
    lng: number;
};


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
    console.log(apiKey)


    return (
        <div>
            <div>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                    ></GoogleMap>
                </LoadScript>
            </div>
        </div>
    )


}