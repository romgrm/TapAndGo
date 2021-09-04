import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import Map from "./map";
import { useLayoutEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
interface MapScreenProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList, "MapScreen">;
  route: RouteProp<RootNavigationParamsList, "MapScreen">;
}

export default function stationsContainer(props: MapScreenProps) {
  const stations = useSelector((state: RootState) => state.stations.stations);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(callApiStation());
  }, [dispatch]);

  return (
    <Map navigation={props.navigation} station={stations} route={props.route} />
  );
}
