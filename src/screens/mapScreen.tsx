import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import StationContainer from "../components/stationContainer";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { globalStyles } from "../styles/globalStyles";
interface MapScreenProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList, "MapScreen">;
  route: RouteProp<RootNavigationParamsList, "MapScreen">;
}

export default function MapScreen(props: MapScreenProps) {
  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={globalStyles.titleApp}>Tap & Go</Text>
        <Card>
          <Card.Content>
            <Text style={globalStyles.subTitle}>Tap & Go vous permet de localiser nos stations de vélos dans le monde entier, pour vous déplacer en toute tranquilité !</Text>
          </Card.Content>
        </Card>
        <StationContainer navigation={props.navigation} route={props.route} />
        <View style={styles.test}>
        <Text>Hello</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "100%",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderBottomEndRadius: 16,
  },
  test:{
    height: 500,
    width:'100%'
  }
});
