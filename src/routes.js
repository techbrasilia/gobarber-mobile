import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function NewTabs({ navigation }) {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignSelf: 'center',
        },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <AppStack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          headerTitleStyle: {
            marginLeft: 20,
          },
          headerTitle: 'Selecione o prestador',
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}
              >
                <Icon name="chevron-left" size={20} color="#FFF" />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <AppStack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          headerTitle: 'Selecione a data e hora',
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SelectProvider');
                }}
              >
                <Icon name="chevron-left" size={20} color="#FFF" />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <AppStack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: 'Confirme o agendamento',
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SelectDateTime');
                }}
              >
                <Icon name="chevron-left" size={20} color="#FFF" />
              </TouchableOpacity>
            </>
          ),
        }}
      />
    </AppStack.Navigator>
  );
}

export default Rotas = ({ isSignedIn = false, navigation }) => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
      >
        {isSignedIn ? (
          <AppStack.Screen name="Home">
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                      iconName = focused ? 'event' : 'event';
                    } else if (route.name === 'Profile') {
                      iconName = focused ? 'person' : 'person';
                    } else if (route.name === 'New') {
                      iconName = focused
                        ? 'add-circle-outline'
                        : 'add-circle-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255,255,255,0.6)',
                  style: {
                    backgroundColor: '#8d41a8',
                  },
                }}
              >
                <Tab.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={({ route }) => ({
                    tabBarLabel: 'Agendamentos',
                  })}
                />

                <Tab.Screen
                  name="New"
                  component={NewTabs}
                  options={{
                    tabBarLabel: 'Agendar',
                    tabBarVisible: false,
                  }}
                />

                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    tabBarLabel: 'Meu perfil',
                  }}
                />
              </Tab.Navigator>
            )}
          </AppStack.Screen>
        ) : (
          <>
            <AppStack.Screen name="SignIn" component={SignIn} />
            <AppStack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
