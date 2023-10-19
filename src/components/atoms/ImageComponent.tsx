/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React, {useState} from 'react';
import style from '../../../src/screens/CategoryProducts/categoryStyles';

const ImageComponent = ({imageUrl}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Define a placeholder image source
  const placeholderImageSource = require('../../../assets/imageload1.png'); // Replace with your placeholder image source

  return (
    <View testID="imageComponent">
      {!imageLoaded && (
        <Image
          testID="image"
          source={placeholderImageSource}
          style={style.image}
        />
      )}
      <Image
        testID="imageComponent"
        source={{uri: imageUrl}}
        style={[style.image, {display: imageLoaded ? 'flex' : 'none'}]}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
    </View>
  );
};

export default ImageComponent;
