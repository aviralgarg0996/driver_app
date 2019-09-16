//import liraries
import React, { Component } from 'react';
import {  Platform,
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
  Switch } from 'react-native';
import Constants from "../../constants";
import { BoxShadow } from 'react-native-shadow';
const colors1 = require('../../assets/images/customer/Vehicle_icons/Top/a.png');
import StarRating from "../../components/driver/StarRating";

let { width, height } = Dimensions.get('window');

import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";
import Toast, { DURATION } from 'react-native-easy-toast'
let searchData='';
import _ from 'underscore'; 
import Home_SelectDriverList from './Home_SelectDriverList';
import CustomerConnection from "../../config/Connection";
let mediaUrl=CustomerConnection.mediaURL()+'/';

// create a component
class MyClass extends Component {

constructor(props)
{
  super(props)
  this.state={
    modalVisible:false,
    data:this.props.data,
    markerData:undefined
  }
}

callTest=(data)=>{
  searchData=data;
  let LocalData=[];
  _.each(this.props.data,function(item){

    if((item.firstName+item.lastName).indexOf(searchData)>-1)
    LocalData.push(item);
  })
  this.setState({data:LocalData})
}

componentDidMount(){
  this.props.onRef(this);

}

setData=(data)=>{

  this.setState({data:data})
  alert("test");

}

_onPress=(element)=>{


let loc=[];
loc[1]=11;
loc[0]=22;
    var ImagePath = (element.profilePhoto) ?  mediaUrl+ element.profilePhoto : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
    var viechlePath = (element.vechile) ? mediaUrl + element.vechile : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'

    var viechleImagePath = (element.vechilecategory && element.vechilecategory.imagePath) ? mediaUrl + element.vechilecategory.imagePath : 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'


  markerData=(
    {
      coordinates: {
        latitude: loc[0].lat + Math.random() / 20,
        longitude: loc[0].long + Math.random() / 20
      },
      title:element.firstName + ' ' + element.lastName,
      key: element._id,
      pinColor: 'blue',
      image: ImagePath,
      index: 0,
      viechlePath: viechlePath,
      viechleImagePath: viechleImagePath
    });



 this.setState({markerData:markerData,modalVisible:true})
}


renderRow(item){

if((item.firstName+item.lastName).indexOf(searchData)==-1)
return null;

  
    return (

      <TouchableOpacity onPress={()=>this._onPress(item)}>
        <View style={{width:'100%',height:120,justifyContent:'center',flex:1,
        alignItems:'center'}}>
          <View style={{width:'90%',height:110,backgroundColor:'white',flexDirection:'row',borderRadius:5,
       }}>
          <Image style={styles.imageProfile} 
          source={{ uri: mediaUrl+ item.profilePhoto}} resizeMode={'stretch'} />
          <View style={{flex:2,height:110}}> 
          <View style={{marginLeft:10,flex:1,justifyContent:'center',alignItems:'flex-start'}}>
          <Text style={[styles.nameText,{width:'100%'}]}>{item.firstName} {item.lastName}</Text>
          </View>
            <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
            <Text style={[styles.reviewText, { flex:1
       }]}>
                {parseInt(Math.random(0,300)*100)}{" Reviews"}
                  </Text>
                {/* <Text style={[styles.followerText,{
                    flex:1,marginLeft:5,
                }]}> {parseInt(Math.random(0,300)*100)}{" Followers"}</Text> */}
           </View>  
           <View style={{flex:1,flexDirection:'row',marginLeft:10}}>
           <StarRating
              rating={parseInt(Math.random()*5)}
              iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
              iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            />
            </View>
         </View> 
          </View>

          {this.state.modalVisible ? null: null}
        </View>
    </TouchableOpacity>
        )
}

render()
{
    return (<ImageBackground source={Constants.Images.customer.appBackground}
    style={{width:'100%',height:height*.6,justifyContent:'center',alignItem:'center'}}>



<FlatList
  data={this.state.data}
  renderItem={({item}) => this.renderRow(item)}
 />
  
{ this.props.buttonFlag && 
  <TouchableOpacity style={[{
            backgroundColor: Constants.Colors.DarkBlue, margin: 10, borderRadius: 5,
            width: '90%', margin: 10, alignItems: 'center', marginLeft: '5%',
            height: scaleHeight(50), justifyContent: 'center'
          }]} disabled={true ? this.props.buttonFlag : false} onPress={() => this.props.selectDriver()}>
            <Text style={[styles.SelectTextStyle]}>
              {'Place in the pool'}
            </Text>
  </TouchableOpacity>
}


    {this.state.modalVisible && <Home_SelectDriverList  data={this.state.markerData}/> }
    
    </ImageBackground>
    
  
    
    )
}

}
  
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //  justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Constants.Colors.White,//'#F5FCFF'
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
      height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 80,
      backgroundColor:'blue'
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
      width:Constants.BaseStyle.DEVICE_WIDTH*.75,
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
      height: 130,
       width: Constants.BaseStyle.DEVICE_WIDTH/100*80,
    },
    imageProfile: {
      height: 110,
      width: 110,
      borderTopLeftRadius:5,
      borderBottomLeftRadius: 5,
     // Radius:5
     // borderWidth: 2,
     // borderColor: Constants.Colors.White,
     // marginLeft:10,
    },
    nameText: {
      color: '#324772',
      fontSize: 19,//Constants.CustomerFonts.BigSize.fontSize,
      fontWeight: '900',//Constants.CustomerFonts.BigSize.fontFamily,
    //  paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
     // paddingVertical: Constants.BaseStyle.PADDING * 0.2,
      //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },

    followerText: 
    {
      color: '#404040',
      fontSize: 19,//Constants.CustomerFonts.BigSize.fontSize,
      fontWeight: '900',//Constants.CustomerFonts.BigSize.fontFamily,
      paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
      paddingVertical: Constants.BaseStyle.PADDING * 0.2,
      //marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },
    reviewText: {
      color: '#C25d26',
      fontSize: 19,//Constants.CustomerFonts.BigSize.fontSize,
      paddingHorizontal: Constants.BaseStyle.PADDING * 0.1,
      paddingVertical: Constants.BaseStyle.PADDING * 0.2,
      textDecorationLine:'underline'
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
      fontSize:20,
      color:'white',
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



//make this component available to the app
export default MyClass;
