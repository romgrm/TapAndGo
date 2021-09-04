import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Route } from "react-native";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  Modal,
  Text,
  Portal,
  Provider,
  Card,
} from "react-native-paper";

import { RouteProp } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface calloutComponentProps {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, "MapScreen">
  route: RouteProp<MainNavigatorParamsList, "MapScreen">
  title: string;
  station: Station;
}

// interface Callout {
//   title: string;
//   navigation: any;
//   station: Station;
// }

export default function stationCallout(props: calloutComponentProps) {
  const { navigation, route } = props; 
  const goInfos = (station: Station) => {
    navigation.navigate("InfosScreen",station)
  };
  // const goInfos = (station: Station) => {
  //   props.navigation.navigate("Infos", {
  //     sendInfosStation: station,
  //   });
  // };
  return (
    <View style={styles.touchableContainer}>
      {/* <Text>{props.title}</Text> */}
      <TouchableOpacity
        onPress={() => goInfos(props.station)}
        style={styles.touchableLogo}
      >
        {/* <MaterialIcons name="directions-bike" size={24} color="black" style={styles.touchableLogo}/> */}
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={24}
          style={styles.logo}
        />
        {/* <Button onPress={() => goInfos(props.title)}>Hello</Button> */}
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
