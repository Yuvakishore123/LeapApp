import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerRentalScreen from 'screens/OwnerScreens/ownerRentalStatusScreen/ownerRentalScreen';

const Stack = createNativeStackNavigator();

const OwnerRentalStatusScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="OwnerRentalScreen">
      <Stack.Screen name="OwnerRentalScreen" component={OwnerRentalScreen} />
    </Stack.Navigator>
  );
};
export default OwnerRentalStatusScreen;
