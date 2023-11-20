import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from '../../../screens/BorrowerScreens/Category/Category';
import CategoryProducts from '../../../screens/BorrowerScreens/CategoryProducts/CategoryProducts';
import Subcategory from '../../../screens/BorrowerScreens/Subcategory/Subcategory';
const Stack = createNativeStackNavigator();
export const CategoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Category">
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Subcategory" component={Subcategory} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
    </Stack.Navigator>
  );
};
