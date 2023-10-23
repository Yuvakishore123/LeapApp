/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

import useAddImages from './useAddImages';
import Sizeselection from '../../components/atoms/Sizeselect';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {addImages} from '../../constants/languages/en';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import Styles from '../LoginScreen/loginStyle';

import OwnerImagestyles from './OwnerImagestyles';
import Colors from '../../constants/colors';

const AddImages = () => {
  const {
    // Onhandlepress,
    handleRemoveImage,
    handleSizeTypeChange,
    setSelectedsize,
    handlePriceChange,
    handleQuantityChange,
    handleBlur,
    imageUrls,
    pickImages,
    closeModal,
    showModal,
    formik,
    isLoading,
  } = useAddImages();
  const areImagesUploaded = imageUrls && imageUrls.length > 0;
  const {getTextColor, getTextInputStyle, getContainerStyle} =
    useContext(ColorSchemeContext);
  return (
    <ScrollView
      style={[
        {height: '100%', backgroundColor: Colors.black},
        getContainerStyle(),
      ]}>
      <View style={[OwnerImagestyles.Scroll, getContainerStyle()]}>
        <HeadingText message="Add products" navigation={undefined} />
        <View style={[OwnerImagestyles.form]}>
          <View style={[OwnerImagestyles.ImageBox]}>
            {imageUrls && areImagesUploaded ? (
              <>
                <ScrollView
                  horizontal
                  style={[
                    OwnerImagestyles.imagehorizontal,
                    getContainerStyle(),
                  ]}>
                  {imageUrls.map((image, index) => (
                    <View key={image} style={[OwnerImagestyles.ImageContainer]}>
                      <Image
                        style={[OwnerImagestyles.image, getTextInputStyle()]}
                        testID={`image-${index}`}
                        source={{uri: image}}
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                        style={OwnerImagestyles.removeIconContainer}
                        testID={`remove-button-${index}`}>
                        <MaterialIcons
                          name="cancel"
                          size={25}
                          color={Colors.red}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                {areImagesUploaded && (
                  <View style={OwnerImagestyles.removeContainer}>
                    <TouchableOpacity
                      onPress={pickImages}
                      style={OwnerImagestyles.touchableContainer}
                      testID="add-more-button">
                      <Text style={OwnerImagestyles.removeText}>Add More</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <View
                    testID="loading-indicator"
                    style={OwnerImagestyles.overlay}>
                    <ActivityIndicator size="large" color="white" />
                  </View>
                ) : (
                  <TouchableOpacity
                    testID="AddImages-Button"
                    style={[OwnerImagestyles.Addimage, getTextInputStyle()]}
                    onPress={pickImages}>
                    <Lottie
                      source={require('../../../assets/addimageol.json')}
                      style={OwnerImagestyles.LottieStyle}
                      autoPlay
                    />
                    {!isLoading && (
                      <Text style={[OwnerImagestyles.imagetxt, getTextColor()]}>
                        {addImages}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </>
            )}
            <View style={OwnerImagestyles.Sizecontainer}>
              <Sizeselection
                onSelectSize={setSelectedsize} // Use onSelectSize instead of onChange
                onChange={handleSizeTypeChange}
              />
            </View>
            <View style={{marginTop: 20}}>
              {formik.touched.size && formik.errors.size && (
                <Text style={Styles.errorText}>{formik.errors.size}</Text>
              )}
            </View>
            <TextInput
              style={[
                OwnerImagestyles.Price,
                {paddingLeft: 25},
                getContainerStyle(),
                getTextColor(),
              ]}
              placeholder="Select price"
              placeholderTextColor="gray"
              keyboardType="numeric"
              testID="price"
              onChangeText={handlePriceChange}
              onBlur={() => handleBlur('price')}
            />
            {formik.touched.price && formik.errors.price && (
              <Text style={Styles.errorText}>{formik.errors.price}</Text>
            )}
            <TextInput
              keyboardType="numeric"
              placeholder="Select quantity"
              placeholderTextColor="gray"
              testID="quantity"
              style={[
                OwnerImagestyles.quantity,
                {paddingLeft: 25},
                getTextInputStyle(),
                getTextColor(),
              ]}
              onChangeText={handleQuantityChange}
              onBlur={() => handleBlur('quantity')}
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <Text style={Styles.errorText}>{formik.errors.quantity}</Text>
            )}
            <View style={Styles.mainButton}>
              <TouchableOpacity
                disabled={!formik.isValid}
                onPress={formik.handleSubmit}
                style={[
                  Styles.mainTouchable,
                  {
                    backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
                  },
                ]}>
                <Text style={Styles.touchableText}>Add product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Product added successfully!"
      />
    </ScrollView>
  );
};
export default AddImages;
