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
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import moment from "moment";
import { connect } from 'react-redux';
//import { Picker } from 'react-native-picker-dropdown'
import ImagePicker from "react-native-image-picker";
import DatePicker from 'react-native-datepicker'
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Picker from "../../../components/driver/Pickers";
import DriverFormSubmit from "../../../components/driver/DriverFormSubmit";
import DriverFormReject from "../../../components/driver/DriverFormReject";

import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import Regex from '../../../utilities/Regex';
import _ from "lodash";
import { Dropdown } from 'react-native-material-dropdown';
import NewUserDialog from '../../../components/driver/NewUser';
import Connection from '../../../config/Connection'
import LabelSelect from '../../../components/common/LabelSelect';
import ImageCropPicker from 'react-native-image-crop-picker';

const futureDate = moment().add(20, 'years').format('YYYY-MM-DD');
const currentDate = moment().format('YYYY-MM-DD');//moment().add(1, 'days').format('YYYY-MM-DD');
const dateOfbirth = moment().subtract(16, 'years').format('YYYY-MM-DD');


var ProgressBarArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
class DriverForm extends Component {
  constructor(props){
    super(props);

//console.log('props after email verification ******* ',this.props)
// console.log('props  driver info ******* ',props.driverInfo);
    this.state={

      citiesList:props.citiesList,
      cities:[],
      certificatesList:props.certificatesList,
      experienceTypeList : props.experienceTypeList,
      vehicleTypeList : props.vehicleTypeList,
      vehicleMakeList : props.vehicleMakeList,
      vehicleModelList : props.vehicleModelList,
      room : 'ROOM',
      certificates:[],
      gender:Constants.Strings.DropDownItems.gender ,
      yearList:Constants.Strings.DropDownItems.licenceYear,
      monthList:Constants.Strings.DropDownItems.experienceMonth,
      //certificateList:Constants.Strings.DropDownItems.certificates,
     // cityList:Constants.Strings.DropDownItems.citiesServe,
      //experienceList:Constants.Strings.DropDownItems.experienceType,
      //vehicleTypeList:Constants.Strings.DropDownItems.vehicleType,
      //vehicleMakeList:Constants.Strings.DropDownItems.vehicleMake,
      //vehicleModelList:Constants.Strings.DropDownItems.vehicleModel,

      vehicleYearList:Constants.Strings.DropDownItems.vehicleYear,
      equipmentList:Constants.Strings.DropDownItems.equipment,
      capacityList : Constants.Strings.DropDownItems.capacityList,
      insuranceExpiryList:Constants.Strings.DropDownItems.insuranceExpiryYear,

      DriverInfo :props.driverInfo,

      // states for personal info form
      isVisible : false,
      avatarSource:Constants.Images.driver.camera,
      firstname:'',
      lastname:'',
      dob :'',
      sex : '',
      sin : '123456789' ,
      address : '' ,
      licenceNo : '',
      licenceDate:'' ,
      experience : [],
      experienceYear:'',
      experienceMonth:'',
      experienceImage:Constants.Images.driver.circleplus,
      experienceImagesArray:[],
      aboutUS : '' ,

      locationServe :'',

      // states for vehicle information form
      vehicleNo:'',
      vehicleType:'',
      makeOfVehicle : '',
      vehicleModel : '',
      year :'',
      equipment : '',
      capacity:'0',
      insuranceNo : '',
      insuranceExpiry :'',
      vehicleImages:[],
      agreement : '',

      // image states for vehicle information
      LicenceImage:Constants.Images.driver.circleplus,
      InsuranceImage:Constants.Images.driver.circleplus,
      Background:Constants.Images.driver.circleplus,
      DriverExtract:Constants.Images.driver.circleplus,

      //confirmation check
      isConfirmed:false,

      //tabs state
      flagPersonal : 1,
      flagVehicle : 0,

      ProgressWidth : 3,
      ProgressData : 0,
      OutputText :'0% Complete',
      modalVisible:false,
      listItems : [],


      genderColor:Constants.Colors.BlurGrey,
      dobColor:Constants.Colors.BlurGrey,
      licenceDateColor:Constants.Colors.BlurGrey,
      licenceYearColor:Constants.Colors.BlurGrey,
      licenceMonthColor:Constants.Colors.BlurGrey,
      experienceYearColor:Constants.Colors.BlurGrey,
      experienceMonthColor:Constants.Colors.BlurGrey,
      certificatesColor:Constants.Colors.BlurGrey,
      vehicleTypeColor:Constants.Colors.BlurGrey,
      makeOfVehicleColor:Constants.Colors.BlurGrey,
      vehicleModelColor:Constants.Colors.BlurGrey,
      yearColor:Constants.Colors.BlurGrey,
      equipmentColor:Constants.Colors.BlurGrey,
      insuranceExpiryColor:Constants.Colors.BlurGrey,
      allFieldsFilled:false,
      token: props.modalstate.tokenDriverForm || props.driverData.token || props.userData.token,
      //not used anywhere
      imgSource:null,
      imgSourceExperience: null,
      imgSourceVehicle: null,
      vehicleDocs: null,

      onSubmitForm: false,

      imageType:''

    }

  }


  componentWillMount()
  {
    this.props.UserActions.getExperienceTypeList(this.props.tokenforuser);
    this.props.UserActions.getCitiesList(this.props.tokenforuser);
    this.props.UserActions.getCertificatesList(this.props.tokenforuser);
    this.props.UserActions.getVehicleTypeList(this.props.tokenforuser);
    this.props.UserActions.getMakeOfVehicleList(this.props.tokenforuser);

    if(!this.props.modalstate.NewUserModalVisible) {
        this.setState({dobColor:Constants.Colors.Blue,genderColor:Constants.Colors.Blue,
          licenceDateColor:Constants.Colors.Blue,insuranceExpiryColor:Constants.Colors.Blue,});
          this.props.UserActions.getDriverData(this.props.tokenforuser);
    }

    var arr1=[];
    this.props.vehicleTypeList.map((val,i) => {
      arr1.push({value:val.name,tagid:val._id});
    });

    if(this.props.driverData != null) {

      if(this.props.driverData.data.profile != null)
      {
        this.setProgressBarValue(0);
      }

      if(this.props.driverData.data.firstName){this.setProgressBarValue(1);}
      if(this.props.driverData.data.lastName){this.setProgressBarValue(2);}
      if(this.props.driverData.data.dob){this.setProgressBarValue(3);}
      if(this.props.driverData.data.gender){this.setProgressBarValue(4);}
      if(this.props.driverData.data.ssn){this.setProgressBarValue(5);}
      if(this.props.driverData.data.address){this.setProgressBarValue(6);}
      if(this.props.driverData.data.licenseNo){this.setProgressBarValue(7);}
      if(this.props.driverData.data.licenceDate){this.setProgressBarValue(8);}
      if(this.props.driverData.data.experienceType){this.setProgressBarValue(9);}
      if(this.props.driverData.data.experienceYear){this.setProgressBarValue(10);}
      if(this.props.driverData.data.experienceMon){this.setProgressBarValue(11);}
      if(this.props.driverData.data.imgs.length>0)
        this.setProgressBarValue(12);

      if(this.props.driverData.data.about){this.setProgressBarValue(13);}
      //certificates :  (this.props.driverData.data.certificates != null) ? this.props.driverData.data.certificates[0] : "",
      if(this.props.driverData.data.cities != null){this.setProgressBarValue(14);}

      // states for vehicle information form
      if(this.props.driverData.data.vechiles.plateNo){this.setProgressBarValue(15);}
      if(this.props.driverData.data.vechiles.type){this.setProgressBarValue(16);}
      if(this.props.driverData.data.vechiles.make){this.setProgressBarValue(17);}
      if(this.props.driverData.data.vechiles.model){this.setProgressBarValue(18);}
      if(this.props.driverData.data.vechiles.modelYear){this.setProgressBarValue(19);}
      if(this.props.driverData.data.vechiles.equipment){this.setProgressBarValue(20);}
      if(this.props.driverData.data.vechiles.capacity){this.setProgressBarValue(21);}
      if(this.props.driverData.data.vechiles.insuranceNo){this.setProgressBarValue(22);}
      if(this.props.driverData.data.vechiles.insuranceExp){this.setProgressBarValue(23);}
      if((this.props.driverData.data.vechiles.imgs.length>0)){this.setProgressBarValue(24);}
      //if(agreement : ''){this.setProgressBarValue(25);}

      // image states for vehicle information
      if(this.props.driverData.data.vechiles.license != {} ){this.setProgressBarValue(26);}
      if(this.props.driverData.data.vechiles.insurance != {} ){this.setProgressBarValue(27);}
      if(this.props.driverData.data.vechiles.background != {} ){this.setProgressBarValue(28);}
      if(this.props.driverData.data.vechiles.abstract != {} ){this.setProgressBarValue(29);}

      // image states for vehicle information
      var _LicenceImage=null;
      var _InsuranceImage=null;
      var _Background=null;
      var _DriverExtract=null;

      // this.props.driverData.data.vechiles.addDocs && this.props.driverData.data.vechiles.addDocs.map((val,i) => {
      //   if(val.type == "license")
      //   {
      //     _LicenceImage={uri:Connection.getMedia() + val.path};
      //   }
      //   if(val.type == "background")
      //   {
      //     _Background={uri:Connection.getMedia() + val.path};
      //   }
      //   if(val.type == "abstract")
      //   {
      //     _DriverExtract={uri:Connection.getMedia() + val.path};
      //   }
      //   if(val.type == "insurance")
      //   {
      //     _InsuranceImage={uri:Connection.getMedia() + val.path};
      //   }
      // });


    this.setState({  gender:Constants.Strings.DropDownItems.gender || this.props.driverData.data.gender,
      yearList:Constants.Strings.DropDownItems.licenceYear,
      monthList:Constants.Strings.DropDownItems.experienceMonth,
      //certificateList:Constants.Strings.DropDownItems.certificates,
      //cityList:Constants.Strings.DropDownItems.citiesServe,
      //experienceTypeList:this.props.experienceTypeList,
      //experienceList:Constants.Strings.DropDownItems.experienceType,
      vehicleTypeList:arr1,//Constants.Strings.DropDownItems.vehicleType,
      //vehicleMakeList:Constants.Strings.DropDownItems.vehicleMake,
      //vehicleModelList:Constants.Strings.DropDownItems.vehicleModel,
      capacityList : Constants.Strings.DropDownItems.capacityList,

      vehicleYearList:Constants.Strings.DropDownItems.vehicleYear,
      equipmentList:Constants.Strings.DropDownItems.equipment,
      insuranceExpiryList:Constants.Strings.DropDownItems.insuranceExpiryYear,

      DriverInfo :this.props.driverInfo,

      // states for personal info form
      //avatarSource:Constants.Images.driver.camera,
      avatarSource:(this.props.driverData.data.profile) == null?Constants.Images.driver.camera:{uri:Connection.getMedia()+ this.props.driverData.data.profile},
      firstname:''|| this.props.driverData.data.firstName,
      lastname:''|| this.props.driverData.data.lastName,
      dob :''|| this.props.driverData.data.dob,
      sex : ''|| this.props.driverData.data.gender,
      sin : '' || this.props.driverData.data.ssn,
      address : '' || this.props.driverData.data.address,
      licenceNo : '' || this.props.driverData.data.licenseNo,
      licenceDate:'' || this.props.driverData.data.licenceDate,
      experience : '' || this.props.driverData.data.experienceType,
      experienceYear:'' || this.props.driverData.data.experienceYear,
      experienceMonth:'' || this.props.driverData.data.experienceMon,
      experienceImage: (this.props.driverData.data.imgs.length>0) ? {uri:Connection.getMedia()+this.props.driverData.data.imgs[0].path}:Constants.Images.driver.circleplus,
      experienceImagesArray:[],
      aboutUS : '' || this.props.driverData.data.about,
      //certificates :  (this.props.driverData.data.certificates != null) ? this.props.driverData.data.certificates[0] : "",
      locationServe : (this.props.driverData.data.cities != null) ? this.props.driverData.data.cities[0] : "",
      cities : (this.props.driverData.data.servingareas != null) ? this.props.driverData.data.servingareas : null,

      // states for vehicle information form
      vehicleNo:'' || this.props.driverData.data.vechiles.plateNo,
      vehicleType:''  || this.props.driverData.data.vechiles.type,
      makeOfVehicle : ''  || this.props.driverData.data.vechiles.make,
      vehicleModel : '' || this.props.driverData.data.vechiles.model,
      year :'' || this.props.driverData.data.vechiles.modelYear,
      equipment : '' || this.props.driverData.data.vechiles.equipment,
      capacity:'CAPACITY' || this.props.driverData.data.vechiles.capacity,
      insuranceNo : '' || this.props.driverData.data.vechiles.insuranceNo,
      insuranceExpiry :'' || this.props.driverData.data.vechiles.insuranceExp,
      vehicleImages:(this.props.driverData.data.vechiles.imgs.length>0) ? this.props.driverData.data.vechiles.imgs : [],
      agreement : '',

      // image states for vehicle information
      LicenceImage:_LicenceImage,
      InsuranceImage:_InsuranceImage,
      Background:_Background,
      DriverExtract:_DriverExtract,

      //confirmation check
      isConfirmed:false,

      //tabs state
      flagPersonal : 1,
      flagVehicle : 0,

      //ProgressWidth : 3,
      //ProgressData : 0,
      //OutputText :'0% Complete',
      modalVisible:false,
      listItems : [],


      //genderColor:Constants.Colors.BlurGrey,
      //dobColor:Constants.Colors.BlurGrey,
      //licenceDateColor:Constants.Colors.BlurGrey,
      licenceYearColor:Constants.Colors.BlurGrey,
      licenceMonthColor:Constants.Colors.BlurGrey,
      experienceYearColor:Constants.Colors.BlurGrey,
      experienceMonthColor:Constants.Colors.BlurGrey,
      certificatesColor:Constants.Colors.BlurGrey,
      vehicleTypeColor:Constants.Colors.BlurGrey,
      makeOfVehicleColor:Constants.Colors.BlurGrey,
      vehicleModelColor:Constants.Colors.BlurGrey,
      yearColor:Constants.Colors.BlurGrey,
      equipmentColor:Constants.Colors.BlurGrey,
      allFieldsFilled:false,
      token: this.props.driverData.token,
      //not used anywhere
      imgSource:null,
      })
    }
  }

  componentWillReceiveProps(nextProps){

    // this.setState({citiesList:nextProps.citiesList,certificatesList:nextProps.certificatesList});

    if(this.props.driverData && this.props.driverData.data &&this.props.driverData.data.servingareas!=null && this.props.driverData.data.servingareas.length != 0){
      let updatedArr = [];
      console.log('nextProps inside if statement *********** ',nextProps)
     _.each(this.props.driverData.data.servingareas,(each)=>{
        console.log('each element *********** ',each)
        _.each(nextProps.citiesList,(cities)=>{
          console.log('each cities list **********',cities)
          if(each == cities._id){
            cities.isSelected = true;
          }
            updatedArr.push(cities);

        })
        console.log('updated array ******* ',updatedArr);
        this.setState({
          citiesList:updatedArr
        })
      })
    }
    else{
      console.log('nextProps inside else  *********** ',nextProps)
      this.setState({
        citiesList: nextProps.citiesList,
        certificatesList: nextProps.certificatesList,
      })
    }
    if(this.props.driverData && this.props.driverData.data && this.props.driverData.data.experienceType!=null && this.props.driverData.data.experienceType.length != 0){
      let arr1=[];
      let updatedArr = [];
      _.each(this.props.driverData.data.experienceType,(each)=>{
         console.log('each element *********** ',each)
         _.each(nextProps.experienceTypeList,(experience)=>{
           console.log('each cities list **********',experience)
           if(each == experience._id){
             experience.isSelected = true;
           }
             updatedArr.push(experience);
         })
         console.log('updated array ******* ',updatedArr);
         this.setState({
           experienceTypeList:updatedArr
         })
       })
    }
    else{
      console.log('nextProps inside else  *********** ',nextProps)
      this.setState({
        experienceTypeList:nextProps.experienceTypeList,
      })
    }

  }

  componentDidMount()
  {
    if( this.props.driverData && this.props.driverData.data && this.props.driverData.data.servingareas!=null  && this.props.driverData.data.servingareas.length !=0){
      //console.log("cities list",this.props.driverData.data.cities)



      // _.each(this.props.driverData.data.cities,(each)=>{
      //   console.log('each element *********** ',each)
      //   _.each(this.state.citiesList,(cities)=>{
      //     console.log('each cities list **********',cities)
      //     if(each.cityName == cities.cityName){
      //       cities.isSelected = true;
      //     }
      //   })
      // })




      for(let index in this.props.driverData.data.servingareas){
        let selectData= this.props.driverData.data.servingareas[index];

        for(let inerindex in this.state.citiesList){
          let activeData= this.state.citiesList[inerindex];
          if(selectData == activeData._id){
            this.state.citiesList[inerindex].isSelected = true;
          }
        }
      }
    }

    if( this.props.driverData && this.props.driverData.data  &&  this.props.driverData.data.certificates!=null && this.props.driverData.data.certificates.length !=0){
      //console.log("certificates list",this.props.driverData.data.certificates)
      for(let index in this.props.driverData.data.certificates){
        let selectData= this.props.driverData.data.certificates[index];
        for(let inerindex in this.state.certificatesList){
          let activeData= this.state.certificatesList[inerindex];
          if(selectData.title == activeData.title){
            this.state.certificatesList[inerindex].isSelected = true;

          }
        }
      }

    }

  }

  /** method to change tab ***/
  onPressInfo(value){
    this.props.navigation.dispatch({type : 'LOAD_DRIVERINFO_PAGE', info : parseInt(value)});
    if(parseInt(value) === 1){
      this.setState({flagPersonal:1,flagVehicle:0,DriverInfo:1});
    }
    else {
      let { dispatch } = this.props;
        let checkFieldsValue=this.checkFields()

      // alert("checkfield1")
         if(checkFieldsValue === true){
        this.props.UserActions.userDriverForm({...this.state} );
        this.props.navigation.dispatch({type : 'LOAD_DRIVERINFO_PAGE', info : 2});
        this.setState({flagPersonal:0,flagVehicle:1,DriverInfo:2});
        }
    }
  }

  /***** navigate to vehicle info form on clicking next button ***/
  onNext(){
    let checkFieldsValue=this.checkFields()
      if(checkFieldsValue === true){
      this.props.UserActions.userDriverForm({...this.state});
      this.props.navigation.dispatch({type : 'LOAD_DRIVERINFO_PAGE', info : 2});
      this.setState({flagPersonal:0,flagVehicle:1,DriverInfo:2});
     }
     if(!this.props.modalstate.NewUserModalVisible) {
      this.props.UserActions.getDriverData(this.state.token);
    }
  }

  /*** method to save rabbit form */
  onSave(){
      //console.log({...this.state});
     // console.log("cities lis of api",this.state.cities);
      this.props.UserActions.userDriverForm({...this.state});

  }

  /*** method to check mandatory filed filled in personal info form ***/
  checkFields(){
    let { dispatch } = this.props.navigation;
    let {avatarSource,firstname,lastName,dob,sex,sin,address,licenceNo,licenceDate,
    experience,experienceYear,experienceMonth,experienceImagesArray,certificates,locationServe} = this.state;
    var _sin=sin;
    var constNumber='121212121';
    var finalstr=0;
    if(sin!=null)
    for (var i = 0; i < sin.length; i++)
    {
      var res = parseInt(sin.substr(i, 1)) * parseInt(constNumber.substr(i, 1));
      if(res < 10)
      {
        finalstr = parseInt(finalstr) + parseInt(res);
      }
      else {
        finalstr = parseInt(finalstr) + parseInt(res.toString().substr(0, 1)) + parseInt(res.toString().substr(1, 1));
      }
    }


    // if(_.isEmpty(avatarSource)){
    //   dispatch(ToastActionsCreators.displayInfo('Upload profile picture'))
    //   return false
    // }
    // else
     if(_.isEmpty(firstname)){
      dispatch(ToastActionsCreators.displayInfo('Enter first name'))
      return false
    }
    // else if(_.isEmpty(lastName)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter last name'))
    //   return false
    // }
    else if(_.isEmpty(dob)){
      dispatch(ToastActionsCreators.displayInfo('Enter dob'))
      return false
    }
    // else if(_.isEmpty(sex)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter gender'))
    //   return false
    // }
    else if(_.isEmpty(sin)){
      dispatch(ToastActionsCreators.displayInfo('Enter sin'))
      return false
    }
    else if(this.state.sin.length!=9){
      dispatch(ToastActionsCreators.displayInfo('Please enter nine digits for SIN/SSN'))
      return false
    }
    else if(parseInt(finalstr.toString().substr(finalstr.toString().length-1, 1)) != 0)
    {
      dispatch(ToastActionsCreators.displayInfo('Sin is not valid.'))
      return false
    }
    else if(_.isEmpty(address)){
      dispatch(ToastActionsCreators.displayInfo('Enter address'))
      return false
    }
    else if(_.isEmpty(licenceNo)){
      dispatch(ToastActionsCreators.displayInfo('Enter licenceNo'))
      return false
    }
    else if(_.isEmpty(licenceDate)){
      dispatch(ToastActionsCreators.displayInfo('Enter licence date'))
      return false
    }
    // else if(_.isEmpty(experience)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter experience'))
    //   return false
    // }
    // else if(_.isEmpty(experienceYear)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter experience year'))
    //   return false
    // }
    // else if(_.isEmpty(experienceMonth)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter experience month'))
    //   return false
    // }
    // else if(_.isEmpty(experienceImagesArray)){
    //   dispatch(ToastActionsCreators.displayInfo('Upload experience image'))
    //   return false
    // }
    // else if(_.isEmpty(certificates)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter certificate'))
    //   return false
    // }
    // else if(_.isEmpty(locationServe)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter city you serve'))
    //   return false
    // }
    else{
      return true
    }
  }

  /*** method to submit form for review ****/
  onSubmit(){
    //console.log(this.props,'onSubmit for Review')
    let { dispatch } = this.props.navigation;
    let checkFieldsValue=this.checkVehicleInfoFields()
     if(checkFieldsValue === true){
       this.setState({
        onSubmitForm:true
       },()=>{
        this.props.UserActions.userDriverSecondForm({...this.state},true,this.state.onSubmitForm);
       })
     }
  }

  /*** method to check mandatory filed filled in vehicle info form ***/
  checkVehicleInfoFields(){
    let { dispatch } = this.props.navigation;
    let {  vehicleImages,vehicleNo,vehicleType,makeOfVehicle,
      vehicleModel,year,equipment,insuranceNo,insuranceExpiry,capacity,
      LicenceImage,InsuranceImage,Background,DriverExtract,} = this.state;
      //console.log(this.state)
    if(_.isEmpty(vehicleNo)){
      dispatch(ToastActionsCreators.displayInfo('Enter vehicle number'))
      return false
    }
    else if(_.isEmpty(vehicleType)){
      dispatch(ToastActionsCreators.displayInfo('Enter vehicle type'))
      return false
    }
    else if(_.isEmpty(makeOfVehicle)){
      dispatch(ToastActionsCreators.displayInfo('Enter make of vehicle'))
      return false
    }
    else if(_.isEmpty(vehicleModel)){
      dispatch(ToastActionsCreators.displayInfo('Enter vehicle model'))
      return false
    }
    // else if(_.isEmpty(year)){
    //   dispatch(ToastActionsCreators.displayInfo('Enter year'))
    //   return false
    // }
    else if(_.isEmpty(equipment)){
      ToastAndroid.show('Enter equipment', ToastAndroid.SHORT);
      // dispatch(ToastActionsCreators.displayInfo('Enter equipment'))
      return false
    }
    else if(_.isEmpty(capacity)){
      ToastAndroid.show('Enter capacity', ToastAndroid.SHORT);
      // dispatch(ToastActionsCreators.displayInfo('Enter capacity'))
      return false
    }
    else if(_.isEmpty(insuranceNo)){
      dispatch(ToastActionsCreators.displayInfo('Enter insurance no'))
      return false
    }
    else if(_.isEmpty(insuranceExpiry)){
      dispatch(ToastActionsCreators.displayInfo('Enter insurance expiry'))
      return false
    }
    else if(_.isEmpty(vehicleImages)){
      dispatch(ToastActionsCreators.displayInfo('Upload vehicle images'))
      return false
    }
    else if(_.isEmpty(LicenceImage)){
      dispatch(ToastActionsCreators.displayInfo('Upload licence image'))
      return false
    }
    else if(_.isEmpty(InsuranceImage)){
      dispatch(ToastActionsCreators.displayInfo('Upload insurance image'))
      return false
    }
    else if(_.isEmpty(Background)){
      dispatch(ToastActionsCreators.displayInfo('Upload background check image'))
      return false
    }
    else if(_.isEmpty(DriverExtract)){
      dispatch(ToastActionsCreators.displayInfo('Upload driver extract image'))
      return false
    }
    else if(this.state.isConfirmed == false){
      dispatch(ToastActionsCreators.displayInfo('Please confirm the information provided'))
      return false
    }
    else{
      return true
    }
  }

  onSaveVehicleInfo()
  {
    //console.log(this.props,'onSubmit for Review')
    let { dispatch } = this.props.navigation;
    //let checkFieldsValue=this.checkVehicleInfoFields()
    //  if(checkFieldsValue === true){
      this.props.UserActions.userDriverSecondForm({...this.state},false);
    //  }
    if(!this.props.modalstate.NewUserModalVisible) {
      this.props.UserActions.getDriverData(this.state.token);
    }
  }

  /*** method to change color of active tab ***/
  setTextColorOnFocus(value){
    if(value === 1)
    {
      return [styles.colIndexLabel];
    }
    else {
      return [styles.colIndexLabel,{color:Constants.Colors.BlurGrey}];
    }
  }

  /**** set progress bar value ***/
  setProgressBarValue(index){
      ProgressBarArray[index]=1;
      var length=0;
      for(var i=0;i<ProgressBarArray.length;i++)
      {
        length = length + ProgressBarArray[i];
      }
      //var length = this.state.ProgressData + 1;
      var percentage = ((100 * length) / 30) | 0;
      const text = `${percentage}% Completed `;
      var widthPr=(percentage*2.4);
      this.setState({ ProgressWidth:widthPr,OutputText: text,ProgressData: length});
  }

  // setGender()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.gender, genderColor : Constants.Colors.Blue});
  // }
   setdob(date)
   {
       this.setState({dob:date,dobColor : Constants.Colors.Blue});
       this.setProgressBarValue(3);
   }
   setExpiry(date)
   {
       this.setState({licenceDate:date,licenceDateColor : Constants.Colors.Blue});
       this.setProgressBarValue(8);
   }
  // yearOfVehicle()
  // {
  //   //this.setState({yearColor : Constants.Colors.Blue});
  //   //this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.equipment, equipmentColor : Constants.Colors.Blue});

  //   this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.vehicleYear, yearColor : Constants.Colors.Blue});
  // }
  // insuranceExpiry()
  // {
  //   this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.insuranceExpiryYear, insuranceExpiryColor : Constants.Colors.Blue});
  // }
  // licenceYear()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.licenceYear, licenceYearColor : Constants.Colors.Blue});
  // }
  // licenceMonth()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.licenceMonth, licenceMonthColor : Constants.Colors.Blue});
  // }
  // experienceYear()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.experienceYear, experienceYearColor : Constants.Colors.Blue});
  // }
  // experienceMonth()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.experienceMonth, experienceMonthColor : Constants.Colors.Blue});
  // }
  // certificates()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.certificates, certificatesColor : Constants.Colors.Blue});
  // }
  // vehicleType()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.vehicleType, vehicleTypeColor : Constants.Colors.Blue});
  // }
  // vehicleMake()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.vehicleMake, makeOfVehicleColor : Constants.Colors.Blue});
  // }
  // vehicleModel()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.vehicleModel, vehicleModelColor : Constants.Colors.Blue});
  // }
  // equipment()
  // {
  //     this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.equipment, equipmentColor : Constants.Colors.Blue});
  // }
  // experienceTypeSet(){
  //   this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.experienceType, experienceTypeColor : Constants.Colors.Blue});
  // }
  // setCitiesLocation(){
  //   this.setState({modalVisible:true,listItems : Constants.Strings.DropDownItems.citiesServe, citiesServeColor : Constants.Colors.Blue});
  // }

/*** methos to select item from drop down lis ****/
// setListValue(value,name){
//   if(value=='gender')
//   {
//     this.setState({modalVisible:false,sex : name});
//   }
//   // else if (value=='licenceYear')
//   // {
//   //   this.setState({modalVisible:false,licenceYear : name});
//   // }
//   // else if (value=='licenceMonth')
//   // {
//   //   this.setState({modalVisible:false,licenceMonth : name});
//   // }
//   else if (value=='experienceYear')
//   {
//     this.setState({modalVisible:false,experienceYear : name});
//   }
//   else if (value=='experienceMonth')
//   {
//     this.setState({modalVisible:false,experienceMonth : name});
//   }
//   else if (value=='certificates')
//   {
//     this.setState({modalVisible:false,certificates : name});
//   }
//   else if (value=='vehicleType')
//   {
//     this.setState({modalVisible:false,vehicleType : name});
//   }
//   else if (value=='vehicleMake')
//   {
//     this.setState({modalVisible:false,makeOfVehicle : name});
//   }
//   else if (value=='vehicleModel')
//   {
//     this.setState({modalVisible:false,vehicleModel : name});
//   }
//   else if (value=='equipment')
//   {
//     this.setState({modalVisible:false,equipment : name});
//   }
//   else if (value=='vehicleYear')
//   {
//     this.setState({modalVisible:false,year : name});
//   }
//   else if (value=='insuranceExpiryYear')
//   {
//     this.setState({modalVisible:false,insuranceExpiry : name});
//   }
//   else if (value=='experienceType')
//   {
//     this.setState({modalVisible:false,experience : name});
//   }
//   else if (value=='citiesServe')
//   {
//     this.setState({modalVisible:false,locationServe : name});
//   }
//   this.setProgressBarValue();
// }

/*** method to open iamge picker and set image ***/
openImagePicker(image_type,progressIndex) {

  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  };
  let arrImg = [];
  ImagePicker.showImagePicker(options, response => {
    console.log("Response = ", response);

    if (response.didCancel) {
    console.log("User cancelled photo picker");
    }
    else if (response.error) {
    console.log("ImagePicker Error: ", response.error);
    }
    else if (response.customButton) {
    console.log("User tapped custom button: ", response.customButton);
    }
    else {
      let source = { uri: response.uri , fileName: response.fileName, type: response.type};
      this.setProgressBarValue(progressIndex);
      switch(image_type){
        case 'profile':
          this.setState({avatarSource: source})
        break;

        case 'license':
          this.setState({LicenceImage: source, imageType:image_type})
        break;

        case 'insurance':
          this.setState({InsuranceImage: source, imageType:image_type})
        break;

        case 'background':
          this.setState({Background: source, imageType:image_type})
        break;

        case 'abstract':
          this.setState({DriverExtract: source, imageType:image_type})
        break;

      }

      }
  });
}

/** render drop down view items ***/
// renderRow(value){
//   return(
//     <TouchableOpacity key={1} onPress={() => this.setListValue(value.tagid,value.name)} style={[{marginBottom:1,marginTop:2}]}>
//         <View style={[styles.container,{alignItems:'center'}]}>
//           <Text style={styles.rowText}>{value.name}</Text>
//         </View>
//     </TouchableOpacity>
//   )
// }

cropImage(){
  // alert("image"+ImageCropPicker)
    ImageCropPicker.openPicker({
      height: parseInt(Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5),
      width: parseInt(Constants.BaseStyle.DEVICE_WIDTH / 100 * 5),
      cropping: true
    }).then(response => {
      let source = { uri: response.path , fileName: response.path, type: response.mime};
      this.setProgressBarValue(1);
      this.setState({avatarSource: source,isVisible:false});

    });
  }

  cropCameraPic()
  {
    ImagePicker.openCamera({
        height: parseInt(Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5),
        width: parseInt(Constants.BaseStyle.DEVICE_WIDTH / 100 * 5),
        cropping: true
      }).then(response => {
        let source = { uri: response.path , fileName: response.path, type: response.mime};
        this.setProgressBarValue(1);
        this.setState({avatarSource: source,isVisible:false});

      });
  }

  renderVehicleImages() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri , fileName: response.fileName, type: response.type};
        console.log("after uri..... ", response.uri, );

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   imgSource: source
        // });

        let arrImg = this.state.vehicleImages;

        arrImg.push(source);

        this.setState({imgSourceVehicle: arrImg})
        this.setProgressBarValue(25);

      }
    });
  }

  renderExperienceImages() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri , fileName: response.fileName, type: response.type};
        console.log("after uri..... ", response.uri);

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   imgSource: source
        // });
        let arrImg = this.state.experienceImagesArray;

        arrImg.push(source);

        this.setState({imgSourceExperience: arrImg})
        this.setProgressBarValue(12);
        //console.log(" image source  ***********  ", arrImg);

      }
    });
  }

  /*** select gender from drop down */
  selectGender(sex){
    this.setState({sex:sex, genderColor : Constants.Colors.Blue})
    this.setProgressBarValue(4)
  }

  selectSin(sin)
  {
    this.setState({sin:sin, sinColor : Constants.Colors.Blue})
  }

  /*** select experience type from drop down */
  /*selectExperience(experience){
    this.setState({experience})
    this.setProgressBarValue(9)
  }*/

  /*** select experience year from drop down */
  selectExperienceYear(experienceYear){
    //console.log(experienceYear,'experienceYear&&&&&&&&&&&')
    this.setState({experienceYear})
    this.setProgressBarValue(10)
  }

  /*** select experience month from drop down */
  selectExperienceMonth(experienceMonth){
    this.setState({experienceMonth})
    this.setProgressBarValue(11)
  }

   /*** select vehicle type from drop down */
  selectVehicleType(text){

   this.setState({vehicleType:text});
   /*this.state.vehicleTypeList.map((val,i) => {
     if(val.value == text)
     {
       this.props.UserActions.getMakeOfVehicleList(val.tagid);

     }
   });*/
    this.setProgressBarValue(17);
  }

   /*** select make of vehicle from drop down */
  selectMakeOfVehicle(makeOfVehicle){
    this.setState({makeOfVehicle});
    var vehicleid='';
    console.log("vehicleTypeList",this.state.vehicleTypeList)
    this.state.vehicleTypeList.map((val,i) => {
      if(val.value == this.state.vehicleType)
      {
        vehicleid = val.tagid;
      }
    });

    this.props.vehicleMakeList.map((val,i) => {
      if(val.value == makeOfVehicle)
      {
        this.props.UserActions.getVehicleModalList(vehicleid,val.tagid);
      }
    });
     this.setProgressBarValue(18);
  }

  /*** select vehicle model from drop down */
  selectVehicleModel(vehicleModel){
    this.setState({vehicleModel})
    this.props.vehicleModelList.map((val,i) => {
      if(val.value == vehicleModel)
      {
        var arr1=val.room;
        arr1.map((obj,b) => {
          this.setState({room : obj.name});
        });

        //this.props.UserActions.getVehicleModalList(vehicleid,val.tagid);
      }
    });
    this.setProgressBarValue(19);
  }

  /*** select vehicle year from drop down */
  selectVehicleYear(year){
    this.setState({year})
    this.setProgressBarValue(20)
  }

  /*** select capacity from drop down */
 selectCapacity(capacity){
   this.setState({capacity})
   this.setProgressBarValue(21)
 }

   /*** select insurance expiry from drop down */
  selectInsuranceExpiry(insuranceExpiry){
    this.setState({insuranceExpiry})
    this.setProgressBarValue(24)
  }

/***  selected cities */
  selectConfirm=(list) =>{
    let {citiesList} = this.state;

   // this.setState({markerLatLng:[]});
    for (let item of list) {
      let index = citiesList.findIndex(ele => ele === item);
      if (~index) citiesList[index].isSelected = true;
      else continue;
    }

    this.setState({citiesList: citiesList,cities:[]});

    /*this.state.cities.length =0;
    for(let index in this.state.citiesList){
      let activeData= this.state.citiesList[index];

      if(activeData.isSelected){
        this.state.cities.push(activeData)
      }
    }*/
    var arr1=[];
    for(let index in this.state.citiesList){
      let activeData= this.state.citiesList[index];

      if(activeData.isSelected){
        arr1.push(activeData)
      }
    }
    this.setState({cities:arr1});
    this.setProgressBarValue(15);
  }


  deleteItem=(item)=> {
    // this.setState({markerLatLng:[]});
     let {citiesList} = this.state;
     let index = citiesList.findIndex(a => a === item);
     this.state.citiesList[index].isSelected = false;
     this.setState({citiesList: citiesList,cities : []});

     var arr1=[];
     for(let index in this.state.citiesList){
       let activeData= this.state.citiesList[index];

       if(activeData.isSelected){
         arr1.push(activeData)
       }
     }
     this.setState({cities:arr1});

     /*this.state.cities.length =0;
     for(let index in this.state.citiesList){
       let activeData= this.state.citiesList[index];
       if(activeData.isSelected){
         this.state.cities.push(activeData)
       }
     }*/
    }

  /***  selected equipment */
  selectConfirmEquipment=(list) =>{
    let {equipmentList} = this.state;

   // this.setState({markerLatLng:[]});
    for (let item of list) {
      let index = equipmentList.findIndex(ele => ele === item);
      if (~index) equipmentList[index].isSelected = true;
      else continue;
    }

    this.setState({equipmentList: equipmentList,equipment:null});

    //this.state.equipment.length =0;
    var arr1=[];
    for(let index in this.state.equipmentList){
      let activeData= this.state.equipmentList[index];

      if(activeData.isSelected){
        arr1.push(activeData)
      }
    }
    this.setState({equipment:arr1});
    this.setProgressBarValue(22);
  }

  deleteEquipmentItem=(item)=> {
    // this.setState({markerLatLng:[]});
     let {equipmentList} = this.state;
     let index = equipmentList.findIndex(a => a === item);
     this.state.equipmentList[index].isSelected = false;
     this.setState({equipmentList: equipmentList,equipment:null});

     var arr1=[];
     for(let index in this.state.equipmentList){
       let activeData= this.state.equipmentList[index];

       if(activeData.isSelected){
         arr1.push(activeData)
       }
     }
     this.setState({equipment:arr1});
    }

selectExperience=(list) =>{
  let {experienceTypeList} = this.state;

  for (let item of list) {
    let index = experienceTypeList.findIndex(ele => ele === item);
    if (~index) experienceTypeList[index].isSelected = true;
    else continue;
  }

  this.setState({experienceTypeList: experienceTypeList,experience:null});
  var arr1=[];
  for(let index in this.state.experienceTypeList){
    let activeData= this.state.experienceTypeList[index];

    if(activeData.isSelected){
      arr1.push(activeData)
    }
  }
  this.setState({experience:arr1});
  this.setProgressBarValue(9);
}

deleteExperienceItem=(item)=> {
 // this.setState({markerLatLng:[]});
  let {experienceTypeList} = this.state;
  let index = experienceTypeList.findIndex(a => a === item);
  this.state.experienceTypeList[index].isSelected = false;
  this.setState({experienceTypeList: experienceTypeList,experience:null});
  var arr1=[];
  for(let index in this.state.experienceTypeList){
    let activeData= this.state.experienceTypeList[index];

    if(activeData.isSelected){
      arr1.push(activeData)
    }
  }
  this.setState({experience:arr1});
  this.setProgressBarValue(9);
}




/***  selected Certificates */
selectCertificates=(list) =>{
    let {certificatesList} = this.state;

   // this.setState({markerLatLng:[]});
    for (let item of list) {
      let index = certificatesList.findIndex(ele => ele === item);
      if (~index) certificatesList[index].isSelected = true;
      else continue;
    }

    this.setState({certificatesList: certificatesList});

    this.state.certificates.length =0;
    for(let index in this.state.certificatesList){
      let activeData= this.state.certificatesList[index];
      //console.log("selectCertificates data",activeData)

      if(activeData.isSelected){
        this.state.certificates.push(activeData)
      }
    }
    this.setProgressBarValue(14);


  }
 deleteCertificateItem=(item)=> {
    // this.setState({markerLatLng:[]});
     let {certificatesList} = this.state;
     let index = certificatesList.findIndex(a => a === item);
     this.state.certificatesList[index].isSelected = false;
     this.setState({certificatesList: certificatesList});

     this.state.certificates.length =0;
     for(let index in this.state.certificatesList){
       let activeData= this.state.certificatesList[index];
       //console.log("certificates data",activeData)

       if(activeData.isSelected){
         this.state.certificates.push(activeData)
       }
     }
}


  render() {
   // console.log("certificatesList status **************************************",this.props.certificatesList)
  //console.log("driver status **************************************",this.props.driverData)
      const { navigate,goBack } = this.props.navigation;
      const newUserVisibilityDialog = this.props.modalstate.NewUserModalVisible;
      return (
            <View  style={[styles.container]}>
              <ScrollView keyboardShouldPersistTaps="always">
                { newUserVisibilityDialog == false ?
                  <View>
                    <View  style={[styles.TopHeader]}>
                      <Text  style={styles.TopHeaderText}>
                      {'DRIVER FORM'}
                      </Text>
                      <View  style={[styles.TopHeadRight]}>
                          <TouchableOpacity onPress={() => console.log('hello')}>
                            <Image source={Constants.Images.user.setting} style={styles.Sidelogo} resizeMode={'contain'} />
                          </TouchableOpacity>
                      </View>
                    </View>

                    <View>

                    <View style={styles.flexRow}>
                      <TouchableOpacity onPress={() => this.onPressInfo(1)} underlayColor='#fee989' style={styles.colIndex}>
                        <Text style={this.setTextColorOnFocus(this.state.flagPersonal)}>{'Personal information'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.onPressInfo(2)} underlayColor='#fee989' style={styles.colIndex}>
                        <Text style={this.setTextColorOnFocus(this.state.flagVehicle)}>{'Vehicle Information'}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.completePercent]}>
                      <View style={styles.progressLineWrap}>
                        <View style={[styles.progressLine,{width:this.state.ProgressWidth}]}/>
                      </View>

                      <Text style={styles.progressText}>{this.state.OutputText}</Text>
                    </View>
                  </View>

                { this.state.DriverInfo == 1 ?
                    this.renderPersonalInfoForm()
                :
                    this.renderVehicleInfoForm()
                }

                <Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => {this.setState({modalVisible:false})}}>
                  <View  style={[styles.modalOuter]}>
                    <View  style={styles.modalInner}>
                          {/*<ListView enableEmptySections={true} dataSource={dataSource} renderRow={this.renderRow}  keyboardShouldPersistTaps="always"/>*/}
                          <FlatList
                          data={this.state.listItems}
                          renderItem={({item})=>this.renderRow(item)}
                          />
                    </View>
                  </View>
                </Modal>

                <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormSubmitModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMSUBMIT_VISIBILITY',visibility:false})}}>
                  <DriverFormSubmit navigation={this.props.navigation} />
                </Modal>

                <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.FormRejectModalVisible} onRequestClose={() => {this.props.navigation.dispatch({type:'FORMREJECT_VISIBILITY',visibility:false})}}>
                  <DriverFormReject navigation={this.props.navigation} dispatch={this.props.navigation} />
                </Modal>

                </View>
                :
                <Modal animationType={"fade"} transparent={true} visible={newUserVisibilityDialog} onRequestClose={() => {this.props.navigation.dispatch({type:'NEWUSER_VISIBILITY',visibility:false})}}>
                  <NewUserDialog navigation={this.props.navigation} />
                </Modal>
 }
            </ScrollView>
            </View>
    );
  }

  renderPersonalInfoForm(){
    return(
      <ScrollView keyboardDismissMode={(Platform.OS === 'ios') ? 'interactive' : 'on-drag'} keyboardShouldPersistTaps="always">

          <View>
            <View  style={[styles.container]}>

              <View style={{ marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5, marginBottom:10}}>
                <Text style={[{color:Constants.Colors.Blue, fontSize:12}]}>
                {'We are pleased to welcome you to Delgate as a "Delgate Rabbit". Please fill out the form and submit it for review. The below requested info is private and will be held confidential.'}
                </Text>
              </View>

              <View style={[{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
                <Text style={{color:Constants.Colors.Blue,marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 * .4}}>Profile Picture</Text>
                  <TouchableOpacity style={styles.ImageBorder} onPress={() => this.setState({isVisible:true})/*('profile',1)*/}>
                  <Image style={styles.insideCamera} source={this.state.avatarSource}  resizeMode={'contain'} />
                  </TouchableOpacity>
              </View>

              <View style={styles.flexRow}>
                <View style={styles.colIndex}>
                    <FormTextInput
                    autoFocus={false}
                    ref='firstname'
                    placeHolderText={Constants.Strings.driverPersonal.firstname}
                    placeHolderColor={Constants.Colors.BlurGrey}
                    focusColor={Constants.Colors.Blue}
                    value={this.state.firstname}
                    style = {[styles.inputTextViewStyle,{marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginHorizontal:0,marginRight:10}]}
                    inputStyle={styles.inputStyle}
                    secureText={false}
                    isPassword={false}
                    showPassword={false}
                    onChangeText={(firstname)=>this.setState({firstname})}
                    onBlur={() => {this.setProgressBarValue(1)}}
                    />
                </View>
                <View style={styles.colIndex}>
                    <FormTextInput
                    autoFocus={false}
                    ref='lastname'
                    placeHolderText={Constants.Strings.driverPersonal.lastname}
                    placeHolderColor={Constants.Colors.BlurGrey}
                    focusColor={Constants.Colors.Blue}
                    value={this.state.lastname}
                    style = {[styles.inputTextViewStyle,{marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginHorizontal:0,marginLeft:10}]}
                    inputStyle={[styles.inputStyle]}
                    secureText={false}
                    isPassword={false}
                    showPassword={false}
                    onChangeText={(lastname)=>this.setState({lastname})}
                    onBlur={() => {this.setProgressBarValue(2)}}
                    />
                </View>
              </View>

              <View style={styles.flexRow}>
                  <DatePicker
                  style={{flex:1}}
                  date={this.state.dob}
                  mode="date"
                  placeholder={"BIRTH DATE"}
                  format="YYYY-MM-DD"
                  minDate="1950-05-01"
                  maxDate={dateOfbirth}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconSource={Constants.Images.driver.calendar}
                  customStyles={{
                  dateIcon: [styles.rowIcon,{tintColor:this.state.dobColor}],
                  dateInput:[styles.rowLeft,{borderBottomColor:this.state.dobColor}],
                  placeholderText:{color:this.state.dobColor},
                  dateText:{color:this.state.dobColor}
                  // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setdob(date)/*this.setState({dob: date})*/}}
                  />

                  <Dropdown
                    containerStyle={{flex:1,marginTop:-20,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginHorizontal:0,marginLeft:30}}
                    textColor ={this.state.genderColor}
                    baseColor ={Constants.Colors.Blue}
                    value={this.state.sex||'GENDER'}
                    fontSize={14}
                    data={this.state.gender}
                    onChangeText={(sex)=>{this.selectGender(sex)}}
                    />
              </View>

                <FormTextInput
                  autoFocus={false}
                  ref='sin'
                  placeHolderText={Constants.Strings.driverPersonal.sin}
                  placeHolderColor={Constants.Colors.BlurGrey}
                  focusColor={Constants.Colors.Blue}
                  style = {styles.inputTextViewStyle}
                  inputStyle={styles.inputStyle}
                  value={this.state.sin}
                  keyboardType="numeric"
                  secureText={false}
                  isPassword={false}
                  showPassword={false}
                  maxLength = {9}
                  onChangeText={(sin)=>this.setState({sin})}
                  onBlur={() => {this.setProgressBarValue(5)}}
                  />

                <FormTextInput
                autoFocus={false}
                ref='address'
                placeHolderText={Constants.Strings.driverPersonal.address}
                placeHolderColor={Constants.Colors.BlurGrey}
                focusColor={Constants.Colors.Blue}
                value={this.state.address}
                style = {styles.inputTextViewStyle}
                inputStyle={styles.inputStyle}
                secureText={false}
                isPassword={false}
                showPassword={false}
                onChangeText={(address)=>this.setState({address})}
                onBlur={() => {this.setProgressBarValue(6)}}
                />

              <View style={styles.flexRow}>
                  <View style={styles.colIndex}>
                    <FormTextInput

                    autoFocus={false}
                    ref='licenceNo'
                    placeHolderText={Constants.Strings.driverPersonal.licenceNo}
                    placeHolderColor={Constants.Colors.BlurGrey}
                    focusColor={Constants.Colors.Blue}
                    value={this.state.licenceNo}
                    style = {[styles.inputTextViewStyle,{marginHorizontal:0,marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginRight:10}]}
                    inputStyle={[styles.inputStyle,{top:5}]}
                    secureText={false}
                    isPassword={false}
                    showPassword={false}
                    onChangeText={(licenceNo)=>this.setState({licenceNo})}
                    onBlur={() => {this.setProgressBarValue(7)}}
                    />
                  </View>

                  <DatePicker
                    style={{flex:1  , marginTop: 11}}
                    date={this.state.licenceDate}
                    mode="date"
                    placeholder="EXPIRY DATE"
                    format="YYYY-MM-DD"
                    minDate={currentDate}
                    maxDate={futureDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconSource={Constants.Images.driver.calendar}
                    customStyles={{
                    dateIcon: [styles.rowIcon,{tintColor:this.state.licenceDateColor}],
                    dateInput:[styles.rowLeft,{borderBottomColor:this.state.licenceDateColor}],
                    placeholderText:{color:this.state.licenceDateColor},
                    dateText:{color:this.state.licenceDateColor}
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setExpiry(date)}}
                    />
              </View>

              <Text style={[{textAlign:'left',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,color:Constants.Colors.Blue,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
              {Constants.Strings.driverPersonal.experience}
              </Text>
             <View>
                  <LabelSelect
                    title="Select Experience"
                    ref="select"
                    style={styles.labelSelect}
                    onConfirm={this.selectExperience}
                  >
                    {this.state.experienceTypeList && this.state.experienceTypeList.filter(item => item.isSelected).map((item, index) =>
                      <LabelSelect.Label
                        key={'label-' + index}
                        data={item}
                        onCancel={() => {this.deleteExperienceItem(item);}}
                      >{item.name}</LabelSelect.Label>
                    )}
                    {this.state.experienceTypeList && this.state.experienceTypeList.filter(item => !item.isSelected).map((item, index) =>
                      <LabelSelect.ModalItem
                        key={'modal-item-' + index}
                        data={item}
                      >{item.name}</LabelSelect.ModalItem>
                    )}
                  </LabelSelect>
                </View>

              <View style={styles.flexRow}>
                {/*<View style={[styles.colIndex,{flex : 0.5}]}>
                  <Dropdown
                    containerStyle={{marginTop:-10,marginLeft:20}}
                    textColor ={Constants.Colors.Blue}
                    baseColor ={Constants.Colors.Blue}
                    value={this.state.experience||'EXPERIENCE TYPE'}
                    fontSize={14}
                    data={this.state.experienceTypeList}
                    onChangeText={(experience)=>{this.selectExperience(experience)}}
                    />
                </View>*/}

                <Dropdown
                  containerStyle={{flex: 0.5,marginTop:-10,marginHorizontal:10}}
                  textColor ={Constants.Colors.Blue}
                  baseColor ={Constants.Colors.Blue}
                  value={this.state.experienceYear||'YEAR'}
                  fontSize={14}
                  data={this.state.yearList}
                  onChangeText={(experienceYear)=>{this.selectExperienceYear(experienceYear)}}
                  />

                <Dropdown
                  containerStyle={{flex: 0.5,marginTop:-10,marginHorizontal:10}}
                  textColor ={Constants.Colors.Blue}
                  baseColor ={Constants.Colors.Blue}
                  value={this.state.experienceMonth||'MONTH'}
                  fontSize={14}
                  data={this.state.monthList}
                  onChangeText={(experienceMonth)=>{this.selectExperienceMonth(experienceMonth)}}
                  />

              </View>

              <View style={[{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
                <Text style={[{color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                {Constants.Strings.driverPersonal.jobExperience}
                </Text>

                <View style={styles.gallaryImagesView}>


                {this.props.driverData && this.props.driverData.data.imgs.length != 0 ?
                    this.props.driverData.data.imgs.map((each, index) => {
                      // console.log('each vehicle images ****** ',each)
                      return (
                        <Image
                        key={index}
                        source={{ uri: Connection.getMedia()+each.path }}
                        style={styles.gallaryImages}
                        resizeMode={"cover"}
                        />
                      );
                    })

                    :

                    this.state.experienceImagesArray.map((each, index) => {
                      return (
                      <Image
                      key={index}
                      source={{ uri: each.uri }}
                      style={styles.gallaryImages}
                      resizeMode={"cover"}
                      />
                      );
                    })

                  }

                  <TouchableOpacity style={styles.cameraImages} onPress={() => this.renderExperienceImages()}>
                    <Image source={Constants.Images.driver.circleplus} style={styles.insideCamera}  resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>

                <Text style={[{color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                  {Constants.Strings.driverPersonal.aboutUS}
                </Text>
              </View>

              <TextInput
                underlineColorAndroid="transparent"
                multiline={true}
                maxLength={250}
                value={this.state.aboutUS}
                placeholderTextColor={this.state.focusColor}
                onChangeText={(aboutUS)=>this.setState({aboutUS})}
                onBlur={() => {this.setProgressBarValue(13)}}
                style={[{height : 60,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,borderWidth : 1,borderColor:Constants.Colors.Blue,color : Constants.Colors.Blue}]}
                />

              <Text style={[{textAlign:'left',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,color:Constants.Colors.Blue,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
              {Constants.Strings.driverPersonal.certificates}
              </Text>
             <View>
                  <LabelSelect
                    title="Select Certificates"
                    ref="select"
                    style={styles.labelSelect}
                    onConfirm={this.selectCertificates}
                  >
                    {this.state.certificatesList && this.state.certificatesList.filter(item => item.isSelected).map((item, index) =>
                      <LabelSelect.Label
                        key={'label-' + index}
                        data={item}
                        onCancel={() => {this.deleteCertificateItem(item);}}
                      >{item.title}</LabelSelect.Label>
                    )}
                    {this.state.certificatesList && this.state.certificatesList.filter(item => !item.isSelected).map((item, index) =>
                      <LabelSelect.ModalItem
                        key={'modal-item-' + index}
                        data={item}
                      >{item.title}</LabelSelect.ModalItem>
                    )}
                  </LabelSelect>
                </View>

              <Text style={[{textAlign:'left',color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
              {Constants.Strings.driverPersonal.locationServe}
              </Text>
               <View>
                  <LabelSelect
                    title="Select Cities"
                    ref="select"
                    style={styles.labelSelect}
                    onConfirm={this.selectConfirm}
                  >
                    {this.state.citiesList && this.state.citiesList.filter(item => item.isSelected).map((item, index) =>
                      <LabelSelect.Label
                        key={'label-' + index}
                        data={item}
                        onCancel={() => {this.deleteItem(item);}}
                      >{item.cityName}</LabelSelect.Label>
                    )}
                    {this.state.citiesList && this.state.citiesList.filter(item => !item.isSelected).map((item, index) =>
                      <LabelSelect.ModalItem
                        key={'modal-item-' + index}
                        data={item}
                      >{item.cityName}</LabelSelect.ModalItem>
                    )}
                  </LabelSelect>
                </View>

              <Text style={[{textAlign:'center',color:Constants.Colors.Blue,fontSize:12}]}>
              {Constants.Strings.driverPersonal.notes}
              </Text>

              <View style={[styles.flexRow,{marginBottom:10}]}>
                <View style={[styles.colIndex,{flex : 0.5}]}>
                  <SubmitButton
                  onPress={() => this.onSave()}
                  text={Constants.Strings.driverPersonal.save}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                  />
                </View>

                <View style={[styles.colIndex,{flex : 0.5}]}>
                  <SubmitButton
                  onPress={() => this.onNext()}
                  text={Constants.Strings.driverPersonal.next}
                  style={[styles.ButtonStyle]}
                  textStyle={[{fontSize:15}]}
                  />
                </View>
              </View>


            </View>
          </View>

          <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => {this.setState({isVisible:false})}}>
          <View  style={[styles.modalOuter]}>
            <View style={[styles.modalInner,{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 80,borderRadius:10,padding:0}]}>


              <View>
               <View style={{justifyContent:'center',marginBottom: Constants.BaseStyle.DEVICE_WIDTH*1/100,}}>
                 <Text style={{fontWeight:'900',fontSize:16,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,}}>{'Select A Photo'}</Text>
                 <TouchableOpacity onPress={() => this.cropCameraPic()}>
                    <Text style={{fontSize:16,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,marginBottom: Constants.BaseStyle.DEVICE_WIDTH*2/100,}}>{'Take a Photo..'}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => this.cropImage()}>
                    <Text style={{fontSize:16,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*3}}>{'Select from Library..'}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => {this.setState({isVisible:false})}}>
                    <Text style={{fontSize:16,color : Constants.Colors.Blue,textAlign:'right',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,}}>{'Cancel'}</Text>
                 </TouchableOpacity>

               </View>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    )
  }

  checkExistenceDocuments(obj) {
    let array = this.props.driverData.data.vechiles.docDetails
    for (var i = 0; i < array.length; i++) {
      if (array[i].docType == obj) {
          return true;
      }
    }
    return false;
  }

  OnClickConfirm()
  {

    if(!this.state.isConfirmed)
    {
      this.setProgressBarValue(30);
    }
    this.setState({isConfirmed : !this.state.isConfirmed});
  }


  renderDocuments(image_type, text) {

    //console.log("image_type",image_type)
      //console.log('license doc type from api ******* ',this.props.driverData.data)
      //this.setProgressBarValue(26);
      if(image_type == 'license'){
        return (<TouchableOpacity onPress={() => this.openImagePicker(image_type,26)} underlayColor='#fee989' style={styles.ImageBorder}>
            <View style={[styles.bottomInnerViewStyle]}>
              <Image source={this.state.LicenceImage} style={styles.insideIcon} resizeMode={'contain'} />
              <Text style={[styles.bottomLabel, { fontSize: 10, color: Constants.Colors.Blue }]}>{text}</Text>
            </View>
          </TouchableOpacity>)
      }
      if(image_type == 'insurance'){
        return (<TouchableOpacity onPress={() => this.openImagePicker(image_type,27)} underlayColor='#fee989' style={styles.ImageBorder}>
            <View style={[styles.bottomInnerViewStyle]}>
              <Image source={this.state.InsuranceImage} style={styles.insideIcon} resizeMode={'contain'} />
              <Text style={[styles.bottomLabel, { fontSize: 10, color: Constants.Colors.Blue }]}>{text}</Text>
            </View>
          </TouchableOpacity>)
      }
      if(image_type == 'background'){
        return (<TouchableOpacity onPress={() => this.openImagePicker(image_type,28)} underlayColor='#fee989' style={styles.ImageBorder}>
            <View style={[styles.bottomInnerViewStyle]}>
              <Image source={this.state.Background} style={styles.insideIcon} resizeMode={'contain'} />
              <Text style={[styles.bottomLabel, { fontSize: 10, color: Constants.Colors.Blue }]}>{text}</Text>
            </View>
          </TouchableOpacity>)
      }
      if(image_type == 'abstract'){
        return (<TouchableOpacity onPress={() => this.openImagePicker(image_type,29)} underlayColor='#fee989' style={styles.ImageBorder}>
            <View style={[styles.bottomInnerViewStyle]}>
              <Image source={this.state.DriverExtract} style={styles.insideIcon} resizeMode={'contain'} />
              <Text style={[styles.bottomLabel, { fontSize: 10, color: Constants.Colors.Blue }]}>{text}</Text>
            </View>
          </TouchableOpacity>)
      }
  }


  renderVehicleInfoForm(){

    // console.log('license image state ********* ',this.props.driverData.data.vechiles.license)
    // let costDataButton = this.state.costData.find(e => e.selected == true);
    //     costDataButton = costDataButton ? costDataButton.value : this.state.costData[0].label;
      return(
        <ScrollView keyboardDismissMode={(Platform.OS === 'ios') ? 'interactive' : 'on-drag'} keyboardShouldPersistTaps="always">
            <View  style={[styles.container]}>
            {console.log("datainrender",this.state)}
            {console.log("datainrenderprops",this.props)}
            <View style={{marginLeft:15}}>
              <View style={styles.flexRow}>
                <View style={[styles.colIndex]}>
                  <FormTextInput
                  autoFocus={false}
                  ref='vehicleNo'
                  placeHolderText={Constants.Strings.driverVehicle.vehicleNo}
                  placeHolderColor={Constants.Colors.Blue}
                  value={this.state.vehicleNo}
                  style = {[styles.inputTextViewStyle,{marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*4,marginLeft:10}]}
                  inputStyle={[styles.inputStyle,{top:5}]}
                  secureText={false}
                  isPassword={false}
                  showPassword={false}
                  onChangeText={(vehicleNo)=>this.setState({vehicleNo})}
                  onBlur={() => {this.setProgressBarValue(16)}}
                  />
                </View>

                <Dropdown
                  containerStyle={{flex:1,marginTop:-9,marginHorizontal:10,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*4}}
                  textColor ={Constants.Colors.Blue}
                  baseColor ={Constants.Colors.Blue}
                  value={ this.state.vehicleType||Constants.Strings.driverVehicle.vehicleType}
                  data={this.state.vehicleTypeList}
                  fontSize={15}
                  onChangeText={this.selectVehicleType.bind(this)}
                  />
              </View>

              <View style={styles.flexRow}>
             
                <Dropdown
                containerStyle={{flex:1,marginTop:-20,marginHorizontal:10}}
                textColor ={Constants.Colors.Blue}
                baseColor ={Constants.Colors.Blue}
                value={ this.state.makeOfVehicle||Constants.Strings.driverVehicle.makeOfVehicle}
                data={this.props.vehicleMakeList}
                fontSize={14}
                onChangeText={(makeOfVehicle)=>{ this.selectMakeOfVehicle(makeOfVehicle)}}
                />


                <Dropdown
                  containerStyle={{flex:1,marginTop:-20,marginHorizontal:10}}
                  textColor ={Constants.Colors.Blue}
                  baseColor ={Constants.Colors.Blue}
                  value={ this.state.vehicleModel||Constants.Strings.driverVehicle.vehicleModel}
                  data={this.props.vehicleModelList}
                  fontSize={14}
                  onChangeText={(vehicleModel)=>{this.selectVehicleModel(vehicleModel)}}
                  />
              </View>

              <View style={styles.flexRow}>
                <Dropdown
                  containerStyle={{flex:1,marginTop:-20,marginHorizontal:10}}
                  textColor ={Constants.Colors.Blue}
                  baseColor ={Constants.Colors.Blue}
                  value={ this.state.year||Constants.Strings.driverVehicle.year+"*"}
                  data={this.state.vehicleYearList}
                  fontSize={14}
                  onChangeText={(year)=>{this.selectVehicleYear(year)}}
                  />

                  <Text style={[{textAlign:'left',color:Constants.Colors.Blue,marginTop: Constants.BaseStyle.DEVICE_WIDTH*4/100,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
                  {this.state.room}
                  </Text>
                  <FormTextInput
                    autoFocus={false}
                    placeHolderText="CAPACITY"
                    placeHolderColor={Constants.Colors.Blue}
                    value={this.state.capacity}
                    style = {[styles.inputTextViewStyle,{flex:1,marginTop:-20,marginHorizontal:10}]}
                    inputStyle={[styles.inputStyle]}
                    secureText={false}
                    isPassword={false}
                    showPassword={false}
                    onChangeText={(year)=>{this.selectCapacity(year)}}
                    onBlur={() => {this.setProgressBarValue(23)}}
                    />
                   {/* <Dropdown
                     containerStyle={{flex:1,marginTop:-20,marginHorizontal:10}}
                     textColor ={Constants.Colors.Blue}
                     baseColor ={Constants.Colors.Blue}
                     value={ this.state.capacity}
                     data={this.state.capacityList}
                     fontSize={14}
                     onChangeText={(year)=>{this.selectCapacity(year)}}
                     /> */}

              </View>


              <Text style={[{textAlign:'left',color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
              {Constants.Strings.driverVehicle.equipment}
              </Text>
              <View style={{flex:1}}>
                 <LabelSelect
                   title="Select Equipments"
                   ref="select"
                   style={styles.labelSelect}
                   onConfirm={this.selectConfirmEquipment}
                 >
                   {this.state.equipmentList && this.state.equipmentList.filter(item => item.isSelected).map((item, index) =>
                     <LabelSelect.Label
                       key={'label-' + index}
                       data={item}
                       onCancel={() => {this.deleteEquipmentItem(item);}}
                     >{item.value}</LabelSelect.Label>
                   )}
                   {this.state.equipmentList && this.state.equipmentList.filter(item => !item.isSelected).map((item, index) =>
                     <LabelSelect.ModalItem
                       key={'modal-item-' + index}
                       data={item}
                     >{item.value}</LabelSelect.ModalItem>
                   )}
                 </LabelSelect>
               </View>


              <View style={styles.flexRow}>
                <View style={[styles.colIndex]}>
                    <FormTextInput
                    autoFocus={false}
                    ref='insuranceNo'
                    placeHolderText={Constants.Strings.driverVehicle.insuranceNo}
                    placeHolderColor={Constants.Colors.Blue}
                    value={this.state.insuranceNo}
                    style = {[styles.inputTextViewStyle,{marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*4,marginTop:1,marginLeft:10,bottom:5}]}
                    inputStyle={[styles.inputStyle,{top:5}]}
                    secureText={false}
                    isPassword={false}
                    showPassword={false}
                    onChangeText={(insuranceNo)=>this.setState({insuranceNo})}
                    onBlur={() => {this.setProgressBarValue(23)}}
                    />
                </View>

                <DatePicker
                style={{flex:1,marginTop: 5}}
                date={this.state.insuranceExpiry}
                mode="date"
                placeholder="INSURANCE EXPIRY"
                format="YYYY-MM-DD"
                minDate={currentDate}
                maxDate={futureDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={Constants.Images.driver.calendar}
                customStyles={{
                dateIcon: [styles.rowIcon,{tintColor:this.state.insuranceExpiryColor}],
                dateInput:[styles.rowLeft,{borderBottomColor:this.state.insuranceExpiryColor,justifyContent:'flex-start',marginLeft:8}],
                placeholderText:{color:this.state.insuranceExpiryColor},
                dateText:{color:this.state.insuranceExpiryColor}
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(insuranceExpiry)=>{this.selectInsuranceExpiry(insuranceExpiry)}}
                />

              </View>

              <View style={{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
                <Text style={[{color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                  {Constants.Strings.driverVehicle.vehicleImages}
                </Text>

                <View style={styles.gallaryImagesView}>
                  {this.props.driverData && this.props.driverData.data.vechiles.imgs.length != 0 ?
                    this.props.driverData.data.vechiles.imgs.map((each, index) => {
                      // console.log('each vehicle images ****** ',each)
                      return (
                        <Image
                        key={index}
                        source={{ uri: Connection.getMedia()+each.path }}
                        style={styles.gallaryImages}
                        resizeMode={"cover"}
                        />
                      );
                    })

                    :

                    this.state.vehicleImages.map((each, index) => {
                      return (
                        <Image
                        key={index}
                        source={{ uri: each.uri }}
                        style={styles.gallaryImages}
                        resizeMode={"cover"}
                        />
                      );
                    })

                  }

                  <TouchableOpacity style={styles.cameraImages} onPress={() => this.renderVehicleImages()}>
                    <Image source={Constants.Images.driver.circleplus} style={styles.insideCamera}  resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}]}>
                <Text style={[{color:Constants.Colors.Blue,marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                  {Constants.Strings.driverVehicle.documents}
                </Text>

                <View  style={[styles.flexRow]}>
                  {this.renderDocuments("license","Driver License Photo")}

                  { this.renderDocuments("insurance","Vehicle Insurance Photo")}

                  { this.renderDocuments("background","Background Check Photo")}

                  { this.renderDocuments("abstract","Driver Extract Photo")}

                </View>
              </View>

              <TouchableOpacity onPress={() => {this.OnClickConfirm()}} underlayColor='#fee989' style={[styles.colIndex,{marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,marginTop:(Constants.BaseStyle.DEVICE_HEIGHT/100)*1.2}]}>
                <View style={[styles.flexRow]}>
                  <Image source={(this.state.isConfirmed) ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[{width:20, height:20}]} resizeMode={'contain'} />
                  <Text style={[{color:Constants.Colors.Blue,flex:1 ,fontSize:12,fontWeight:"900", marginLeft:10}]}>{Constants.Strings.driverVehicle.agreement}</Text>
                </View>
              </TouchableOpacity>

              <View style={[styles.flexRow,{marginBottom:10}]}>
                <View style={[styles.colIndex,{flex : 0.5}]}>
                  <SubmitButton
                  onPress={() => this.onSaveVehicleInfo()}
                  text={Constants.Strings.driverVehicle.save}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                  />
                </View>
                <View style={[styles.colIndex,{flex : 0.5}]}>
                  <SubmitButton
                  onPress={() => this.onSubmit()}
                  text={Constants.Strings.driverVehicle.submit}
                  style={[styles.ButtonStyle,{paddingLeft : 3, paddingRight : 3}]}
                  textStyle={[{fontSize:15}]}
                  />
                </View>
              </View>
</View>
            </View>
        </ScrollView>
      )
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowRight : {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginLeft:2,
    marginHorizontal:0,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginTop: 0,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    borderBottomWidth: 1,

    //borderBottomColor:Constants.Colors.Blue
  },
  rowLeft : {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginRight:6,
    marginHorizontal:0,
    marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginTop: 2,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/200,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,


    //borderBottomColor:Constants.Colors.Blue
  },
  row : {
    flex: 1,
		flexDirection: 'row',
		padding: 0,
    marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
    marginHorizontal:0,
    marginTop: 0,//Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    borderBottomWidth: 1,
    borderBottomColor:Constants.Colors.Blue
	},
  rowText : {
    color : Constants.Colors.Blue,
    marginTop:15,
    marginBottom : 10,
    flexDirection:'row',
    flex : 1,
  },
  rowIcon: {
    height: 20,
    width: 20,
    marginTop:15,
    marginBottom : 10,
    flexDirection:'row',
  },
  rowIconsmall: {
    height: 10,
    width: 10,
    marginBottom : 10,
    justifyContent:'flex-end',
    flexDirection:'row',
    marginTop:20,
  },
  col:{
		flex:1,
	},

  TopHeader: {
			backgroundColor:'#53C8E5',
			height: Constants.BaseStyle.DEVICE_HEIGHT/100*10,
			flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',

		},
  TopHeaderText : {
    flex:1,
    textAlign: "center",
    //marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*3,
    marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    fontWeight:'900',
    fontSize:16,
    color: '#fff',
  },
  TopHeadRight: {
		flexDirection:'row',
		height:Constants.BaseStyle.DEVICE_HEIGHT/100*10,
		alignItems:'center',
		justifyContent:'flex-end',
		backgroundColor:'transparent'
	},
  logo: {
    height: 30,
    width: 30,
  },
  starIcon:{
    height: 10,
    width: 10,
  },
  Sidelogo: {
    height: 20,
    width: 20,
    margin:20,
    alignSelf:'center',
    justifyContent:'center',
    tintColor: '#fff',
  },
  flexRow:{
    flexDirection: 'row'
	},
  colIndex:{
		flex:1,
	},
  colIndexContent:{
		flexDirection:'column',
	},
  colIndexLabel:{
		fontSize:16,
		color:'#212123',
		marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    fontWeight:'900',
    textAlign: "center",
	},
  BottomViewStyle: {
    borderTopColor: Constants.Colors.Gray,
    borderTopWidth: 1,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2,
    backgroundColor : Constants.Colors.White
  },
  bottomInnerViewStyle:{
    alignItems:'center',
    marginTop : 5,
    marginBottom : 5,
  },
  bottomIcon: {
		height:40,
		width:40,
		tintColor: "rgba(115,115,115,0.4)",
	},
  bottomLabel:{
		fontSize:14,
		color:Constants.Colors.Gray,
    fontWeight:'900',
    textAlign: "center",
	},
  completePercent:{
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*5,
		alignItems: 'center',
	},
	progressLineWrap:{
		width : Constants.BaseStyle.DEVICE_WIDTH-30,
		backgroundColor:'#e7e7e7',
		height: 7,
	},
	progressLine:{
    width : Constants.BaseStyle.DEVICE_WIDTH-30,
		backgroundColor:'#db961d',//'#3bca42',
		height: 7,
    borderRadius:5
	},
	progressText:{
		fontSize:12,
		color:'#db961d',//'#3bca42'
	},

  inputTextViewStyle: {
    // marginTop:Constants.BaseStyle.DEVICE_HEIGHT/200*1,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/200,

  },
  inputStyle: {
    fontSize:14,
    padding:0,
  },
  ButtonStyle: {
    borderWidth: 1,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*3,
    borderRadius:5,
    paddingLeft : 3,
    paddingRight : 3,
  },
  modalOuter: {
			backgroundColor: 'rgba(0,0,0,0.8)',
			padding: 4,
			flex:1,
			alignItems:'center',
			justifyContent:'center',
		},
	modalInner:{
		marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
	  padding:3,
    width : Constants.BaseStyle.DEVICE_WIDTH-30,
		backgroundColor:'#fff',
		position: 'relative',
	},

  ImageBorder: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:'#fff',
  },
  insideCamera:{
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 *18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 *18,
  },
  gallaryImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5
  },
  cameraImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    marginTop: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1
  },
  gallaryImagesView: {
    //justifyContent:'center',
    flexWrap: "wrap",
    flexDirection: "row"
  },
  insideIcon:{
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
  },
  addIcon:{
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 18,
  },
  ImageBorder2:{
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.2,
    marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 1.2,
  },
  insideIcon2:{
    //tintColor:Constants.Colors.Blue,
    // marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.2,
    // marginHorizontal:Constants.BaseStyle.DEVICE_HEIGHT/100 * 1.2,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 12,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 18,
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Constants.Colors.Blue
  },

});


const mapStateToProps = state => ({
  tokenforuser:(state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  modalstate: state.ModalHandleReducer,
  driverInfo:state.ModalHandleReducer.DriverInfo,
  userData:state.user.userData,
  driverData:(state.user && state.user.driverData) || (state.user && state.user.userData),
  citiesList: state.user.citiesList ,
  certificatesList:state.user.certificatesList,
  experienceTypeList : state.user.experienceTypeList,
  vehicleTypeList : state.user.vehicleTypeList,
  vehicleMakeList : state.user.vehicleMakeList,
  vehicleModelList : state.user.vehicleModelList,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverForm);
// export default connect(state => ({state: state.ModalHandleReducer}))(DriverForm);
