import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Alert, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../components/Card'

import { Search } from '../components/Search'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/native';

interface Orgs {
  id: string,
  avatar_url?: string,
  name: string,
  bio: string,
  html_url: string,
  favorite: boolean
}

export function Favorites() {
  const [orgsFavorites, setOrgsFavorites] = useState<Orgs[]>([])
  const [isRemoveOrg, setIsRemoveOrg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)
  const [textInput, setTextInput] = useState<String>()

  const navigation = useNavigation()

  const getStorageData = async () => {
    const data = await AsyncStorage.getItem('@on:favoritesOrgs')
    const dataOrgs = JSON.parse(data!)
    setOrgsFavorites(dataOrgs)
    setIsLoading(true)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Atualizou a página')
    });
    getStorageData()
  }, [isRemoveOrg, isLoading, navigation])


  async function removeOrgFavorite(orgId: string, orgName: string) {
    if (orgId !== '') {
      Alert.alert('',
        `Deseja retirar ${orgName} da lista de favoritos?`,
        [
          {
            text: "Não",
            onPress: () => console.log('Cancel Pressed')
          },
          {
            text: "Sim",
            onPress: () => removeOrg()
          }
        ]
      )

      async function removeOrg() {
        const newArrayOrgs = orgsFavorites.filter((org) => org.id !== orgId)

        const data = JSON.stringify(newArrayOrgs)
        await AsyncStorage.setItem('@on:favoritesOrgs', data)

        setIsRemoveOrg(!isRemoveOrg ? true : false)
      }
    }
  }

  async function handleTextSearch(value: string) {
    setTextInput(value)
  }

  function handleOrganization() {
    setIsLoading(!isLoading ? true : false)

    if (textInput) {
      const newData = orgsFavorites.filter(item => item.name == textInput)
      if (newData.length > 0) {
        setOrgsFavorites(newData)
      } else {
        Alert.alert('A organização pesquisada não está entre as favoritas!')
      }
    }
  }

  const onRefresh = () => {
    setIsRefresh(true)
    getStorageData()
    setIsRefresh(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Suas organizações salvas
      </Text>
      <Search
        handleSearch={handleOrganization}
        onChangeText={handleTextSearch}
      />

      <FlatList
        data={orgsFavorites}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isRefresh}
        extraData={orgsFavorites}
        renderItem={({ item }) => (
          <Card
            key={item.id}
            name={item.name}
            avatar_url={item.avatar_url}
            bio={item.bio}
            html_url={item.html_url}
            isFavorite={item.favorite}
            handleSaveOrg={() => removeOrgFavorite(item.id, item.name)}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
    color: colors.message,
    fontFamily: fonts.title,
    textAlign: 'center',
  },
  messageError: {
    width: '70%',
    textAlign: 'center',
    fontFamily: fonts.messageError,
    color: colors.message,
    fontSize: 15
  }
})