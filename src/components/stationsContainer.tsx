import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from "../store/combineReducers";
import { callApiStation } from "../store/stations/actionStation";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Environments } from "../config/environment";
import { Logger } from "@react-native-mapbox-gl/maps";
import { Button, Modal, Text, Portal, Provider, Card } from "react-native-paper";

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
  const [visible, setVisible] = useState(false);
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

  const displayInfos = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const test = () => {
    return "hello";
  };
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

              {reduceStations.map((val) => (
                <>
                  <MapboxGL.PointAnnotation
                    key={val.address}
                    id={val.address}
                    coordinate={[val.position.longitude, val.position.latitude]}
                    onSelected={displayInfos}
                  >
                    {/* <AnnotationContent title={"this is a marker view"} /> */}
                  <MapboxGL.Callout title={[val.name,val.address, val.status].toString()} key={val.address} accessible>
                     <Card>
                         <Card.Title title={val.name} />
                             <Card.Content>
                                 <Text>I'm here</Text>
                             </Card.Content>
                        <Button icon="camera" mode="contained" >Press me</Button>
                     </Card>
                  </MapboxGL.Callout>
                  </MapboxGL.PointAnnotation>
                </>
              ))}
            </MapboxGL.MapView>
          </View>
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
