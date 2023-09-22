/* eslint-disable react-native/no-inline-styles */
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import {useDispatch} from 'react-redux';
import {ownerorderproducts} from '../../redux/slice/OwnerorderproductSlice';
const OwnerRentalSwitch = () => {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState(0);
  // Animation value for tab switching animation
  const animationValue = useState(new Animated.Value(0))[0];
  // Redux dispatcher for dispatching actions
  const dispatch = useDispatch();
  // Function to handle tab press
  const handleTabPress = (tabIndex: React.SetStateAction<number>) => {
    setSelectedTab(tabIndex);

    // Determine the status based on the selectedTab index
    const status = tabIndex === 0 ? 'Order placed' : 'Returned';

    // Dispatch the async thunk with the selected status
    dispatch(ownerorderproducts(status) as any);

    // Set animation value based on selectedTab
    const toValue = tabIndex === 0 ? 0 : 1;
    Animated.timing(animationValue, {
      toValue,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  // Style for the animated container
  const containerStyle = {
    transform: [
      {
        translateX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-5, 5], // Adjust the value based on the width of your tabs
        }),
      },
    ],
  };
  return (
    <View>
      <View
        style={{
          width: '75%',
          height: 50,
          alignSelf: 'center',
          marginTop: 20,
          borderWidth: 0.5,
          borderRadius: 30,
          backgroundColor: colors.gray,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* Ordered Tab */}
        <TouchableOpacity
          style={{
            width: '50%',
            height: '95%',
            backgroundColor:
              selectedTab === 0 ? colors.buttonColor : colors.gray,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handleTabPress(0);
            setSelectedTab(0);
            Animated.timing(animationValue, {
              toValue: 0,
              duration: 300, // Adjust the duration as needed
              useNativeDriver: false,
            }).start();
          }}>
          <Animated.View style={[containerStyle]}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
              Ordered
            </Text>
          </Animated.View>
        </TouchableOpacity>
        {/* Returned Tab */}
        <TouchableOpacity
          style={{
            width: '50%',
            height: '95%',
            backgroundColor:
              selectedTab === 1 ? colors.buttonColor : colors.gray,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handleTabPress(1);
            setSelectedTab(1);
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 300, // Adjust the duration as needed
              useNativeDriver: false,
            }).start();
          }}>
          <Animated.View style={[containerStyle]}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
              Returned
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OwnerRentalSwitch;
