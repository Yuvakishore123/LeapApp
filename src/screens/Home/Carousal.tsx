import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from 'screens/Home/homeStyles';

import {ColorSchemeContext} from '../../../ColorSchemeContext';

import {useDispatch, useSelector} from 'react-redux';
import {fetchCategoriesData} from '../../redux/slice/categorySlice';
import {useNavigationProp} from '../../helpers/helper';

const Carousal = () => {
  const {navigation} = useNavigationProp();
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const {getTextColor} = useContext(ColorSchemeContext);
  const data = useSelector(
    (state: {category: {data: any}}) => state.category.data,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesData() as any);
  }, [dispatch]); // Add the dependency 'url' to the dependency array

  return (
    <View style={styles.corousalContainer}>
      <ScrollView
        pagingEnabled
        horizontal
        snapToInterval={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        style={styles.corousalScroll}>
        {data?.length > 0 ? (
          data?.map(
            (subcategory: {
              id: number;
              imageUrl: string;
              categoryName: string;
            }) => (
              <View key={subcategory.id}>
                <TouchableOpacity
                  testID={`card_component-${subcategory.id}`}
                  style={styles.corosalView}
                  onPress={() =>
                    navigation.navigate('Subcategory', {
                      categoryId: subcategory.id,
                    })
                  }>
                  <Image
                    source={{uri: subcategory.imageUrl}}
                    style={styles.corousalImage}
                  />
                  <Text style={[styles.corousalSubname, getTextColor()]}>
                    {subcategory.categoryName}
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          )
        ) : (
          <Text>No subcategories found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Carousal;
