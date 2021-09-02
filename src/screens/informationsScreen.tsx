import React from 'react'
import { FC } from 'react'
import { Text } from 'react-native'

interface Props {
    route: any
}

export const InformationsScreen: FC<Props> = ({ route}) => {
    
    const { params } = route; 
    return (
        <Text>Informations Screen {params.titleStation} hello</Text>
    )
}
