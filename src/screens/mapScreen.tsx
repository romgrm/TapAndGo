import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/action";

interface Props {
  navigation: any;
}

export function MapScreen(props: Props) {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Map Screen {counter}</Text>
      <Button onPress={() => props.navigation.navigate("Infos")} title="go" />
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
}
