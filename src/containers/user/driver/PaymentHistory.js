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
  View,
  Image,
  TouchableOpacity,
  DatePickerIOS,
  TextInput,TouchableHighlight
} from "react-native";

import Constants from "../../../constants";
import Modal from "react-native-modal";
import SubmitButton from "../../../components/common/FormSubmitButton";
import NavigationBar from "react-native-navbar";
import PaymentList from "../../../components/driver/PaymentList";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Icon from 'react-native-vector-icons/FontAwesome';
export default class PaymentHistory extends Component<{}> {
  constructor(props) {
    super(props);
  this.state = { selectedTab:'paid' ,
  isDatePicker: false,
  chosenDate: new Date(),
  isModalVisible:false ,
  multiSliderValue: [3, 7]};
  }

    setDate(newDate) {
      this.setState({ chosenDate: newDate });
    }

    onShow() {
      this.setState({ isDatePicker: !this.state.isDatePicker });
    }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  onPaid(){
    this.setState({
      selectedTab:'paid'
    })

  }
  onPending(){
    this.setState({
      selectedTab:'pending'
    })

  }
  onCancel() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isDatePicker: false
    });
  }

  onSubmitInfo() {}
  onSortBy() {}

  onOrderBy() {}
  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };
  showDatePicker = () => {
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

  render() {
    const titleConfig = {
      title: "Payment",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate ,goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress={()=>goBack()}>
              <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
            </TouchableOpacity>
          }
        />

        <View style={styles.headerView}>
          <View style={styles.searchView}>
            <Image
              style={styles.searchIcon}
              source={Constants.Images.driver.search}
            />
            <TextInput style={styles.searchInput} placeholder={"Search"} />
          </View>
          <TouchableOpacity onPress={this._toggleModal}>
            <Image
              style={styles.filterIcon}
              source={Constants.Images.driver.filter}
            />
          </TouchableOpacity>
        </View>

          <View style={styles.tabView}>
            <TouchableOpacity
              style={ this.state.selectedTab == 'paid' ? styles.buttonPress : styles.button }
              onPress={this.onPaid.bind(this)}
             >
             <Text  style={ this.state.selectedTab == 'paid' ? styles.textPress : styles.textUnpress }> Paid </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ this.state.selectedTab == 'pending' ? styles.buttonPress : styles.button }
              onPress={this.onPending.bind(this)}
            >
              <Text style={ this.state.selectedTab == 'pending' ? styles.textPress : styles.textUnpress }> Pending </Text>
            </TouchableOpacity>
           </View>

          { this.state.selectedTab == 'paid'?<PaymentList/>:<PaymentList/>}



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
                  {"Filter by order amount ($10-$29)"}
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
                  max={10}
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
                  <TouchableOpacity onPress={() => this.onShow()}>
                    <View style={styles.pickerView}>
                      <Text style={styles.pickerDateText}>{"MM/DD/YY"}</Text>
                      <Image
                        style={styles.calendarIcon}
                        source={Constants.Images.driver.calendar}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerTouchView}
                    onPress={() => this.onShow()}
                  >
                    <View style={styles.pickerView}>
                      <Text style={styles.pickerDateText}>{"MM/DD/YY"}</Text>
                      <Image
                        style={styles.calendarIcon}
                        source={Constants.Images.driver.calendar}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.onSortBy()}>
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
                </TouchableOpacity>

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
              {this.showDatePicker()}
            </View>
          </Modal>





      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    padding: Constants.BaseStyle.PADDING * 0.6
  },
  tabView: {
  flexDirection:"row",
  },

  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
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
    borderBottomWidth: 1,
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
  filterIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3
  },

  textOrange: {
    fontSize: 18,
    fontWeight: "800",
    color: Constants.Colors.Orange,
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
  },
  textBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2
  },
  inputText: {
    padding: Constants.BaseStyle.PADDING * 0.5
  },
  textUnpress: {

    textAlign: 'center',
    margin: Constants.BaseStyle.MARGIN * 0.5,

  },
  textPress: {

    textAlign: 'center',
    margin: Constants.BaseStyle.MARGIN * 0.5,
    color: '#ffffff'
  },
  button: {
    flex:1,
    borderColor: Constants.Colors.LightGray,
    backgroundColor: Constants.Colors.White,
    borderWidth: 1,

  },
  buttonPress: {
    flex:1,
    borderColor:Constants.Colors.LightBlue,
    backgroundColor: Constants.Colors.LightBlue,
    borderWidth: 1,

  },
  crossIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1
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

    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "transparent",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    //marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*0.5,

    shadowColor:Constants.Colors.LightGray,
       shadowOffset: {
         width: 2,
         height: 2
       },
       shadowRadius: 5,
       shadowOpacity: 1.0,
       borderRadius:2,
  }
});
