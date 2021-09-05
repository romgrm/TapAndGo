import React from "react";
import { Text, StyleSheet, Image } from "react-native";
import {
  Card,
  Surface,
  Subheading,
  List,
  Avatar,
  Badge,
  IconButton,
  Divider,
} from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign } from "@expo/vector-icons";

interface InfosScreenProps {
  navigation: NativeStackNavigationProp<RootNavigationParamsList,"InfosScreen">;
  route: RouteProp<RootNavigationParamsList, "InfosScreen">;
}

/**
 * Component which display more infos about selected station
 * @param props 
 */
export default function InformationsScreen(props: InfosScreenProps) {
  const { contractName, status, address, mainStands } = props.route.params;

  return (
    <>
      <Surface style={styles.surfaceCover}>
        <Image
          source={require("../../assets/bike2.png")}
          style={styles.image}
        />
        <IconButton
          icon="arrow-left-circle"
          color="white"
          size={40}
          onPress={() => props.navigation.goBack()}
          style={{ position: "absolute", top: 40 }}
        />
      </Surface>
      <Card style={styles.cardContainer}>
        <Card.Content style={styles.titleContainer}>
          <Text style={globalStyles.title}>{contractName}</Text>
          <Badge
            size={10}
            style={status === "OPEN" ? styles.badgeOpen : styles.badgeClose}
          />
        </Card.Content>
        <Card.Content style={styles.addressContainer}>
          <AntDesign
            name="home"
            size={20}
            color="#7158e2"
            style={styles.addressLogo}
          />
          <Subheading style={globalStyles.subTitle}>{address}</Subheading>
        </Card.Content>
        <Divider style={styles.divider} />
        <Surface style={styles.surfaceCardContent}>
          <List.Item
            title="vélos mécaniques disponibles"
            left={() => (
              <Avatar.Text
                size={30}
                labelStyle={globalStyles.logoInfosText}
                label={`${mainStands.availabilities.mechanicalBikes}`}
                style={globalStyles.logoInfosBackground}
              />
            )}
            style={styles.listItem}
          />
          <List.Item
            title="vélos électriques disponibles"
            left={() => (
              <Avatar.Text
                size={30}
                labelStyle={globalStyles.logoInfosText}
                label={`${mainStands.availabilities.electricalBikes}`}
                style={globalStyles.logoInfosBackground}
              />
            )}
            style={styles.listItem}
          />
          <List.Item
            title="places libres disponibles"
            left={() => (
              <Avatar.Text
                size={30}
                labelStyle={globalStyles.logoInfosText}
                label={`${mainStands.availabilities.stands}`}
                style={globalStyles.logoInfosBackground}
              />
            )}
            style={styles.listItem}
          />
        </Surface>
      </Card>
    </>
  );
}
const styles = StyleSheet.create({
  surfaceCover: {
    width: "100%",
    height: 200,
    elevation: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  cardContainer: {
    flex: 1,
    elevation: 12,
    marginTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  badgeOpen: {
    backgroundColor: "green",
    alignSelf: "center",
    marginLeft: 5,
  },
  badgeClose: {
    backgroundColor: "red",
  },
  addressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  addressLogo: {
    marginRight: '2%',
    alignSelf: "center",
  },
  divider: {
    width: "50%",
    alignSelf: "center",
  },
  surfaceCardContent: {
    elevation: 4,
    margin: 20,
    borderRadius: 16,
    padding: 10,
  },
  cardContent: {
    elevation: 12,
    height: 200,
    width: 100,
  },
  listItem: {
    marginBottom: 15,
  },
});
