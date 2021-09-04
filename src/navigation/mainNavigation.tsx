import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InformationsScreen from "../screens/informationsScreen";
import StationContainer from "../components/stationContainer";

const MainStack = createNativeStackNavigator<MainNavigatorParamsList>(); 

export default function mainNavigation() {
    const { Navigator, Screen } = MainStack; 
    return (
        <Navigator>
            <Screen name="MapScreen" component={StationContainer} />
            <Screen name="InfosScreen" component={InformationsScreen} />
        </Navigator>
    )
}
