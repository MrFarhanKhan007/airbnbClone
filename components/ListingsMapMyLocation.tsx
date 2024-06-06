import { StyleSheet, Platform, PermissionsAndroid, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps'
import listingsData from "@/assets/data/csvjsonLatest.json"
import { defaultStyles } from '@/constants/Styles'
import * as Location from "expo-location";

interface Props {
    listing: any
}

const ListingsMapMyLocation = ({ listing }: Props) => {
    const [region, setRegion] = useState<Region | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        };

        requestLocationPermission();
    }, []);

    if (error) {
        return <View style={defaultStyles.container}><Text>Error: {error}</Text></View>;
    }


    return (
        <View style={defaultStyles.container}>
            {region && (
                <MapView
                    style={StyleSheet.absoluteFill}
                    provider={'google'}
                    region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}

                >
                    <Marker
                        coordinate={
                            {
                                latitude: region.latitude,
                                longitude: region.longitude
                            }} />
                </MapView>
            )}
        </View>
    );
}

export default ListingsMapMyLocation

const styles = StyleSheet.create(
    {
        map: {
            height: "100%",
            width: "100%",
            margin: 1
        }
    }
)