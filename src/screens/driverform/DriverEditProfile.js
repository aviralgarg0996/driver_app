import React, { Component } from 'react'
import { ScrollView, Modal, Alert, TouchableHighlight, Picker, View, Text, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity, Image, AsyncStorage, ImageBackground } from "react-native"
import { bindActionCreators } from "redux";
import ImagePickerCropper from "react-native-image-crop-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import Constants from "../../constants"
import RestClient from '../../utilities/RestClient';
import Connection from "../../config/Connection";
import * as UserActions from '../../redux/modules/user';
import { connect } from 'react-redux';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
import DriverExperienceView from "../../components/driver/DriverExperienceView"
import moment from "moment"
import HeaderBackgroundWithBackButton from '../../components/customer/HeaderBackgroundWithBackButton';
import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";
import ShadowButton from "../../components/common/ShadowButton";

import _ from "underscore";
let ExpCount = 0;


const { height, width } = Dimensions.get('window');
// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'Login' })],
// });
// const resetToHome = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'profile' })],
// });
let driverExpRef = {};
let experienceYearData = [{
  value: '1',
}, {
  value: '2',
}, {
  value: '3',
},
{
  value: '4',
}, {
  value: '5',
}, {
  value: '6',
},
{
  value: '7',
}, {
  value: '8',
}, {
  value: '9',
},
]
let dummyexperiences = [];
let experienceArray = [];
let certificatesList = [];
let citiesList = [];
let multicertificateList = []
var ProgressBarArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
displaycertifciateList = certificatesList;
certifciateListSelected = {};



class DriverEditProfile extends Component {

  constructor(props) {
    super(props);
    displaycertifciateList = [];
    certificatesList = [];
    this.state = {
      ExperienceImageSource: "",
      ProfileImageSource: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      sinNumber: "",
      licenceNumber: "",
      address: "",
      aboutYou: "",
      licenceIssueDate: "",
      licenceExpiryDate: "",
      sex: "",
      token: null,
      experienceImages: [],
      gender: "",
      Experience: {},
      experienceArray: [],
      addExperience: false,
      certificatesData: [],
      profilePic: '',
      expImg: [],
      progress: 0.0,
      citiesList: [],
      experiences: [],
      citiesData: [],
      selectedCity: "",
      selectedItems: [],
      selectedExperienceItems: [],
      multiCertificateData: [],
      refreshCer: true,
      ImagemodalVisible: false,
      imageType: ""
    }

    //        this.addExperience();
  }

  componentWillUnmount = () => {
    certificatesList = []
    displaycertifciateList = []
  }
  componentWillMount = () => {
    multicertificateList = []
    AsyncStorage.getItem("token").then((value) => {
      this.setState({ token: value });
      RestClient.post("admin/getexperience").then((result) => {
        startLoading();
        if (result.status == 1) {
          stopLoading();
          this.setState({ certificatesData: result.data })
          this.state.certificatesData != [] && this.state.certificatesData.map((data, key) => {
            certificatesList.push({ value: data.name, id: data._id })
          })
        }
        displaycertifciateList = certificatesList;

      }).catch(error => {
        console.log("result of type eror", error)

        alert("error=> " + error)
        dispatch(stopLoading());
      });

      RestClient.get("admin/getCertificates").then((result) => {
        startLoading();
        console.log("result of certificates", result)
        if (result.status == 1) {
          console.log("result of type certificsrfff", result)
          stopLoading();
          this.setState({ multiCertificateData: result.data })
          multicertificateList = [];
          this.state.multiCertificateData && this.state.multiCertificateData.map((data, key) => {
            console.log("datatatatatat", data)
            multicertificateList.push({ name: data.title, id: data._id })
          })
        }
      }).catch(error => {
        console.log("result of type eror", error)

        alert("error=> " + error)
        dispatch(stopLoading());
      });
      RestClient.get("drivers/getCity", {}, value).then((result) => {
        startLoading();
        if (result.status == 1) {
          stopLoading();
          this.setState({ citiesData: result.data })
          citiesList = []
          this.state.citiesData != [] && this.state.citiesData.map((data, key) => {
            citiesList.push({ name: data.cityName, id: data._id })
          })
        }
      }).catch(error => {
        console.log("result of type eror", error)

        alert("error=> " + error)
        dispatch(stopLoading());
      });
      RestClient.post("users/getDriver", {}, value).then((result) => {
        console.log("result in getDriver", result)
        startLoading();
        if (result.status == 1) {
          stopLoading();
          var data = result.data
          let experiencePic = []
          data.experiencePic && data.experiencePic.map((item, key) => {
            experiencePic.push({ uri: `${Connection.getBaseUrl()}/${item.path}` })
          })
          if (data.firstName != "")
            this.addProgress(1, 4)
          if (data.lastName !== "")
            this.addProgress(2, 4)
          if (data.ssn != "")
            this.addProgress(3, 4)
          if (data.licenseNo != "")
            this.addProgress(4, 4)
          if (data.address != "")
            this.addProgress(5, 4)
          if (data.about != "")
            this.addProgress(6, 4)
          if (data.licenceDate != "")
            this.addProgress(12, 4)
          if (data.licenceExpDate != "")
            this.addProgress(13, 4)
          if (data.dob != "")
            this.addProgress(10, 4)
          if (data.gender != "")
            this.addProgress(11, 4)
          if (data.profile != "")
            this.addProgress(8, 4)
          if (data.experiencePic != "")
            this.addProgress(9, 4)
          if (data.experiences != "")
            this.addProgress(7, 4)
          var test = data.cities && data.cities.map(function (item) {
            return item._id
          })
          this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            sinNumber: data.ssn,
            licenceNumber: data.licenseNo,
            address: data.address,
            aboutYou: data.about,
            licenceIssueDate: data.licenceDate,
            licenceExpiryDate: data.licenceExpDate,
            birthDate: data.dob,
            gender: data.gender,
            ProfileImageSource: { uri: `${Connection.getBaseUrl()}/${data.profile}` },
            experienceImages: experiencePic,
            experiences: data.experiences,
            selectedItems: data.cities && data.cities.map(function (item) {
              return item._id
            }),
            selectedExperienceItems: data.certificates == null ? [] : data.certificates.map(function (item) {
              return item.title._id
            }),
          })
          dummyexperiences = data.experiences;

          data.experiences && data.experiences.map((item, key) => {
            this.addExperience(item)
          })
          if (data.experiences && data.experiences.length == 0)
            this.addExperience()
        }
      }).catch(error => {
        console.log("error=> " + error)
        dispatch(stopLoading());
      });
    })
  }


  updateCertificateList = () => {
    displaycertifciateList = certificatesList;
    let Experience = this.state.Experience;
    for (var key in Experience) {
      displaycertifciateList = _.without(displaycertifciateList, _.findWhere(displaycertifciateList,
        { id: Experience[key].title }));
    }

    for (var key in driverExpRef)
      driverExpRef[key].setPickerValues();
  }


  addExperience = (obj) => {
    try {
      exp = this.state.experienceArray;
      if (obj) {
        Experience = this.state.Experience;
        Experience['Experience' + ExpCount] = {};
        Experience['Experience' + ExpCount].title = obj.type._id;
        Experience['Experience' + ExpCount].duration = obj.duration
        this.setState(Experience);
      }
      exp.push(<DriverExperienceView
        onRef={(ref, exp) => {
          driverExpRef[exp] = ref
          this.updateCertificateList();
        }}
        obj={obj}
        exp={'Experience' + ExpCount}
        data={displaycertifciateList}
        removeRow={(exp) => {
          var temp = this.state.experienceArray;
          temp && temp.map((element, i) => {
            if (element.props.exp == exp)
              index = i;
          })
          var Experience = this.state.Experience;
          delete Experience[exp];
          delete temp[index]
          this.setState({ refreshCer: true, experienceArray: temp, Experience: Experience });
        }}
        Cb={(data) => {
          Experience = this.state.Experience;
          let id = ""
          certificatesList && certificatesList.map((item) => {
            if (item.value == data.value)
              id = item.id
          })
          if (Experience[data.exp]) {
            Experience[data.exp].title = id
          }
          else {
            Experience[data.exp] = {}
            Experience[data.exp].title = id
          }

          this.setState({ Experience: Experience })

          this.updateCertificateList();
        }}
        Cb1={(data) => {
          Experience = this.state.Experience;
          if (Experience[data.exp]) {
            Experience[data.exp].duration = data.value
          }
          else {
            Experience[data.exp] = {}
            Experience[data.exp].duration = data.value
          }
          this.setState(Experience)
        }}
      />
      )
    }
    catch (err) {
      alert(err)
    }

    this.setState({ experienceArray: exp });
    ExpCount++;
  }

  openExperienceImagePickerCropper = (imageType) => {
    ImagePickerCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      if (imageType == "profile") {
        this.addProgress(8, 4)
        this.setState({
          ProfileImageSource: source,
          profilePic: {
            uri: image.path,
            name: name,
            filename: name,
            type: image.mime
          }
        });
      }
      else if (imageType == "experience") {
        this.addProgress(7, 4)
        let arrImg = this.state.experienceImages;
        let expImg = this.state.expImg;
        expImg.push({
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        });
        this.setState({ ExperienceImageSource: source, expImg: expImg }, () => {
          arrImg.push(this.state.ExperienceImageSource);
          this.forceUpdate();
        })
      }
    });

  }
  openExperienceImagePickerCropperCamera = (imageType) => {
    ImagePickerCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      if (imageType == "profile") {
        this.addProgress(8, 4)
        this.setState({
          ProfileImageSource: source,
          profilePic: {
            uri: image.path,
            name: name,
            filename: name,
            type: image.mime
          }
        });
      }
      else if (imageType == "experience") {
        this.addProgress(7, 4)
        let arrImg = this.state.experienceImages;
        let expImg = this.state.expImg;
        expImg.push({
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        });
        this.setState({ ExperienceImageSource: source, expImg: expImg }, () => {
          arrImg.push(this.state.ExperienceImageSource);
          this.forceUpdate();
        })
      }
    });

  }

  addProgress(index, value) {
    ProgressBarArray[index] = value;
    var length = 0;
    for (var i = 0; i < ProgressBarArray.length; i++) {
      length = length + ProgressBarArray[i];
    }
    this.setState({
      progress: length
    })
    // var percentage = ((100 * length) / 30) | 0;
    // const text = `${percentage}% Completed `;
    // var widthPr=(percentage*2.4);
    // this.setState({ ProgressWidth:widthPr,OutputText: text,ProgressData: length});
  }
  updateCertificateList = () => {
    displaycertifciateList = certificatesList;
    let Experience = this.state.Experience;
    for (var key in Experience) {
      displaycertifciateList = _.without(displaycertifciateList, _.findWhere(displaycertifciateList,
        { id: Experience[key].title }));
    }


    for (var key in driverExpRef)
      driverExpRef[key].setPickerValues();
  }
  onPressLogout = () => {
    this.props.UserActions.userDriverMediateForm({ ...this.state }).then((resp) => {
      if (resp.status == 1) {
        this.refs.toast.show('Data Saved SuccessFully', DURATION.LENGTH_LONG);
        this.props.navigation.dispatch(resetAction);
      }
      else {
        this.refs.toast.show(resp.message, DURATION.LENGTH_LONG);
      }
    });
  }
  onPressBackToHome = () => {
    Alert.alert(
      'Back To Home',
      'Are you sure you want to Save Changes?',
      [
        { text: 'Cancel', onPress: () => this.props.navigation.dispatch(resetToHome), style: 'cancel' },
        {
          text: 'Yes', onPress: () => {
            this.props.UserActions.userDriverMediateForm({ ...this.state }).then((resp) => {

              if (resp.status == 1) {
                this.refs.toast.show('Data Saved SuccessFully', DURATION.LENGTH_LONG);
                this.props.navigation.dispatch(resetToHome);
              }
              else {
                this.refs.toast.show(resp.message, DURATION.LENGTH_LONG);
              }
            });
          }
        },
      ],
      { cancelable: false }
    )
  }

  editDriverProfile = () => {
    console.log('edit name')
  }
  onPressSaveChanges = () => {
    this.props.UserActions.userDriverMediateForm({ ...this.state }).then((resp) => {

      if (resp.status == 1) {
        this.refs.toast.show('Data Saved SuccessFully', DURATION.LENGTH_LONG);
      }
      else {
        this.refs.toast.show(resp.message, DURATION.LENGTH_LONG);

      }
    });
  }
  onSubmitPersonalData = () => {
    var validExperieceArray = true;

    var arr1 = [];

    for (var key in this.state.Experience) {
      if (this.state.Experience[key].title && this.state.Experience[key].duration)
        if (arr1.indexOf(this.state.Experience[key].title) == -1)
          arr1.push(this.state.Experience[key].title);
        else {
          validExperieceArray = false;
          break;
        }
    }

    if (!validExperieceArray) {
      alert('Please remove duplicate experiences');
      return;
    }
    if (this.state.firstName == "")
      this.refs.toast.show('Please Enter First Name!', DURATION.LENGTH_LONG);
    else if (this.state.lastName == "")
      this.refs.toast.show('Please Enter Last Name!', DURATION.LENGTH_LONG);
    else if (this.state.birthDate == "")
      this.refs.toast.show('Please Select Birth Data!', DURATION.LENGTH_LONG);
    else if (this.state.gender == "")
      this.refs.toast.show('Please Select Gender!', DURATION.LENGTH_LONG);
    else if (this.state.sinNumber == "")
      this.refs.toast.show('Please Enter SIN Number!', DURATION.LENGTH_LONG);
    else if (this.state.sinNumber.length != 9)
      this.refs.toast.show('Please Enter Correct SIN Number!', DURATION.LENGTH_LONG);
    else if (this.state.licenceNumber == "")
      this.refs.toast.show('Please Enter Licence Number!', DURATION.LENGTH_LONG);
    else if (this.state.address == "")
      this.refs.toast.show('Please Enter Addess!', DURATION.LENGTH_LONG);
    else if (this.state.aboutYou == "")
      this.refs.toast.show('Please Enter Some Information About You!', DURATION.LENGTH_LONG);
    else if (this.state.aboutYou.length > 500)
      this.refs.toast.show('About Length Exceeded', DURATION.LENGTH_LONG);
    else if (this.state.licenceNumber == "")
      this.refs.toast.show('Please Enter Licence Number!', DURATION.LENGTH_LONG);
    else if (this.state.licenceIssueDate == "")
      this.refs.toast.show('Please Select Licence Issue Date!', DURATION.LENGTH_LONG);
    else if (this.state.licenceExpiryDate == "")
      this.refs.toast.show('Please Select Licence Expiry Date!', DURATION.LENGTH_LONG);
    else if (this.state.Experience && this.state.Experience.length == 0)
      this.refs.toast.show('Please Select Experience!', DURATION.LENGTH_LONG);

    else if (this.state.selectedItems && this.state.selectedItems.length == 0)
      this.refs.toast.show('Please Select City!', DURATION.LENGTH_LONG);
    else if (this.state.selectedExperienceItems && this.state.selectedExperienceItems.length == 0)
      this.refs.toast.show('Please Select Certificates!', DURATION.LENGTH_LONG);
    // else if(this.state.expImg &&this.state.expImg.length==0)
    // this.refs.toast.show('Please Select Certificates!',DURATION.LENGTH_LONG);
    else if (this.state.ProfileImageSource == "")
      this.refs.toast.show('Please Select Profile Image!', DURATION.LENGTH_LONG);
    else
      this.props.UserActions.userDriverForm({ ...this.state }).then((resp) => {

        if (resp.status == 1) {
          this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer ? (
            this.props.navigation.navigate("VehicleInfo", { navigateFromDrawer: true })) : (
              this.props.navigation.navigate("VehicleInfo")
            )

        }
        else {
          this.refs.toast.show(resp.message, DURATION.LENGTH_LONG);
        }
      });
  }
  onSelectedItemsChange = selectedItems => {

    this.setState({ selectedItems });
  };
  onSelectedExperienceItemsChange = selectedExperienceItems => {

    this.setState({ selectedExperienceItems })
  }

  saveAction = () => {
    alert('Under Development')
  }



  render() {
    const { navigate, goBack } = this.props.navigation;
    let currentDate = moment().format("YYYY-MM-DD");
    let ImgArr = this.state.experienceImages;
    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Others',
    }];
    return (
      <View style={{ flex: 1 }}>
        <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={"Edit Profile"} />
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../assets/images/customer/blue.png')}>
            <Image
              resizeMode='cover'
              style={{ width: '100%', height: scaleHeight(150) }}
              source={Constants.Images.customer.driverCover}
            />
            <Image
              resizeMode='cover'
              style={{ width: scaleWidth(100), height: scaleWidth(100), marginLeft: scaleWidth(10), top: scaleHeight(90), position: 'absolute', }}
              source={Constants.Images.customer.driver2}
            />
            {/* Driver Edit Icon */}
            <Image
              resizeMode='cover'
              style={{ width: scaleWidth(25), height: scaleWidth(25), marginLeft: scaleWidth(80), top: scaleHeight(165), position: 'absolute', }}
              source={Constants.Images.customer.editDp}
            />
            {/* <View style={{ position: 'absolute', height: scaleHeight(22), width: scaleWidth(100), backgroundColor: Constants.Colors.LightBlue, borderRadius: scaleWidth(1), top: scaleHeight(180), marginLeft: scaleWidth(10), borderWidth: 1, borderColor: Constants.Colors.LightGray }}>
              <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '400', fontSize: normalizeFont(14) }]}>{'ID:DEL5678CE'}</Text>
            </View> */}
            <Text style={styles.titleCss}>
              Chris Evans
            </Text>

            <View style={styles.editCss}>
              <TouchableOpacity onPress={() => this.editDriverProfile()}>
                <Image style={styles.editIcon} source={Constants.Images.customer.editProfileIcon} />
              </TouchableOpacity>
            </View>

            {/* Driver Edit Icon */}
            <View style={styles.editCss1}>
              <TouchableOpacity onPress={() => this.editDriverProfile()}>
                <Image style={[styles.editIcon,{height: scaleHeight(25), width: scaleWidth(25)}]} source={Constants.Images.customer.editDp} />
              </TouchableOpacity>
            </View>

            <Text style={{ marginLeft: scaleWidth(125), top: scaleHeight(170), position: 'absolute', marginTop: scaleHeight(6), color: Constants.Colors.LightGray, fontSize: normalizeFont(14) }}>
              {"ID:DEL5678CE"}
            </Text>
            
            <View style={{ padding: scaleWidth(15), marginTop: scaleHeight(40) }}>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}> {'About'}</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Description"
                placeholderTextColor={Constants.Colors.LightGray}
                onChangeText={(value) => this.setState({ name: value })}
                value={this.state.name}
              />
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Experienced Pictures'}</Text>
              <View style={styles.ImgView}>
                <Image source={Constants.Images.customer.goback} style={styles.arrowImg} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.Car1} style={styles.imgCss} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.Car2} style={styles.imgCss} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.next} style={styles.arrowImg} resizeMode={'cover'} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: scaleHeight(15) }}>
                <Text style={[styles.textDecor, { color: Constants.Colors.LightGray, marginTop: scaleHeight(2) }]}>{'Add More Pictures'}</Text>
                <View style={styles.rectViewPlus}>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
              </View>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>{'EXPERIENCES'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(10) }}>
                <Text style={styles.textDecor}>{'Title'}</Text>
                <Text style={styles.textDecor}>{'Duration'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(15) }}>
                <TextInput
                  style={[styles.input, { width: scaleHeight(210) }]}
                  underlineColorAndroid="transparent"
                  placeholder="White Glove Service"
                  placeholderTextColor={Constants.Colors.LightGray}
                  onChangeText={(value) => this.setState({ service: value })}
                  value={this.state.service}
                />
                <TextInput
                  style={[styles.input, { width: scaleHeight(90) }]}
                  underlineColorAndroid="transparent"
                  placeholder="3 Yrs"
                  placeholderTextColor={Constants.Colors.LightGray}
                  onChangeText={(value) => this.setState({ time: value })}
                  value={this.state.time}
                />
                <View style={[styles.rectViewPlus, { marginTop: scaleHeight(5) }]}>
                  <Text style={styles.plusIcon}>+</Text>
                </View>
              </View>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10), color: Constants.Colors.LightGray }]}>{'PERSONAL INFO.'}</Text>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Email'}</Text>
              <TextInput
                style={[styles.input, { marginBottom: scaleHeight(10) }]}
                underlineColorAndroid="transparent"
                placeholder="chrish.evans@gmail.com"
                placeholderTextColor={Constants.Colors.LightGray}
                onChangeText={(value) => this.setState({ email: value })}
                value={this.state.email}
              />
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Phone'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(10) }}>
                <TextInput
                  style={[styles.input, { marginBottom: scaleHeight(10), width: scaleWidth(55) }]}
                  underlineColorAndroid="transparent"
                  placeholder="+1"
                  placeholderTextColor={Constants.Colors.LightGray}
                  onChangeText={(value) => this.setState({ code: value })}
                  value={this.state.code}
                />
                <TextInput
                  style={[styles.input, { width: scaleWidth(280) }]}
                  underlineColorAndroid="transparent"
                  placeholder="9450411587"
                  placeholderTextColor={Constants.Colors.LightGray}
                  onChangeText={(value) => this.setState({ mnumber: value })}
                  value={this.state.mnumber}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Serving Area'}</Text>
                <TouchableOpacity onPress={() => this.editDriverProfile()}>
                  <Image style={[styles.editIcon, { height: scaleHeight(12), width: scaleWidth(12) }]} source={Constants.Images.customer.editProfileIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(10) }}>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, fontWeight: '600', marginLeft: scaleWidth(20), borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Certificates'}</Text>
                <TouchableOpacity onPress={() => this.editDriverProfile()}>
                  <Image style={[styles.editIcon, { height: scaleHeight(12), width: scaleWidth(12) }]} source={Constants.Images.customer.editProfileIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(10) }}>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, fontWeight: '600', marginLeft: scaleWidth(20), borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Equipment'}</Text>
                <TouchableOpacity onPress={() => this.editDriverProfile()}>
                  <Image style={[styles.editIcon, { height: scaleHeight(12), width: scaleWidth(12) }]} source={Constants.Images.customer.editProfileIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(15) }}>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, fontWeight: '600', marginLeft: scaleWidth(20), borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
              </View>
              <ShadowButton
                onPress={() => this.saveAction()}
                text={'Save'}
                style={styles.ButtonStyle}
                textStyle={styles.ButtonTextStyle}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  titleCss: {
    marginLeft: scaleWidth(125), top: scaleHeight(150), position: 'absolute', fontSize: normalizeFont(18), color: Constants.Colors.White, fontWeight: '400'
  },
  editCss: {
    marginLeft: scaleWidth(340), top: scaleHeight(155), position: 'absolute', backgroundColor: 'transparent'
  },
  editCss1: {
    marginLeft: scaleWidth(340), top: scaleHeight(120), position: 'absolute', backgroundColor: 'transparent'
  },
  review: {
    marginLeft: scaleWidth(205), top: scaleHeight(170), position: 'absolute', marginTop: scaleHeight(6), color: Constants.Colors.Orange, textDecorationColor: Constants.Colors.Orange, textDecorationLine: 'underline', fontSize: normalizeFont(16)
  },
  followers: {
    fontSize: normalizeFont(10), color: Constants.Colors.DarkGrey
  },
  // Header css
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  textDecor: {
    color: Constants.Colors.White, fontSize: normalizeFont(16), fontWeight: '400'
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Constants.Colors.LightGray,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
  },
  arrowImg: {
    height: scaleHeight(30),
    width: scaleWidth(15),
    marginTop: scaleHeight(30)
  },
  imgCss: {
    height: scaleHeight(90),
    width: scaleWidth(140),
    backgroundColor: Constants.Colors.White,
    borderRadius: scaleWidth(5)
  },
  ImgView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20)
  },
  editIcon: {
    height: scaleHeight(18),
    width: scaleWidth(18),
  },
  input: {
    height: scaleHeight(42), backgroundColor: '#FFFFFF', fontSize: normalizeFont(16), marginBottom: scaleHeight(15), paddingHorizontal: scaleWidth(15), borderRadius: scaleWidth(1)
  },
  plusIcon: {
    fontSize: normalizeFont(26),
    fontWeight: '600',
    color: Constants.Colors.White,
    textAlign: 'center',
    marginBottom: scaleHeight(5)
  },
  rectViewPlus: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    backgroundColor: Constants.Colors.Orange,
    marginLeft: scaleWidth(10),
    borderRadius: scaleWidth(2),
  },
  ButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(30),
    borderRadius: 5,
  },
  ButtonTextStyle: {
    fontSize: normalizeFont(24),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White,
    textAlign: 'center',
  },
})

const mapStateToProps = state => ({
  // userToken: state.user.userData,
  // userData: state.user.userData
  userData: (state.user && state.user.userData) || (state.user && state.user.driverData),
  customerAction: state.CustomerReducer
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverEditProfile);