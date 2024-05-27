import { View, Text } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

const Login = () => {
  useWarmUpBrowser()
  
  return (
    <View>
      <Text>Login Page</Text>
    </View>
  )
}

export default Login