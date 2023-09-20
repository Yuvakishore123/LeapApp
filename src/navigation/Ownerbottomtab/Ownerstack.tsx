/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ParamListBase,
  Route,
  RouteProp,
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import ApiErrorScreen from '../../screens/ApiErrorScreen/ApiErrorScreen';
import OproductDetails from '../../screens/OwnerProductdetailsPage/OproductDetails';
import Owneredititems from '../../screens/Owneredititems/Owneredititems';
import Colors from '../../constants/colors';
import EditAddress from '../../screens/EditAddress/EditAddress';
import DashboardDetails from '../../screens/OwnerHomepage/DashboardDetails';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import FilteredAnalytics from '../../screens/FilteredAnalytics/FilteredAnalytics';
import OwnerRentalScreen from '../../screens/ownerRentalStatusScreen/ownerRentalScreen';
import OwnerRentalDetailsScreen from '../../screens/ownerRentaldetailsScreen/ownerRentaldetailsScreen';
import OwnerImage from '../../screens/OwnerImage/AddImages';
import Owneraddresspage from '../../screens/Owneraddaddress/Address';
import Owneraddaddress from '../../screens/Owneraddaddress/AddAddress';
import OwnerProfile from '../../screens/Ownerprofile/OwnerProfile';
import MyRentals from '../../screens/My Rentals/MyRentals';
import OwnerHome from '../../screens/OwnerHomepage/OwnerHome';
import Additems from '../../screens/Additems/Additems';
import OwnerEditProfile from 'screens/Ownereditprofile/OwnerEditProfile';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabIcons = {
  Home: 'home',
  Additem: 'plus-box',
  RentalStatus: 'truck-delivery',
  ProfileScreen: 'account',
};

const tabScreenOptions = (
  route:
    | RouteProp<ParamListBase, 'Home'>
    | RouteProp<ParamListBase, 'Additem'>
    | RouteProp<ParamListBase, 'RentalStatus'>
    | RouteProp<ParamListBase, 'ProfileScreen'>,
  isFocused: boolean,
  color: number | undefined,
  colorScheme: string,
) => {
  const routeName = route.name;
  const iconName = tabIcons[routeName];

  return {
    tabBarStyle: {
      display: getRouteName(route),
      backgroundColor: tabBarBackgroundColor,
      height: '7%',
    },
    tabBarIcon: ({focused}) => {
      if (!focused) {
        return null;
      }

      return (
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
            name={iconName}
            color={color}
            style={{
              color: colorScheme === 'dark' ? Colors.white : Colors.black,
            }}
            size={35}
          />
        </View>
      );
    },
  };
};

const OwnerProfilestack = () => (
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

const OwnerHomestack = () => (
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

const Owneradditemsstack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Additems">
    <Stack.Screen name="Additems" component={Additems} />
    <Stack.Screen name="OwnerImage" component={OwnerImage} />
    <Stack.Screen name="OwnerHome" component={OwnerHome} />
  </Stack.Navigator>
);

const OwnerRentalStatusScreen = () => (
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

const Ownerstack = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const isFocused = useIsFocused();
  let tabBarBackgroundColor =
    colorScheme === 'dark' ? Colors.black : Colors.white;

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
        options={({route}) =>
          tabScreenOptions(route, isFocused, Colors.black, colorScheme)
        }
      />
      <Tab.Screen
        name="Additem"
        component={Owneradditemsstack}
        options={({route}) =>
          tabScreenOptions(route, isFocused, Colors.black, colorScheme)
        }
      />
      <Tab.Screen
        name="RentalStatus"
        component={OwnerRentalStatusScreen}
        options={({route}) =>
          tabScreenOptions(route, isFocused, Colors.black, colorScheme)
        }
      />
      <Tab.Screen
        name="ProfileScreen"
        component={OwnerProfilestack}
        options={({route}) =>
          tabScreenOptions(route, isFocused, Colors.black, colorScheme)
        }
      />
    </Tab.Navigator>
  );
};

export default Ownerstack;
