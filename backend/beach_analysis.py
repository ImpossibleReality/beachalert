# import json file BeachAlertData.json with pathlib
import geopy
import pathlib
from geopy.distance import geodesic
from geojson import Point, Feature, FeatureCollection
import json

file = pathlib.Path('BeachAlertData.json')
with file.open() as f:
    data = json.load(f)


file = pathlib.Path('kk.json')

with file.open() as f:
    kkData = json.load(f)

def getSafetyReport(lat, lon):
    safetyScore = 0.0

    beachesNearby = []

    for beach in data:
        distance = geodesic((lat, lon), data[beach]['location']).miles
        beachesNearby.append({
            'name': beach,
            'primaryToxin': 'algae',
            'distance': distance,
            'safetyLevel': 'safe' if data[beach]['current_toxin_level'] != '<MDL' else 'safe'
        })
        if data[beach]['current_toxin_level'] == '<MDL':
            continue
        safetyScore += (data[beach]['current_toxin_level'] - data[beach]['max_acceptable_toxin_level']) / distance

    return {
        'safetyScore': safetyScore,
        'safetyLevel': 'unsafe' if safetyScore > 0.5 else 'safe',
        'beachesNearby': beachesNearby
    }

def getLakeWAPoly():
    return kkData

def getBeachGeoJson():
    features = []
    for beach in data:
        features.append(Feature(geometry=Point((data[beach]['location'][1], data[beach]['location'][0])),
                                properties = {
                                    'id': beach,
                                    'mag': 1 if data[beach]['current_toxin_level'] == "<MDL" else int(data[beach]['current_toxin_level']) + 1
                                }))

    return FeatureCollection(features)

def getAllBeaches():
    return data
