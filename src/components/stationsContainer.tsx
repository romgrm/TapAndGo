import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(Environments.development.MAP_TOKEN);
MapboxGL.setConnected(true);

Logger.setLogCallback((log) => {
  const { message } = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed")
  ) {
    return true;
  }
  return false;
});
export default function stationsContainer() {
  const stations = useSelector((state: RootState) => state.stations.stations);
  const dispatch = useDispatch();
  const coordinates = [2.213749, 46.227638];

  /**
   * Only 10 stations selected for the demo (performs reasons)
   */
  const reduceStations = stations.slice(0, 10);

  useEffect(() => {
    dispatch(callApiStation());
  }, [dispatch]);
  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} zoomEnabled>
            <MapboxGL.Camera centerCoordinate={coordinates} />
            {reduceStations.map((val) => (
              <MapboxGL.PointAnnotation
                coordinate={[val.position.longitude, val.position.latitude]}
                id="pt-ann"
              ></MapboxGL.PointAnnotation>
            ))}
          </MapboxGL.MapView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});
