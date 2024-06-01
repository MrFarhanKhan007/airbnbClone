import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <View>
            <Text>{id}
            </Text>
        </View>
    )
}

export default Page