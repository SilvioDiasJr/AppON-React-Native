import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native"
import { MaterialIcons } from '@expo/vector-icons'

import { Home } from '../pages/Home';
import { Favorites } from '../pages/Favorites';
import colors from '../styles/colors';
import { Platform } from 'react-native';
import { SearchPage } from '../pages/SearchPage';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <AppTab.Navigator
        tabBarOptions={{
          activeTintColor: colors.active,
          inactiveTintColor: colors.icon,
          labelPosition: 'beside-icon',
          style: {
            paddingVertical:Platform.OS === 'ios' ? 20 : 0,
            height: 65,
            backgroundColor: colors.backgroundCard
          }
        }}
      >
        <AppTab.Screen
          name="Início" component={Home}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="home"
                size={size}
                color={color}
              />
            ))
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Início');
            },
          })}
        />

        <AppTab.Screen
          name="Pesquisar" component={SearchPage} 
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="search"
                size={size}
                color={color}
              />
            ))
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('Pesquisar');
            },
          })}
        />

        <AppTab.Screen
          name="Favoritos" component={Favorites}
          options={{
            tabBarIcon: (({ size, color }) => (
              <MaterialIcons
                name="favorite"
                size={size}
                color={color}
              />
            ))
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              navigation.navigate('Favoritos');
            },
          })}
        />
      </AppTab.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoutes