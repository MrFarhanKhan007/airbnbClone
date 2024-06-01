import { View, Text, StyleSheet, FlatList, ListRenderItem, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { AirbnbListing } from '@/assets/data/airbnblistingsinterface';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: any[],
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {

  const [loading, setloading] = useState(false)
  const listRef = useRef<FlatList>(null)

  useEffect(
    () => {
      console.log("Reload Listings", items.length)
      setloading(true)
      setTimeout(() => {
        setloading(false)
      }, 200);
    }, [category]
  )

  const renderRow: ListRenderItem<AirbnbListing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.listing}>
          <Image
            style={styles.image}
            source={
              {
                uri: item.picture_url
              }
            }
          />
          <TouchableOpacity
            style={
              {
                position: "absolute", right: 30, top: 30
              }
            }
          >
            <Ionicons name="heart-outline" size={24} color="#000"></Ionicons>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16}></Ionicons>
              <Text style={{ fontFamily: "mon-sb" }}>{item.review_scores_rating}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: "mon" }}> {item.room_type}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb" }}> {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>/ night</Text>

          </View>

        </View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create(
  {

    listing: {
      padding: 16,
      gap: 10,
      marginVertical: 16
    },
    image: {
      width: "100%",
      height: 300,
      borderRadius: 10
    }
  }
)

export default Listings