import { View, Text, StyleSheet, ListRenderItem, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef, useCallback, PureComponent, memo } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { AirbnbListing } from '@/assets/data/airbnblistingsinterface';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods, BottomSheetVirtualizedList, BottomSheetVirtualizedListMethods } from '@gorhom/bottom-sheet';

interface Props {
  listings: any[],
  category: string;
  refresh: number
}

type RowItemProps = {
  item: AirbnbListing;
};


const Listings = React.memo(({ listings: items, category, refresh }: Props) => {

  const [loading, setloading] = useState(false)
  const listRef = useRef<BottomSheetVirtualizedListMethods>(null)

  const getItem = (items: any[], index: number) => (
    items[index]
  )

  const getItemCount = (items: any[]) => (items.length)

  useEffect(() => {
    console.log("REFRESH_LISTINGS_")
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [refresh])

  useEffect(
    () => {
      console.log("Reload Listings", items.length)
      setloading(true)
      setTimeout(() => {
        setloading(false)
      }, 300);
    }, [category]
  )

  const RowItem: React.FC<RowItemProps> = React.memo(({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.listing}
        >
          <Image
            style={styles.image}
            source={{ uri: item.picture_url }}
          />
          <TouchableOpacity style={{ position: "absolute", right: 30, top: 30 }}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 15 }}>
            <Text style={{ fontSize: 16, fontFamily: "mon-sb", width: 250 }}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              {item.review_scores_rating != null ? (
                <Text style={{ fontFamily: "mon-sb" }}>{item.review_scores_rating}</Text>
              ) : (
                <Text style={{ fontFamily: "mon-sb" }}>N/A</Text>
              )}
            </View>
          </View>
          <Text style={{ fontFamily: "mon" }}> {item.room_type}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            {!Number.isNaN(item.review_scores_rating) ? (
              <Text style={{ fontFamily: "mon-sb" }}> {item.price}</Text>
            ) : (
              <Text style={{ fontFamily: "mon-sb" }}>N/A</Text>
            )}
            <Text style={{ fontFamily: "mon" }}>/ night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  ), (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

  const renderRow: ListRenderItem<AirbnbListing> = useCallback(({ item }) => (
    <RowItem item={item} />
  ), []);

  // const renderRow: ListRenderItem<AirbnbListing> = useCallback(({ item }) => (
  //   <Link href={`/listing/${item.id}`} asChild>
  //     <TouchableOpacity>
  //       <Animated.View
  //         entering={FadeInRight}
  //         exiting={FadeOutLeft}
  //         style={styles.listing}>
  //         <Image
  //           style={styles.image}
  //           source={
  //             {
  //               uri: item.picture_url
  //             }
  //           }
  //         />
  //         <TouchableOpacity
  //           style={
  //             {
  //               position: "absolute", right: 30, top: 30
  //             }
  //           }
  //         >
  //           <Ionicons name="heart-outline" size={24} color="#000"></Ionicons>
  //         </TouchableOpacity>
  //         <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 15 }}>
  //           <Text style={{ fontSize: 16, fontFamily: "mon-sb", width: 250 }}>{item.name}</Text>
  //           <View style={{ flexDirection: "row", gap: 4 }}>
  //             <Ionicons name="star" size={16}></Ionicons>
  //             {item.review_scores_rating != null ? (
  //               <Text style={{ fontFamily: "mon-sb" }}>{item.review_scores_rating}</Text>
  //             ) : (
  //               <Text style={{ fontFamily: "mon-sb" }}>N/A</Text>
  //             )}
  //           </View>
  //         </View>

  //         <Text style={{ fontFamily: "mon" }}> {item.room_type}</Text>
  //         <View style={{ flexDirection: "row", gap: 4 }}>
  //           {!Number.isNaN(item.review_scores_rating) ? (
  //             <Text style={{ fontFamily: "mon-sb" }}> {item.price}</Text>
  //           ) : (
  //             <Text style={{ fontFamily: "mon-sb" }}>N/A</Text>
  //           )}
  //           <Text style={{ fontFamily: "mon" }}>/ night</Text>
  //         </View>

  //       </Animated.View>
  //     </TouchableOpacity>
  //   </Link>
  // ), [])

  return (
    <View style={defaultStyles.container}>
      <BottomSheetVirtualizedList
        ListHeaderComponent={<Text style={styles.info}>
          {items.length} homes
        </Text>}

        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={(item) => item.id.toString()}
      ></BottomSheetVirtualizedList>
    </View>
  )
}
)

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
    },
    info: {
      fontFamily: "mon-sb",
      textAlign: "center",
      fontSize: 16,
      marginTop: 4
    }
  }
)

export default memo(Listings)