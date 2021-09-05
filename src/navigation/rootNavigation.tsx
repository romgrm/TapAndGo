import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InformationsScreen from "../screens/informationsScreen";
import MapScreen from "../screens/mapScreen";

const MainStack = createNativeStackNavigator<RootNavigationParamsList>();

/**
 * Main stack of screens. Allow us to navigate between screens with a typing.
 */
export default function rootNavigation() {
  const { Navigator, Screen } = MainStack;
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="MapScreen" component={MapScreen} />
      <Screen name="InfosScreen" component={InformationsScreen} />
    </Navigator>
  );
}
