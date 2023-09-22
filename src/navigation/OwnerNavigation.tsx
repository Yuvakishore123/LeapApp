import {StatusBar} from 'react-native';
import React from 'react';
import Ownerstack from './Ownerbottomtab/Ownerstack';
import {useSelector} from 'react-redux';
import MyStack from './Userbottomtab/UserStack';
const OwnerNavigation = () => {
  // Accessing the 'role' from the Redux store
  const role = useSelector(
    (state: {Rolereducer: {role: null}}) => state.Rolereducer.role,
  );
  return (
    <>
      {/* Setting the status bar color and style */}
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* Conditional rendering based on the user role */}
      {role === 'OWNER' ? <Ownerstack /> : <MyStack />}
    </>
  );
};
export default OwnerNavigation;
