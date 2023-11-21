import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyOrder from 'screens/BorrowerScreens/MyOrder/MyOrder';
import Profile from 'screens/BorrowerScreens/Profile/Profile';
import ApiErrorScreen from 'screens/Common/ApiErrorScreen/ApiErrorScreen';
import EditAddress from 'screens/Common/EditAddress/EditAddress';
import Owneraddresspage from 'screens/OwnerScreens/Owneraddaddress/Address';
import Owneraddaddress from 'screens/OwnerScreens/Owneraddaddress/AddAddress';
import Ownereditprofile from 'screens/OwnerScreens/Ownereditprofile/OwnerEditProfile';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();
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
export default ProfileStack;
