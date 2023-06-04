import flask
from beach_analysis import getSafetyReport, getAllBeaches, getBeachGeoJson, getLakeWAPoly

app = flask.Flask(__name__)     

@app.route('/location', methods=['GET'])
def get_safety_report():
    lat = flask.request.args.get('lat')
    lon = flask.request.args.get('lon')

    return getSafetyReport(float(lat), float(lon))  

@app.route('/beaches', methods=['GET'])
def get_beaches():
    return getAllBeaches()

@app.route('/heatmap', methods=['GET'])
def get_heatmap():
    return getBeachGeoJson()

@app.route('/lakes.geojson', methods=['GET'])
def get_lakes():
    return getLakeWAPoly()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)