/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React from 'react';
import styles from './filterStyles';
import useFilterScreen from './useFilterScreen';
import Colors from '../../../constants/colors';

interface Product {
  id: string;
  imageUrl: string[];
  name: string;
  brand: string;
  price: number;
}

const FilterScreen = () => {
  const {
    FilterData,
    minimumPrice,
    maximumPrice,
    setMinimumPrice,

    setMaximumPrice,
    filteredProducts,
    SetSize,
    size,
  } = useFilterScreen();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <TextInput
          style={styles.textInput}
          value={minimumPrice}
          onChangeText={text => setMinimumPrice(text)}
          placeholder="Enter Minimum Price"
        />
        <TextInput
          style={styles.textInput}
          value={maximumPrice}
          onChangeText={text => setMaximumPrice(text)}
          placeholder="Enter Maximum Price"
        />
        <TextInput
          value={size}
          onChangeText={text => SetSize(text)}
          style={styles.textInput}
          placeholder="Enter Size"
        />
      </View>
      <View style={{width: '50%', height: 200}}>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <View style={styles.productsContainer} key={product.id}>
              {product.imageUrl && product.imageUrl.length > 0 && (
                <Image
                  source={{uri: product.imageUrl[0]}}
                  style={styles.productImage}
                  testID={`Image-${product.id}`}
                />
              )}
              <View>
                <Text testID={`Name-${product.id}`}>
                  Product Name: {product.name}
                </Text>
                <Text testID={`Brand-${product.id}`}>
                  Brand: {product.brand}
                </Text>
                <Text testID={`price-${product.id}`}>
                  Price: {product.price}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No products found.</Text>
        )}
      </View>

      <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          borderRadius: 8,
          backgroundColor: Colors.buttonColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={FilterData}
        testID="Filter-Button">
        <Text style={{color: Colors.white}}>FilterScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterScreen;
