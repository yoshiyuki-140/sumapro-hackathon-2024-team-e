'use client';


import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapProps } from "@/types/customized.google.map";
import { RestArea } from "@/types/api";
import { local_cafe, local_convenience_store, wc } from 'mdi-paths'


interface CustomizedGoogleMapProps extends MapProps {
  height: string; // GoogleMapの画面上での縦幅
  restAreas?: RestArea[]; // すべての休憩場所のデータ
  changedCardIndex?: number; // 変更されたカードのindex情報
}


// React.FCのFCはFunctionCompornentの意味
const CustomizedGoogleMap: React.FC<CustomizedGoogleMapProps> = ({ center, facilities, height, restAreas, changedCardIndex }) => {

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


  // 緯度経度情報がnullの時の警告表示
  for (const facility of facilities) {
    if ((facility.latitude === null || facility.longitude === null) || (facility.latitude === undefined || facility.longitude === undefined)) {
      console.warn("Warning : 緯度か経度の情報が定義されていません");
    }
  }



  // restAreaをきちんと受け取ったかをチェックする
  if (restAreas?.length === 0) {
    console.warn("休憩場所の情報が取得できませんでした。", restAreas);
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

        {/* 休憩場所の情報が取得できているのならば */}
        {/* 休憩場所のマーカーを描写 */}
        {restAreas && changedCardIndex && (
          <div>
            {/* カフェのマーカー */}
            {/* 緯度経度がnull値の際のエラーハンドリング付き */}
            {restAreas[changedCardIndex]?.cafe?.latitude !== null
              && restAreas[changedCardIndex]?.cafe?.longitude !== null
              && (
                <Marker
                  position={{
                    lat: restAreas[changedCardIndex]?.cafe?.latitude,
                    lng: restAreas[changedCardIndex]?.cafe?.longitude
                  }}
                  // カフェアイコン
                  icon={{
                    fillColor: '#000000',
                    fillOpacity: 1,
                    path: local_cafe,
                    strokeColor: '#000000',
                    strokeWeight: 1,
                  }}
                />
              )}
            {/* コンビニのマーカー */}
            {/* 緯度経度がnull値の際のエラーハンドリング付き */}
            {restAreas[changedCardIndex]?.convenienceStore?.latitude !== null
              && restAreas[changedCardIndex]?.convenienceStore?.longitude !== null
              && (
                <Marker
                  position={{
                    lat: restAreas[changedCardIndex]?.convenienceStore?.latitude,
                    lng: restAreas[changedCardIndex]?.convenienceStore?.longitude
                  }}
                  // コンビニアイコン
                  icon={{
                    fillColor: '#000000',
                    fillOpacity: 1,
                    path: local_convenience_store,
                    strokeColor: '#000000',
                    strokeWeight: 1,
                  }}
                />
              )}
            {/* トイレのマーカー */}
            {/* 緯度経度がnull値の際のエラーハンドリング付き */}
            {restAreas[changedCardIndex]?.toilet?.latitude !== null
              && restAreas[changedCardIndex]?.toilet?.longitude !== null
              && (
                <Marker
                  position={{
                    lat: restAreas[changedCardIndex]?.toilet?.latitude,
                    lng: restAreas[changedCardIndex]?.toilet?.longitude
                  }}
                  // トイレアイコン
                  icon={{
                    fillColor: '#000000',
                    fillOpacity: 1,
                    path: wc,
                    strokeColor: '#000000',
                    strokeWeight: 1,
                  }}
                />
              )}
          </div>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default CustomizedGoogleMap;