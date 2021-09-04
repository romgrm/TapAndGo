import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons";

import { RouteProp } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface calloutComponentProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList, "MapScreen">
  route: RouteProp<RootNavigationParamsList, "MapScreen">
  title: string;
  station: Station;
}

export default function stationCallout(props: calloutComponentProps) {
  const { navigation } = props; 
  const goInfos = (station: Station) => {
    navigation.navigate("InfosScreen",station)
  };
  
  return (
    <View style={styles.touchableContainer} key={props.station.address}>
      <TouchableOpacity
        onPress={() => goInfos(props.station)}
        style={styles.touchableLogo}
      >
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={24}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  touchableContainer: {
    width: 60,
    zIndex: 1,
  },
  touchableLogo: {
    backgroundColor: "#7158e2",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    justifyContent: "center",
    color: "white",
  },
  touchableText: {
    color: "white",
    fontWeight: "bold",
  },
});
