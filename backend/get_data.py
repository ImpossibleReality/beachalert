import pandas as pd
from pathlib import Path
from geopy.geocoders import Nominatim
import json

csvpath = Path('data.csv')
data = pd.read_csv(csvpath, encoding='unicode_escape', on_bad_lines='skip')
data['CollectDate'] = pd.to_datetime(data['CollectDate'])

# only use lakeWA sites
site_names = [
    'Kennydale Beach',
    'Pritchard Island Beach',
    'Andrews Bay - Seward Park',
    'Newcastle Beach',
    'Enatai Beach',
    'Luther Burbank Beach',
    'Madrona Beach',
    'Meydenbauer Bay Beach',
    'Madison Park Beach',
    'Houghton Beach',
    'Magnuson Beach',
    'Waverly Park Beach',
    'Juanita Beach',
    'Matthews Beach'
]

modified_site_names = {
    'Andrews Bay - Seward Park': 'Seward Park',
    'Luther Burbank Beach': 'Luther Burbank Park',
    'Meydenbauer Bay Beach': 'Meydenbauer Beach Park',
}

sites = {}

for site_name in site_names:
    geolocator = Nominatim(user_agent="BeachAlert")
    location_name = site_name
    if (site_name in modified_site_names.keys()):
        location_name = modified_site_names[site_name]
    location = geolocator.geocode(location_name + ", WA")
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