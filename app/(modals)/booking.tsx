import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Colors from '@/constants/Colors'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'

const Booking = () => {
  const router = useRouter()
  const onClearAll = () => {

  }


  return (
    <BlurView style={styles.container}
      experimentalBlurMethod="dimezisBlurView"
      tint="extraLight"
      intensity={70}>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        {/* Foooter */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, styles.searchBtn]}>
            <Ionicons
              name="search-outline"
              size={24}
              color={"#FFF"}
              style={defaultStyles.btnIcon} />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  clearAllText: {
    fontSize: 18,
    fontFamily: "mon-sb",
    textDecorationLine: "underline"
  },
  searchBtn: {
    paddingRight: 20,
    paddingLeft: 50
  },
  searchBtnText: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  searchSection: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  placesContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});

export default Booking