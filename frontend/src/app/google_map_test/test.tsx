'use client';

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Facility } from "@/types/api";
import { MapProps, Coordinate } from "@/types/customized.google.map";




// React.FCのFCはFunctionCompornentの意味
const Map: React.FC<MapProps> = ({ center, facilities }) => {
    const containerStyle = {
        width: "100%",
        height: "86vh",
    };

    const zoom = 13;

    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
    if (!apiKey) {
        console.error("Google Map APIキーが設定されていません。");
    }

    // 選択された地点の情報を保持するstate
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: center.latitude, lng: center.logitude }}
                zoom={zoom}
            >
                {/* 訪れる場所のマーカーを描画 */}
                {facilities.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.latitude, lng: location.logitude }}
                        onClick={() => setSelectedFacility(location)} // マーカークリックで選択状態にする
                        label={location.name} // 任意でラベル表示
                    />
                ))}

                {/* マーカークリック時に情報ウィンドウを表示 */}
                {selectedFacility && (
                    <InfoWindow
                        position={{ lat: selectedFacility.latitude, lng: selectedFacility.logitude }}
                        onCloseClick={() => setSelectedFacility(null)} // ウィンドウを閉じる
                    >
                        <div>
                            <h2>{selectedFacility.name}</h2>
                            {/* 追加情報をここに表示可能 */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
