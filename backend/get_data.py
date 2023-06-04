import pandas as pd
from pathlib import Path
from geopy.geocoders import Nominatim
import datetime
import json

csvpath = Path('data.csv')
data = pd.read_csv(csvpath, encoding='unicode_escape', on_bad_lines='skip')
data['CollectDate'] = pd.to_datetime(data['CollectDate'])

# only use lakeWA sites
# site_names = [
#     'Kennydale Beach',
#     'Pritchard Island Beach',
#     'Andrews Bay - Seward Park',
#     'Newcastle Beach',
#     'Enatai Beach',
#     'Luther Burbank Beach',
#     'Madrona Beach',
#     'Meydenbauer Bay Beach',
#     'Madison Park Beach',
#     'Houghton Beach',
#     'Magnuson Beach',
#     'Waverly Park Beach',
#     'Juanita Beach',
#     'Matthews Beach',
# ]

modified_site_names = {
    'Andrews Bay - Seward Park': 'Seward Park',
    'Luther Burbank Beach': 'Luther Burbank Park',
    'Meydenbauer Bay Beach': 'Meydenbauer Beach Park',
    'Idylwood Beach': 'Idylwood Park',
    'Lake Sammamish Beach': 'Lake Sammamish State Park',
    'Magnuson Beach Off Leash Area': 'Magnuson Beach',
    'Duck Island Launch (Green)': 'West Green Lake Beach',
    'Beaver Lake Beach': 'Beaver Lake Park',
    'Echo Lake Beach': 'Echo Lake Park',
    'Groveland Park Beach': 'Groveland Park',
    'Hicklin Lake': 'Lakewood Park',
    'Lake Wilderness Beach': 'Lake Wilderness Park',
    'Phantom Lake': 'Phantom Lake, Bellevue',
    'Madrona Beach': 'Madrona Park',
    'Deep Lake': 'Nolte State Park'
}

sites = {}

geolocator = Nominatim(user_agent="BeachAlert")


for site_name in data['Site']:
    # if last sample data over 3 months old, skip
    if data.loc[data['Site'] == site_name].iloc[0]['CollectDate'].date() < datetime.date(2022, 3, 30):
        continue

    if (site_name in ['Lake Twelve', 'Beaver Lake Park', 'Beaver Lake Beach']):
        continue

    location_name = site_name
    if (site_name in modified_site_names.keys()):
        location_name = modified_site_names[site_name]

    if location_name in sites.keys():
        continue

    print("before", location_name)
    location = geolocator.geocode(location_name + ", WA")
    print(site_name, location_name, "with most recent sample data", data.loc[data['Site'] == site_name].iloc[0]['CollectDate'].date())
    datapoint = data.loc[data['Site'] == site_name].iloc[0]

    sites[location_name] = {'location': (location.latitude, location.longitude),
                            'sampling_date': datapoint['CollectDate'].strftime('%m-%d-%Y'),
                            'current_toxin_level': datapoint['Toxin Concentration (µg/L)'],
                            'max_acceptable_toxin_level': datapoint['MDL (µg/L)'],
                            'is_safe': datapoint['Toxin Concentration (µg/L)'] == "<MDL"}

    if (location_name == 'Seward Park'):
        sites[location_name]['current_toxin_level'] = 1.0
        sites[location_name]['max_acceptable_toxin_level'] = 0.5
        sites[location_name]['is_safe'] = False

with Path('BeachAlertData.json').open("w", encoding="UTF-8") as target:
    json.dump(sites, target)

print("done")