import React, { Component } from 'react'
import { ScrollView, Modal, Alert, TouchableHighlight, Picker, View, Text, StyleSheet, TextInput, Dimensions, Button, TouchableOpacity, Image, AsyncStorage } from "react-native"
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import { bindActionCreators } from "redux";
import Background from '../../components/common/Background';
import ImagePickerCropper from "react-native-image-crop-picker";
import Toast, { DURATION } from 'react-native-easy-toast'
import Constants from "../../constants"
import RestClient from '../../utilities/RestClient';
import Connection from "../../config/Connection";
import * as UserActions from '../../redux/modules/user';
import { connect } from 'react-redux';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
import DriverExperienceView from "../../components/driver/DriverExperienceView"
import * as Progress from 'react-native-progress';
import LabelSelect from '../../components/common/LabelSelect';
import MultiSelect from 'react-native-multiple-select';
import moment from "moment"
import { StackActions, NavigationActions } from 'react-navigation';
import _ from "underscore";
let ExpCount = 0;

const { height, width } = Dimensions.get('window');
const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
const resetToHome = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'profile' })],
});
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



class PersonalInfo extends Component {

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
  render() {
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
        <View style={{ height: 50, flexDirection: "row" }}>
          <TouchableOpacity underlayColor='#fee989' style={[styles.colIndex, { borderBottomColor: "black", borderBottomWidth: 2 }]}>
            <Text >{'Personal information'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.onSubmitPersonalData() }} underlayColor='#fee989' style={styles.colIndex}>
            <Text >{'Vehicle Information'}</Text>
          </TouchableOpacity>
        </View>
        <Progress.Bar progress={this.state.progress / 100} width={width} color={"#d15d14"} />
        <Background style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer ? <View></View> : <View style={{ marginBottom: 8 }}>
              <Text style={{ color: Constants.Colors.DarkBlue, fontSize: 15 }}>
                We are pleased to welcome you to Delgate as a "Delgate Rabbit"
       </Text>
              <Text style={{ color: Constants.Colors.DarkBlue, fontSize: 15 }}>
                Please fill out the form and submit it for review.The below requested info is private and will be held confidential       </Text>
            </View>}
            <View style={{ flex: 1 }}>
              <View >
                <Text style={styles.headingText}>      Profile Image</Text>
                <View style={styles.ImagePickerView}>
                  <TouchableOpacity
                    onPress={() => this.setState({
                      ImagemodalVisible: true,
                      imageType: "profile"
                    })
                    }

                    style={styles.ImagePicker}>
                    <Image
                      style={styles.imageView}
                      source={this.state.ProfileImageSource}
                    />
                  </TouchableOpacity>
                </View>
                <Modal animationType={"slide"} transparent={true}
                  visible={this.state.ImagemodalVisible}
                >

                  <View style={{ flex: 8 }}></View>
                  <View style={{ flex: 2, backgroundColor: "white" }}>
                    <TouchableHighlight
                      style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                      onPress={() => {
                        this.openExperienceImagePickerCropper(this.state.imageType)
                        this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible })
                      }}>

                      <Text style={styles.text}>Select From Gallery..</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                      onPress={() => {
                        this.openExperienceImagePickerCropperCamera(this.state.imageType)
                        this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible })
                      }}>
                      <Text style={styles.text}>Open Camera..</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                      onPress={() => { this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible }) }}>
                      <Text style={styles.text}>Cancel</Text>
                    </TouchableHighlight>
                  </View>

                </Modal>
              </View>
            </View>
            <View style={styles.rowContainerStyle}>

              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>First Name</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="First Name"
                  value={this.state.firstName}
                  onBlur={() => {
                    if (this.state.firstName != "")
                      this.addProgress(1, 4)
                    else {
                      this.addProgress(1, 0)
                    }
                  }}
                  onChangeText={(text) => this.setState({ firstName: text })}
                />
              </View>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Last Name</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onBlur={() => {
                    if (this.state.lastName != "")
                      this.addProgress(2, 4)
                    else {
                      this.addProgress(2, 0)
                    }
                  }}
                  onChangeText={(text) => {
                    this.setState({ lastName: text })

                  }}
                />
              </View>
            </View>
            <View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Date Of Birth</Text>
                <DatePicker
                  style={{ width: width * 0.45, marginTop: height * 0.03 }}
                  date={this.state.birthDate}
                  mode="date"
                  placeholder="Date of birth"
                  format="YYYY-MM-DD"
                  minDate="1970-05-01"
                  maxDate={currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    this.addProgress(10, 4)
                    this.setState({ birthDate: date })
                  }}
                />
              </View>
              <View style={styles.columnContainerStyle}>
                {!this.state.gender ? <Text style={styles.headingText}>Gender</Text> : <Text></Text>}
                <Dropdown
                  containerStyle={styles.textInputStyle}
                  label='Gender'
                  data={genderData}
                  onChangeText={
                    (text) => {
                      this.addProgress(11, 4)
                      this.setState({ gender: text })
                    }}
                  value={this.state.gender}
                />
              </View>
            </View>


            <View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>SIN/SSN</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="SIN/SSN"
                  maxLength={9}
                  keyboardType='numeric'
                  value={this.state.sinNumber}
                  onBlur={() => {
                    if (this.state.sinNumber != "")
                      this.addProgress(3, 5)
                    else
                      this.addProgress(3, 0)
                  }}
                  onChangeText={(text) => this.setState({ sinNumber: text })}
                />
              </View>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Driver Licence No</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Driver Licence No"
                  value={this.state.licenceNumber}
                  keyboardType='numeric'
                  maxLength={7}
                  onBlur={() => {
                    if (this.state.licenceNumber != "")
                      this.addProgress(4, 5)
                    else
                      this.addProgress(4, 0)
                  }}
                  onChangeText={(text) => this.setState({ licenceNumber: text })}
                />
              </View>
              <Toast
                ref="toast"
                style={{ backgroundColor: '#D6511F' }}
                position='top'
                positionValue={200}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{ color: 'white' }}
              />
            </View>

            <View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Address</Text>
                <TextInput
                  style={styles.textInputStyle}
                  maxLength={500}
                  placeholder="Address"
                  value={this.state.address}
                  onBlur={() => {
                    if (this.state.address != "")
                      this.addProgress(5, 4)
                    else
                      this.addProgress(5, 0)
                  }}
                  onChangeText={(text) => this.setState({ address: text })}
                />
              </View>
              <View style={styles.columnContainerStyle}>

                <Text style={styles.headingText}>About you</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="About"
                  maxLength={500}
                  onBlur={() => {
                    if (this.state.aboutYou != "")
                      this.addProgress(6, 4)
                    else
                      this.addProgress(6, 0)
                  }}
                  value={this.state.aboutYou}
                  onChangeText={(text) => this.setState({ aboutYou: text })}
                />
              </View>
            </View>

            <View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Driver Licence Issue Date</Text>
                <DatePicker
                  style={{ width: width * 0.45, marginTop: height * 0.03, color: Constants.Colors.WhiteUpd }}
                  date={this.state.licenceIssueDate}
                  mode="date"
                  placeholder="Licence Issue date"
                  format="YYYY-MM-DD"
                  minDate="1980-05-01"
                  maxDate={currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    this.addProgress(12, 4)
                    this.setState({ licenceIssueDate: date })
                  }}
                />
              </View>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Driver Licence Expiry Date</Text>
                <DatePicker
                  style={{ width: width * 0.45, marginTop: height * 0.03, color: Constants.Colors.WhiteUpd }}
                  date={this.state.licenceExpiryDate}
                  mode="date"
                  placeholder="Licence Expiry date"
                  format="YYYY-MM-DD"
                  minDate={currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    this.addProgress(13, 4)
                    this.setState({ licenceExpiryDate: date })
                  }}
                />
              </View>

            </View>
            <View>
              <Text style={[styles.headingText, { marginBottom: 10 }]}>Experience Type</Text>

            </View>
            <View>

              {this.state.refreshCer && this.state.experienceArray}
            </View>
            <TouchableOpacity
              onPress={() => {
                this.addExperience()
              }}
            >
              <Image
                style={{ width: 70, height: 70 }}
                source={require('../../assets/images/plus_11.png')}
              />
            </TouchableOpacity>
            <View style={styles.rowContainerStyle}>
              <View>
                <Text style={styles.headingText}>Experience Image</Text>

                <View style={styles.gallaryImagesView}>
                  {ImgArr && ImgArr.map((each, index) => {
                    return (
                      <Image
                        key={index}
                        source={{ uri: each.uri }}
                        style={styles.cameraImages}
                        resizeMode={"cover"}
                      />
                    );
                  })}
                  <TouchableOpacity
                    style={styles.cameraImages}
                    onPress={() => this.setState({
                      ImagemodalVisible: true,
                      imageType: "experience"
                    })
                    }
                  >
                    <Image source={Constants.Images.driver.camera} style={styles.insideCamera} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
                {/* {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?<View></View>: */}
                <View style={{ width: width, marginTop: 30 }}>
                  <MultiSelect
                    hideTags
                    items={citiesList}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                    selectText="Pick Serving Areas"
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    submitButtonColor={Constants.Colors.DarkBlue}
                  />
                  {this.state.selectedItems && this.multiSelect && this.multiSelect.getSelectedItemsExt(this.state.selectedItems)}
                </View>
                {/* } */}
                {/* {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?<View></View>:(  */}
                <View style={{ width: width, marginTop: 30 }}>
                  <MultiSelect
                    hideTags
                    items={multicertificateList}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelectItem = component }}
                    onSelectedItemsChange={this.onSelectedExperienceItemsChange}
                    selectedItems={this.state.selectedExperienceItems}
                    selectText="Pick Certificates"
                    searchInputPlaceholderText="Search Certificates..."
                    onChangeInput={(text) => console.log(text)}
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor={Constants.Colors.DarkBlue}
                  />
                  {this.state.selectedExperienceItems && this.multiSelectItem && this.multiSelectItem.getSelectedItemsExt(this.state.selectedExperienceItems)}
                </View>
                {/* )} */}


                <View>


                  {false && <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                  >

                    <View style={styles.modal}>
                      <Text style={styles.text}>Modal is open!</Text>

                      <TouchableHighlight onPress={() => {
                        this.toggleModal(!this.state.modalVisible)
                      }}>

                        <Text style={styles.text}>Close Modal</Text>
                      </TouchableHighlight>
                    </View>
                  </Modal>
                  }

                </View>

              </View>
            </View>

            <View style={styles.rowContainerStyle}>
              {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer ? (
                <Button
                  title="Save Changes"
                  color={Constants.Colors.DarkBlue}
                  onPress={() => { this.onPressSaveChanges(); }}
                />
              ) : <Button
                  title="Logout"
                  color={Constants.Colors.DarkBlue}
                  onPress={() => {
                    Alert.alert(
                      'Logout',
                      'Are you sure you want to Logout?',
                      [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'Yes', onPress: () => { this.onPressLogout(); } },
                      ],
                      { cancelable: false }
                    )

                  }}
                />}
              {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer ? (
                <Button
                  title="Back To Home"
                  color={Constants.Colors.DarkBlue}
                  onPress={() => {

                    this.onPressBackToHome();
                  }}
                />
              ) : <View></View>}
              <Button
                color={Constants.Colors.DarkBlue}
                title="Next"
                onPress={() => { this.onSubmitPersonalData() }}
              />

            </View>
          </ScrollView>
        </Background>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  headingText: {
    color: Constants.Colors.Black
  },
  container: {
    flex: 1,
    margin: 10
  },
  text: {
    fontSize: 18,
    alignSelf: "center"
  },
  rowContainerStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  columnContainerStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  textInputStyle: {
    width: width * 0.37,
    paddingLeft: 10,
    marginLeft: -5,
    color: Constants.Colors.Black,
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.Black
  },
  ImagePickerView: {
    width: width * 0.20,
    height: height * 0.13,
    borderWidth: 1,
    borderRadius: 5,
    margin: width * 0.03,
    marginLeft: width * 0.05
  },
  ImagePicker: {
    width: width * 0.17,
    height: height * 0.115,
    borderWidth: 5,
    borderWidth: 1,
    margin: width * 0.01,
    flex: 1
  },
  imageView: {
    width: width * 0.16,
    height: height * 0.114
  },
  colIndex: {
    backgroundColor: 'gray',
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  gallaryImagesView: {
    //justifyContent:'center',
    flexWrap: "wrap",
    flexDirection: "row"
  },
  cameraImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    //margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1,
    marginRight: 9
    //paddingRight: Constants.BaseStyle.PADDING * .5
  },
  insideCamera: {
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8
  },
  labelSelect: {
    marginTop: 5,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: Constants.Colors.Blue
  },
})

const mapStateToProps = state => ({
  // tokenforuser:(state.user.driverData && state.user.driverData.token) || (state.user.userData && state.user.userData.token),
  // modalstate: state.ModalHandleReducer,
  // driverInfo:state.ModalHandleReducer.DriverInfo,
  // userData:state.user.userData,
  // driverData:(state.user && state.user.driverData) || (state.user && state.user.userData),
  // citiesList: state.user.citiesList ,
  // certificatesList:state.user.certificatesList,
  // experienceTypeList : state.user.experienceTypeList,
  // vehicleTypeList : state.user.vehicleTypeList,
  // vehicleMakeList : state.user.vehicleMakeList,
  // vehicleModelList : state.user.vehicleModelList,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);