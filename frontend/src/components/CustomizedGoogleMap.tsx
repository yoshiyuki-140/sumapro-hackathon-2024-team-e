'use client';

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapProps } from "@/types/customized.google.map";

interface CustomizedGoogleMapProps extends MapProps {
    height: string; // 高さを親から受け取る
}


// React.FCのFCはFunctionCompornentの意味
const CustomizedGoogleMap: React.FC<CustomizedGoogleMapProps> = ({ center, facilities, height }) => {

    // Map形式
    const containerStyle = {
        width: "100%",
        height: height,
    };

    // ズームレベル
    const zoom = 15;


    // APIキー読み出し
    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";
    if (!apiKey) {
        console.error("Google Map APIキーが設定されていません。");
    }

    // ログを表示
    for (let i = 0; i < facilities.length; i++) {
        const element = facilities[i];
        console.log(i, element);
    }


    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: center.latitude, lng: center.longitude }} // 初期画面中心位置
                zoom={zoom}
            >
                {/* 訪れる場所のマーカーを描画 */}
                {facilities.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.latitude, lng: location.longitude }}
                        label={location.name} // 任意でラベル表示
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default CustomizedGoogleMap;