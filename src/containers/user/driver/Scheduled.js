/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  Image,
  Picker,
  DatePickerIOS,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerAndroid,
  AsyncStorage
} from "react-native";
import { connect } from 'react-redux';

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import Modal from "react-native-modal";
import SubmitButton from "../../../components/common/FormSubmitButton";
import NavigationBar from "react-native-navbar";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import * as order_opperation from '../../../redux/modules/orders';
import _ from "underscore";
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown';



import * as UserActions from '../../../redux/modules/user';

import { bindActionCreators } from "redux";

const constMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var modeSelected = '';
var navigator = null;
var that;
var timerVar;
var currentDataLength;

class Scheduled extends Component {



  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('filterData');
      if (value !== null) {
        value = JSON.parse(value)
        this.setState({
          multiSliderValue: [value.minRange, value.maxRange],
          orderBy: this.state.orderBy,
          sortBy: this.state.sortBy,
          FromDate: value.minDateRange,
          toDate: value.maxDateRange

        })
      }
    } catch (error) {
    }
  }

  static test(data) {
    this.testM(this.props.orderstate.os);
  }

  constructor(props) {
    super(props);
    that = this;

    this.state = {
      data: [],
      isModalVisible: false,
      isDatePicker: false,
      chosenDate: new Date(),
      availability: true,
      multiSliderValue: [3, 7],
      toDate: 'MM/DD/YY',
      FromDate: 'MM/DD/YY',
      orderBy: 'asc',
      sortBy: 'Date',
      renderData: false,
      orderStatus: this.props.label,
      searchName: '',
      test: true,
      param: {}
    };
    this.setDate = this.setDate.bind(this);
  }

  handleSearch = () => {
  }

  startTime = () => {
    that = this;

    timerVar = setInterval(function () {

      data = that.state.data;
      var temoData = [];

      _.each(data, function (element) {
        if (element.timeLeft - 1000 > 0) {

          element.timeLeft = (element.timeLeft - 1000)
          temoData.push(element);
        }
        else {
          element.rowStyle = 'testDynamic';
          //  clearInterval(timerVar)
        }

      });
      that.setState({ data: [] });
      that.setState({ data: temoData });
    }, 1000);

  }


  componentDidMount() {

    this.props.onRef(this)
    this._retrieveData();



    //alert(this.props.label)


  }



  constructDate = (min, max) => {
    var toStr = '';
    var fromStr = '';



    minTimeStr = min.getHours() >= 12 ? min.getHours() - 12 + ':' + min.getMinutes() + ' PM ' : min.getHours() - 12 + ':' + min.getMinutes() + ' AM ';
    maxTimeStr = max.getHours() >= 12 ? max.getHours() - 12 + ':' + max.getMinutes() + ' PM ' : max.getHours() - 12 + ':' + max.getMinutes() + ' AM ';


    if (min.getDate() == max.getDate()) {
      toStr = min.getDate() + ' ' + constMonthArray[min.getMonth()] + ' ' + min.getFullYear() % 100 + ' ' + minTimeStr;
      fromStr = 'To ' + maxTimeStr;
    }
    else {
      toStr = min.getDate() + ' ' + constMonthArray[min.getMonth()] + ' ' + min.getFullYear() % 100 + ' ' + minTimeStr;

      fromStr = max.getDate() + ' ' + constMonthArray[max.getMonth()] + ' ' + max.getFullYear() + ' ' + maxTimeStr;

    }

    return toStr + ' to ' + fromStr;

  }






  _storeData = async () => {


    filterData = {
      minRange: this.state.multiSliderValue[0],
      maxRange: this.state.multiSliderValue[1],
      orderBy: this.state.orderBy,
      sortBy: this.state.sortBy,
      minDateRange: this.state.FromDate,
      maxDateRange: this.state.toDate
    }
    try {
      await AsyncStorage.setItem('filterData', JSON.stringify(filterData));
    } catch (error) {
      alert(error)
    }
  }


  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }



  loadMore = (param) => {

    this._retrieveData();

    //alert(JSON.stringify(this.state.sortBy));

    //   param.driverId='5bda93c59f19ad5e722d8ca3';
    if (this.state.sortBy == "OrderID")
      param.sortByOrderId = this.state.orderBy
    if (this.state.sortBy == "Date")
      param.sortByDate = this.state.orderBy
    if (this.state.sortBy == "Amount")
      param.sortByAmount = this.state.orderBy;

    if (this.state.sortBy)
      param.sortByDate = 'dsc'

    param.toDate = param.toDate * 1000000000

    this.setState({ param: param });



    this.props.UserActions.get_New_test('place-order/available', param).then((response) => {
      this.setData();
    });
  }



  serachOrder = () => {

    var param = this.state.param;

    if (!this.state.searchName && isNAN(this.state.searchName))
      return;

    //  this._retrieveData();

    //alert(JSON.stringify(this.state.sortBy));

    //   param.driverId='5bda93c59f19ad5e722d8ca3';
    if (this.state.sortBy == "OrderID")
      param.sortByOrderId = this.state.orderBy
    if (this.state.sortBy == "Date")
      param.sortByDate = this.state.orderBy
    if (this.state.sortBy == "Amount")
      param.sortByAmount = this.state.orderBy;
    param.page = 1;

    if (this.state.sortBy)
      param.sortByDate = 'dsc'

    param.orderId = this.state.searchName;

    param.toDate = param.toDate * 1000000000

    this.setState({ param: param });



    this.props.UserActions.get_New_test('place-order/order-search', param).then((response) => {
      this.setData();
    });
  }


  setData = () => {

    result = this.props.orderstate.os;
    currentDataLength = result.length;


    try {


      if (timerVar)
        clearInterval(timerVar);

      var data = [];
      if (this.state.param.page == 1)
        this.setState({ renderData: false, data: [] });
      else
        data = this.state.data;

      _.each(result, (element) => {

        //_.each(result,function(element){

        console.log('data     [[[[ -->   ', element);

        var rowStyle = 'itemBlock';
        var timeLeft = element.activeTimestamp + 180 * 1000 - new Date().getTime();

        if (timeLeft <= 0 && this.state.orderStatus == 'Available') {
          rowStyle = 'testDynamic';
          timeLeft = 0;
        }
        else if (this.state.orderStatus != 'Available') {
          if (this.state.orderStatus == "Scheduled") {
            timeLeft = element.minTime - new Date().getTime();
          }
          if (this.state.orderStatus == "On-Going") {
            timeLeft = element.maxTime - new Date().getTime();
          }

          rowStyle = 'itemBlock';
          if (timeLeft <= 0) {
            rowStyle = 'testDynamic'
          }
        }



        if (rowStyle != 'testDynamic')
          data.push({
            id: element._id,
            idno: "Id " + element.orderId,
            price: "$" + element.totalCharge,
            date: "MAR/10/2018",
            date: that.constructDate(new Date(element.maxTime), new Date(element.minTime)),
            timeframe: "12:00 pm to 4:00 pm",
            timeframe: '',
            time: new Date().getTime(),
            rowStyle: rowStyle,
            placedOrderData: element,
            timeLeft: timeLeft,
            orderStatus: element.orderStatus,

          })

      });



      this.setState({ renderData: true, data: data });
      console.log('data     [[[[   ', data);
      console.log('props     [[[[   ', this.props);
      if (this.props.label == "Scheduled" || this.props.label == "Available" || this.props.label == "On-Going") {
        this.startTime();
      }
    }
    catch (ex) {
      alert(ex)
    }

  }




  onShow() {

    this.setState({ isDatePicker: !this.state.isDatePicker });
    this.showDatePicker();

  }

  _toggleModal = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible });

  }
  onCancel() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isDatePicker: false
    });
  }

  onSubmitInfo = () => {
    //alert("jdjfdj")
    this._storeData();
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isDatePicker: false
    });


    var param = this.state.param;

    param.datemin = new Date().getTime() - 2 * 24 * 60 * 60000;
    param.datemax = new Date().getTime();

    param.page = 1;
    this.loadMore(param);


  }
  onSortBy() { }

  onOrderBy() { }

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  static dateSetAction(e) {

    //alert(JSON.stringify(e))

  }



  resetTab = () => {


    var param = this.state.param;
    this.loadMore(param);



  }


  showDatePicker = async () => {

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        minDate: new Date(new Date().getFullYear() - 2, 1, 1),
        date: new Date(),
        maxDate: new Date(new Date().getFullYear() + 2, 11, 30)
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);

        if (modeSelected == 'toDate')
          this.setState({ toDate: moment(date).format('MM-DD-YY') })
        else
          this.setState({ FromDate: moment(date).format('MM-DD-YY') })


      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }




    return;
    if (this.state.isDatePicker) {
      return (
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
      );
    } else {
      return null;
    }
  };
  setAvailability() {
    this.setState({
      availability: !this.state.availability
    });
  }
  onClickRowItem(item) {

    const { navigate } = this.props;
    this.props.UserActions.setOrderedData(item);

    if (item.orderStatus == "Available") {
      if (item.placedOrderData.activeTimestamp + 180 * 1000 > new Date().getTime()) {
        navigate('AvailableOrders', {
          resetTab: () => {
            this.resetTab();
          }
        });
      }
      else {
        alert("Order Expired");
      }
    }
    if (item.orderStatus == 'Schedule') {
      this.props.UserActions.setAccpetedData(item.placedOrderData);
      navigate('Orders_ScheduledOrder', {
        resetTab: () => {
          this.resetTab();
        }
      });
    }
    if (item.orderStatus == 'Ongoing') {
      var lat_long = this.props.locationData.currentLocation.coords.latitude + ',' + this.props.locationData.currentLocation.coords.longitude;

      this.props.UserActions.scheduledOrder({
        driverId: this.props.userData.data._id, lat_long: lat_long
      }).then((response) => {
        navigate('OnGoing', {
          resetTab: () => {

            this.resetTab();
          }
        });
      })
    }
  }

  renderItem(data) {
    let { item, index } = data;

    return (
      <TouchableOpacity key={index} onPress={() => { this.onClickRowItem(item) }}>
        <View style={styles[item.rowStyle]}>
          <View style={[styles.itemViewFirst, { flex: 2 }]}>
            <Text style={styles.itemName}>{item.idno}</Text>
            <Text style={styles.itemDate}>{item.date}{item.timeframe}</Text>
          </View>
          <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
            {<View style={[styles.itemViewSecond]}>
              <Image
                style={styles.clockIcon}
                source={Constants.Images.driver.clock}
              />
              <Text style={[styles.itemTime, { alignSelf: 'center' }]}>{moment.utc(item.timeLeft).format('mm:ss')}{" min "}</Text>
            </View>
            }
            <View >
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let { navigate } = this.props;
    navigator = navigate;
    //const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.test && <View style={styles.headerView}>
          <View style={styles.searchView}>
            <Image
              style={styles.searchIcon}
              source={Constants.Images.driver.search}
            />
            <TextInput underlineColorAndroid='transparent'
              value={this.state.searchName}
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.setState({ searchName: text }) }}
              returnKeyType='search' style={Platform.OS === 'ios' ? styles.searchInput : styles.searchInputAndroid} placeholder={"Search"}
              onSubmitEditing={(test) => { this.serachOrder() }} />
          </View>
          <TouchableOpacity onPress={this._toggleModal}>
            <Image
              style={styles.filterIcon}
              source={Constants.Images.driver.filter}
            />
          </TouchableOpacity>
        </View>}

        {<FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index}
          onRefresh={() => {

            var param = this.state.param;
            param.page = 1;
            param.datemin = new Date().getTime() - 2 * 24 * 60 * 60000;
            param.datemax = new Date().getTime();

            //    this.setData({data:[]})
            this.loadMore(param);

          }}

          refreshing={false}
          //  onRefresh={()=>{alert("test")}}
          onEndReachedThreshold={0.01}
          onEndReached={({ distanceFromEnd }) => {

            if (currentDataLength > 9) {
              var param = this.state.param;

              param.datemin = new Date().getTime() - 2 * 24 * 60 * 60000;
              param.datemax = new Date().getTime();

              param.page = param.page + 1;


              // this.setState(param);
              this.loadMore(param);
            }
            //          alert(distanceFromEnd)
          }}

        />}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor: Constants.Colors.White }}>
            <TouchableOpacity onPress={() => this.onCancel()}>
              <Image
                style={[styles.crossIcon]}
                source={Constants.Images.user.cross}
              />
            </TouchableOpacity>
            <Text style={styles.filterTitle}>{"FILTER AND SORT"}</Text>
            <View style={styles.filterBody}>
              <Text style={styles.filterAmount}>
                {"Filter by order amount ($0-$5000)"}
              </Text>
              <MultiSlider
                containerStyle={styles.sliderStyle}
                trackStyle={styles.sliderTrace}
                selectedStyle={{ backgroundColor: "#53C8E5" }}
                values={[
                  this.state.multiSliderValue[0],
                  this.state.multiSliderValue[1]
                ]}
                sliderLength={280}
                onValuesChange={this.multiSliderValuesChange}
                min={0}
                max={5000}
                step={1}
                allowOverlap
                snapped
              />

              <Text style={styles.filterDate}>{"Filter by date"}</Text>

              <View style={styles.datesView}>
                <View style={styles.dateFrom}>
                  <Text style={styles.filterAmount}>{"From"}</Text>
                </View>
                <View style={styles.dateTo}>
                  <Text style={styles.filterAmount}>{"To"}</Text>
                </View>
              </View>
              <View style={styles.pickerRootView}>
                <TouchableOpacity onPress={() => { modeSelected = 'fromDate'; this.onShow() }}>
                  <View style={styles.pickerView}>
                    <Text style={styles.pickerDateText}>{this.state.FromDate}</Text>
                    <Image
                      style={styles.calendarIcon}
                      source={Constants.Images.driver.calendar}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickerTouchView}
                  onPress={() => { modeSelected = 'toDate'; this.onShow() }}
                >
                  <View style={styles.pickerView}>
                    <Text style={styles.pickerDateText}>{this.state.toDate}</Text>
                    <Image
                      style={styles.calendarIcon}
                      source={Constants.Images.driver.calendar}
                    />
                  </View>
                </TouchableOpacity>
              </View>


              <View>
                <Dropdown
                  label='Sort By'
                  data={[
                    {
                      value: 'Amount',
                    },
                    {
                      value: 'Date',
                    },
                    {
                      value: 'OrderID',
                    }
                  ]}
                  value={this.state.sortBy}
                  onChangeText={(text) => {
                    this.setState({ sortBy: text })

                  }}
                />
              </View>

              <View>
                <Dropdown
                  label='Order By'
                  data={[{
                    value: 'asc',
                  },
                  {
                    value: 'dsc',
                  }
                  ]}
                  value={this.state.orderBy}
                  onChangeText={(text) => {
                    this.setState({ orderBy: text })

                  }}
                />
              </View>

              {/* <TouchableOpacity onPress={() => this.onSortBy()}>
                <View
                  style={{
                    padding: 3,
                    marginVertical:
                      Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: Constants.Colors.Blue,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={[styles.rowText]}>{"Sort By"}</Text>
                  <Image
                    source={Constants.Images.driver.down}
                    style={styles.dropIcon}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onOrderBy()}>
                <View
                  style={{
                    padding: 3,
                    marginVertical:
                      Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: Constants.Colors.Blue,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={[styles.rowText]}>{"Order By"}</Text>
                  <Image
                    source={Constants.Images.driver.down}
                    style={styles.dropIcon}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity> */}

              <View style={styles.flexRow}>
                <View style={{ flex: 1 }}>
                  <SubmitButton
                    onPress={() => this.onSubmitInfo()}
                    text={"Ok"}
                    style={[styles.ButtonStyle, { backgroundColor: "#53C8E5" }]}
                    textStyle={[{ fontSize: 17 }]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SubmitButton
                    onPress={() => this.onCancel()}
                    text={"CANCEL"}
                    style={styles.ButtonStyle}
                    textStyle={[{ fontSize: 17 }]}
                  />
                </View>
              </View>
            </View>

          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  rightButtonNav: {
    flexDirection: "row",
    alignItems: "center"
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  headerView: {
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Constants.Colors.White,
    borderWidth: 1,
    borderBottomColor: Constants.Colors.LightGray
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    padding: Constants.BaseStyle.PADDING / 100 * 10,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    borderWidth: 1,
    borderColor: Constants.Colors.LightGray,
    alignItems: "center"
  },
  searchInput: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: "100%",
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  searchInputAndroid: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: "100%",
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  itemBlock: {
    flexDirection: "row",
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: Constants.Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray
  },

  testDynamic: {

    flexDirection: "row",
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    backgroundColor: '#D3D3D3',
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray

  },

  // itemPdf: {
  //   fontSize: 16,
  //     color:'#000',
  //     paddingHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100*2,
  // },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
    color: Constants.Colors.Blue
  },
  itemViewFirst: {
    flex: 1
  },
  itemViewSecond: {
    flexDirection: "row",
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  itemTime: {
    fontSize: 14,
    color: Constants.Colors.Blue
  },
  itemDate: {
    fontSize: 16,
    color: Constants.Colors.Gray
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 0.8,
    textAlign: 'right',
  },
  // pdfIcon: {
  //   width: Constants.BaseStyle.DEVICE_WIDTH/100*7,
  //   height:  Constants.BaseStyle.DEVICE_HEIGHT/100*4,
  //   padding:Constants.BaseStyle.PADDING/100*2,
  // },
  clockIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  filterIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  crossIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },

  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Constants.Colors.Blue,
    textAlign: "center",
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3.2
  },
  filterAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3
  },
  sliderStyle: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3
  },
  sliderTrace: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5,
    backgroundColor: "silver"
  },
  filterDate: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1.5
  },
  filterBody: {
    paddingHorizontal: Constants.BaseStyle.PADDING,
    paddingBottom: Constants.BaseStyle.PADDING
  },
  datesView: {
    flexDirection: "row"
  },
  dateFrom: {
    flex: 1
  },
  dateTo: {
    flex: 1,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10
  },
  pickerRootView: {
    flexDirection: "row"
  },
  pickerTouchView: {
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10
  },
  pickerView: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray
  },

  pickerDateText: {
    fontSize: 15,
    fontWeight: "600",
    color: Constants.Colors.Blue
  },
  calendarIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
  },

  rowText: {
    color: Constants.Colors.Blue,
    fontWeight: "600"
  },

  dropIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
  },
  flexRow: {
    flexDirection: "row"
  },

  ButtonStyle: {
    borderWidth: 1,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*0.5,
    borderRadius: 5
  }
});







const mapStateToProps = state => ({
  orderstate: state.OrdersHandleReducer,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  locationData: state.location
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch),
  order_opperation: bindActionCreators(order_opperation, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduled);


