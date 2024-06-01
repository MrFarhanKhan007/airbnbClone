import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/exploreHeader'
import Listings from '@/components/Listings'
import listingsData from "@/assets/data/csvjson.json"

const Explore = () => {
  const [category, setcategory] = useState("Tiny Homes")

  const items = useMemo(() => listingsData as any, [])

  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category)
    setcategory(category)
  }


  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={
          {
            header: () =>
              <ExploreHeader onCategoryChanged={onDataChanged} />
          }
        }
      />
      <Listings listings={items} category={category} />

    </View>
  )
}

export default Explore