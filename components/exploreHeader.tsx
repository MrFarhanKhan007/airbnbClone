import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const ExploreHeader = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View style={styles.searchTextContainer}>
                                <Text style={styles.whereTo}>Where To?</Text>
                                <Text style={styles.anywhereAnyweekText}>Anywhere Any Week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default ExploreHeader

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "#fff",
            height: 130
        },
        actionRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingBottom: 16
        },
        filterBtn: {

            padding: 10,
            borderWidth: 1,
            borderColor: Colors.grey,
            borderRadius: 50
        },
        whereTo: {
            fontFamily: "mon-sb"
        },
        anywhereAnyweekText: {
            fontFamily: "mon",
            color: Colors.grey
        },
        searchBtn: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderColor: "#c2c2c2",
            borderWidth: StyleSheet.hairlineWidth
        },
        searchTextContainer: {
        }

    }
)
