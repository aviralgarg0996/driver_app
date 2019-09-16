//import liraries
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Switch
} from 'react-native';
import Constants from "../../constants";
import { BoxShadow } from 'react-native-shadow';
const colors1 = require('../../assets/images/customer/Vehicle_icons/Top/a.png');
import StarRating from "../../components/driver/StarRating";
import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";
import Toast, { DURATION } from 'react-native-easy-toast'
import CustomerConnection from "../../config/Connection";
import { connect } from 'react-redux';
let updateCMP = true;
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
let mapOvelapHeight = Constants.BaseStyle.DEVICE_HEIGHT / 6




// create a component
class MyClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }


  checkStatus() {
    this.props.state.Orders.orderId || this.props.state.InvoiceData.orderId
    if (this.props.state.Orders.orderId) {
      this.props.navigation.navigate("DraftPick")
    } else {
      if (this.props.state.InvoiceData.orderId || this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location') {
        this.props.navigation.navigate("NotesPick")
      }
    }
  }

  selectDriver = (item) => {


try{
  
    if (this.props.state.Orders._id) {
      this.orderID = this.props.state.Orders._id;
    } else {
      if (this.props.state.InvoiceData._id) {
        this.orderID = this.props.state.InvoiceData._id;
      }
    }
    fetch(CustomerConnection.getTempUrl() + 'driver/save/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "driverId": item.id, "orderId": this.orderID })
    }).then((response) => {
      response.json()
    }).then((arr) => {
      alert("gggggg")
      this.refs.toast.show('Your order is placed successfully.', DURATION.LENGTH_LONG);
      //   this.checkStatus();
    }).catch((error) => {
      console.error(error);
    });
  }
  catch(ex){

    console.log(ex);
  }
  }

  displayDriversData = ({ item, index }) => {

    item = {
      img: 'asa'
    }


    return (


      <View style={[styles.container, {
        width: Constants.BaseStyle.DEVICE_WIDTH * .8,
        marginTop: mapOvelapHeight * -1
      }]}>
        <View style={[styles.rootContainer, { height: mapOvelapHeight }]}>
          <Image source={{ uri: this.props.data.viechlePath }} style={styles.imageCover} resizeMode={'cover'} />
        </View>
        <View style={{ width: Constants.BaseStyle.DEVICE_WIDTH * .8, marginTop: mapOvelapHeight / -3, flexDirection: 'row' }}>
          <Image style={styles.imageProfile} source={{ uri: this.props.data.image }} resizeMode={'cover'} />
          <View style={{ flex: 2, height: Constants.BaseStyle.DEVICE_HEIGHT * .15 }}>
            <View style={{ width: Constants.BaseStyle.DEVICE_WIDTH * .8, height: mapOvelapHeight / 3 }} />
            <View style={{ flex: 2, height: Constants.BaseStyle.DEVICE_HEIGHT * .15 - mapOvelapHeight / 3 }}>
              <Text style={[styles.nameText]}>{this.props.data.title}</Text>
              {/* <Text style={[styles.nameText]}>{parseInt(Math.random() * 100)}{" Followers"}</Text> */}
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          width: Constants.BaseStyle.DEVICE_WIDTH * .8 - 10,
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginLeft: scaleWidth(10),
          //   marginTop: scaleHeight(-10),
        }}>
          <StarRating
            rating={"1"}
            iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
          />
          <Text style={[styles.reviewText, { color: Constants.Colors.LightBlue, textDecorationLine: 'underline' }]}>
            0 REVIEWS
                  </Text>
        </View>

        <TouchableOpacity style={[{
          backgroundColor: '#2d417A', margin: 15, borderRadius: 5,
          width: '95%', margin: 10,

          height: 50, justifyContent: 'center'
        }]} onPress={() => this.selectDriver(item)}>

          <Text style={[styles.SelectTextStyle]}>
            {'SELECT DRIVER'}
          </Text>
        </TouchableOpacity>

        <Toast
          ref="toast"
          style={{ backgroundColor: Constants.Colors.Orange }}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={5000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />

      </View>
    )
  }




  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#4d6cb0' }]}>
        {this.displayDriversData({}, 0)}
      </View>
    );
  }
}

// define your styles


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'

  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    margin: 10,
    padding: 3,
    backgroundColor: '#fff',
    position: 'relative',
  },
  btCloseModal: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  btnCloseModalIcon: {
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
  },
  durationViewStyle: {
    alignItems: 'center',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80,
  },

  flexRow: {
    flexDirection: 'row',
  },
  pickupIcons: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  rootContainer: {
    //    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
    //backgroundColor:'blue'
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //opacity: 0.87,
  },
  ButtonPickupStyle: {
    borderWidth: 1,
    borderRadius: 5,

    //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 96,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: '#D7D7D7',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  ButtonStyle: {
    //  borderWidth: 1,
    // flex:1,
    width: Constants.BaseStyle.DEVICE_WIDTH * .75,
    //  padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    // marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    // marginBottom: 10,
    //   marginTop: 0,//10,
    //  marginLeft: 0,//10,
    // marginRight: 0,//10,
    // backgroundColor:'green',
    //  borderRadius: 30,
    // height:60, 
  },
  ButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  OKButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100*70,
    marginBottom: 3,
    marginTop: 20,//10,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
    borderRadius: 30,
    backgroundColor: '#53C8E5',//Constants.Colors.White,
    borderColor: '#53C8E5',//Constants.Colors.White,
  },
  OKButtonTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,//'#53C8E5',
    textAlign: "center",
  },
  HourlyTextStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    color: '#5D5D5D',
  },
  HourlyRightText: {
    flex: 1,
    textAlign: 'right',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  DurationListText: {
    textAlign: 'center',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#081933',
    borderBottomWidth: 1,
    //borderTopWidth:1,
  },

  transportIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 15,
    padding: 0,
  },
  transportLabel: {
    textAlign: 'center',
    marginTop: 0,
    color: '#081933',
    fontSize: Constants.CustomerFonts.small.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },


  driverText: {
    color: '#081933',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    fontSize: Constants.CustomerFonts.BigSize.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1.5 / 100,
  },
  flexRow: {
    flexDirection: 'row',
  },

  subContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    //position: "absolute",
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
  },
  imageCover: {
    height: mapOvelapHeight,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80,
  },
  imageProfile: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 15,
    borderWidth: 2,
    borderColor: Constants.Colors.White,
    marginLeft: 10,
  },
  nameText: {
    color: '#0D4A7C',
    fontSize: 19,//Constants.CustomerFonts.BigSize.fontSize,
    fontWeight: '900',//Constants.CustomerFonts.BigSize.fontFamily,
    // paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,

    margin: 5

    // paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  reviewText: {
    color: '#0D4A7C',
    marginHorizontal: 10,
    fontSize: 12,//Constants.CustomerFonts.normal.fontSize,
    //fontFamily:Constants.CustomerFonts.normal.fontFamily,
    //  paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
    //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
  },
  update: {
    color: '#414141',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingVertical: Constants.BaseStyle.PADDING * 0.3,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop: Constants.BaseStyle.DEVICE_WIDTH * 4 / 100,
  },
  newPhotoText: {
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    color: '#969297',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  newImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 11,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 21,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2.5
  },

  SelectTextStyle: {
    fontSize: Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    // color: '#53C8E5',
    textAlign: "center",
    //width:Constants.BaseStyle.DEVICE_WIDTH*.8, 
    fontSize: 20,
    color: 'white',
    //    backgroundColor:'blue'
  },
  orangeText: {
    color: Constants.Colors.Orange,
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: scaleHeight(360), width: scaleWidth(350), borderRadius: 5, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

  topText: { top: scaleHeight(20), textAlign: 'justify', fontSize: normalizeFont(18), fontWeight: '700', color: '#314054', marginLeft: scaleWidth(25) },

  desc: { marginTop: scaleHeight(30), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: 25 },
  desc1: { marginTop: scaleHeight(15), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: scaleWidth(0), marginRight: scaleWidth(102), marginBottom: scaleHeight(20) },
  nextBtn: {
    marginTop: scaleHeight(25),
    borderRadius: scaleWidth(5),
    height: scaleHeight(50),
    width: scaleWidth(300),
    backgroundColor: '#366CB5'
  },
  nextText: {
    fontSize: normalizeFont(16),
    textAlign: 'center',
    padding: scaleWidth(14),
    color: "#FCFEFE",
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  headerColor: {
    marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5),
    flexDirection: 'row'
  },
  headText: {
    marginLeft: scaleWidth(20),
    color: 'grey',
    fontSize: normalizeFont(20),
    width: scaleWidth(80),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    marginTop: scaleHeight(15)
  },
  closeicon: {
    backgroundColor: 'transparent',
    height: scaleHeight(25),
    width: scaleWidth(25),
    marginTop: scaleHeight(18),
    marginLeft: scaleWidth(200),
  }

});




export default connect(state => ({
  state: state.CustomerReducer,
  locationData: state.location
}))(MyClass);