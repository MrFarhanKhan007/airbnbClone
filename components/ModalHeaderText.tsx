import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors'

const ModalHeaderText = () => {
    const [active, setactive] = useState(0)

    return (
        <View style={{ flexDirection: "row", justifyContent: "center",gap:10}}>
            <TouchableOpacity
                onPress={() => { setactive(0) }}>
                <Text style={{
                    fontFamily: "mon-sb",
                    fontSize: 18,
                    color: active == 0 ? "#000" : Colors.grey,
                    textDecorationLine: active == 0 ? "underline" : "none"
                }}>Stays</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setactive(1) }}>
                <Text
                    style={{
                        fontFamily: "mon-sb",
                        fontSize: 18,
                        color: active == 0 ? "#000" : Colors.grey,
                        textDecorationLine: active == 1 ? "underline" : "none"
                    }}>Experiences</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalHeaderText

const styles = StyleSheet.create(
    {

    })