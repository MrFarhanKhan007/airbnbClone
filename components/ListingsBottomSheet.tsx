import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useMemo, useRef, useState } from 'react'
import Listings from './Listings'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'


interface Props {
    listings: any[]
    category: string
}

const ListingsBottomSheet = ({ listings: items, category }: Props) => {

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() =>
        ["10%", "100%"]
        , []
    )

    const [refresh, setrefresh] = useState(0)

    const showMap = () => {
        bottomSheetRef.current?.collapse()
        setrefresh(refresh + 1)
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
            enablePanDownToClose={false}
            style={styles.sheetContainer}
        >
            <View style={styles.contentContainer}>
                <Listings
                    listings={items}
                    category={category}
                    refresh={refresh} />
                <View style={styles.absoluteView}>
                    <TouchableOpacity
                        onPress={showMap}
                        style={styles.btn}
                    >
                        <Text style={{ fontFamily: "mon-sb", color: "#FFF" }}>Map </Text>
                        <Ionicons name="map" size={20} color="#fff"></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
}

export default ListingsBottomSheet

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 14,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});