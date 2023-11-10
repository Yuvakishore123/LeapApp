import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import Lottie from 'lottie-react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import style from './splashScreenStyles';
import {useSplashScreen} from './useSplashScreen';
import Colors from '../../../constants/colors';

const walkthroughTitleList = [
  {
    id: 1,
    title: 'Looking for a New Style',
    desc: 'Pond of Fashion Dreams ',
    icon: (
      <Lottie source={require('../../../../assets/splash1.json')} autoPlay />
    ),
  },
  {
    id: 2,
    title: 'Fashion Never Sleeps',
    desc: 'Love clothes…Love Style',
    icon: (
      <Lottie source={require('../../../../assets/splash2.json')} autoPlay />
    ),
  },
  {
    id: 3,
    title: 'Be Trendy for every Mood',
    desc: 'Stop Thinking, Just Rent It',
    icon: (
      <Lottie source={require('../../../../assets/splash3.json')} autoPlay />
    ),
  },
];

export default function SplashScreen() {
  const {handleLoginPress, getContainerStyle, getTextColor} = useSplashScreen();
  return (
    <View style={[style.container, getContainerStyle()]}>
      <Swiper
        showsButtons={false}
        loop={false}
        activeDotColor={Colors.buttonColor}
        activeDotStyle={style.activeS}
        dotStyle={style.dotS}
        paginationStyle={[style.paginationstyle]}>
        {walkthroughTitleList.map(item => {
          return (
            <View key={item.id} style={[style.slide, getContainerStyle()]}>
              {item.icon}
              <Text style={[style.title, getTextColor()]}>{item.title}</Text>
              <Text style={[style.desc, getTextColor()]}>{item.desc}</Text>
              {item.id === walkthroughTitleList.length && (
                <TouchableOpacity
                  testID="get-started-button"
                  style={style.touchablebtn}
                  onPress={handleLoginPress}>
                  <Text style={style.touchableText}>Get Started</Text>
                  <Icons name="arrow-forward-ios" size={15} color={'white'} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </Swiper>
    </View>
  );
}
