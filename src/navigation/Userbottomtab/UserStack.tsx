/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import Profile from 'screens/BorrowerScreens/Profile/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wishlist from 'screens/BorrowerScreens/Wishlist/Wishlist';

import Category from 'screens/BorrowerScreens/Category/Category';
import UProductDetails from 'screens/BorrowerScreens/UProductDetails/UProductDetails';
import Subcategory from 'screens/BorrowerScreens/Subcategory/Subcategory';
import CategoryProducts from 'screens/BorrowerScreens/CategoryProducts/CategoryProducts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckoutScreen from 'screens/BorrowerScreens/CheckoutScreen/CheckoutScreen';
import SearchResultsScreen from 'screens/BorrowerScreens/SearchResultScreen/SearchResultScreen';
import Owneraddresspage from 'screens/OwnerScreens/Owneraddaddress/Address';
import Owneraddaddress from 'screens/OwnerScreens/Owneraddaddress/AddAddress';
import Ownereditprofile from 'screens/OwnerScreens/Ownereditprofile/OwnerEditProfile';
import PaymentSuccessScreen from 'screens/Common/PaymentScreens/PaymentSuccessScreen';
import PaymentFailScreen from 'screens/Common/PaymentScreens/PaymentFailScreen';
import {
  Route,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import MyOrder from 'screens/BorrowerScreens/MyOrder/MyOrder';
import EditAddress from 'screens/Common/EditAddress/EditAddress';
import Colors from 'constants/colors';
import {View} from 'react-native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import ApiErrorScreen from 'screens/Common/ApiErrorScreen/ApiErrorScreen';
import Homescreen from 'screens/BorrowerScreens/Home/Homescreen';
import Cart from 'screens/BorrowerScreens/Cart/Cart';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Homescreen">
      <Stack.Screen name="ApiErrorScreen" component={ApiErrorScreen} />
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen
        name="SearchResultsScreen"
        component={SearchResultsScreen}
      />
      <Stack.Screen name="UProductDetails" component={UProductDetails} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

export const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Category">
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Cart">
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      <Stack.Screen name="Owneraddresspage" component={Owneraddresspage} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
      <Stack.Screen name="PaymentFailScreen" component={PaymentFailScreen} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="ApiErrorScreen" component={ApiErrorScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Ownereditprofile" component={Ownereditprofile} />
      <Stack.Screen name="Owneraddresspage" component={Owneraddresspage} />
      <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
    </Stack.Navigator>
  );
};
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
