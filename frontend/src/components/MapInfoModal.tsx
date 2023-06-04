import React, { useEffect, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal, IonRow, IonSpinner, IonTitle,
  IonToolbar
} from "@ionic/react";
import { CapacitorHttp } from "@capacitor/core";
import { BASE_API_URL } from "../main";

import './MapInfoModal.css'

interface NearbyBeach {
  name: string,
  safetyLevel: "safe" | "unsafe",
  primaryToxin: string,

  // Distance in miles
  distance: number,
}

interface ScoreData {
  beachesNearby: NearbyBeach[],
  safetyLevel: "safe" | "unsafe",
  safetyScore: number;
}

async function getScores(long: number, lat: number): Promise<ScoreData> {
  const res =  await CapacitorHttp.get({
    url: BASE_API_URL + "location?lon=" + long + "&lat=" + lat,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

const MapInfoModal: React.FC<{lat: number, long: number}> = ({lat, long}) => {
  let [data, setData] = useState<ScoreData | null>(null);
  let color = data?.safetyLevel == "safe" ? "success" : "danger";
  
  useEffect(() => {
    setData(null);
    getScores(long, lat).then(setData);
  }, [lat, long])

  return (
    <>
      <IonModal isOpen={true}
                initialBreakpoint={0.3} breakpoints={[0.3, 1]} backdropBreakpoint={0.5} backdropDismiss={false} style={{"--height": "80%"}}>
        <IonContent>7
          {data ?
            <IonList>
              <IonItem>
                <IonLabel>Safety Level</IonLabel>
                <IonBadge slot="end" color={color}>{data!.safetyLevel}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Safety Score</IonLabel>
                <IonBadge slot="end" color={color}>{data!.safetyScore}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Latitude</IonLabel>
                <IonBadge slot="end">{lat}</IonBadge>
              </IonItem>
              <IonItem>
                <IonLabel>Longitude</IonLabel>
                <IonBadge slot="end">{long}</IonBadge>
              </IonItem>

            {/*  Nearby beach list*/}
              <IonList lines="none">
              {data.beachesNearby.map((v) => {return (
                <IonItem>
                  <IonCard style={{"width": "100%"}}>
                    <IonCardHeader>
                      <IonCardTitle>{v.name}</IonCardTitle>
                      <IonCardSubtitle>{v.safetyLevel == "safe" ? "Safe to swim" : "Unsafe to swim"}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonItem>
                          <IonIcon name="compass-outline" slot="start"></IonIcon>
                          <IonLabel>Distance</IonLabel>
                          <IonLabel slot={"end"}>{v.distance}</IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonIcon name="medkit-outline" slot="start"></IonIcon>
                          <IonLabel>Primary Toxin</IonLabel>
                          <IonLabel slot={"end"}>{v.primaryToxin}</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </IonItem>
              )})}
              </IonList>
            </IonList>
            : <div className="spinner-container"><IonSpinner/></div>}
        </IonContent>
      </IonModal>
    </>
  );
}

export default MapInfoModal;