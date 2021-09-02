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
import StationCallout from "./stationCallout";

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

interface Props {
  navigation: any;
  station: Station[];
}
export default function Map(props: Props) {

  const [marseilleState, setMarseilleState] = useState<Station[]>([]); 

  useEffect(() => {
    setMarseilleState(props.station)
    
  }, [])

  const onlyMarseille = () => {
    const stationFiltree = props.station.filter((val) => val.name === "9087-MAZARGUES");
    setMarseilleState(stationFiltree);
  };

  const reinitFilters = () => {
      setMarseilleState(props.station)
  }
  const coordinates = [2.213749, 46.227638];
  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.container}>
            <MapboxGL.MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Outdoors}
            >
              <MapboxGL.Camera
                zoomLevel={3}
                centerCoordinate={coordinates}
                animationMode={"flyTo"}
              />

              {marseilleState.map((val) => (
                <>
                  <MapboxGL.MarkerView
                    coordinate={[val.position.longitude, val.position.latitude]}
                    id={val.address}
                  >
                    {/* <AnnotationContent title={val.name} /> */}
                    <StationCallout
                      title={val.name}
                      navigation={props.navigation}
                    />
                  </MapboxGL.MarkerView>
                </>
              ))}
            </MapboxGL.MapView>
          </View>
        </View>
        <Button onPress={() => onlyMarseille()}>Filter Marseille</Button>
        <Button onPress={() => reinitFilters()}>Reinit Filter</Button>
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
    height: 600,
    width: 400,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
  touchableContainer: {
    borderColor: "black",
    borderWidth: 1.0,
    width: 60,
    zIndex: 1,
  },
  touchable: {
    backgroundColor: "blue",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableText: {
    color: "white",
    fontWeight: "bold",
  },
});
