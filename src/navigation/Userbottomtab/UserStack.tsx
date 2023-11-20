/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wishlist from 'screens/BorrowerScreens/Wishlist/Wishlist';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
  Route,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';

import Colors from 'constants/colors';
import {View} from 'react-native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import HomeStack from '../Stacks/borrower/HomeStack';
import {CategoryStack} from '../Stacks/borrower/CategoryStack';
import CartStack from '../Stacks/borrower/CartStack';
import ProfileStack from '../Stacks/borrower/ProfileStack';
const Tab = createBottomTabNavigator();

const MyStack = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
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
          display: isFocused ? 'flex' : 'none',
          width: '100%',
          height: '8%',
          backgroundColor: tabBarBackgroundColor,
        },
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveTintColor: Colors.white,
      }}>
      <Tab.Screen
        name="UserHomescreen"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor: tabBarBackgroundColor,
          },
          tabBarLabel: 'Home',
          tabBarTestID: 'Home-tab',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            const iconBackgroundColor = focused
              ? Colors.buttonColor
              : tabBarBackgroundColor;

            if (String(route.name) === 'UserHomescreen') {
              iconComponent = (
                <View
                  style={{
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconBackgroundColor,
                  }}>
                  <MaterialCommunityIcons
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="home"
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
        name="CategoryScreen"
        component={CategoryStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
          },
          tabBarLabel: 'Category',
          tabBarTestID: 'categoryTab',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            const iconBackgroundColor = focused
              ? Colors.buttonColor
              : tabBarBackgroundColor;

            if (String(route.name) === 'CategoryScreen') {
              iconComponent = (
                <View
                  style={{
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconBackgroundColor,
                  }}>
                  <CategoryIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="appstore1"
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
        name="Wishlist"
        component={Wishlist}
        options={({route}) => ({
          tabBarLabel: 'Wishlist',
          tabBarTestID: 'Wishlits-Tab',
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            const iconBackgroundColor = focused
              ? Colors.buttonColor
              : tabBarBackgroundColor;

            if (String(route.name) === 'Wishlist') {
              iconComponent = (
                <View
                  style={{
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconBackgroundColor,
                  }}>
                  <HeartIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="heart"
                    color={color}
                    size={25}
                  />
                </View>
              );
            }
            return iconComponent;
          },
        })}
      />

      <Tab.Screen
        name="CartScreen"
        component={CartStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
          },
          tabBarTestID: 'Cart-tab',
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            const iconBackgroundColor = focused
              ? Colors.buttonColor
              : tabBarBackgroundColor;

            if (String(route.name) === 'CartScreen') {
              iconComponent = (
                <View
                  style={{
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: iconBackgroundColor,
                  }}>
                  <MaterialIcon
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    name="shopping-cart"
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
        name="ProfileScreen"
        component={ProfileStack}
        options={({route}) => ({
          tabBarLabel: 'Profile',
          tabBarTestID: 'Profile-tab',
          tabBarStyle: {
            display: getRouteName(route),
            width: '100%',
            height: '8%',
            backgroundColor:
              colorScheme === 'dark' ? Colors.black : Colors.white,
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            const iconBackgroundColor = focused
              ? Colors.buttonColor
              : tabBarBackgroundColor;

            if (String(route.name) === 'ProfileScreen') {
              iconComponent = (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    backgroundColor: iconBackgroundColor,
                  }}>
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={30}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                  />
                </View>
              );
            }

            return iconComponent;
          },
        })}
      />
    </Tab.Navigator>
  );
};
const getRouteName = (route: Partial<Route<string>>) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName?.includes('Ownereditprofile') ||
    routeName?.includes('Owneraddresspage') ||
    routeName?.includes('Owneraddaddress') ||
    routeName?.includes('PaymentSuccessScreen') ||
    routeName?.includes('PaymentFailScreen') ||
    routeName?.includes('UProductDetails') ||
    routeName?.includes('Subcategory') ||
    routeName?.includes('CategoryProducts') ||
    routeName?.includes('CheckoutScreen') ||
    routeName?.includes('MyOrder') ||
    routeName?.includes('EditAddress') ||
    routeName?.includes('ApiErrorScreen')
  ) {
    return 'none';
  }
  return 'flex';
};
export default MyStack;
