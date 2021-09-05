import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import Map from "./map";
import { Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

interface MapScreenProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList, "MapScreen">;
  route: RouteProp<RootNavigationParamsList, "MapScreen">;
}
/**
 * Component which receives the data from the API by redux dispatch
 * @param props received by navigationType. Type Station because we pass through the screens the data received by the API, in the route.params
 */
export default function stationContainer(props: MapScreenProps) {
  const stations = useSelector((state: RootState) => state.stations.stations);
  const loading = useSelector((state: RootState) => state.stations.isLoading);
  const error = useSelector((state: RootState) => state.stations.error);
  const dispatch = useDispatch();

  const isError: string = error;
  const isLoading: boolean = loading;

  /**
   * Fetch the data from dispatch before mounted component
   */
  useLayoutEffect(() => {
    dispatch(callApiStation());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : isError ? (
        <Text>{error}</Text>
      ) : (
        <Map
          navigation={props.navigation}
          station={stations}
          route={props.route}
        />
      )}
    </>
  );
}
