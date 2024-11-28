import os

import googlemaps
from dotenv import load_dotenv
from request import Facilitys, PlanRequestBody

load_dotenv()

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)


def get_place_data(place_names):
    """
    place_namesの場所の名前から緯度経度を取得する
    """
    location_data = []

    for name in place_names:
        data = gmaps.geocode(name)
        # 場所から緯度経度を取得できるならばそれぞれlatitude,longitudeに格納する
        if data:
            latitude = data[0]["geometry"]["location"]["lat"]
            longitude = data[0]["geometry"]["location"]["lng"]

            location_data.append({"latitude": latitude, "longitude": longitude})
        # 緯度経度を取得できなければNoneを返す
        else:
            location_data.append({"latitude": None, "longitude": None})

    return location_data


def get_change_data(Name_content):
    """
    取得した場所のみのデータを整形してリストに格納
    """

    # 取得した場所のみのデータを不要な空白を取り除く、改行区切りでリストに格納
    facility_list = []

    for line in Name_content.split("\n"):
        parts = line.split(". ", 1)
        if len(parts) > 1:
            facility_list.append(parts[1].strip())

    return facility_list


def get_place_all(place_names, place_data):
    """
    取得した場所の名前とその場所の緯度経度を合体
    """
    place_all = []
    for i in range(len(place_names)):
        place_all.append(
            {
                # place_namesから場所を取得し"name": name
                "name": place_names[i],
                # place_dataから緯度だけ取得し"latitude": latitude
                "latitude": place_data[i].get("latitude"),
                # place_dataから経度だけを取得し"longitude": longitude
                "longitude": place_data[i].get("longitude"),
            }
        )

    return place_all


def get_cafe_restArea(Request: PlanRequestBody):
    """
    デートの中で訪れる場所周辺のカフェ情報を取得する
    """

    latitude = Request.latitude
    longitude = Request.longitude

    #デートの中で訪れる場所周辺のカフェを検索
    place_cafe = gmaps.places_nearby(
        location=(latitude, longitude), radius=1000, type="cafe"
    )

    #最も近いカフェの緯度経度を取得
    if place_cafe.get("results"):
        for cafe in place_cafe["results"]:
            cafe_name = cafe["name"]
            place_cafe_location = gmaps.geocode(cafe_name)

            #
            if place_cafe_location:
                cafe_location_data = Facilitys(
                    name=cafe_name,
                    latitude=place_cafe_location[0]["geometry"]["location"]["lat"],
                    longitude=place_cafe_location[0]["geometry"]["location"]["lng"],
                )

            else:
                cafe_location_data = Facilitys(
                    name="Not Found", latitude=None, longitude=None
                )

    return cafe_location_data


def get_toilet_restArea(Request: PlanRequestBody):
    """
    デートの中で訪れる場所周辺のトイレ情報を取得する
    """

    latitude = Request.latitude
    longitude = Request.longitude

    place_toilet = gmaps.places_nearby(
        location=(latitude, longitude), radius=1000, type="toilet"
    )

    if place_toilet.get("results"):
        for toilet in place_toilet["results"]:
            toilet_name = toilet["name"]
            place_toilet_location = gmaps.geocode(toilet_name)

            if place_toilet_location:
                toilet_location_data = Facilitys(
                    name=toilet_name,
                    latitude=place_toilet_location[0]["geometry"]["location"]["lat"],
                    longitude=place_toilet_location[0]["geometry"]["location"]["lng"],
                )

            else:
                toilet_location_data = Facilitys(
                    name="Not Found", latitude=None, longitude=None
                )

    return toilet_location_data


def get_convenienceStore_restArea(Request: PlanRequestBody):
    """
    デートの中で訪れる場所周辺のコンビニ情報を取得する
    """

    latitude = Request.latitude
    longitude = Request.longitude

    place_convenienceStore = gmaps.places_nearby(
        location=(latitude, longitude), radius=1000, type="convenience_store"
    )

    if place_convenienceStore.get("results"):
        for convenienceStore in place_convenienceStore["results"]:
            convenienceStore_name = convenienceStore["name"]
            place_convenienceStore_location = gmaps.geocode(convenienceStore_name)

            if place_convenienceStore_location:
                convenienceStore_location_data = Facilitys(
                    name=convenienceStore_name,
                    latitude=place_convenienceStore_location[0]["geometry"]["location"][
                        "lat"
                    ],
                    longitude=place_convenienceStore_location[0]["geometry"][
                        "location"
                    ]["lng"],
                )

            else:
                convenienceStore_location_data = Facilitys(
                    name="Not Found", latitude=None, longitude=None
                )

    return convenienceStore_location_data
