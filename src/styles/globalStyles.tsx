import { StyleSheet, Platform } from "react-native";

export const globalStyles = StyleSheet.create({
  titleApp: {
    fontFamily: "Bold",
    fontSize: 30,
    alignSelf:"center",
    color: "#7158e2",
    margin: 20
  },
  title: {
    fontFamily: "Bold",
    textTransform: "capitalize",
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: 15,
    textAlign: "center",
    color: "#778ca3"
  },
  text: {
    fontSize: 20,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});

export const globalColor = StyleSheet.create({
  violet:{
    color: "#7158e2"
  },
  grey:{
    color:"#778ca3"
  }
});

