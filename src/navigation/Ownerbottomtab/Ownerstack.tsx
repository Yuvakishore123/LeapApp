/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
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
  ParamListBase,
  Route,
  RouteProp,
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

// Creating a native stack navigator and a bottom tab navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Function to get route name and control tab bar visibility
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

// Helper function to create a stack screen
const createStackScreen = (name: string, component: any) => {
  return <Stack.Screen name={name} component={component} />;
};

// Helper function to get the tab bar icon
const getTabBarIcon = (
  route: {name: any},
  focused: any,
  isFocused: any,
  name: any,
  icon:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined,
  tabBarBackgroundColor: any,
) => {
  if (!isFocused || route.name !== name) return null;

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
          backgroundColor: focused ? Colors.buttonColor : tabBarBackgroundColor,
        },
      ]}>
      {icon}
    </View>
  );
};

// Define a common function for creating tab screens
const createTabScreen = (
  name: string,
  component:
    | React.ComponentType<{}>
    | React.ComponentType<{
        route: RouteProp<ParamListBase, any>;
        navigation: any;
      }>,
  icon:
    | string
    | number
    | boolean
    | Iterable<React.ReactNode>
    | React.JSX.Element
    | null
    | undefined,
) => {
  const {colorScheme} = useContext(ColorSchemeContext);
  let tabBarBackgroundColor =
    colorScheme === 'dark' ? Colors.black : Colors.white;
  const isFocused = useIsFocused();
  return (
    <Tab.Screen
      name={name}
      component={component}
      options={({route}) => ({
        tabBarStyle: {
          display: getRouteName(route),
          backgroundColor: tabBarBackgroundColor,
          height: '7%',
        },
        tabBarIcon: ({focused}) =>
          getTabBarIcon(
            route,
            focused,
            isFocused,
            name,
            icon,
            tabBarBackgroundColor,
          ),
      })}
    />
  );
};

// Define the OwnerProfilestack component
const OwnerProfilestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      {createStackScreen('OwnerProfile', OwnerProfile)}
      {createStackScreen('OwnerEditProfile', OwnerEditProfile)}
      {createStackScreen('EditAddress', EditAddress)}
      {createStackScreen('Owneredititems', Owneredititems)}
      {createStackScreen('Owneraddresspage', Owneraddresspage)}
      {createStackScreen('Owneraddaddress', Owneraddaddress)}
      {createStackScreen('MyRentals', MyRentals)}
      {createStackScreen('OproductDetails', OproductDetails)}
    </Stack.Navigator>
  );
};

// Define the OwnerHomestack component
const OwnerHomestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerHome">
      {createStackScreen('ApiErrorScreen', ApiErrorScreen)}
      {createStackScreen('OwnerHome', OwnerHome)}
      {createStackScreen('Additems', Additems)}
      {createStackScreen('MyRentals', MyRentals)}
      {createStackScreen('DashboardDetails', DashboardDetails)}
      {createStackScreen('FilteredAnalytics', FilteredAnalytics)}
      {createStackScreen('OproductDetails', OproductDetails)}
    </Stack.Navigator>
  );
};

// Define the Owneradditemsstack component
const Owneradditemsstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Additems">
      {createStackScreen('Additems', Additems)}
      {createStackScreen('OwnerImage', OwnerImage)}
      {createStackScreen('OwnerHome', OwnerHome)}
    </Stack.Navigator>
  );
};

// Define the OwnerRentalStatusScreen component
const OwnerRentalStatusScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerRentalScreen">
      {createStackScreen('OwnerRentalScreen', OwnerRentalScreen)}
      {createStackScreen('OwnerRentalDetailsScreen', OwnerRentalDetailsScreen)}
    </Stack.Navigator>
  );
};

// Define the Ownerstack component
const Ownerstack = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
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
      {createTabScreen(
        'Home',
        OwnerHomestack,
        <MaterialIcon
          name="home"
          color={colorScheme === 'dark' ? Colors.white : Colors.black}
          size={30}
        />,
      )}
      {createTabScreen(
        'Additem',
        Owneradditemsstack,
        <MaterialCommunityIcons
          name="plus-box"
          color={colorScheme === 'dark' ? Colors.white : Colors.black}
          size={30}
        />,
      )}
      {createTabScreen(
        'RentalStatus',
        OwnerRentalStatusScreen,
        <MaterialCommunityIcons
          name="truck-delivery"
          color={colorScheme === 'dark' ? Colors.white : Colors.black}
          size={30}
        />,
      )}
      {createTabScreen(
        'ProfileScreen',
        OwnerProfilestack,
        <MaterialCommunityIcons
          name="account"
          size={30}
          style={{color: colorScheme === 'dark' ? Colors.white : Colors.black}}
        />,
      )}
    </Tab.Navigator>
  );
};

export default Ownerstack;
