import React, { useEffect, useRef, useState } from "react";
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
import BeachIcon from "./BeachIcon";
import { CapacitorHttp } from "@capacitor/core";
import { BASE_API_URL } from "../main";

import './MapInfoModal.css'
import SunIcon from "./SunIcon";
import WarningIcon from "./WarningIcon";

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
  primaryToxin: string,
}

async function getScores(long: number, lat: number): Promise<ScoreData> {
  const res = await CapacitorHttp.get({
    url: BASE_API_URL + "location?lon=" + long + "&lat=" + lat,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data
}

const MapInfoModal: React.FC<{lat: number | null, long: number | null}> = ({lat, long}) => {
  let [data, setData] = useState<ScoreData | null>(null);
  let color = data?.safetyLevel == "safe" ? "success" : "danger";

  let [canScroll, setCanScroll] = useState<boolean>(false);
  let [atTop, setAtTop] = useState<boolean>(true);

  let modal = useRef(null);
  
  useEffect(() => {
    setData(null);
    if (lat === null || long === null) {
      return;
    }
    getScores(long, lat).then(setData);
    // @ts-ignore
    modal.current.setCurrentBreakpoint(0.3);
  }, [lat, long])

  function onBreakPoint(e) {
    console.log(e)
    if (e.detail.breakpoint === 1) {
      setCanScroll( true)
    } else {
      setCanScroll(false)
    }
  }

  function onScroll(e) {
    // if scroll is at the top
    if (e.target.scrollTop === 0) {
      setAtTop(true)
      console.log("at top")
    } else {
      setAtTop(false)
    }
  }

  function onTouchMove(e) {
    if (!(e.target.scrollTop === 0) && canScroll) {
      e.stopPropagation();
    }
  }

  return (
    <>
      <IonModal isOpen={lat !== null && long !== null}
                handle={false}
                ref={modal}
                onIonBreakpointDidChange={onBreakPoint}
                initialBreakpoint={0.3} breakpoints={[atTop ? 0.3 : 1,1]} animated={!atTop} backdropBreakpoint={0.3} backdropDismiss={false} style={{"--height": "80%"}} className={"map-modal"}>
        <div className={"scroll-container " + (canScroll ? 'can-scroll' : '')} onScroll={onScroll} onTouchMove={onTouchMove}>
          <h2></h2>
          {data ?
            <IonList>
              {data!.safetyLevel === 'safe' ?
              <div className={"status-card status-safe"}>
                <div>
                  <h2>Safe to Swim</h2>
                  <p>No current toxins. Enjoy your swim!</p>
                </div>
                <div>
                  <SunIcon />
                </div>
              </div>
                : <div className={"status-card status-unsafe"}>
                  <div>
                    <h2>Swimming is Unsafe!</h2>
                    <p>Due to high amounts of {data!.primaryToxin}, swimming in this area is unsafe.</p>
                  </div>
                  <div>
                    <WarningIcon />
                  </div>
                </div>}

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
            : <div className="spinner-container"><BeachIcon /></div>}
        </div>
      </IonModal>
    </>
  );
}

export default MapInfoModal;