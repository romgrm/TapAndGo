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

interface Callout {
  navigation: any;
  title: string;
}
export default function stationCallout(props: Callout) {

  const goInfos = (title: string) => {
    props.navigation.navigate("Infos", {
      titleStation: title,
    });
  };
  return (
    <View style={styles.touchableContainer}>
      <Text>{props.title}</Text>
      <TouchableOpacity style={styles.touchable}>
        <Button onPress={() => goInfos(props.title)}>Hello</Button>
      </TouchableOpacity>
    </View>
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
