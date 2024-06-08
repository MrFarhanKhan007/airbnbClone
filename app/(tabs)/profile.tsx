import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { defaultStyles } from '@/constants/Styles'

const profile = () => {
  const { signOut, isSignedIn } = useAuth()
  const { user } = useUser()
  const [firstName, setfirstName] = useState(user?.firstName)
  const [lastName, setlastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }
    else {
      setfirstName(user.firstName)
      setlastName(user.lastName)
      setEmail(user.emailAddresses[0].emailAddress)
    }
  }, [user])

  const onSaveUser = async () => {
    setEdit(false)
  }

  const onCaptureImage = async () => {

  }


  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26}></Ionicons>
      </View>

      {!isSignedIn && (
        <Link href={`/(modals)/login`}>
          <Button

            title='Log in'
            onPress={() => { }}
            color={Colors.dark}

          />
        </Link>

      )}

      {
        user && (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={onCaptureImage}
            >
              <Image
                source={
                  {
                    uri: user?.imageUrl
                  }
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 6 }}>
              {
                edit ? (
                  <TouchableOpacity
                    onPress={onSaveUser}>
                    <Ionicons name="checkmark-outline" size={24}></Ionicons>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.editRow}>
                    <Text style={{ fontFamily: "mon-sb", fontSize: 22 }}>
                      {firstName} {lastName}
                    </Text>
                    <TouchableOpacity
                      onPress={() => { setEdit(true) }}
                    >
                      <Ionicons name="create-outline" size={24} color={Colors.dark}></Ionicons>
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
            <Text style={{ fontFamily: "mon" }}>{email}</Text>
            <Text style={{ fontFamily: "mon" }}>Since {user?.createdAt?.toLocaleDateString()}</Text>
          </View>
        )
      }

      {isSignedIn && (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => signOut()} style={styles.btn}>
            <Text style={defaultStyles.btnText}>Log out</Text>
          </TouchableOpacity>
        </View>
      )}



    </ SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btn: {
    backgroundColor: Colors.dark,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100
  }
});


export default profile