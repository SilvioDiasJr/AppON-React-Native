import { StatusBar } from 'expo-status-bar'
import React from 'react'
import AppLoading from 'expo-app-loading'
import { StyleSheet, View } from 'react-native'

import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_300Light
} from '@expo-google-fonts/roboto'
import AuthRoutes from './src/routes/routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from './src/styles/colors'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_300Light,
    Roboto_500Medium
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <AuthRoutes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525'
  }
})
