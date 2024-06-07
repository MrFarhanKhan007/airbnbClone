import { View, StyleSheet, Text } from 'react-native'
import React from "react"
import { Marker } from "react-native-maps"
import { defaultStyles } from '@/constants/Styles'
import { AirbnbListing } from '@/assets/data/airbnblistingsinterface'
import { useRouter } from 'expo-router'
import MapView from "react-native-map-clustering"

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

    const router = useRouter()
    const onMarkerSelected = (item: AirbnbListing) => {
        router.push(`/listing/${item.id}`)
    }

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <View style={styles.marker}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontFamily: 'mon-sb',
            }}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

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
                clusterColor='#FFF'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}
            >
                {
                    listings.map((item: AirbnbListing) => (
                        <Marker
                            key={item.id}
                            onPress={() => { onMarkerSelected(item) }}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude
                            }}
                            title={item.name}
                            description={item.description}
                        >
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>
                                    {item.price}
                                </Text>
                            </View>
                        </Marker>
                    ))
                }
            </MapView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
})

export default ListingsMap