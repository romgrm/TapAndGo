import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "./src/screens/mapScreen";
import  InformationsScreen  from "./src/screens/informationsScreen";
import stationContainer from "./src/components/stationContainer";
import { Provider } from "react-redux";
import store from "./src/store/store";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'Regular': require("./assets/fonts/NeueHaasGroteskTextPro.ttf"),
    'Medium': require("./assets/fonts/NeueHaasGroteskTextProMedium.ttf"),
    'Bold': require("./assets/fonts/NeueHaasGroteskTextProBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Stations" component={stationContainer} />
            {/* <Stack.Screen name="Home" component={MapScreen} /> */}
            <Stack.Screen name="Infos" component={InformationsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
