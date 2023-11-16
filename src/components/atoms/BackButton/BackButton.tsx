import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from './BackButtonstyles';

// Defining the type of the Props for this component
type Props = {
  navigation: any; // Expecting 'navigation' as a prop
};

// component for the back button
const BackButton = ({navigation}: Props) => {
  return (
    <View style={style.headerS}>
      <View style={style.backButtonContainer}>
        <View style={style.redCircle}>
          {/* Back arrow icon */}
          <Icon
            style={style.viewStyle}
            name="arrow-back-ios"
            size={16}
            color="#000000"
            onPress={() => navigation.goBack()} // Go back when pressed
            testID="back-button" // Test ID for testing purposes
          />
        </View>
      </View>
    </View>
  );
};

export default BackButton;
