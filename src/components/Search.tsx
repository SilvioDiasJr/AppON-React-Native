import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import fonts from '../styles/fonts'
import { TextInputProps } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface SearchProps extends TextInputProps {
  handleSearch?: () => void
}

export function Search({ handleSearch, ...rest}: SearchProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Procurar organizações..."
        {...rest}
      />

      <RectButton
        onPress = {handleSearch}
      >
        <MaterialIcons
          name='search'
          size={35}
          color={colors.icon}
        />
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  search: {
    width: '90%',
    height: 70,
    fontSize: 17,
    color: '#545454',
    fontFamily: fonts.title,
  },
})