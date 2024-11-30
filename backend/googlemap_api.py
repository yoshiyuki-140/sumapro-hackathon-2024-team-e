import os

import googlemaps
from dotenv import load_dotenv
from request import Facilitys

load_dotenv()

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)


def get_place_data(place_names):
    """
    place_namesの場所の名前から緯度経度を取得する
    """
    location_data = []
    clean_place_names = []

    for name in place_names:
        data = gmaps.geocode(name)
        if data:
            # 場所から緯度経度を取得できるならばそれぞれlatitude,longitudeに格納する
            latitude = data[0]["geometry"]["location"]["lat"]
            longitude = data[0]["geometry"]["location"]["lng"]

            location_data.append({"latitude": latitude, "longitude": longitude})

            clean_place_names.append(name)

    return location_data, clean_place_names


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


def get_true_place(request):
    true_place = {}
    latitude = request.latitude
    longitude = request.longitude

    if latitude > 90 or latitude < -90 or longitude > 180 or latitude < -180:
        true_place = {
            "name": "正しい位置情報ではありません",
            "latitude": 999.9999,
            "longitude": 999.9999,
        }

    else:
        true_place = {
            "name": request.name,
            "latitude": request.latitude,
            "longitude": request.longitude,
        }

    return true_place


def get_cafe_restArea(true_place):
    """
    デートの中で訪れる場所周辺のカフェ情報を取得する
    """

    latitude = true_place["latitude"]
    longitude = true_place["longitude"]

    if -90 <= latitude <= 90 and -180 <= longitude <= 180:

        # デートの中で訪れる場所周辺のカフェを検索
        place_cafe = gmaps.places_nearby(
            location=(latitude, longitude), radius=10000, type="cafe"
        )

        # 最も近いカフェの緯度経度を取得
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
                        name="周辺のカフェは見つかりませんでした",
                        latitude=None,
                        longitude=None,
                    )

    else:
        cafe_location_data = Facilitys(
            name="周辺のカフェは見つかりませんでした", latitude=None, longitude=None
        )

    return cafe_location_data


def get_toilet_restArea(true_place):
    """
    デートの中で訪れる場所周辺のトイレ情報を取得する
    """
    latitude = true_place["latitude"]
    longitude = true_place["longitude"]

    if -90 <= latitude <= 90 and -180 <= longitude <= 180:

        place_toilet = gmaps.places_nearby(
            location=(latitude, longitude), radius=10000, type="toilet"
        )

        if place_toilet.get("results"):
            for toilet in place_toilet["results"]:
                toilet_name = toilet["name"]
                place_toilet_location = gmaps.geocode(toilet_name)

                if place_toilet_location:
                    toilet_location_data = Facilitys(
                        name=toilet_name,
                        latitude=place_toilet_location[0]["geometry"]["location"][
                            "lat"
                        ],
                        longitude=place_toilet_location[0]["geometry"]["location"][
                            "lng"
                        ],
                    )

                else:
                    toilet_location_data = Facilitys(
                        name="周辺のトイレは見つかりませんでした",
                        latitude=None,
                        longitude=None,
                    )

    else:
        toilet_location_data = Facilitys(
            name="周辺のトイレは見つかりませんでした", latitude=None, longitude=None
        )

    return toilet_location_data


def get_convenienceStore_restArea(true_place):
    """
    デートの中で訪れる場所周辺のコンビニ情報を取得する
    """

    latitude = true_place["latitude"]
    longitude = true_place["longitude"]

    if -90 <= latitude <= 90 and -180 <= longitude <= 180:

        place_convenienceStore = gmaps.places_nearby(
            location=(latitude, longitude), radius=10000, type="convenience_store"
        )

        if place_convenienceStore.get("results"):
            for convenienceStore in place_convenienceStore["results"]:
                convenienceStore_name = convenienceStore["name"]
                place_convenienceStore_location = gmaps.geocode(convenienceStore_name)

                if place_convenienceStore_location:
                    convenienceStore_location_data = Facilitys(
                        name=convenienceStore_name,
                        latitude=place_convenienceStore_location[0]["geometry"][
                            "location"
                        ]["lat"],
                        longitude=place_convenienceStore_location[0]["geometry"][
                            "location"
                        ]["lng"],
                    )

                else:
                    convenienceStore_location_data = Facilitys(
                        name="周辺のコンビニは見つかりませんでした",
                        latitude=None,
                        longitude=None,
                    )

    else:
        convenienceStore_location_data = Facilitys(
            name="周辺のコンビニは見つかりませんでした", latitude=None, longitude=None
        )

    return convenienceStore_location_data
