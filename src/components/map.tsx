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
  TextInput,
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

import { RouteProp } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface MapComponentProps {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, "MapScreen">
  route: RouteProp<MainNavigatorParamsList, "MapScreen">
  station: Station[];
}

// interface Props {
//   navigation: any;
//   station: Station[];
// }
export default function Map(props: MapComponentProps) {
  const [stationState, setStationState] = useState<Station[]>([]);
  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);
  const [nameStation, setNameStation] = useState<string>("");

  useEffect(() => {
    async function display() {
      setStationState(await props.station.slice(0, 10));
      setDisplayMap(true);
    }
    display();
  }, [props.station]);

  const activeFilter = () => {
    setDisplayFilter(true);
  };

  async function filterByName(input: string) {
    if (input.length > 0) {
      const valueInput = input.toLowerCase();
      setNameStation(valueInput);
      const byName = stationState.filter((val) =>
        val.contractName.startsWith(nameStation)
      );
      setStationState(byName);
    } else {
      setNameStation("");
      setStationState(await props.station.slice(0, 10));
    }
  }

  const filterByStatus = () => {
    const byStatus = stationState.filter((val) => val.status === "OPEN");
    setStationState(byStatus);
  };

  const filterByDispo = () => {
    const byDispo = stationState.filter(
      (val) => val.mainStands.availabilities.bikes < 0
    );
    setStationState(byDispo);
  };
  async function reinit() {
    setStationState(await props.station.slice(0, 10));
    setNameStation("");
  }

  const coordinates = [2.213749, 46.227638];
  return (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          {displayMap ? (
            <MapboxGL.MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Outdoors}
            >
              <MapboxGL.Camera
                zoomLevel={3}
                centerCoordinate={coordinates}
                animationMode={"flyTo"}
              />

              {stationState.map((val) => (
                <>
                  <MapboxGL.MarkerView
                    coordinate={[val.position.longitude, val.position.latitude]}
                    id={val.address}
                  >
                    <StationCallout
                      station={val}
                      title={val.contractName}
                      navigation={props.navigation}
                      route={props.route}
                    />
                  </MapboxGL.MarkerView>
                </>
              ))}
            </MapboxGL.MapView>
          ) : null}
        </View>
      </View>
      <Button onPress={() => activeFilter()}>Filtrer</Button>
      {displayFilter ? (
        <Card>
          <Card.Title title="Filtrer les résultats" />
          <Card.Content>
            <TextInput
              label="filterName"
              mode="outlined"
              placeholder="Entrer un nom de ville"
              value={nameStation}
              onChangeText={async (input: string) => await filterByName(input)}
            />
            <Text> {nameStation}</Text>
            {/* <Button onPress={() => filterByName()}>
              Rechercher une station par son nom
            </Button> */}
            <Button onPress={() => filterByStatus()}>
              Voir uniquement les stations ouvertes
            </Button>
            <Button onPress={() => filterByDispo()}>
              Voir uniquement les stations avec vélos disponibles
            </Button>
            <Button onPress={() => reinit()}>Reinit Filter</Button>
          </Card.Content>
        </Card>
      ) : null}
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
    overflow: "hidden",
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
