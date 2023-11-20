import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from 'screens/BorrowerScreens/Cart/Cart';
import CheckoutScreen from 'screens/BorrowerScreens/CheckoutScreen/CheckoutScreen';
import EditAddress from 'screens/Common/EditAddress/EditAddress';
import PaymentFailScreen from 'screens/Common/PaymentScreens/PaymentFailScreen';
import PaymentSuccessScreen from 'screens/Common/PaymentScreens/PaymentSuccessScreen';
import Owneraddresspage from 'screens/OwnerScreens/Owneraddaddress/Address';
import Owneraddaddress from 'screens/OwnerScreens/Owneraddaddress/AddAddress';
const Stack = createNativeStackNavigator();
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
export default CartStack;
