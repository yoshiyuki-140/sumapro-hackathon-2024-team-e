import os

import googlemaps
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=API_KEY)


# place_namesの場所の名前から緯度経度を取得する
def Place_Data(place_names):
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


# 取得した場所のみのデータを整形してリストに格納
def Change_Data(Name_content):

    # 取得した場所のみのデータを不要な空白を取り除く、改行区切りでリストに格納
    facility_list = []

    for line in Name_content.split("\n"):
        parts = line.split(". ", 1)
        if len(parts) > 1:
            facility_list.append(parts[1].strip())

    return facility_list


# 取得した場所の名前とその場所の緯度経度を合体
def Place_All(place_names, place_data):
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
