import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { locationObj } from "../components/MapView";

import "./Map.css";
import MapView from "../components/MapView";
import MapInfoModal from "../components/MapInfoModal";
import { useState } from "react";


const Map: React.FC = () => {
  const [currentScore, setCurrentScore] = useState<number>(0);

  const [location, setLocation] = useState<locationObj>({lat: 0, lon: 0});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beach Alert</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <MapView location={location} setLocation={setLocation}/>
        <MapInfoModal lat={location.lat} long={location.lon} />
      </IonContent>


    </IonPage>
  );
};

export default Map;
