import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleApp: {
    fontFamily: "Bold",
    fontSize: 40,
    alignSelf:"center",
    color: "white",
    margin: 20
  },
  title: {
    fontFamily: "Bold",
    fontSize: 25,
    color:'#7158e2',
    textTransform: "uppercase",
    textAlign:'center'
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: 15,
    textAlign: "center",
  },
  text: {
    fontFamily:"Regular",
    fontSize: 12,
  },
  logoInfosBackground:{
    width:45,
    height: 45,
    borderRadius:45/2, 
    backgroundColor:'#7158e2',
    alignItems: 'center',
    justifyContent:'center',
  },
  logoInfosText:{
    color:'white',
    fontFamily:'Medium'
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#778ca3",
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

