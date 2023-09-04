/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import style from './myOrderStyles';
import useMyOrder from './useMyOrder';
import styles from 'screens/OwnerHomepage/OwnerHomestyle';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from 'constants/colors';

type OrderDetailsModalProps = {
  order: any;
  onClose: () => void;
  visible: boolean;
  showNotifications: () => void;
};

const MyOrder = () => {
  const {
    OrderProducts,

    refreshing,
    selectedOrder,
    isModalOpen,
    loading,
    onRefresh,
    openModal,
    closeModal,
    handleProfile,
    showNotification,
  } = useMyOrder();
  const {
    getContainerStyle,
    getTextColor,

    getTextInputStyle,
  } = useContext(ColorSchemeContext);

  if (loading) {
    return (
      <View
        style={[
          {
            flex: 1,
          },
          getContainerStyle(),
        ]}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={[style.container, getContainerStyle()]}>
        <View style={style.titleContainer}>
          <TouchableOpacity onPress={handleProfile} style={style.backButton}>
            <Icons name="arrow-back-ios" size={16} color="black" />
          </TouchableOpacity>
          <Text style={[style.titleText, getTextColor()]}>My orders</Text>
        </View>
        <ScrollView
          style={[style.mainContainer, getContainerStyle()]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {OrderProducts?.length === 0 ? (
            <View testID="empty-view" style={style.noAddressContainer1}>
              <View style={style.titleTextContainer1}>
                <Lottie
                  style={style.imageS1}
                  source={require('../../../assets/order2.json')}
                  autoPlay
                />
              </View>
              <View style={style.textContainer1}>
                <Text testID="order-empty" style={style.noAddressText1}>
                  Hey, it feels so light!
                </Text>
              </View>
            </View>
          ) : (
            OrderProducts?.map((order: any) => (
              <TouchableOpacity
                key={order.id}
                testID={`order-${order.id}`}
                style={[style.cardContainer, getTextInputStyle()]}
                onPress={() => openModal(order)}
                disabled={isModalOpen}>
                {order.orderItems?.map((item: any) => (
                  <TouchableOpacity
                    key={`${order.id}-${item.id}`}
                    testID={`Order-${order.id}-${item.id}`}
                    style={style.cardTextContainer}
                    onPress={() => openModal(order)}
                    disabled={isModalOpen}>
                    <View style={{flexDirection: 'row', width: '85%'}}>
                      <View style={style.orderInfoContainer}>
                        <Text style={[style.productName, getTextColor()]}>
                          Order Id: {item.id}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[style.plcedText, getTextColor()]}>
                            Order placed at :
                          </Text>
                          <Text style={[style.orderDate, getTextColor()]}>
                            {item.createdDate}
                          </Text>
                        </View>
                        <Text style={style.priceText}>{item.status}</Text>
                      </View>
                      <View style={{flexDirection: 'column', marginTop: 15}}>
                        <Icon
                          name="ios-arrow-forward"
                          size={20}
                          style={[style.arrowIcon, getTextColor()]}
                        />
                        {/* <Icons
                          name="file-download"
                          size={20}
                          onPress={() => handleOrderDetails(order.id)}
                          style={[style.arrowIcon, getTextColor()]}
                        /> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </ScrollView>
      <OrderDetailsModal
        order={selectedOrder}
        onClose={closeModal}
        visible={isModalOpen}
        showNotifications={showNotification}
      />
    </>
  );
};

export const OrderDetailsModal = ({
  order,
  onClose,
  visible,
  showNotifications,
}: OrderDetailsModalProps) => {
  const {
    getContainerStyle,
    getPlaceholderTextColor,
    getTextColor,
    getButtonColor,
  } = useContext(ColorSchemeContext);
  // const {showNotification} = useMyOrder();

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}>
      <View style={[{backgroundColor: Colors.main}, getContainerStyle()]}>
        <TouchableOpacity style={style.closeButton} onPress={onClose}>
          <Text style={style.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={[style.viewStyle, getContainerStyle()]}>
        <View style={style.modalContainer}>
          <ScrollView style={{flex: 1}}>
            <View style={{marginTop: 10}}>
              <Text style={[style.totalOrderText, getTextColor()]}>
                Order ID: {order.id}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[style.totalOrderText, getTextColor()]}>
                  Total Price: {'₹' + order.totalPrice}
                </Text>
              </View>
              {order.orderItems?.map((item: any) => (
                <View
                  style={[style.viewS, getPlaceholderTextColor()]}
                  key={item.id}>
                  <Image source={{uri: item.imageUrl}} style={style.image} />
                  <View style={style.marginM}>
                    <Text style={[style.productname, getButtonColor()]}>
                      {item.name}
                    </Text>
                    <Text style={[style.QuantityText, getTextColor()]}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={[style.QuantityText, getTextColor()]}>
                      {item.rentalStartDate}
                    </Text>
                    <Text style={[style.QuantityText, getTextColor()]}>
                      {item.rentalEndDate}
                    </Text>
                    <Text style={[style.orderText]}>{item.status}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={styles.exportContainer}
                onPress={showNotifications}>
                <Text style={styles.exportText}> download</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MyOrder;
