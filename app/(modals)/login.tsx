import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Login = () => {
  useWarmUpBrowser()

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        placeholder='Email'
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      >
      </TextInput>

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorView}>

        <View
          style={
            {
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }
          }>
        </View>

        <Text style={styles.separatorText}>
          or
        </Text>

        <View
          style={
            {
              flex: 1,
              borderBottomColor: "#000",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }
          }>
        </View>

      </View>

      <View style={{ gap: 30 }}>

        <TouchableOpacity style={defaultStyles.btnOutline}>

          <Ionicons name="call-outline"
            size={24}
            style={defaultStyles.btnIcon}>
          </Ionicons>

          <Text style={defaultStyles.btnOutlineText}>
            Continue with phone
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={defaultStyles.btnOutline}>

          <Ionicons name="logo-apple"
            size={24}
            style={defaultStyles.btnIcon}>
          </Ionicons>

          <Text style={defaultStyles.btnOutlineText}>
            Continue with Apple
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={defaultStyles.btnOutline}>

          <Ionicons name= "logo-google"
            size={24}
            style={defaultStyles.btnIcon}>
          </Ionicons>

          <Text style={defaultStyles.btnOutlineText}>
            Continue with Google
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={defaultStyles.btnOutline}>

          <Ionicons name= "logo-facebook"
            size={24}
            style={defaultStyles.btnIcon}>
          </Ionicons>

          <Text style={defaultStyles.btnOutlineText}>
            Continue with FaceBook
          </Text>

        </TouchableOpacity>

      </View>

    </View >
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 26
    },

    separatorView: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      marginVertical: 30
    },
    separatorText: {
      fontFamily: "mon-sb",
      color: Colors.grey
    }
  }
)
export default Login