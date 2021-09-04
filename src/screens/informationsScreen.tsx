import React, { FC } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Card, Surface } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { RouteProp } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
interface InfosScreenProps {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, "InfosScreen">
  route: RouteProp<MainNavigatorParamsList, "InfosScreen">
}

// interface Props {
//   route: any;
// }

export default function InformationsScreen(props: InfosScreenProps) {
  // const { sendInfosStation } = route.params;
  // const infosStation: Station = sendInfosStation;

  const { contractName, status } = props.route.params; 
  return (
    <Card>
      <Surface style={styles.surfaceCover}>
        <Image
          source={require("../../assets/bike2.png")}
          style={styles.image}
        />
        {/* <Card.Title title={params.titleStation} titleStyle={globalStyles.title}/> */}
      </Surface>
<Text>{contractName}</Text>
<Text>{status}</Text>
      {/* <Text>Informations Screen {infosStation.contractName} hello</Text>
      <Text>Informations Screen {infosStation.address} hello</Text>
      <Text>
        Informations Screen{" "}
        {infosStation.mainStands.availabilities.electricalBikes} hello
      </Text> */}
    </Card>
  );
}
const styles = StyleSheet.create({
  touchableContainer: {
    width: 60,
    zIndex: 1,
  },
  touchableLogo: {
    backgroundColor: "#7158e2",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    justifyContent: "center",
    color: "white",
  },
  touchableText: {
    color: "white",
    fontWeight: "bold",
  },
  surfaceCover: {
    width: "100%",
    height: 200,
    // margin: 50,
    elevation: 4,
    backgroundColor: "red",
    // overflow:"hidden"
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    //   marginBottom: 4000
    // height: 400,
  },
});
