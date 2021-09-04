import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import {
  Button,
  Modal,
  Text,
  Portal,
  Provider,
  Card,
} from "react-native-paper";
import Map from "./map";
import { useLayoutEffect } from "react";
import { RouteProp } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface MapScreenProps {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, "MapScreen">
  route: RouteProp<MainNavigatorParamsList, "MapScreen">
}

// interface Props {
//   navigation: any;
// }
export default function stationsContainer(props: MapScreenProps) {
  const stations = useSelector((state: RootState) => state.stations.stations);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(callApiStation());
  }, [dispatch]);

  return (
    <>
      <Map navigation={props.navigation} station={stations} route={props.route} />
    </>
  );
}
