import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Card } from '../components/Card'
import { Search } from '../components/Search'
import api from '../services/api'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/native';

interface Orgs {
  id?: string,
  avatar_url?: string,
  name: string,
  bio: string,
  html_url: string,
  type: string,
  favorite: boolean
}

export function SearchPage() {
  const [textInput, setTextInput] = useState<String>()
  const [orgs, setOrgs] = useState<Partial<Orgs>>({})
  const [isSaveOrg, setIsSaveOrg] = useState(false)
  const [isDataOrgs, setIsDataOrgs] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTextInput('')
      setOrgs({})

      handleOrganization()
    });
    unsubscribe()
  }, [navigation])

  function handleInputSearch(value: string) {
    setTextInput(value)
  }

  async function handleOrganization() {
    const capitalize = textInput!.charAt(0).toUpperCase() + textInput!.substr(1)

    await api.get(`users/${capitalize}`)
      .then((response) => {
        let data = response.data
        if (data.type === 'Organization') {
          setOrgs(response.data)
          setIsDataOrgs(true)
        } else {
          setIsDataOrgs(false)
          Alert.alert('Organização não encontrada!')
        }
      })
      .catch((err) => {
      })
  }

  async function saveOrgFavorite(id: string) {
    setIsSaveOrg(isSaveOrg ? false : true)

    const orgsSaved = {
      ...orgs,
      favorite: true
    }

    if (!isSaveOrg) {
      const existOrgs = await AsyncStorage.getItem('@on:favoritesOrgs')
      let newOrgsSave = JSON.parse(existOrgs!)
      if (!newOrgsSave) {
        newOrgsSave = []
      } 
console.log()
      newOrgsSave.push(orgsSaved)
      const data = JSON.stringify(newOrgsSave)
      await AsyncStorage.setItem('@on:favoritesOrgs', data)
        .then(() => {
          console.log('Organização salva com sucesso!!')
        })
        .catch(() => {
          console.log('Ocorreu um erro a salvar a organização!!')
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <Search
        handleSearch={handleOrganization}
        onChangeText={handleInputSearch}
      />

      {!isDataOrgs ?
        <View>
          <Text style={styles.title}>
            Pesquise a sua organização favorita,
          </Text>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <Text style={styles.title}>
              para salva-la de um
            </Text>

            <MaterialIcons
              name="favorite"
              size={15}
              color={colors.message}
              style={{ marginLeft: 5 }}
            />
          </View>
        </View>
        :
        <Card
          key={orgs.id}
          name={orgs.name}
          avatar_url={orgs.avatar_url}
          bio={orgs.bio}
          html_url={orgs.html_url}
          isFavorite={isSaveOrg}
          handleSaveOrg={() => saveOrgFavorite(orgs.id!)}
        />
      }
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
  title: {
    fontSize: 17,
    color: colors.message,
    fontFamily: fonts.title,
  },
  messageError: {
    width: '70%',
    textAlign: 'center',
    fontFamily: fonts.messageError,
    color: colors.message,
    fontSize: 15
  }
})