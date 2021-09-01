import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";

MapboxGL.setAccessToken(Environments.development.MAP_TOKEN);

export default function stationsContainer() {
  const stations = useSelector((state: RootState) => state.stations.stations);
  const dispatch = useDispatch();
  const coordinates = [-122.4324, 37.78825];

  useEffect(() => {
    dispatch(callApiStation());
  }, [dispatch]);
  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          {/* <Text>hello, comment tu vas ? ça va bien</Text> */}
          {/* {stations.map(val => <Text key={val.name}>{val.status}</Text>)} */}
          <MapboxGL.MapView style={styles.map}>
            {/* <MapboxGL.Camera zoomLevel={16} centerCoordinate={coordinates} />

            <MapboxGL.PointAnnotation
              coordinate={coordinates}
              id="pt-ann"
            ></MapboxGL.PointAnnotation> */}
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
