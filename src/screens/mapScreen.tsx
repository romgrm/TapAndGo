import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native";
interface Props {
  navigation: any;
}

export function MapScreen(props: Props) {
  
  return (
    <View>
      <Text>Map Screen</Text>
      <Button onPress={() => props.navigation.navigate("Infos")} title="go" />
    </View>
  );
}
