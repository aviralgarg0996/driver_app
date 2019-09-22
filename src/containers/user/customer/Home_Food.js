/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  ImageBackground
} from 'react-native';

import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Constants from "../../../constants";
import HeaderMenu from '../../../components/customer/HeaderMenu';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import _ from "underscore";
import CustomerConnection from "../../../config/Connection";
import { stopLoading, startLoading } from '../../../redux/modules/app';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
class Home_Food extends Component<{}> {
  constructor(props) {
    super(props);

  }

  OnClickFood = (element) => {
    let { dispatch } = this.props;
    let { navigate } = this.props.navigation;
    //  alert("CustomerConnection" + CustomerConnection.getCustomerTempUrl())
    this.props.dispatch(startLoading());
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getdgunit?serviceId=' + element._id;
    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        console.log("arr=======>",arr)
        this.props.dispatch({ type: 'SET_FOODRANGE', range: arr.data[0].dgUnit, _deliverytype: 0, _weight: 3 });
        navigate('Home_Services');
        this.props.dispatch(stopLoading());
      }).catch(error => {
        this.props.dispatch(stopLoading());
      });

  }
  OnClickDocument(element) {
    let { dispatch } = this.props;
    let { navigate } = this.props.navigation;
    this.props.dispatch(startLoading());
    //   var REQUEST_URL='http://18.212.245.222:7010/api/dgunit/get/?type=documents';
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getdgunit?serviceId=' + element._id;

    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        this.props.dispatch(stopLoading());
        dispatch({ type: 'SET_FOODRANGE', range: arr.data[0].dgUnit, _deliverytype: 1, _weight: arr.data[0].weight });
        navigate('Home_ServicesDoc');
      }).catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });;

  }

  OnClickCourier() {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props;
    var unit = {
      weight: 10,
      height: 1,
      width: 1,
      depth: 1,
      isSkid: false,
    };

    dispatch({ type: 'SET_COURIER_UNITS' });
    navigate('Home_ServicesItemsCourier');
  }

  OnClickFurniture() {
    let { navigate } = this.props.navigation;
    let { dispatch } = this.props.navigation;
    this.props.dispatch(startLoading())
    var REQUEST_URL = CustomerConnection.getAdminUrl() + '/admin/getfurniturebycategory';
    var furnitureArray = [];
    fetch(REQUEST_URL)
      .then((response) =>
        response.json())
      .then((arr) => {
        this.props.dispatch(stopLoading())
        if (arr.status && arr.data) {
          _.each(arr.data, function (element) {
            let tempData = {};
            tempData['category'] = element.category._id;
            tempData['categoryName'] = element.category.name;
            tempData['products'] = [];
            _.each(element.furniture, function (productData) {
              if (productData.status)
                tempData['products'].push({
                  category: productData.category,
                  id: productData._id,
                  name: productData.name,
                  desc: productData.description,
                  quantity: 0,
                  img: CustomerConnection.mediaURL() + productData.imagePath,
                  qtyInCircle: 0,
                  unit: productData.unit
                })
            })
            furnitureArray.push(tempData);
          });

        }


        dispatch({ type: 'SET_FURNITURE_UNITS', funData: furnitureArray });
        navigate('Home_ServicesItemsFurniture');


        //    dispatch({type : 'SET_FOODRANGE', range : arr.data[0].dgUnit ,_deliverytype:1,_weight:arr.data[0].weight});
        //  navigate('Home_ServicesDoc');
      }).catch(error => {
        console.log("error=> ", error)
        this.props.dispatch(stopLoading());
      });;


  }


  handlePress = (element) => {
    if (element.name == 'Food')
      this.OnClickFood(element)
    if (element.name == 'Documents')
      this.OnClickDocument(element)
    if (element.name == 'Courier & Frieght')
      this.OnClickCourier(element)
    if (element.name == 'Furniture & Appliances')
      this.OnClickFurniture(element)

  }


  renderBlock = () => {

    CategoryBlock = [];
    CategoryBlock = this.props.dashbaordData.categoryData.map((element, value) => {
      if (value > 3)
        return;
      if (element.name != 'Hourly Services') {
        return (
          <View style={[styles.flexColumn]}>
            <ImageBackground source={require("../../../assets/images/customer/blue-box.png")} 
            style={{ width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
             height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
              marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4.5,
               marginVertical: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5, borderRadius: 10 }}>
              <View style={{ flex: 1, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
                 height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40 }}>
                <TouchableOpacity style={[styles.cardView]} onPress={() => this.handlePress(element)}>
                  <View style={[styles.contentStyle]}>
                    <Image source={{ uri: CustomerConnection.mediaURL() + element.image }}
                      style={[styles.imgSize]} resizeMode={'contain'} />
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <Text style={styles.textStyle}>{element.name}</Text>
          </View>
        )
      }
    }).reverse();

    return CategoryBlock;
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={[styles.container]}>
        <HeaderBackground navigation={navigate} goBack={goBack} />
        <HeaderMenu navigation={navigate} catId={1} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.dashbaordData && this.renderBlock()}
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.BackgroundBlue,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: "column",

  },
  cardView: {
    backgroundColor: 'transparent',
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 44,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    borderRadius: 10,
  },
  contentStyle: {
    // width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 44,
    // height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 26,
    alignItems: 'center',
    justifyContent: 'center',
    //padding:10,
  },
  imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 28,
    alignSelf:"center"
  },
  doc_imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 22,
  },
  furniture_imgSize: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 16,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 30,
  },

  textStyle: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: normalizeFont(16),
    color: Constants.Colors.WhiteUpd,

  },

  contentContainer: {
    //  paddingVertical: 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    //horizontal:false,
    flexWrap: "wrap",
    //justifyContent: "space-around"   

  },
});
export default connect(state => ({
  state: state.CustomerReducer,
  dashbaordData: state.adminReducer
}))(Home_Food);
