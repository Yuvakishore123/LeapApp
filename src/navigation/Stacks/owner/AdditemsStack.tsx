import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Additems from '../../../screens/OwnerScreens/Additems/Additems';
import OwnerHome from '../../../screens/OwnerScreens/My Rentals/MyRentals';
import OwnerImage from '../../../screens/OwnerScreens/OwnerImage/AddImages';
const Stack = createNativeStackNavigator();
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
export default Owneradditemsstack;
