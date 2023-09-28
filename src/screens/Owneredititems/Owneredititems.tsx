/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  RefreshControl,
} from 'react-native';
import Useowneredititems from './Useowneredititems';
import GenderDropdown from '../../components/atoms/GenderDropdown';
import Ownerstyles from '../Additems/Additemsstyle';
import Sizeselection from '../../components/atoms/Sizeselect';
import OwnerEditItemstyles from './Owneredititemsstyles';

import Colors from '../../constants/colors';
import Lottie from 'lottie-react-native';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

import styles from '../OwnerHomepage/OwnerHomestyle';
import DropdownComponent from '../../components/atoms/DropDownComponent/DropDown';
import useAdditems from '../Additems/useAdditems';

const EditItem = () => {
  const {
    data,
    setGender,
    visible,
    setViisble,
    handleedit,
    setEventType,
    setOutfitType,
    setItemType,
    imageUrls,
    selectedImage,
    RemoveProducts,
    closeModal,
    showModal,
    handleremove,
    name,
    pickImg,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    setName,
    setDescription,
    handleSizeTypeChange,
    setSelectedsize,
    setPrice,
    setQuantity,
    setEditProductId,
    FetchData,
    description,
    price,
    quantity,
    isLoading,
    productQuantity,
    isModalVisible,
    selectedProductId,
    setSelectedProductId,
    handleEnablebutton,
    setIsModalVisible,
    handleDisablebutton,
    handleDisableProduct,
    incrementQuantity,
    decrementQuantity,
    disabledQuantity,
    totalQuantity,
    updatedQuantity,
    refreshData,
    setRefreshData,
    handleRefresh,
  } = Useowneredititems();
  const {
    subEventCategoriesData,
    subOutfitCategoriesData,
    subCategoriesData,
    itemType,
  } = useAdditems();

  const [_hideId, setHideId] = useState(null);

  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };
  useEffect(() => {
    if (!isModalVisible) {
      setRefreshData(false);
    }
  }, [isModalVisible]);

  const {colorScheme, getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={handleVisibleModal}>
        <SafeAreaView>
          <ScrollView
            style={[{width: '100%', height: '100%'}, getContainerStyle()]}>
            <TouchableOpacity onPressIn={() => setViisble(!visible)}>
              <Text style={OwnerEditItemstyles.closetxt}>Close</Text>
            </TouchableOpacity>
            <View style={[getContainerStyle()]}>
              <View style={[Ownerstyles.Scrollcontainer, getContainerStyle()]}>
                <View style={Ownerstyles.scrolledit}>
                  <TextInput
                    placeholderTextColor={Colors.white}
                    placeholder="Name"
                    style={[
                      Ownerstyles.Namefield,
                      {paddingLeft: 22},
                      getTextInputStyle(),
                      getTextColor(),
                    ]}
                    onChangeText={setName}
                    value={name}
                  />
                  <TextInput
                    placeholderTextColor={Colors.black}
                    placeholder="Description"
                    multiline
                    style={[
                      Ownerstyles.Descriptionfield,
                      {paddingLeft: 22},
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                      colorScheme === 'dark'
                        ? Styles.whitetext
                        : Styles.blackText,
                    ]}
                    onChangeText={setDescription}
                    value={description}
                  />
                  <GenderDropdown
                    onSelectGender={setGender}
                    onChange={handleGenderChange}
                    value={undefined}
                  />
                  <View style={{marginTop: -18}}>
                    <DropdownComponent
                      onSelect={setItemType}
                      onChange={handleItemTypeChange}
                      value={itemType}
                      placeholder="Select Type"
                      data={subCategoriesData}
                    />
                  </View>
                  <View style={{marginTop: -18}}>
                    <DropdownComponent
                      onSelect={setEventType}
                      onChange={handleEventTypeChange}
                      value={undefined}
                      placeholder="Select Event"
                      data={subEventCategoriesData}
                    />
                  </View>
                  <View style={{marginTop: -18}}>
                    <DropdownComponent
                      onSelect={setOutfitType}
                      onChange={handleOutfitChange}
                      value={undefined}
                      placeholder="Select Outfit"
                      data={subOutfitCategoriesData}
                    />
                  </View>
                  <View style={OwnerEditItemstyles.Sizecontainer}>
                    <View style={{marginTop: -16}}>
                      <Sizeselection
                        onSelectSize={setSelectedsize}
                        onChange={handleSizeTypeChange}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={{marginTop: -20}}>
                      {selectedImage ? (
                        <>
                          <ScrollView
                            horizontal
                            style={[OwnerEditItemstyles.imagehorizontal]}>
                            {imageUrls.map(image => (
                              <Image
                                style={OwnerEditItemstyles.image}
                                source={{uri: image}}
                                key={image} // Update the key to include a prefix and index
                              />
                            ))}
                          </ScrollView>
                          <View style={OwnerEditItemstyles.removeContainer}>
                            <TouchableOpacity
                              onPress={handleremove}
                              style={OwnerEditItemstyles.touchableContainer}>
                              <Text style={OwnerEditItemstyles.removeText}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ) : (
                        <View
                          style={[
                            OwnerEditItemstyles.Addimage,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                          ]}
                          key="addImage" // Add a unique key for the View component
                        >
                          <Text
                            onPress={pickImg}
                            style={[
                              OwnerEditItemstyles.imagesText,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            Add Image
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View>
                    <TextInput
                      style={[
                        OwnerEditItemstyles.Price,
                        {paddingLeft: 15},
                        getTextInputStyle(),
                        getTextColor(),
                      ]}
                      placeholder="Set price"
                      placeholderTextColor={Colors.black}
                      keyboardType="numeric"
                      value={price.toString()}
                      onChangeText={setPrice}
                    />
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Set quantity"
                      placeholderTextColor={Colors.black}
                      style={[
                        OwnerEditItemstyles.Price,
                        {paddingLeft: 15},
                        getTextInputStyle(),
                        getTextColor(),
                      ]}
                      value={quantity.toString()}
                      onChangeText={setQuantity}
                    />
                  </View>
                  <View style={Ownerstyles.mainButton}>
                    <TouchableOpacity
                      style={Ownerstyles.mainTouchable}
                      onPress={handleedit}>
                      <Text style={Ownerstyles.touchableText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <ScrollView
        style={[
          {width: '100%', height: '100%'},
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshData}
            onRefresh={handleRefresh}
            colors={['#0000ff']}
          />
        }>
        <View>
          <HeadingText message="My Products" />
        </View>
        {isLoading ? (
          <View style={{height: 200, width: 400}}>
            <Lottie
              source={require('../../../assets/EditProducts.json')}
              autoPlay
            />
          </View>
        ) : (
          data.map(
            (
              item: {
                id: number;
                name: string;
                price: number;
                availableQuantities: number;
                image: string;
              },
              // index: any,
            ) => (
              <>
                <View
                  style={[
                    Style.mainContainer,
                    colorScheme === 'dark'
                      ? Styles.blacktheme
                      : Styles.whiteTheme,
                  ]}
                  // key={`${item.id.toString()}-${index}`}>
                  key={item.id.toString()}>
                  <View style={[Style.item_course]}>
                    <View style={[OwnerEditItemstyles.imagePriceContainer]}>
                      <View style={[OwnerEditItemstyles.cardImageContainer]}>
                        <Image
                          style={OwnerEditItemstyles.cardImage}
                          source={{uri: item.image}}
                        />
                      </View>
                      <View
                        style={[
                          OwnerEditItemstyles.priceContainer,
                          colorScheme === 'dark'
                            ? Styles.cardColor
                            : Styles.main,
                        ]}>
                        <View>
                          <View>
                            <Text
                              style={[
                                Style.txt_name,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',

                            justifyContent: 'space-between',
                          }}>
                          <Text style={Style.txt_item}>₹ {item.price}</Text>
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: 'Poppins-Regular',
                              fontSize: 12,
                            }}>
                            {' '}
                            Available: {item.availableQuantities}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={OwnerEditItemstyles.buttonContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          FetchData(item.id);
                          setEditProductId(item.id);
                          setViisble(true);
                        }}>
                        <View style={OwnerEditItemstyles.button}>
                          <Text style={Style.txt_edit}>Edit</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedProductId(item.id);
                          handleDisableProduct(item);
                        }}>
                        <View style={OwnerEditItemstyles.button}>
                          <Text style={Style.txt_edit}>Manage</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => RemoveProducts(item.id)}>
                        <View style={OwnerEditItemstyles.button}>
                          <Text style={Style.txt_del}>Delete</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <CustomModal
                    showModal={showModal}
                    onClose={closeModal}
                    message="Product has been deleted!"
                  />
                </View>
                <View>
                  <Modal
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    transparent={true}>
                    <View style={styles.modalContainer}>
                      <View style={{alignItems: 'flex-end', marginRight: 20}}>
                        <TouchableOpacity
                          onPress={() => setIsModalVisible(false)}
                          style={styles.closeButton}>
                          <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: 20,
                            color: Colors.white,
                          }}>
                          Quantities
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '90%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginLeft: 20,
                        }}>
                        <Text style={styles.modalText}>Total</Text>
                        <Text style={styles.modalText}>Available</Text>
                        <Text style={styles.modalText}>Disabled</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '80%',
                          justifyContent: 'space-between',
                          alignItems: 'center',

                          marginLeft: 25,
                        }}>
                        <Text style={OwnerEditItemstyles.modalQuantityText}>
                          {totalQuantity}
                        </Text>
                        <Text style={OwnerEditItemstyles.modalQuantityText}>
                          {productQuantity}
                        </Text>
                        <Text style={OwnerEditItemstyles.modalQuantityText}>
                          {disabledQuantity}
                        </Text>
                      </View>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => decrementQuantity()}
                          style={styles.quantityButton}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>
                          {updatedQuantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => incrementQuantity()}
                          style={styles.quantityButton}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {' '}
                          Note : you can only enable disabled products
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          width: '80%',
                          marginLeft: 40,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            handleDisablebutton(
                              selectedProductId,
                              updatedQuantity,
                            )
                          }
                          style={styles.okButton}>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                              fontSize: 16,
                              includeFontPadding: false,
                            }}>
                            Disable
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleEnablebutton(
                              selectedProductId,
                              updatedQuantity,
                              disabledQuantity,
                            )
                          }
                          style={styles.okButton}>
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: 'Poppins-SemiBold',
                              fontSize: 16,
                              includeFontPadding: false,
                            }}>
                            Enable
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </>
            ),
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditItem;

const Style = StyleSheet.create({
  form: {
    backgroundColor: Colors.main,
  },
  titleText: {fontFamily: 'Poppins-SemiBold', fontSize: 24, color: 'white'},

  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'right',
    marginRight: 15,
    color: Colors.iconscolor,
  },
  mainContainer: {
    backgroundColor: Colors.main,
    height: 300,
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  item_course: {
    marginLeft: 30,

    flexDirection: 'row',
  },
  txt_name: {
    fontSize: 12,
    width: 120,
    height: 22,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  txt_item: {
    fontSize: 13,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
  },
  txt_enabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_disabled: {
    fontSize: 14,
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  txt_del: {
    fontSize: 15,
    color: Colors.white,

    fontFamily: 'Poppins-SemiBold',
  },
  txt_edit: {
    fontSize: 15,
    color: Colors.white,

    fontFamily: 'Poppins-SemiBold',
  },
  btnContainer: {
    display: 'flex',
    padding: 15,
    backgroundColor: '#000',
    marginTop: 20,
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: '#000',
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
  },
});
