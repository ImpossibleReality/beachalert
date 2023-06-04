import * as mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import "./MapView.css";
import { Geolocation } from '@capacitor/geolocation';
import { useIonAlert } from "@ionic/react";
import { CapacitorHttp } from '@capacitor/core';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BASE_API_URL } from "../main";

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
        zoom: 1,
      });
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
          let p = { lat: e.coords.latitude, lon: e.coords.longitude };
          setLocation(p);
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
          console.log(res)
          console.log('test')
          // m.addSource('earthquakes', {
          //   type: 'geojson',
          //   data: res,
          // })

          // console.log(m.getSource('earthquakes'))


// Add a geojson point source.
// Heatmap layers also work with a vector tile source.
          m.addSource('trees', {
            'type': 'geojson',
            'data': res
          });

          m.addLayer(
            {
              'id': 'trees-heat',
              'type': 'heatmap',
              'source': 'trees',
              'paint': {
// increase weight as diameter breast height increases
                'heatmap-weight': {
                  'property': 'mag',
                  'type': 'exponential',
                  'stops': [ // TODO: Figure out what this means
                    [0.5, 0],
                    [1.5, 500]
                  ]
                },
// increase intensity as zoom level increases
                'heatmap-intensity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0,
                  1,
                  9,
                  3
                ],
// use sequential color palette to use exponentially as the weight increases
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(33,102,172,0.1)',
                  0.2,
                  'rgb(103,169,207)',
                  0.4,
                  'rgb(209,229,240)',
                  0.6,
                  'rgb(253,219,199)',
                  0.8,
                  'rgb(239,138,98)',
                  1,
                  'rgb(178,24,43)'
                ],
// increase radius as zoom increases
                'heatmap-radius': {
                  'stops': [
                    [11, 15],
                    [15, 20]
                  ]
                },
// decrease opacity to transition into the circle layer
                'heatmap-opacity': {
                  'default': 1,
                  'stops': [
                    [14, 1],
                    [15, 0]
                  ]
                }
              }
            },
            'waterway-label'
          );

          m.addLayer(
            {
              'id': 'trees-point',
              'type': 'circle',
              'source': 'trees',
              'paint': {
// increase the radius of the circle as the zoom level and dbh value increases
                'circle-radius': {
                  'property': 'mag',
                  'type': 'exponential',
                  'stops': [
                    [{ zoom: 15, value: 1 }, 5],
                    [{ zoom: 15, value: 62 }, 10],
                    [{ zoom: 22, value: 1 }, 20],
                    [{ zoom: 22, value: 62 }, 50]
                  ]
                },
                'circle-color': {
                  'property': 'mag',
                  'type': 'exponential',
                  'stops': [
                    [0, 'rgba(28,255,153, 0.6)'],
                    [0, 'rgb(255,110,110)'],
                  ]
                },
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
              }
            },
            'waterway-label'
          );
        });
        console.log('test')
      })
    }}, []);

  return (
    <div id="mapbox"></div>
  )
}

export default MapView;