import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "./src/screens/mapScreen";
import { InformationsScreen } from "./src/screens/informationsScreen";
import stationsContainer from "./src/components/stationsContainer";
import { Provider } from "react-redux";
import store from "./src/store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Stations" component={stationsContainer}/>
          {/* <Stack.Screen name="Home" component={MapScreen} /> */}
          <Stack.Screen name="Infos" component={InformationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
