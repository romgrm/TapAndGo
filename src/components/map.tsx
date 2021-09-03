import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
  const [displayMap, setDisplayMap] = useState(false);
  const [marseilleState, setMarseilleState] = useState<Station[]>([]
  );

useEffect(() => {
  async function display  () {
    
    setMarseilleState(await props.station.slice(0,10))
    setDisplayMap(true)
  }
  display()
}, [props.station])

  const modif = () => {
    const filtrage = marseilleState.filter(val => val.name === "9087-MAZARGUES")
    setMarseilleState(filtrage)
  }

  async function reinit() {
    setMarseilleState(await props.station.slice(0,10))
  }

  const coordinates = [2.213749, 46.227638];
  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
            {displayMap ? 
            
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
                  <StationCallout
                    title={val.name}
                    navigation={props.navigation}
                    />
                </MapboxGL.MarkerView>
              </>
            ))}
          </MapboxGL.MapView>
    
    : null}
        </View>
        </View>
        <Button onPress={() => modif()}>
        Voir les vélos dispo en france
      </Button>
      <Button onPress={() => reinit()}>Reinit Filter</Button>
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
    overflow:"hidden"
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