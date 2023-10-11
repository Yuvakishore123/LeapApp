/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './OwnerHomestyle';
import Donut from '../../components/atoms/DonutChart';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import useOwnerHome from './useOwnerHome';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

interface Product {
  id: number;
  imageUrl: string[];
  name: string;
  price: number;
}
type RootStackParamList = {
  OproductDetails: {product: any};
};

const OwnerHome = () => {
  const {
    products,
    name,
    isLoading,
    refreshing,
    onRefresh,
    handleAnalatyics,
    recentyAdded,
    refreshTrigger,
    rentedItemsPercentage,
    totalEarningsPercentage,
    isloading,
  } = useOwnerHome();
  const {handleOrders, CategoriePieData, Dashboardyeardata} = useAnalytics();
  const {colorScheme, getTextColor, getContainerStyle, getTextInputStyle} =
    useContext(ColorSchemeContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log(isloading);
  const renderRecentlyAddedItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        key={item.id}
        testID={`RecentlyAdded-${item.id}`}
        style={styles.recentlyaddedcard}
        onPress={() => navigation.navigate('OproductDetails', {product: item})}>
        <View style={[styles.cardContainer, getTextInputStyle()]}>
          <Image
            source={{uri: item.imageUrl[0]}}
            style={styles.recentlyaddedimage}
          />
        </View>
        <View style={[styles.cardTextContainer, getTextInputStyle()]}>
          <View style={styles.textViewS}>
            <Text style={[styles.cardText, getTextColor()]}>{item.name}</Text>
          </View>
          <View style={styles.cardS}>
            <Text style={styles.cardTextPrice}>₹ {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTouchableOpacity = () => {
    return (
      <TouchableOpacity
        testID={'loading-container'}
        style={styles.recentlyaddedcard}>
        <View style={styles.cardContainer}>
          <Text style={styles.recentlyaddedimage}></Text>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTextPrice}></Text>
          <Text style={styles.cardTextPrice}></Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecentlyAdded = () => {
    if (isloading) {
      return (
        <SkeletonPlaceholder
          backgroundColor={colorScheme === 'dark' ? '#373737' : Colors.white}>
          <>
            <ScrollView style={styles.mainContainer}>
              {renderTouchableOpacity()}
              <View>
                <View style={styles.cardSt}>{renderTouchableOpacity()}</View>
              </View>
            </ScrollView>
          </>
        </SkeletonPlaceholder>
      );
    } else if (recentyAdded && recentyAdded.length === 0) {
      return (
        <View style={styles.lottieS}>
          <Lottie source={require('../../../assets/ownerHome.json')} autoPlay />
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={recentyAdded as Product[]}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            renderItem={renderRecentlyAddedItem}
          />
        </View>
      );
    }
  };

  const renderRentalHistoryItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={`${item.id.toString()}-${index}`}
        testID={`Rental-History-${item.id}`}
        style={styles.recentlyaddedcard}
        onPress={() => navigation.navigate('OproductDetails', {product: item})}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: item.imageUrl[0]}}
            style={styles.recentlyaddedimage}
          />
        </View>
        <View style={[styles.cardTextContainer, getTextInputStyle()]}>
          <Text
            testID={`Item-${item.id}`}
            style={[styles.cardText, getTextColor()]}>
            {item.name}
          </Text>
          <Text style={styles.cardTextPrice}>₹ {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRentalHistory = () => {
    if (products?.length === 0) {
      return (
        <View style={styles.lottieS}>
          <Lottie source={require('../../../assets/ownerHome.json')} autoPlay />
        </View>
      );
    } else {
      return (
        <View
          style={[
            {flex: 1, backgroundColor: Colors.main, flexWrap: 'wrap'},
            getContainerStyle(),
          ]}>
          <View style={styles.viewS}>
            {products?.map((item: Product, index: number) =>
              renderRentalHistoryItem({item, index}),
            )}
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView
      style={[styles.mainContainer, getContainerStyle()]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Text style={[styles.headertxt, getTextColor()]}>
          Welcome {name?.firstName}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.rentalitemscard}>
          <Text style={styles.renteditems1}>Rented Items</Text>
          <Text style={styles.renteditems2}>Total Earnings</Text>
        </View>
        <View style={styles.rentalitemscard}>
          <View style={styles.cardsrentalprices}>
            <Donut
              percentage={rentedItemsPercentage}
              color={Colors.white}
              delay={1000}
              max={200}
              refreshTrigger={refreshTrigger}
              textcolor={Colors.white}
            />
          </View>
          <View style={styles.cardsTotalprices}>
            <Donut
              percentage={totalEarningsPercentage}
              color={Colors.white}
              delay={1000}
              max={1000000}
              refreshTrigger={refreshTrigger}
              textcolor={Colors.white}
            />
          </View>
        </View>
        <TouchableOpacity
          testID={'View-More'}
          onPress={() => {
            handleAnalatyics();
            handleOrders();
            CategoriePieData();
            Dashboardyeardata();
          }}
          style={styles.Viewmore}>
          <Text style={styles.textV}>View More</Text>
          <Icon
            name="arrow-forward-ios"
            size={10}
            color="white"
            style={styles.stylesM}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.headertxt, getTextColor()]}>Recently Added</Text>
      </View>
      {isLoading ? (
        renderRecentlyAdded()
      ) : (
        <>
          {renderRecentlyAdded()}
          <View>
            <Text
              testID="Rental-History"
              style={[styles.headertxt, getTextColor()]}>
              Rental History
            </Text>
          </View>
          {renderRentalHistory()}
        </>
      )}
    </ScrollView>
  );
};

export default OwnerHome;
