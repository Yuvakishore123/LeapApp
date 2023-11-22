/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import {
  Route,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/colors';

import {ColorSchemeContext} from '../../../ColorSchemeContext';

import OwnerHomestack from '../Stacks/owner/HomeStack';
import OwnerProfilestack from '../Stacks/owner/ProfileStack';
import Owneradditemsstack from '../Stacks/owner/AdditemsStack';
import OwnerRentalStatusScreen from '../Stacks/owner/RentalStatusStack';

const Tab = createBottomTabNavigator();

const getRouteName = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes('OwnerEditProfile') ||
    routeName?.includes('Owneraddresspage') ||
    routeName?.includes('DeliveryScreen') ||
    routeName?.includes('Owneraddaddress') ||
    routeName?.includes('Owneredititems') ||
    routeName?.includes('OwnerImage') ||
    routeName?.includes('OproductDetails') ||
    routeName?.includes('DashboardDetails') ||
    routeName?.includes('FilteredAnalytics') ||
    routeName?.includes('ApiErrorScreen')
  ) {
    return 'none';
  }
  return 'flex';
};

const Ownerstack = () => {
  const {colorScheme, tabColor} = useContext(ColorSchemeContext);
  const isFocused = useIsFocused();
  let tabBarBackgroundColor: string;
  if (colorScheme === 'dark') {
    tabBarBackgroundColor = Colors.black;
  } else {
    tabBarBackgroundColor = Colors.white;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: Colors.main,

          height: '7%',
          elevation: 30,
          borderColor: Colors.iconscolor,
        },
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.white,
        tabBarLabelStyle: {fontSize: 10, paddingBottom: 5},
      }}>
      <Tab.Screen
        name="Home"
        component={OwnerHomestack}
        options={({route}) => ({
          tabBarTestID: 'Home',
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent = null;

            if (route.name === 'Home') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused ? Colors.buttonColor : '#F0F0F0',
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : tabBarBackgroundColor,
                    },
                  ]}>
                  <MaterialIcon
                    name="home"
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    color={color}
                    size={30}
                  />
                </View>
              );
            }

            return iconComponent;
          },
        })}
      />

      <Tab.Screen
        name="Additem"
        component={Owneradditemsstack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarTestID: 'AddItems',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            const tabIcons = {
              Additem: (
                <View
                  style={[
                    {
                      backgroundColor: focused ? Colors.buttonColor : '#F0F0F0',
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : tabBarBackgroundColor,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="plus-box"
                    color={color}
                    style={tabColor()}
                    size={35}
                  />
                </View>
              ),
              Home: <MaterialIcon name="home" color={color} size={30} />,
              RentalStatus: (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  color={color}
                  size={42}
                />
              ),
              ProfileScreen: (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={42}
                  style={{
                    color: colorScheme === 'dark' ? Colors.white : Colors.black,
                  }}
                />
              ),
            };

            return tabIcons[route.name] || null;
          },
        })}
      />

      <Tab.Screen
        name="RentalStatus"
        component={OwnerRentalStatusScreen}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarTestID: 'RentalStatus',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent = null;

            if (route.name === 'RentalStatus') {
              iconComponent = (
                <View
                  style={[
                    {
                      backgroundColor: focused ? Colors.buttonColor : '#F0F0F0',
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : tabBarBackgroundColor,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="truck-delivery"
                    color={color}
                    style={tabColor()}
                    size={35}
                  />
                </View>
              );
            }

            return iconComponent;
          },
        })}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={OwnerProfilestack}
        options={({route}) => ({
          tabBarTestID: 'Profile',
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            const tabIcons = {
              ProfileScreen: (
                <View
                  style={[
                    {
                      backgroundColor: focused ? Colors.buttonColor : '#F0F0F0',
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : tabBarBackgroundColor,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    size={35}
                  />
                </View>
              ),
              Home: <MaterialIcon name="home" color={color} size={30} />,
              RentalStatus: (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  color={color}
                  size={42}
                />
              ),
              Additem: (
                <View
                  style={[
                    {
                      backgroundColor: focused ? Colors.buttonColor : '#F0F0F0',
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    {
                      backgroundColor: focused
                        ? Colors.buttonColor
                        : tabBarBackgroundColor,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name="plus-box"
                    color={color}
                    style={tabColor()}
                    size={35}
                  />
                </View>
              ),
            };

            return tabIcons[route.name] || null;
          },
        })}
      />
    </Tab.Navigator>
  );
};
export default Ownerstack;
