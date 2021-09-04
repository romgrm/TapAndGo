import React from "react";
import { View, StyleSheet, ScrollView,StatusBar } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import StationContainer from "../components/stationContainer";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { globalColor, globalStyles } from "../styles/globalStyles";
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
         <Card style={styles.cardContainer}>

        <Text style={globalStyles.titleApp}>Tap & Go</Text>
        
            <Text style={globalStyles.subTitle}>Trouvez une station, réservez un vélo, déplacez vous dans le monde entier !</Text>
         </Card>
        
          
        <StationContainer navigation={props.navigation} route={props.route} />
        {/* <View style={styles.test}>
        <Text>Hello</Text>
        </View> */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "100%",
    paddingTop: 40,
    backgroundColor: "white"
  },
  cardContainer: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7158e2",
    marginBottom: 20, 
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 12
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderBottomEndRadius: 16,
  },
  test:{
    height: 500,
    width:'100%'
  }
});
