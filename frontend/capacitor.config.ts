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
    "@capacitor/geolocation",
    "@capacitor/splash-screen"
  ],
  plugins: {
    splashScreen: {
      launchAutoHide: true,
      launchShowDuration: 5000,
      showSpinner: true,
      launchFadeOutDuration: 1000,
    },
  },
  cordova: {
    preferences: {
      LottieFullscreen: "true",
      LottieHideAfterAnimationEnd: "true",
      LottieAnimationLocation: "public/assets/beach.json"
    }
  },
};

export default config;
