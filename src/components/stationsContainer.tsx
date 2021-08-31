import React, { useEffect } from 'react'
import { View } from 'react-native';
import { Text,  } from 'react-native-paper'
import { useSelector, useDispatch, DefaultRootState } from "react-redux";
import { RootState } from '../store/combineReducers';
import { callApiStation } from '../store/stations/actionStation';


export default function stationsContainer() {

    const stations = useSelector((state: RootState) => state.stations.stations); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(callApiStation())
    }, [dispatch])
    return (
        <>
        <View>
            <Text>hello</Text>
            {stations.map(val => <Text>{val.status}</Text>)}
        </View>
        </>
       
    )
}
