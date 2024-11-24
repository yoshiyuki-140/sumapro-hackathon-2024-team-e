import { Facility } from "./api";

// コンポーネントの引数（props）の型を定義
export type MapProps = {
    center: Facility;                   // 初期画面の中心地
    facilities: Facility[];              // 訪れる場所のリスト
};

// 座標の型
export type Coordinate = {
    latitude: number;
    longitude: number;
}