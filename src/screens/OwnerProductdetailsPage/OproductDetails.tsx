/* eslint-disable react/self-closing-comp */
import React from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './OProductDetailsStyle';
import useOProductDetails from './useOProductDetails';
type Props = {
  route: {params: {product: any}};
  navigation: any;
};

const OproductDetails: React.FC<Props> = ({route, navigation}: Props) => {
  const {
    product,
    goBack,
    getContainerStyle,

    getTextColor,
  } = useOProductDetails({
    route,
    navigation,
  });

  return (
    <View style={[styles.container, getContainerStyle()]}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <View style={styles.dheader}>
        <TouchableOpacity
          testID="back-button" // Add the testID prop here
          onPress={goBack}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="black"
            onPress={goBack}
          />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.productImagecon}>
          {product.imageUrl.map((item: any) => (
            <ImageBackground
              testID="product-image"
              key={item}
              style={styles.imgBack}
              source={{uri: item}}></ImageBackground>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.detailsContainer, getContainerStyle()]}>
        <Text style={[styles.startext, getTextColor()]}>{product.name}</Text>
        <View style={styles.titleText}>
          <Text style={[styles.headingtext, getTextColor()]}>Price</Text>
        </View>
        <Text style={styles.detailsdescription}>₹ {product.price}</Text>
        <View style={styles.titleText}>
          <Text style={[styles.headingtext, getTextColor()]}>Description</Text>
        </View>
        <Text style={styles.detailsdescription}>{product.description}</Text>
      </View>
    </View>
  );
};

export default OproductDetails;
