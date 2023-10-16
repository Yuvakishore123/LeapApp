/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import {PieChart, LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../constants/colors';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import style from '../OwnerHomepage/OwnerHomestyle';
import BackButton from '../../components/atoms/BackButton/BackButton';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ForwardIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const DashboardDetails = () => {
  const {
    transformedData,
    getBarColor,
    handleBarClick,
    handleVisibleModal,
    handleTotalOrdersClick,
    years,
    totalEarnings,
    totalNumberOfItems,
    selectedBarIndex,
    selectedMonth,
    selectedYear,
    monthtitle,
    setSelectedYear,
    rentalData,
    loading,
    handleExportpdf,
    orderData,
    showModel,
  } = useAnalytics();
  const navigation = useNavigation();
  type OrderItem = {
    id: {toString: () => any};
    imageUrl: any;
    borrowerId:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactPortal
      | null
      | undefined;
    borrowerName:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactPortal
      | null
      | undefined;
    rentalCost:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactPortal
      | null
      | undefined;
    name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactPortal
      | null
      | undefined;
    borrowerPhoneNumber:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactPortal
      | null
      | undefined;
  };
  const generateKey = () => {
    return Math.random().toString(36);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {loading ? (
        <View testID="loadingview">
          <Lottie
            source={require('../../../assets/analyticstwo.json')}
            autoPlay
            style={{
              height: 300,
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
              marginTop: 100,
            }}
          />
        </View>
      ) : (
        <ScrollView style={{backgroundColor: '#C4B0FF', flex: 1}}>
          <>
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <View style={{flexDirection: 'row', marginTop: 50, marginLeft: 10}}>
              <BackButton navigation={navigation} />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  marginTop: 15,
                  marginLeft: 75,
                  alignSelf: 'center',
                }}>
                Analytics
              </Text>
            </View>
            {selectedBarIndex !== null ? (
              <View
                style={{flexDirection: 'row', marginLeft: 8}}
                testID="information-Sec">
                <TouchableOpacity
                  testID="navId"
                  onPress={() => navigation.navigate('FilteredAnalytics')}
                  style={{
                    width: 131,
                    height: 96,
                    marginLeft: 38,
                    marginTop: 25,
                    borderRadius: 20,
                    backgroundColor: Colors.buttonColor,
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    ₹ {totalEarnings}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 10,
                        alignSelf: 'center',
                        marginTop: 15,
                        marginLeft: 30,
                      }}>
                      Total Earnings
                    </Text>
                    <ForwardIcon
                      name="chevron-forward-outline"
                      size={12}
                      color={Colors.white}
                      style={{marginTop: 16}}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="yourOrdersId"
                  onPress={handleTotalOrdersClick}
                  style={{
                    width: 131,
                    height: 96,
                    marginLeft: 38,
                    marginTop: 25,
                    borderRadius: 20,
                    backgroundColor: Colors.white,
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      color: Colors.buttonColor,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}>
                    {totalNumberOfItems}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: Colors.buttonColor,
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: 10,
                        alignSelf: 'center',
                        marginTop: 15,
                        marginLeft: 35,
                      }}>
                      Your Orders
                    </Text>
                    <ForwardIcon
                      name="chevron-forward-outline"
                      size={12}
                      color={Colors.buttonColor}
                      style={{marginTop: 16}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <Text testID="emptyView">admflkadsk</Text>
            )}
            <View
              style={{
                marginTop: 20,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                backgroundColor: Colors.white,
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.buttonColor,
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 17,
                    marginTop: 23,
                    marginLeft: 50,
                  }}>
                  {monthtitle}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Picker
                    testID="pickerId"
                    style={{
                      marginTop: 10,
                      width: 130,
                      borderRadius: 30,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                    selectedValue={selectedYear}
                    onValueChange={year => setSelectedYear(year)}
                    itemStyle={{
                      color: '#000',
                    }}>
                    {years.map(year => (
                      <Picker.Item key={year} label={year} value={year} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  height: 330,
                  width: '95%',
                  marginLeft: 10,
                  borderRadius: 30,
                }}>
                <View
                  style={{
                    backgroundColor: Colors.buttonColor,
                    borderRadius: 30,
                    width: 40,
                    height: 40,
                    marginLeft: 30,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AnalyticsIcon
                    name="google-analytics"
                    color={Colors.white}
                    size={30}
                  />
                </View>
                <VictoryChart
                  width={Dimensions.get('window').width}
                  height={300}>
                  <VictoryAxis
                    tickValues={rentalData.map(data => data.monthIndex - 1)}
                    tickFormat={monthIndex => {
                      const monthNames = [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ];
                      return monthNames[monthIndex % 12];
                    }}
                    style={{
                      axis: {stroke: Colors.buttonColor},
                      tickLabels: {
                        fontSize: 12,
                        padding: 5,
                        fill: Colors.buttonColor,
                      },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{
                      axis: {stroke: Colors.buttonColor},
                      axisLabel: {fontSize: 14, padding: 30},
                      tickLabels: {
                        fontSize: 12,
                        padding: 5,
                        fill: Colors.buttonColor,
                      },
                    }}
                    label="Orders"
                  />

                  <VictoryBar
                    data={Object.entries(rentalData).map(
                      ([month, data], index) => ({
                        month,
                        rentalPrice: data.totalNumberOfItems,
                        index, // Add index property
                      }),
                    )}
                    x="month"
                    y="rentalPrice"
                    barWidth={23}
                    cornerRadius={{
                      topLeft: 4,
                      topRight: 4,
                    }}
                    style={{
                      data: {
                        fill: getBarColor as any,
                      },
                    }}
                    labels={({datum}) => `${datum.rentalPrice}`}
                    labelComponent={
                      <VictoryLabel
                        style={{
                          fill: Colors.buttonColor, // Set the desired color for the labels
                          fontSize: 12,
                        }}
                      />
                    }
                    events={[
                      {
                        target: 'data',
                        eventHandlers: {
                          onPress: handleBarClick,
                        },
                      },
                    ]}
                  />
                </VictoryChart>
              </View>
              {selectedBarIndex !== null && (
                <>
                  <View style={{alignItems: 'center'}}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontFamily: 'Poppins-SemiBold',
                          fontSize: 20,
                          marginBottom: 10,
                          marginTop: 30,
                        }}>
                        Sub-categories
                      </Text>
                    </View>
                    <View
                      style={{
                        elevation: 4,
                        shadowColor: 'white',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                      }}>
                      <PieChart
                        data={transformedData}
                        width={Dimensions.get('window').width}
                        height={230}
                        chartConfig={{
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        style={{marginLeft: 50}}
                        accessor="value"
                        backgroundColor="transparent"
                        absolute
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: 'black',
                        fontSize: 20,
                        marginTop: 20,
                      }}>
                      {' '}
                      Rental Earnings{' '}
                    </Text>
                    <LineChart
                      data={{
                        datasets: [
                          {
                            data: rentalData.map(data => data.totalEarnings),
                          },
                        ],
                      }}
                      width={Dimensions.get('window').width}
                      height={220}
                      style={{
                        marginLeft: -10,
                        marginTop: 20,
                      }}
                      withHorizontalLabels={true}
                      chartConfig={{
                        backgroundGradientFrom: 'rgba(255, 255, 255, 0)', // Transparent background start color
                        backgroundGradientTo: 'rgba(255, 255, 255, 0)', // Transparent background end color
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(89, 74, 181, ${opacity})`,
                      }}
                      fromZero
                      yAxisInterval={10}
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={style.exportContainer}
                      onPress={handleExportpdf}>
                      <Text style={style.exportText}>Export</Text>
                      <Icon
                        name="export"
                        size={15}
                        color={Colors.white}
                        style={{marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      height: '100%',
                      width: '100%',
                    }}>
                    {orderData &&
                    Object.keys(orderData).length > 0 &&
                    orderData[selectedMonth as any] ? (
                      <Modal
                        testID="modal-component"
                        visible={showModel}
                        animationType="slide"
                        transparent={true}>
                        <ScrollView
                          style={{
                            backgroundColor: Colors.white,
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            marginTop: 200,
                          }}>
                          <TouchableOpacity onPress={handleVisibleModal}>
                            <Text style={style.txtClose}>Close</Text>
                          </TouchableOpacity>
                          {orderData[selectedMonth].map((order: OrderItem) => (
                            <View
                              testID={`orderDataId-${order.id}`}
                              key={generateKey()}
                              style={style.dashcard}>
                              <View style={style.dashcardContainer}>
                                <Image
                                  source={{uri: order.imageUrl}}
                                  style={style.dashboardimage}
                                />
                                <View
                                  style={{
                                    marginTop: 0,
                                    width: 200,
                                    height: 40,
                                  }}>
                                  <Text style={style.Order}>
                                    Order ID: {order.borrowerId}
                                  </Text>
                                  <Text style={style.borrowerName}>
                                    {order.borrowerName}
                                  </Text>
                                  <Text style={style.price}>
                                    ₹ {order.rentalCost}
                                  </Text>
                                  <Text style={style.order}> {order.name}</Text>
                                  <Text style={style.order}>
                                    {' '}
                                    {order.borrowerPhoneNumber}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      </Modal>
                    ) : (
                      <Text style={{color: 'black'}}>
                        No orders found for the selected month
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          </>
        </ScrollView>
      )}
    </View>
  );
};

export default DashboardDetails;
