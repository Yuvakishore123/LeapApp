import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilteredAnalytics from '../../../screens/OwnerScreens/FilteredAnalytics/FilteredAnalytics';
import DashboardDetails from '../../../screens/OwnerScreens/OwnerHomepage/DashboardDetails';
import Additems from '../../../screens/OwnerScreens/Additems/Additems';
import OwnerHome from '../../../screens/OwnerScreens/OwnerHomepage/OwnerHome';
import MyRentals from '../../../screens/OwnerScreens/My Rentals/MyRentals';
import OproductDetails from '../../../screens/OwnerScreens/OwnerProductdetailsPage/OproductDetails';
const Stack = createNativeStackNavigator();

const OwnerHomestack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerHome">
      <Stack.Screen name="OwnerHome" component={OwnerHome} />

      <Stack.Screen name="Additems" component={Additems} />
      <Stack.Screen name="MyRentals" component={MyRentals} />

      <Stack.Screen name="DashboardDetails" component={DashboardDetails} />
      <Stack.Screen name="FilteredAnalytics" component={FilteredAnalytics} />

      <Stack.Screen name="OproductDetails" component={OproductDetails} />
    </Stack.Navigator>
  );
};
export default OwnerHomestack;
