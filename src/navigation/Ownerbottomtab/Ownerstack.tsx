/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import OwnerEditProfile from '../../screens/Ownereditprofile/OwnerEditProfile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneraddresspage from '../../screens/Owneraddaddress/Address';
import Owneraddaddress from '../../screens/Owneraddaddress/AddAddress';
import OwnerProfile from '../../screens/Ownerprofile/OwnerProfile';
import MyRentals from '../../screens/My Rentals/MyRentals';
import OwnerHome from '../../screens/OwnerHomepage/OwnerHome';
import Additems from '../../screens/Additems/Additems';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Route,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import OwnerImage from '../../screens/OwnerImage/AddImages';

import OproductDetails from '../../screens/OwnerProductdetailsPage/OproductDetails';
import Owneredititems from '../../screens/Owneredititems/Owneredititems';
import Colors from '../../constants/colors';
import EditAddress from '../../screens/EditAddress/EditAddress';
import {View} from 'react-native';
import DashboardDetails from '../../screens/OwnerHomepage/DashboardDetails';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import FilteredAnalytics from '../../screens/FilteredAnalytics/FilteredAnalytics';
import OwnerRentalScreen from '../../screens/ownerRentalStatusScreen/ownerRentalScreen';
import OwnerRentalDetailsScreen from '../../screens/ownerRentaldetailsScreen/ownerRentaldetailsScreen';
import ApiErrorScreen from '../../screens/ApiErrorScreen/ApiErrorScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const OwnerProfilestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
      <Stack.Screen name="OwnerEditProfile" component={OwnerEditProfile} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="Owneredititems" component={Owneredititems} />
      <Stack.Screen name="Owneraddresspage" component={Owneraddresspage} />
      <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
      <Stack.Screen name="MyRentals" component={MyRentals} />
      <Stack.Screen name="OproductDetails" component={OproductDetails} />
    </Stack.Navigator>
  );
};

const DeliveryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DeliveryScreen">
      <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} />
    </Stack.Navigator>
  );
};

const OwnerHomestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerHome">
      <Stack.Screen name="ApiErrorScreen" component={ApiErrorScreen} />
      <Stack.Screen name="OwnerHome" component={OwnerHome} />

      <Stack.Screen name="Additems" component={Additems} />
      <Stack.Screen name="MyRentals" component={MyRentals} />

      <Stack.Screen name="DashboardDetails" component={DashboardDetails} />
      <Stack.Screen name="FilteredAnalytics" component={FilteredAnalytics} />

      <Stack.Screen name="OproductDetails" component={OproductDetails} />
    </Stack.Navigator>
  );
};
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

const Owneradditemsstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Additems">
      <Stack.Screen name="Additems" component={Additems} />
      <Stack.Screen name="OwnerImage" component={OwnerImage} />

      <Stack.Screen name="OwnerHome" component={OwnerHome} />
    </Stack.Navigator>
  );
};
const OwnerRentalStatusScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerRentalScreen">
      <Stack.Screen name="OwnerRentalScreen" component={OwnerRentalScreen} />
      <Stack.Screen
        name="OwnerRentalDetailsScreen"
        component={OwnerRentalDetailsScreen}
      />
    </Stack.Navigator>
  );
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
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

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
            } else if (route.name === 'Additem') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={42}
                />
              );
            } else if (route.name === 'RentalStatus') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  color={color}
                  size={42}
                />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={42}
                />
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
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;
            let iconComponent;
            if (route.name === 'Additem') {
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
                    name="plus-box"
                    color={color}
                    style={tabColor()}
                    size={35}
                  />
                </View>
              );
            } else if (route.name === 'Home') {
              iconComponent = (
                <MaterialIcon name="home" color={color} size={30} />
              );
            } else if (route.name === 'RentalStatus') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  color={color}
                  size={42}
                />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={42}
                  style={{
                    color: colorScheme === 'dark' ? Colors.white : Colors.black,
                  }}
                />
              );
            }

            return iconComponent;
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
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;
            let iconComponent;
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
            } else if (route.name === 'Home') {
              iconComponent = (
                <MaterialIcon name="home" color={color} size={30} />
              );
            } else if (route.name === 'Additem') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={42}
                />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={42}
                  style={{
                    color: colorScheme === 'dark' ? Colors.white : Colors.black,
                  }}
                />
              );
            }

            return iconComponent;
          },
        })}
      />
      <Tab.Screen
        name="DeliveryScreen"
        component={DeliveryStack}
        options={({route}) => ({
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,
            height: '7%',
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'DeliveryScreen') {
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
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    size={35}
                  />
                </View>
              );
            } else if (route.name === 'Home') {
              iconComponent = (
                <MaterialIcon name="home" color={color} size={30} />
              );
            } else if (route.name === 'Additem') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={35}
                />
              );
            } else if (route.name === 'RentalStatus') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="truck-delivery"
                  color={color}
                  size={35}
                />
              );
            } else if (route.name === 'ProfileScreen') {
              iconComponent = (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  style={{
                    color: colorScheme === 'dark' ? Colors.white : Colors.black,
                  }}
                  size={35}
                />
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
          tabBarStyle: {
            display: getRouteName(route),
            backgroundColor: tabBarBackgroundColor,

            height: '7%',
          },
          tabBarIcon: ({focused, color}) => {
            if (!isFocused) return null;

            let iconComponent;

            if (route.name === 'ProfileScreen') {
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
                    name="account"
                    color={color}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    size={35}
                  />
                </View>
              );
            } else if (route.name === 'Home') {
              iconComponent = (
                <MaterialIcon name="home" color={color} size={30} />
              );
            } else if (route.name === 'Additem') {
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
                    name="plus-box"
                    color={color}
                    style={{
                      color:
                        colorScheme === 'dark' ? Colors.white : Colors.black,
                    }}
                    size={35}
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
export default Ownerstack;
