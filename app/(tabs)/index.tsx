import { View, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/exploreHeader'
import listingsData from "@/assets/data/csvjsonLatest.json"
import ListingsMap from '@/components/ListingsMap'

import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Explore = () => {
  const [category, setcategory] = useState("Tiny Homes")

  const items = useMemo(() => listingsData as any, [])

  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category)
    setcategory(category)
  }

  return (
    <View style={{ flex: 1,marginTop:-50}}>
      <Stack.Screen
        options={
          {
            header: () =>
              <ExploreHeader onCategoryChanged={onDataChanged} />
          }
        }
      />
      {/* <Listings listings={items} category={category} /> */}
      {/* <ListingsMapMyLocation listing={items}></ListingsMapMyLocation> */}
      <ListingsMap listings={items}></ListingsMap>
      <ListingsBottomSheet
        listings={items}
        category={category}>
      </ListingsBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
 
})

export default Explore