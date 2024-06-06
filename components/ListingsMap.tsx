import { View, StyleSheet, Text } from 'react-native'
import React from "react"
import MapView, { Marker } from "react-native-maps"
import { defaultStyles } from '@/constants/Styles'
import { AirbnbListing } from '@/assets/data/airbnblistingsinterface'

interface Props {
    listings: any
}

const INITIAL_REGION = {
    latitude: 52.53269,
    longitude: 13.41805,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
}

const ListingsMap = ({ listings }: Props) => {


    return (
        <View style={defaultStyles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={'google'}
                initialRegion={INITIAL_REGION}
                showsMyLocationButton={true}
                showsCompass={true}
                showsScale={true}
                region={INITIAL_REGION}
            >
                {
                    listings.map((item: AirbnbListing) => (
                        <Marker
                            key={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}
                            title={item.name}
                            description={item.description}
                        />
                    ))
                }
            </MapView>

        </View>
    )
}


const styles = StyleSheet.create(
    {

    }
)

export default ListingsMap