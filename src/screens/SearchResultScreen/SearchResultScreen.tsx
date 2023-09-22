/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View, Modal} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import style from './searchResultStyles';
import useSearchresults from './useSearchResults';
import FilterSelectSize from '../../components/atoms/FilterSizes/FilterSizeSelect';
import PriceRangeDropdown from '../../components/atoms/PriceRange/PriceDropdown';
import SubCategoryDropdown from '../../components/atoms/SubcategoryDropdown/SubcategoryDropdown';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';

type RootStackParamList = {
  UProductDetails: {product: number};
};

const SearchResultsScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {searchResults} = route.params;
  const goBackButton = () => {
    navigation.goBack();
  };

  const {
    minimumPrice,
    setMinimumPrice,
    maximumPrice,
    setMaximumPrice,
    selectedSize,
    setSelectedSize,
    sizes,

    modalVisible,
    setModalVisible,
    handleFilterButtonPress,
    filteredProducts,

    handleFilterapply,

    setSelectedSubCategory,
    subcategoriesData,
  } = useSearchresults();
  const {colorScheme, getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);
  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : searchResults;
  return (
    <View style={[getContainerStyle(), style.outerStyle]}>
      <View style={style.addAddressHeader}>
        <TouchableOpacity
          style={style.backBtn}
          onPress={goBackButton}
          testID="back-button">
          <MaterialIcons color={Colors.black} size={20} name="arrow-back-ios" />
        </TouchableOpacity>
        <View style={style.viewStyle1}>
          <Text style={[style.addAddressText, getTextColor()]}>
            Search results
          </Text>
          <MaterialIcons
            testID="filter-apply-button"
            onPress={handleFilterButtonPress}
            style={style.filter}
            size={28}
            name="filter-list-alt"
            color={colorScheme === 'dark' ? Colors.white : Colors.black}
          />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        testID="modal"
        animationType="slide"
        transparent={true}>
        <View style={[style.mainContainer]}>
          <Text style={[style.headertext, getTextColor()]}>Filters</Text>
          <View style={style.modalContainer}>
            <View style={style.sizeDropdown}>
              <Text style={[style.filterText, getTextColor()]}>
                Select size
              </Text>
              <FilterSelectSize
                selectedSize={selectedSize}
                sizes={sizes}
                onSelectSize={(size: any) => setSelectedSize(size)}
              />
            </View>
            <Text style={[style.priceText, getTextColor()]}>Select Price</Text>
            <PriceRangeDropdown
              minPrice={minimumPrice}
              maxPrice={maximumPrice}
              onSelectPriceRange={(min: string, max: string) => {
                setMinimumPrice(min);
                setMaximumPrice(max);
              }}
            />
            <Text style={[style.priceText, getTextColor()]}>
              Select Category
            </Text>
            <SubCategoryDropdown
              value={subcategoriesData}
              onChange={(selectedOption: React.SetStateAction<{}>) =>
                setSelectedSubCategory(selectedOption)
              }
            />
            <View style={style.btnStyle}>
              <TouchableOpacity
                style={style.closetouchablecontainer}
                onPress={() => setModalVisible(false)}>
                <Text style={style.closeText}>close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID="Apply"
                style={[style.touchablecontainer, getContainerStyle()]}
                onPress={handleFilterapply}>
                <Text style={[style.applyText, getTextColor()]}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {productsToShow.length > 0 ? (
        <FlatList
          testID="flat-list"
          data={productsToShow}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View style={style.cardView}>
                <View style={style.innerCard}>
                  <View style={[style.container, getTextInputStyle()]}>
                    <TouchableOpacity
                      testID="item-touchable"
                      key={item.id}
                      style={{width: '100%'}}
                      onPress={() =>
                        navigation.navigate('UProductDetails', {
                          product: item,
                        })
                      }>
                      <View style={style.imageContainer}>
                        <ImageComponent imageUrl={item.imageUrl[0]} />
                      </View>
                    </TouchableOpacity>
                    <View style={style.cardTextContainer}>
                      <View style={style.marginStyle}>
                        <Text style={[style.name, getTextColor()]}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={style.textContainer}>
                        <Text style={style.price}>{'₹' + item.price}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          numColumns={2}
        />
      ) : (
        <View style={[style.noResultsView, getContainerStyle()]}>
          <View style={style.innerView2}>
            <Text style={[style.titleText, getTextColor()]}>
              Umm...No results found
            </Text>
          </View>
          <View style={[style.titleTextContainer, getContainerStyle()]}>
            <Lottie
              style={[style.imageS, getContainerStyle()]}
              source={require('../../../assets/search.json')}
              autoPlay
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default SearchResultsScreen;
