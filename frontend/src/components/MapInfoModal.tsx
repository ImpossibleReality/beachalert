import React, { useEffect, useRef, useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal, IonRow, IonSkeletonText, IonSpinner, IonThumbnail, IonTitle,
  IonToolbar
} from "@ionic/react";
import BeachIcon from "./BeachIcon";
import { CapacitorHttp } from "@capacitor/core";
import { BASE_API_URL } from "../main";

import './MapInfoModal.css'
import SunIcon from "./SunIcon";
import WarningIcon from "./WarningIcon";
import { compassOutline, medkitOutline } from "ionicons/icons";

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
  const data: ScoreData = res.data

  data.beachesNearby = data.beachesNearby.sort((a, b) => a.distance - b.distance)
  return data
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
    modal.current.setCurrentBreakpoint(0.35);
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

  function onClick(e) {
    modal.current.setCurrentBreakpoint(1)
  }

  return (
    <>
      <IonModal isOpen={lat !== null && long !== null}
                handle={false}
                ref={modal}
                onClick={onClick}
                onIonBreakpointDidChange={onBreakPoint}
                initialBreakpoint={0.35} breakpoints={[atTop ? 0.35 : 1,1]} animated={!atTop} backdropBreakpoint={0.35} backdropDismiss={false} style={{"--height": "80%"}} className={"map-modal"}>
        <div className={"scroll-container " + (canScroll ? 'can-scroll' : '')} onScroll={onScroll} onTouchMove={onTouchMove}>
          {data ?
            <><h1 className={"modal-header"}>{data.beachesNearby[0].name}</h1>
              <IonList>
              {data!.safetyLevel === "safe" ?
                <div className={"status-card status-safe"}>
                  <div>
                    <h2>Safe to Swim</h2>
                    <p>No current toxins. Enjoy your swim!</p>
                  </div>
                  <div>
                    <BeachIcon />
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
                <h2 className={"nearby-header"}>Nearby beaches</h2>
                {data.beachesNearby.slice(1).filter((v) => (v.distance < 10)).map((v) => {
                  return (
                      <div style={{ "border-radius": "1rem", "margin-right": "1rem", "margin-left": "1rem", "margin-bottom": "1rem", "box-shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }} className={"nearby-card"}>
                        <IonCardHeader>
                          <IonCardTitle>{v.name}</IonCardTitle>
                          <IonCardSubtitle style={{color: v.safetyLevel == "safe" ? "#3a3" : "#a33"}}>{v.safetyLevel == "safe" ? "Safe to swim" : "Unsafe to swim"}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonList>
                            <IonItem>
                              <IonIcon icon={compassOutline} style={{"margin-left": "-1rem", "color": "#ccc"}} slot="start"></IonIcon>
                              <IonLabel>Distance</IonLabel>
                              <IonLabel slot={"end"}>{Math.round(v.distance * 100) / 100} miles</IonLabel>
                            </IonItem>
                            {v.safetyLevel == "unsafe" ? <IonItem>
                              <IonIcon icon={medkitOutline} style={{"margin-left": "-1rem", "color": "#ccc"}} slot="start"></IonIcon>
                              <IonLabel>Primary Toxin</IonLabel>
                              <IonLabel slot={"end"}>{v.primaryToxin}</IonLabel>
                            </IonItem> : null
                            }
                          </IonList>
                        </IonCardContent>
                      </div>
                  );
                })}
            </IonList></>
            : <>
              <h1 className={"modal-header"}><IonSkeletonText animated className={"skeletontext skeletonheader"}></IonSkeletonText></h1>
              <div className={"status-card skeletoncard"}>
                <div style={{"width": "65%"}}>
                  <h2><IonSkeletonText animated className={"skeletontext"}></IonSkeletonText></h2>
                  <p><IonSkeletonText animated className={"skeletontext"} style={{"width": "80%"}}></IonSkeletonText></p>
                  <p><IonSkeletonText animated className={"skeletontext"} style={{"width": "80%"}}></IonSkeletonText></p>
                </div>
                <IonThumbnail slot={"end"} style={{"width": "5rem", "height": "5rem", "margin-right": "0.5rem"}} className={"skeletonthumb"}>
                  <IonSkeletonText animated></IonSkeletonText>
                </IonThumbnail>
              </div>
              <IonList></IonList>
            </>}
        </div>
      </IonModal>
    </>
  );
}

export default MapInfoModal;