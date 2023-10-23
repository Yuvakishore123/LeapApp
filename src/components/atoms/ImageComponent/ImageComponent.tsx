/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import style from '../../../screens/CategoryProducts/categoryStyles';

const ImageComponent = ({imageUrl, imageLoaded, setImageLoaded}) => {
  // Define a placeholder image source
  const placeholderImageSource = require('../../../../assets/imageload1.png'); // Replace with your placeholder image source

  return (
    <View>
      {!imageLoaded && (
        <Image
          testID="placeholder-image"
          source={placeholderImageSource}
          style={style.image}
        />
      )}
      <Image
        testID="main-image"
        source={{uri: imageUrl}}
        style={[style.image, {display: imageLoaded ? 'flex' : 'none'}]}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
    </View>
  );
};

export default ImageComponent;
