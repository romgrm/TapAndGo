import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import {
  Button,
  Text,
  Card,
  TextInput,
  FAB,
  Portal,
  Provider,
} from "react-native-paper";
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
    setDisplayFilter(!displayFilter);
  };

  let isTrue: boolean;
  async function filterByName(input: string) {
    setNameStation(input);
    isTrue = stationState.some((val) =>
      val.contractName.startsWith(input.toLowerCase())
    );
    if (isTrue) {
      const byName = stationState.filter((val) =>
        val.contractName.startsWith(nameStation.toLowerCase())
      );
      setStationState(byName);
    } else {
      setDisplayError(true);
      setStationState(await props.station.slice(0, 10));
    }
  }

  const filterByStatus = () => {
    reinitialisation()
    const byStatus = stationState.filter((val) => val.status === "OPEN");
    setStationState(byStatus);
  };

  const filterByMechanicalBikeDispo = () => {
    reinitialisation()
    const byMechanicalBikeDispo = stationState.filter(
      (val) => val.mainStands.availabilities.bikes > 0
    );
    setStationState(byMechanicalBikeDispo);
  };
  const filterByElectricalBikeDispo = () => {
    
    const byElectricalBikeDispo = stationState.filter(
      (val) => val.mainStands.availabilities.electricalBikes < 0
    );
    setStationState(byElectricalBikeDispo);
  };
  async function reinitialisation() {
    setStationState(await props.station.slice(0, 10));
    setNameStation("");
    setDisplayError(false);
  }

  const coordinates = [2.213749, 46.227638];
  return (
    <>
      <Provider>
        <Card style={styles.containerGlobal}>
          <Card.Content style={styles.containerInput}>
            <TextInput
              label="Entrer un nom de ville pour trouver une station"
              mode="outlined"
              outlineColor="#778ca3"
              selectionColor="black"
              placeholderTextColor="#778ca3"
              value={nameStation}
              onChangeText={async (input: string) => await filterByName(input)}
              style={styles.input}
              right={
                <TextInput.Icon
                  name={() => (
                    <Entypo
                      name="circle-with-cross"
                      size={28}
                      style={globalColor.violet}
                    />
                  )}
                  onPress={() => reinitialisation()}
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
                key={1}
              >
                <MapboxGL.Camera
                  zoomLevel={3}
                  centerCoordinate={coordinates}
                  animationMode={"flyTo"}
                />

                {stationState.map((val) => (
                    <MapboxGL.MarkerView
                      coordinate={[
                        val.position.longitude,
                        val.position.latitude,
                      ]}
                      id={val.address}
                      key={val.number+val.contractName}
                    >
                      <StationCallout
                        station={val}
                        title={val.contractName}
                        navigation={props.navigation}
                        route={props.route}
                      />
                    </MapboxGL.MarkerView>
                  
                ))}
              </MapboxGL.MapView>
            ) : null}
            <Portal>
              <FAB.Group
                visible
                open={displayFilter}
                icon={displayFilter ? "close" : "filter-variant"}
                fabStyle={{ backgroundColor: "#7158e2", marginBottom:75, marginRight: 25 }}
                actions={[
                  {
                    icon: "close",
                    label: "Reinitialiser les filtres",
                    onPress: () => reinitialisation(),
                  },
                  {
                    icon: "home",
                    label: "Uniquement les stations ouvertes",
                    onPress: () => filterByStatus(),
                  },
                  {
                    icon: "bicycle",
                    label:
                      "Uniquement les stations avec vélos mécaniques disponibles",
                    onPress: () => filterByMechanicalBikeDispo(),
                  },
                  {
                    icon: "flash",
                    label:
                      "Uniquement les stations avec vélos électriques disponibles",
                    onPress: () => filterByElectricalBikeDispo(),
                  },
                ]}
                onStateChange={() => activeFilter()}
                onPress={() => activeFilter}
              />
            </Portal>
          </Card.Content>
        </Card>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    padding: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 12,
    flex: 1,
  },
  containerInput: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    backgroundColor: "white",
  },
  containerFab: {
    height: 50,
    width: "100%",
    backgroundColor: "red",
  },
  containerMap: {
    height: 600,
    width: "100%",
    marginTop: 50,
    marginBottom: 50,
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
  button: {
    backgroundColor: "blue",
    position: "absolute",
    width: 200,
    height: 200,
    zIndex: 1,
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
