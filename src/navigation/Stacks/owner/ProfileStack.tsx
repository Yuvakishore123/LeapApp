import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EditAddress from '../../../screens/Common/EditAddress/EditAddress';
import MyRentals from '../../../screens/OwnerScreens/My Rentals/MyRentals';
import OproductDetails from '../../../screens/OwnerScreens/OwnerProductdetailsPage/OproductDetails';
import Owneredititems from '../../../screens/OwnerScreens/Owneredititems/Owneredititems';
import OwnerEditProfile from '../../../screens/OwnerScreens/Ownereditprofile/OwnerEditProfile';
import OwnerProfile from '../../../screens/OwnerScreens/Ownerprofile/OwnerProfile';
import Owneraddresspage from '../../../screens/OwnerScreens/Owneraddaddress/Address';
import Owneraddaddress from '../../../screens/OwnerScreens/Owneraddaddress/AddAddress';
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
export default OwnerProfilestack;
