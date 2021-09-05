import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import {
  Chip,
  Card,
  TextInput,
  FAB,
  Portal,
  Provider,
  Caption,
} from "react-native-paper";
import StationCallout from "./stationCallout";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { globalColor } from "../styles/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

/**
 * MapBox config
 */
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

/**
 * Component which display the map, the searchBar and filters
 * @param props received by navigationType. Type Station because we pass through the screens the data received by the API, in the route.params
 * @returns
 */
export default function Map(props: MapComponentProps) {
  const [stationState, setStationState] = useState<Station[]>([]);
  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);
  const [nameStation, setNameStation] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);
  const [displayCapsuleFilterByStatus, setDisplayCapsuleFilterByStatus] =
    useState<boolean>(false);
  const [
    displayCapsuleFilterMechanicalBike,
    setDisplayCapsuleFilterByMechanicalBike,
  ] = useState<boolean>(false);
  const [
    displayCapsuleFilterByElectricalBike,
    setDisplayCapsuleFilterByElectricalBike,
  ] = useState<boolean>(false);

  const coordinates = [2.213749, 46.227638];

  const noStationResult = `Il semblerait que nous ne disposions pas encore de station à ${nameStation}`;

  let isInputMatch: boolean;

  useEffect(() => {
    const display = () => {
      setStationState(props.station.slice(0, 10));
      setDisplayMap(true);
    };
    display();
  }, [props.station]);

  const activeFilter = () => {
    setDisplayFilter(!displayFilter);
  };

  const filterByName = (input: string) => {
    setNameStation(input);
    if (input.length === 0) {
      setDisplayError(false);
      reinitialisation();
      return;
    }
    isInputMatch = stationState.some((val) =>
      val.contractName.startsWith(input.toLowerCase())
    );
    if (isInputMatch) {
      const byName = stationState.filter((val) =>
        val.contractName.startsWith(nameStation.toLowerCase())
      );
      setStationState(byName);
    } else {
      setDisplayError(true);
      setStationState(props.station.slice(0, 10));
    }
  };

  const filterByStatus = () => {
    setDisplayCapsuleFilterByStatus(true);
    const byStatus = () => stationState.filter((val) => val.status === "OPEN");
    setStationState(byStatus);
  };

  const filterByMechanicalBikeDispo = () => {
    setDisplayCapsuleFilterByMechanicalBike(true);
    const byMechanicalBikeDispo = stationState.filter(
      (val) => val.mainStands.availabilities.mechanicalBikes > 0
    );
    setStationState(byMechanicalBikeDispo);
  };
  const filterByElectricalBikeDispo = () => {
    setDisplayCapsuleFilterByElectricalBike(true);
    const byElectricalBikeDispo = stationState.filter(
      (val) => val.mainStands.availabilities.electricalBikes > 0
    );
    setStationState(byElectricalBikeDispo);
  };
  const reinitialisation = () => {
    setStationState(props.station.slice(0, 10));
    setNameStation("");
    setDisplayError(false);
    setDisplayCapsuleFilterByStatus(false);
    setDisplayCapsuleFilterByMechanicalBike(false);
    setDisplayCapsuleFilterByElectricalBike(false);
  };

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
              onChangeText={async (input: string) => filterByName(input)}
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
            {displayError ? <Caption> {noStationResult}</Caption> : null}
          </Card.Content>
          <Card.Content style={styles.containerMap}>
            <Card.Content style={styles.containerCapsuleFilter}>
              {displayCapsuleFilterByStatus ? (
                <Chip
                  style={styles.capsuleFilterBackground}
                  textStyle={styles.capsuleFilterText}
                >
                  Stations ouvertes
                </Chip>
              ) : null}
              {displayCapsuleFilterMechanicalBike ? (
                <Chip
                  style={styles.capsuleFilterBackground}
                  textStyle={styles.capsuleFilterText}
                >
                  Vélos mécaniques
                </Chip>
              ) : null}
              {displayCapsuleFilterByElectricalBike ? (
                <Chip
                  style={styles.capsuleFilterBackground}
                  textStyle={styles.capsuleFilterText}
                >
                  Vélos électriques
                </Chip>
              ) : null}
            </Card.Content>
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
                    coordinate={[val.position.longitude, val.position.latitude]}
                    id={val.address}
                    key={val.number + val.contractName}
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
                fabStyle={{
                  backgroundColor: "#7158e2",
                  marginBottom: 75,
                  marginRight: 25,
                }}
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
                    icon: () => (
                      <MaterialIcons
                        name="electric-bike"
                        size={24}
                        color="grey"
                      />
                    ),
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 12,
    flex: 1,
  },
  containerInput: {
    width: "100%",
    height: 50,
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
  containerCapsuleFilter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  capsuleFilterBackground: {
    width: "33%",
    marginRight: 3,
    backgroundColor: "#7158e2",
    justifyContent: "center",
  },
  capsuleFilterText: {
    color: "white",
    fontSize: 10,
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
