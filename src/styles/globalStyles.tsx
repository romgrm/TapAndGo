import { StyleSheet, Platform } from 'react-native'; 

export const globalStyles = StyleSheet.create({
    titleApp:{
        fontFamily: 'Regular',
        fontSize: 30,
        color:'#9BA4B0'
    },
    title:{
        fontFamily: 'Bold',
        textTransform:'capitalize'
    },
    subTitle:{
        fontFamily: 'Sofia-Regular',
        fontSize: 20
    },
    text:{
        fontSize: 20
    },
    droidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === 'android' ? 40 : 0
    },
    

})