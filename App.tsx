import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import RootNavigation from "./src/navigation/rootNavigation";

export default function App() {
  let [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/NeueHaasGroteskTextPro.ttf"),
    Medium: require("./assets/fonts/NeueHaasGroteskTextProMedium.ttf"),
    Bold: require("./assets/fonts/NeueHaasGroteskTextProBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}
