/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
// import {format} from 'date-fns';
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import {PieChart, LineChart} from 'react-native-chart-kit';
import {Picker} from '@react-native-picker/picker';
import Colors from '../../constants/Colors';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import style from '../OwnerHomepage/OwnerHomestyle';
import BackButton from '../../components/atoms/BackButton/BackButton';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AnalyticsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PieIcon from 'react-native-vector-icons/FontAwesome';
import ForwardIcon from 'react-native-vector-icons/Ionicons';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import { useNavigation } from '@react-navigation/core';
// import AnalyticsDropdown from '../../components/atoms/AnalyticsDropdown/AnalyticsDropdown';
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

const DashboardDetails = () => {
  const {
    handleAnalytics,
    Data,
    handleOrders,
    orderData,
    loading,
    piechart,
    HandlePiechart,
    handleExportpdf,
    DashboardYearly,
    Dashboardyeardata,
  } = useAnalytics();
  const navigation = useNavigation();
  const [showModel, setShowModel] = useState(false);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}`,
  );
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalNumberOfItems, settotalNumberOfItems] = useState(0);

  const [monthtitle, setmonthtitle] = useState(
    monthNames[new Date().getMonth()],
  );
  const [selectedYear, setSelectedYear] = useState('');
  const years = Object.keys(DashboardYearly);

  const [selectedData, setSelectedData] = useState('quantity'); // Selected data for the bar graph

  const handleDataSelect = data => {
    setSelectedData(data);
  };
  console.log('orderData:', orderData);
  const handleVisibleModal = () => {
    setShowModel(!showModel);
    filterOrderData();
  };

  const handleTotalOrdersClick = () => {
    setTimeout(() => {
      setShowModel(true); // Update the state variable to show the modal
    }, 800);
  };
  const filterOrderData = () => {
    const filteredOrderData = {};
    Object.keys(orderData).forEach(month => {
      if (month === selectedMonth) {
        filteredOrderData[month] = orderData[month];
      }
    });
    handleOrders(filteredOrderData);
  };

  useEffect(() => {
    handleAnalytics();
    HandlePiechart();
    Dashboardyeardata();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentMonthFormatted = `${currentDate.getFullYear()}-${(
      currentMonth + 1
    )
      .toString()
      .padStart(2, '0')}`;
    setSelectedMonth(currentMonthFormatted);
    const selectedBarIndex = rentalData.findIndex(
      data => data.month === monthNames[currentMonth],
    );
    setSelectedBarIndex(selectedBarIndex);
    filterOrderData();
  }, []);

  const rentalData = monthNames.map(month => {
    const monthIndex = monthNames.indexOf(month);
    const formattedMonth = `${selectedYear}-${String(monthIndex + 1).padStart(
      2,
      '0',
    )}`;

    const monthData = DashboardYearly[selectedYear]?.[formattedMonth] || {
      totalEarnings: 0,
      totalNumberOfItems: 0,
    };

    return {
      month: month,
      totalEarnings: monthData.totalEarnings,
      totalNumberOfItems: monthData.totalNumberOfItems,
      monthIndex: monthIndex,
    };
  });

  if (selectedYear && DashboardYearly[selectedYear]) {
    Object.entries(DashboardYearly[selectedYear]).forEach(([month, data]) => {
      const monthIndex = parseInt(month.split('-')[1]) - 1;
      rentalData[monthIndex] = {
        month: month.split('-')[0], // Extract the month name from the format "YYYY-MM"
        totalEarnings: data.totalEarnings,
        totalNumberOfItems: data.totalNumberOfItems,
        monthIndex: monthIndex,
      };
    });
  }

  const handleBarClick = (event, barData) => {
    const selectedMonth = barData.datum.month;
    const selectedMonthIndex =
      monthNames.indexOf(monthNames[selectedMonth]) + 1;
    const selectedYearFormatted = selectedYear.toString();
    const formattedMonth = `${selectedYearFormatted}-${String(
      selectedMonthIndex,
    ).padStart(2, '0')}`;

    setSelectedMonth(formattedMonth);
    setSelectedBarIndex(barData.index);

    const selectedData = rentalData.find(
      data => data.month === monthNames[selectedMonth],
    );
    const selectedMonthData =
      DashboardYearly[selectedYearFormatted]?.[formattedMonth];

    if (selectedMonthData) {
      const {totalEarnings, totalNumberOfItems} = selectedMonthData;
      setTotalEarnings(totalEarnings);
      settotalNumberOfItems(totalNumberOfItems);
    }
    setmonthtitle(monthNames[selectedMonth]);

    filterOrderData();
  };

  const getBarColor = (datum, index) => {
    if (datum.index === selectedBarIndex) {
      return Colors.buttonColor; // Color for the selected bar
    }
    return '#eadaff'; // Color for other bars
  };

  // const pieChartData =
  //   piechart && piechart[selectedMonth] ? piechart[selectedMonth] : {};
  const pieChartData =
    piechart && piechart[selectedMonth] ? piechart[selectedMonth] : {};

  const chartColors = [
    '#594AB5',
    '#E28B5E',
    '#7CB9E8',
    '#B5E8A1',
    '#F1C5D4',
    '#F5D96C',
    '#B6A2D3',
    '#7F8FA6',
    '#E8DAEF',
    '#D2B4DE',
  ];

  // Transform the data for the pie chart
  const transformedData = Object.entries(pieChartData).map(
    ([subcategory, {totalOrders}], index) => ({
      name: subcategory,
      value: totalOrders,
      color: chartColors[index % chartColors.length],
      // Generate a random color for each data point
    }),
  );
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {loading ? (
        <View>
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
              <BackButton />
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
              <View style={{flexDirection: 'row', marginLeft: 8}}>
                <TouchableOpacity
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
              <Text>admflkadsk</Text>
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
                    // alignSelf: 'center',
                  }}>
                  {monthtitle}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/* <AnalyticsDropdown onSelect={handleDataSelect} /> */}
                  <Picker
                    style={{
                      marginTop: 10,
                      width: 130,
                      // backgroundColor: '#ebebeb',
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
                  // backgroundColor: '#C4B0FF',
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
                    // style={{marginLeft: 30, marginTop: 10}}
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
                    // animate={{duration: 3000}}
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
                      // bottomLeft: 4,
                      // bottomRight: 4,
                      topLeft: 4,
                      topRight: 4,
                    }}
                    style={{
                      data: {
                        fill: getBarColor,
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
                    <View
                      style={
                        {
                          // width: '100%',
                          // backgroundColor: Colors.buttonColor,
                        }
                      }>
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
                      {/* <View
                        style={{
                          backgroundColor: Colors.buttonColor,
                          borderRadius: 30,
                          width: 40,
                          height: 40,
                          marginLeft: 75,
                          marginTop: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <PieIcon
                          name="pie-chart"
                          color={Colors.white}
                          size={25}
                          // style={{marginLeft: 30, marginTop: 10}}
                        />
                      </View> */}
                      <PieChart
                        data={transformedData}
                        width={Dimensions.get('window').width}
                        height={230}
                        chartConfig={{
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                          // Decrease the font size here
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
                        // labels: rentalData.map(data => data.month),
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
                  {/* </View> */}
                  <View
                    style={{
                      marginTop: 20,
                      height: '100%',
                      width: '100%',
                    }}>
                    {orderData &&
                    Object.keys(orderData).length > 0 &&
                    orderData[selectedMonth] ? (
                      <Modal
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
                          {orderData[selectedMonth].map((order, index) => (
                            <View key={order.id} style={style.dashcard}>
                              <View style={style.dashcardContainer}>
                                <Image
                                  source={{uri: order.imageUrl}}
                                  style={style.dashboardimage}
                                />
                                <View
                                  key={order.id}
                                  style={{
                                    marginTop: 0,
                                    width: 200,
                                    height: 40,
                                    // backgroundColor: Colors.white,
                                  }}>
                                  <Text style={style.Order}>
                                    Order ID: {order.borrowerId}
                                  </Text>
                                  {/* <Text>Rented by</Text> */}
                                  <Text style={style.borrowerName}>
                                    {order.borrowerName}
                                  </Text>
                                  {/* <Text style={style.Product}></Text> */}
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
