import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons';

import { Card } from '../components/Card'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { FlatList } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

interface Orgs {
  id: string,
  avatar_url?: string,
  name: string,
  bio: string,
  html_url: string,
}

const dataTending = [
  {id: '6154722', name: 'Microsoft', bio: 'Open source projects and samples from Microsoft' , avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4", html_url: "https://api.github.com/users/microsoft"}, 
  {id: '1342004', name: 'Google', bio: "Google ❤️ Open Source" , avatar_url: "https://avatars.githubusercontent.com/u/1342004?v=4", html_url: "https://github.com/google"}, 
  {id: '69631', name: 'Facebook', bio: "We are working to build community through open source technology. NB: members must have two-factor auth." , avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4", html_url: "https://github.com/facebook"}, 
]

export function Home() {
  const [textInput, setTextInput] = useState<String>()
  const [orgs, setOrgs] = useState<Orgs[]>([])
  const [favorite, setFavorite] = useState<Partial<Orgs>>({})
  const [isSaveOrg, setIsSaveOrg] = useState(false)
  const [isDataOrgs, setIsDataOrgs] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function saveOrgFavorite(name: string, idOrg: string ) {
    setIsSaveOrg(isSaveOrg ? false : true)

    const favorite = dataTending.filter(item => item.id == idOrg)
    console.log(favorite)

    if (!isSaveOrg) {
      const existOrgs = await AsyncStorage.getItem('@on:favoritesOrgs')
      console.log(existOrgs)
      let newOrgsSave = JSON.parse(existOrgs!)
      
      if (!newOrgsSave) {
        newOrgsSave = []
      }
      
      newOrgsSave.push(favorite)

      const data = JSON.stringify(newOrgsSave)
      await AsyncStorage.setItem('@on:favoritesOrgs', data)
        .then(() => {
          console.log('Organização salva com sucesso!!')
        })
        .catch(() => {
          console.log('Ocorreu um erro ao salvar a organização!!')
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <View style={styles.header}>
        <MaterialIcons
          name="trending-up"
          size={50}
          color={colors.active}
        />
        <Text style={styles.textHeader}>Organizações em destaque</Text>
        <Text style={styles.descriptionHeader}>Veja as organizações em tendência no github.</Text>
      </View>

      <FlatList
        data={dataTending}
        renderItem={({ item }) => (
          <Card 
            key={item.id}
            name={item.name}
            bio={item.bio}
            avatar_url={item.avatar_url}
            html_url={item.html_url}
            isFavorite={item.isFavorite}
          />
        )}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.backgroundColor,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 20,
    fontFamily: fonts.title,
    color: '#fff'
  },
  descriptionHeader: {
    fontSize: 17,
    textAlign: 'center',
    color: '#f0f0f0',
    fontFamily: fonts.description,
  },
  image: {
    width: 45,
    height:'auto',
  },
  messageError: {
    width: '70%',
    textAlign: 'center',
    fontFamily: fonts.messageError,
    color: colors.message,
    fontSize: 15
  }
})