import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default Rotas = ({ isSignedIn = false }) => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: '#f0f0f5' } }}
        initialRouteName="Home"
      >
        {isSignedIn ? (
          <AppStack.Screen name="Home">
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Agendamentos') {
                      iconName = focused ? 'event' : 'event';
                    } else if (route.name === 'Meu perfil') {
                      iconName = focused ? 'person' : 'person';
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
                <Tab.Screen name="Agendamentos" component={Dashboard} />
                <Tab.Screen name="Meu perfil" component={Profile} />
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
