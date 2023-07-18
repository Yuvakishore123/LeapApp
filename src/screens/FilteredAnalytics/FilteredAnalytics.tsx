import React from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Lottie from 'lottie-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import style from './filteredAnalyticsStyles';
import useFilteredAnalytics from './useFilteredAnalytics';
import AnalyticsDatePicker from '../../components/atoms/AnalyticsDatePicker';
import BackButton from '../../components/atoms/BackButton/BackButton';

const FilteredAnalytics = () => {
  const {
    chartData,
    data,
    isLoading,

    generateKey,
    startDate,
    setStartDate,
    endDate,

    navigation,
    handleEndDateChange,
  } = useFilteredAnalytics();

  const addPrefixToYLabel = (value: any) => `₹ ${value}`;

  let content;
  if (isLoading) {
    content = (
      <View testID="loading-spinner">
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={style.spinnerS}
        />
      </View>
    );
  } else if (chartData.length > 0) {
    content = (
      <>
        <View style={style.chartView}>
          <View style={style.filterView} testID="chart-container">
            <LineChart
              data={{
                labels: chartData.map(dataPoint => {
                  const date = new Date(dataPoint.month);
                  return date.toLocaleString('en-US', {month: 'short'});
                }),

                datasets: [
                  {
                    data: chartData.map(dataPoint => dataPoint.rentalCost),
                  },
                ],
              }}
              width={Dimensions.get('window').width - 20}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '3',
                  strokeWidth: '2',
                  stroke: 'purple',
                },
              }}
              bezier
              formatYLabel={addPrefixToYLabel}
            />
          </View>
        </View>

        <View style={style.xAxisS}>
          <Text style={style.axisLabel}>Month</Text>
        </View>
      </>
    );
  } else {
    content = (
      <View testID="no-data-message">
        <View style={style.animationS}>
          <Lottie
            source={require('../../../assets/business-analytics.json')}
            autoPlay
          />
        </View>
        <View style={style.textContainer1}>
          <Text style={[style.noAddressText1]}>
            There is no data available in the
          </Text>
          <Text style={[style.noAddressText2]}>selected date range!</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={style.scrollDirection}>
      <View>
        <View>
          <View style={style.btnDirection}>
            <BackButton navigation={navigation} />
            <View style={style.titleView}>
              <Text style={style.titleStyle}>Rental Insights</Text>
            </View>
          </View>

          <View style={style.dateView}>
            <Text style={style.headingtext}>Select date</Text>

            <AnalyticsDatePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={handleEndDateChange}
            />
          </View>

          <View>{content}</View>

          <View>
            {Object.keys(data).length > 0 ? (
              Object.entries(data).map(([month, items]) => (
                <View testID={`${month}-view`} key={month}>
                  {items.map((item: any) => (
                    <View testID="dashcard" key={generateKey()}>
                      <View style={style.dashcard}>
                        <View style={style.dashcardContainer}>
                          <Image
                            source={{uri: item.imageUrl}}
                            style={style.dashboardimage}
                          />

                          <View style={style.textDirection}>
                            <Text style={style.cardStyle}>
                              Order ID: {item.borrowerId}
                            </Text>

                            <Text style={style.cardStyle}>
                              {item.borrowerName}
                            </Text>
                            <Text style={style.cardStyle}>
                              ₹ {item.rentalCost}
                            </Text>
                            <Text style={style.cardStyle}> {item.name}</Text>

                            <Text style={style.cardStyle}>
                              Quantity: {item.quantity}
                            </Text>

                            <Text style={style.cardStyle}>
                              Phone number: {item.borrowerPhoneNumber}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FilteredAnalytics;
