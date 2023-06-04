import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as mapboxgl from "mapbox-gl";

export const BASE_API_URL = "https://http-javascript-introduces-minolta.trycloudflare.com/";

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXZhbmc4MTciLCJhIjoiY2t3anh1aDVuMW1mYjJwbXVxbWFlOTZyaSJ9.I_9eR_o-mDV98FzI4YgLQg';


const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
