import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryProducts from '../../../screens/BorrowerScreens/CategoryProducts/CategoryProducts';
import Homescreen from '../../../screens/BorrowerScreens/Home/Homescreen';
import SearchResultsScreen from '../../../screens/BorrowerScreens/SearchResultScreen/SearchResultScreen';
import Subcategory from '../../../screens/BorrowerScreens/Subcategory/Subcategory';
import UProductDetails from '../../../screens/BorrowerScreens/UProductDetails/UProductDetails';
import ApiErrorScreen from '../../../screens/Common/ApiErrorScreen/ApiErrorScreen';
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
export default HomeStack;
