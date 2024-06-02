import { View, Text, Image, StyleSheet, Dimensions, Pressable, Share } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import listingsData from "@/assets/data/csvjsonLatest.json"
import { defaultStyles } from '@/constants/Styles'
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { AirbnbListing } from '@/assets/data/airbnblistingsinterface'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window")

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const listing: AirbnbListing = (listingsData as any[]).find((item) => item.id == id)
    const scrollRef = useAnimatedRef<Animated.ScrollView>()

    const scrollOffset = useScrollViewOffset(scrollRef)
    const shareListing = async () => {
        try {
            await Share.share(
                {
                    title: listing.name,
                    url: listing.listing_url,
                    message: `Check out this latest listing - ${listing.listing_url}`
                }
            )
        } catch (err) {
            console.log(err)
        }
    };


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerBackground: () => (
                    <Animated.View
                        style={[styles.header, headerAnimatedStyle]}
                    >
                    </Animated.View>
                ),
                headerRight: () => (
                    <View style={styles.bar}>
                        <Pressable
                            onPress={shareListing}
                            style={styles.roundButton}>
                            <Ionicons
                                name="share-outline"
                                size={22}
                                color={"#000000"}
                            />
                        </Pressable>
                        <Pressable
                            onPress={() => { }}
                            style={styles.roundButton}>
                            <Ionicons
                                name="heart-outline"
                                size={22}
                                color={"#000000"}
                            />
                        </Pressable>
                    </View>
                ),
                headerLeft: () => (
                    <Pressable
                        onPress={navigation.goBack}
                        style={styles.roundButton}>
                        <Ionicons
                            name="chevron-back"
                            size={22}
                            color={"#000000"}
                        />
                    </Pressable>
                )
            }

        )

    }, []
    )

    const headerAnimatedStyle = useAnimatedStyle(
        () => {
            return {
                opacity: interpolate(
                    scrollOffset.value,
                    [0,IMG_HEIGHT/1.5],
                    [0,1]
                )
            }

        }
    )

    const imageAnimatedStyle = useAnimatedStyle(
        () => {
            return {
                transform: [
                    {
                        translateY: interpolate(
                            scrollOffset.value,
                            [-IMG_HEIGHT, 0, IMG_HEIGHT],
                            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                        )
                    },
                    {
                        scale: interpolate(
                            scrollOffset.value,
                            [-IMG_HEIGHT, 0, IMG_HEIGHT],
                            [2, 1, 1]
                        )
                    }
                ]
            }
        }
    )

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                contentContainerStyle={{ paddingBottom: 100 }}
                scrollEventThrottle={16}
                style={
                    {

                    }
                }
            >
                <Animated.Image
                    source={{ uri: listing.picture_url }}
                    style={[styles.image, imageAnimatedStyle]}
                    resizeMode="cover"
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{listing.name}</Text>
                    <Text style={styles.location}>
                        {listing.room_type} in {listing.neighbourhood}
                    </Text>
                    <Text style={styles.rooms}>
                        {listing.accommodates} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
                        {listing.bathrooms} bathrooms
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {listing.review_scores_rating} · {listing.number_of_reviews} reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image
                            style={
                                styles.host
                            }
                            source={
                                {
                                    uri: listing.host_picture_url
                                }
                            }
                        />

                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
                            <Text>Host since {listing.host_since}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{listing.description}</Text>
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={defaultStyles.footer}
                entering={SlideInDown.delay(200)
                }
            >
                <View
                    style={
                        {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }
                    }
                >
                    <Pressable style={styles.footerText}>
                        <Text style={styles.footerPrice}>{listing.price}</Text>
                        <Text style={{ fontFamily: "mon" }}>/night</Text>
                    </Pressable>

                    <Pressable style={[defaultStyles.btn, { paddingHorizontal: 20 }]}>
                        <Text style={defaultStyles.btnText}>
                            Reserve
                        </Text>
                    </Pressable>

                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        image: {
            height: IMG_HEIGHT,
            width: width,
        },
        infoContainer: {
            padding: 24,
            backgroundColor: '#fff',
        },
        name: {
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: 'mon-sb',
        },
        location: {
            fontSize: 18,
            marginTop: 10,
            fontFamily: 'mon-sb',
        },
        rooms: {
            fontSize: 16,
            color: Colors.grey,
            marginVertical: 4,
            fontFamily: 'mon',
        },
        ratings: {
            fontSize: 16,
            fontFamily: 'mon-sb',
        },
        divider: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: Colors.grey,
            marginVertical: 16,
        },
        host: {
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: Colors.grey,
        },
        hostView: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        footerText: {
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
        },
        footerPrice: {
            fontSize: 18,
            fontFamily: 'mon-sb',
        },
        roundButton: {
            width: 40,
            height: 40,
            borderRadius: 50,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            color: Colors.primary,
            elevation: 5
        },
        bar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        },
        header: {
            backgroundColor: '#fff',
            height: 100,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.grey,
        },

        description: {
            fontSize: 16,
            marginTop: 10,
            fontFamily: 'mon',
            textAlign: "justify",
        },

    })

export default Page