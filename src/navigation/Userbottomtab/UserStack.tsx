/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import Profile from 'screens/Profile/Profile';
import Homescreen from 'screens/Home/Homescreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryIcon from 'react-native-vector-icons/AntDesign';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Wishlist from 'screens/Wishlist/Wishlist';
import Cart from 'screens/Cart/Cart';

import Category from 'screens/Category/Category';
import UProductDetails from 'screens/UProductDetails/UProductDetails';
import Subcategory from 'screens/Subcategory/Subcategory';
import CategoryProducts from 'screens/CategoryProducts/CategoryProducts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckoutScreen from 'screens/CheckoutScreen/CheckoutScreen';
import SearchResultsScreen from 'screens/SearchResultScreen/SearchResultScreen';
import Owneraddresspage from 'screens/Owneraddaddress/Address';
import Owneraddaddress from 'screens/Owneraddaddress/AddAddress';
import Ownereditprofile from 'screens/Ownereditprofile/OwnerEditProfile';
import PaymentSuccessScreen from 'screens/PaymentScreens/PaymentSuccessScreen';
import PaymentFailScreen from 'screens/PaymentScreens/PaymentFailScreen';
import {
  Route,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import MyOrder from 'screens/MyOrder/MyOrder';
import EditAddress from 'screens/EditAddress/EditAddress';
import Colors from 'constants/colors';
import {View} from 'react-native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import ApiErrorScreen from 'screens/ApiErrorScreen/ApiErrorScreen';
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

const CategoryStack = () => {
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
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;
            let iconComponent;
            switch (String(route.name)) {
              case 'UserHomescreen':
                const backgroundColor = focused
                  ? Colors.buttonColor
                  : Colors.black;
                const iconBackgroundColor = focused
                  ? Colors.buttonColor
                  : tabBarBackgroundColor;
                iconComponent = (
                  <View
                    style={[
                      {
                        backgroundColor,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      {
                        backgroundColor: iconBackgroundColor,
                      },
                    ]}>
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
                break;

              case 'CategoryScreen':
                iconComponent = (
                  <CategoryIcon name="appstore1" color={color} size={25} />
                );
                break;

              case 'Wishlist':
                iconComponent = (
                  <HeartIcon name="heart" color={color} size={25} />
                );
                break;

              case 'CartScreen':
                iconComponent = (
                  <MaterialIcon name="shopping-cart" color={color} size={25} />
                );
                break;

              case 'ProfileScreen':
                iconComponent = (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={25}
                  />
                );
                break;

              default:
                iconComponent = null;
                break;
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
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            switch (String(route.name)) {
              case 'CategoryScreen':
                const backgroundColor = focused
                  ? Colors.buttonColor
                  : Colors.white;
                const iconBackgroundColor = focused
                  ? Colors.buttonColor
                  : tabBarBackgroundColor;
                iconComponent = (
                  <View
                    style={[
                      {
                        backgroundColor,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      {
                        backgroundColor: iconBackgroundColor,
                      },
                    ]}>
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
                break;

              case 'UserHomescreen':
                iconComponent = (
                  <MaterialCommunityIcons name="home" color={color} size={25} />
                );
                break;

              case 'Wishlist':
                iconComponent = (
                  <HeartIcon name="heart" color={color} size={25} />
                );
                break;

              case 'CartScreen':
                iconComponent = (
                  <MaterialIcon name="shopping-cart" color={color} size={25} />
                );
                break;

              case 'ProfileScreen':
                iconComponent = (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={25}
                  />
                );
                break;

              default:
                iconComponent = null;
                break;
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

            switch (String(route.name)) {
              case 'Wishlist':
                const backgroundColor = focused
                  ? Colors.buttonColor
                  : Colors.white;
                const iconBackgroundColor = focused
                  ? Colors.buttonColor
                  : tabBarBackgroundColor;
                iconComponent = (
                  <View
                    style={[
                      {
                        backgroundColor,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      {
                        backgroundColor: iconBackgroundColor,
                      },
                    ]}>
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
                break;

              case 'UserHomescreen':
                iconComponent = (
                  <MaterialCommunityIcons name="home" color={color} size={25} />
                );
                break;

              case 'CartScreen':
                iconComponent = (
                  <MaterialIcon name="shopping-cart" color={color} size={25} />
                );
                break;

              case 'CategoryScreen':
                iconComponent = (
                  <CategoryIcon name="appstore1" color={color} size={25} />
                );
                break;

              case 'ProfileScreen':
                iconComponent = (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={25}
                  />
                );
                break;

              default:
                iconComponent = null;
                break;
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
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            switch (String(route.name)) {
              case 'CartScreen':
                const backgroundColor = focused
                  ? Colors.buttonColor
                  : Colors.white;
                const iconBackgroundColor = focused
                  ? Colors.buttonColor
                  : tabBarBackgroundColor;
                iconComponent = (
                  <View
                    style={[
                      {
                        backgroundColor,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                      {
                        backgroundColor: iconBackgroundColor,
                      },
                    ]}>
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
                break;

              case 'UserHomescreen':
                iconComponent = (
                  <MaterialCommunityIcons name="home" color={color} size={25} />
                );
                break;

              case 'Wishlist':
                iconComponent = (
                  <HeartIcon name="heart" color={color} size={25} />
                );
                break;

              case 'CategoryScreen':
                iconComponent = (
                  <CategoryIcon name="appstore1" color={color} size={25} />
                );
                break;

              case 'ProfileScreen':
                iconComponent = (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={25}
                  />
                );
                break;

              default:
                iconComponent = null;
                break;
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

            switch (String(route.name)) {
              case 'ProfileScreen':
                const backgroundColor = focused
                  ? Colors.buttonColor
                  : Colors.white;
                const iconBackgroundColor = focused
                  ? Colors.buttonColor
                  : tabBarBackgroundColor;
                iconComponent = (
                  <View
                    style={[
                      {
                        backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                      },
                      {
                        backgroundColor: iconBackgroundColor,
                      },
                    ]}>
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
                break;

              case 'UserHomescreen':
                iconComponent = (
                  <MaterialCommunityIcons name="home" color={color} size={25} />
                );
                break;

              case 'Wishlist':
                iconComponent = (
                  <HeartIcon name="heart" color={color} size={25} />
                );
                break;

              case 'CategoryScreen':
                iconComponent = (
                  <CategoryIcon name="appstore1" color={color} size={25} />
                );
                break;

              case 'CartScreen':
                iconComponent = (
                  <MaterialIcon name="shopping-cart" color={color} size={25} />
                );
                break;

              default:
                iconComponent = null;
                break;
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
