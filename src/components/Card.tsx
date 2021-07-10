import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import fonts from '../styles/fonts'
import colors from '../styles/colors';

interface CardProps {
  name?: string,
  bio?: string,
  html_url?: string,
  avatar_url?: string,
  isFavorite: boolean,
  handleSaveOrg?: () => void
}

export function Card({ name, bio, html_url, avatar_url, isFavorite, handleSaveOrg}:CardProps ) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
        source={{ uri: avatar_url }} 
        style={styles.image}
        />
        <MaterialIcons
          name="favorite"
          size={35}
          onPress={handleSaveOrg}
          color={isFavorite ? colors.active : colors.icon }
        />
      </View>
      <Text style={styles.title}>
        { name }
      </Text>
      <Text style={styles.description}>
        { bio }
      </Text>

      <TouchableOpacity
        style={styles.footer}
        onPress = {() => Linking.openURL(`${html_url}`)}
      >
        <Text style={styles.links}>Ir para organização</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    minHeight: 120,
    padding: 15,
    backgroundColor: colors.backgroundCard,
    borderRadius: 8,
    marginBottom: 10
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.title,
    color: colors.title
  },
  description: {
    color: colors.description,
    fontSize: 14,
    fontFamily: fonts.description,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: 28,
    marginTop: 14,
  },
  links: {
    fontSize: 15,
    paddingRight: 8,
    fontFamily: fonts.description,
    color: '#3669ad',
  }
})