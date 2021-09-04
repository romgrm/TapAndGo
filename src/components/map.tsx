import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import { Button, Text, Card, TextInput } from "react-native-paper";
import StationCallout from "./stationCallout";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { globalColor } from "../styles/globalStyles";

MapboxGL.setAccessToken(Environments.development.MAP_TOKEN);
MapboxGL.setConnected(true);

Logger.setLogCallback((log) => {
  const { message } = log;
  if (
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed")
  ) {
    return true;
  }
  return false;
});

interface MapComponentProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList, "MapScreen">;
  route: RouteProp<RootNavigationParamsList, "MapScreen">;
  station: Station[];
}

export default function Map(props: MapComponentProps) {
  const [stationState, setStationState] = useState<Station[]>([]);
  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);
  const [nameStation, setNameStation] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);

  const nothing = `il semblerait que ${nameStation} n'existe pas en nom de station`;

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
      setNameStation(input);
      const byName = stationState.filter((val) =>
        val.contractName.startsWith(nameStation.toLowerCase())
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
      <Card style={styles.containerGlobal}>
        <Card.Content style={styles.containerInput}>
          <TextInput
            label="Entrer un nom de ville pour trouver une station"
            mode="outlined"
            value={nameStation}
            onChangeText={async (input: string) => await filterByName(input)}
            right={
              <TextInput.Icon
                name={() => (
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    style={globalColor.violet}
                  />
                )}
                onPress={() => reinit()}
              />
            }
          />
          {displayError ? <Text> {nothing}</Text> : null}
        </Card.Content>
        <Card.Content style={styles.containerMap}>
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
        </Card.Content>
        {/* <Button onPress={() => activeFilter()}>Filtrer</Button>
      {displayFilter ? (
        <Card>
          <Card.Title title="Filtrer les résultats" />
          <Card.Content>
            <Text> {nameStation}</Text>
            <Button onPress={() => filterByStatus()}>
              Voir uniquement les stations ouvertes
            </Button>
            <Button onPress={() => filterByDispo()}>
              Voir uniquement les stations avec vélos disponibles
            </Button>
            <Button onPress={() => reinit()}>Reinit Filter</Button>
          </Card.Content>
        </Card>
      ) : null} */}
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    padding: 0,
    // backgroundColor : 'yellow',
    flex: 1,
  },
  containerInput: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    // backgroundColor: "green",
  },
  containerMap: {
    height: 600,
    width: "100%",
    marginTop: 50,
    // backgroundColor: "tomato",
  },
  map: {
    elevation: 12,
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
