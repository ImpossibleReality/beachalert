import * as mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import "./MapView.css";
import { Geolocation } from '@capacitor/geolocation';
import { useIonAlert } from "@ionic/react";
import { CapacitorHttp } from '@capacitor/core';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { BASE_API_URL } from "../main";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export interface locationObj {
  lat: number,
  lon: number,
}

export interface beachObj {
  name: string,
  location: locationObj,
  samplingDate: string,
  score: number,
  highestToxin: string,
  isSafe: boolean,
}

async function getHeatmap(): Promise<any> {
  const res =  await CapacitorHttp.get({
    url: BASE_API_URL + "heatmap",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res.data
}

const MapView: React.FC<{
  location: locationObj,
  setLocation: (location: locationObj) => void,
}> = ({location, setLocation}) => {
  const [heatmap, setHeatmap] = useState<any>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [presentAlert] = useIonAlert();
  //const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  let marker: mapboxgl.Marker | null = null;
  let currLoc = location;


  let madeMap = false;

  // Permissions
  Geolocation.getCurrentPosition((pos: GeolocationPosition) => {}, (err) => {console.error(err)}, {})

  useEffect(() => {

    if (!madeMap && map === null) {
      madeMap = true;
      let m = new mapboxgl.Map({
        container: "mapbox",
        style: `mapbox://styles/mapbox/light-v10`,
        center: [-122, 47],
        zoom: 2,
      });

      let geocode = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      })
      m.addControl(geocode);
      geocode.on("result", (v: any) => {
        let p = v.result.geometry.coordinates;
        setLocation({ lon: p[0], lat: p[1] })
        let lngLat = {lng: p[0], lat: p[1]};
        if (marker) {
          marker.setLngLat(lngLat);
        } else {
          marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(m);
        }
      })

      let geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
      })
      m.addControl(geolocate);

      geolocate.on("geolocate", (v) => {
        let e = v as GeolocationPosition;
        if (!marker) {
          if (Math.abs(currLoc.lat - e.coords.latitude) > 1 || Math.abs(currLoc.lon - e.coords.longitude) > 1) {
            let p = { lat: e.coords.latitude, lon: e.coords.longitude };
            setLocation(p);
            currLoc = p;
          }
        }
      })

      m.on("click", (e) => {
        setLocation({ lon: e.lngLat.lng, lat: e.lngLat.lat })
        if (marker) {
          marker.setLngLat(e.lngLat);
        } else {
          marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(m);
        }
      })

      m.on('load', (e) => {
        m.resize();
        geolocate.trigger();
      })
      m.on('idle', function() {
        m.resize()
      })
      setMap(m);

      m.on('load', (e) => {
        getHeatmap().then((res) => {


          // Add a geojson point source.
          // Heatmap layers also work with a vector tile source.
          m.addSource('beaches', {
            'type': 'geojson',
            'data': res
          });

          m.addLayer(
            {
              'id': 'beach-circles',
              'type': 'circle',
              'source': 'beaches',
              'paint': {
// increase the radius of the circle as the zoom level and dbh value increases
                'circle-radius': {
                  'property': 'mag',
                  'type': 'exponential',
                  'stops': [
                    [{ zoom: 15, value: 1 }, 10],
                    [{ zoom: 15, value: 2 }, 10],
                    [{ zoom: 21, value: 1 }, 100],
                    [{ zoom: 21, value: 2 }, 100],
                    [{ zoom: 23, value: 1 }, 1000],
                    [{ zoom: 23, value: 2 }, 1000]
                  ]
                },
                'circle-color': {
                  'property': 'mag',
                  'type': 'exponential',
                  'stops': [
                    [1, 'rgba(24,203,122,0.6)'],
                    [2, 'rgb(255,110,110)'],
                  ]
                },
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
              }
            },
            'waterway-label'
          );
        });
      })
    }}, []);

  return (
    <div id="mapbox"></div>
  )
}

export default MapView;