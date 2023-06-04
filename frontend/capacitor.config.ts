import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.beachalert.yay",
  appName: "Beach Alert",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  includePlugins: [
    "@capacitor/app",
    "@capacitor/haptics",
    "@capacitor/keyboard",
    "@capacitor/status-bar",
    "@capacitor/geolocation"
  ]
};

export default config;
