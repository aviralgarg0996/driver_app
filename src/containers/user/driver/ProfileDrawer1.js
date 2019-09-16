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
  ImageBackground,
  TouchableOpacity,
  Button,
  ScrollView, AsyncStorage, ToastAndroid, Modal, TouchableHighlight
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Constants from "../../../constants";
import RestClient from '../../../utilities/RestClient';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import Connection from '../../../config/Connection'
import { NavigationActions } from "react-navigation"
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";

import ImagePickerCropper from "react-native-image-crop-picker";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
class ProfileDrawer1 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      available: true,
      avatarSource: null,
      imagesArray: [],
      token: props.userData && props.userData.token,
      galleryImages: [],
      bannerImageSource: "",
      bannerImage: "",
      ImagemodalVisible: false
    };
    console.log('here are profile drawer props ******* ', props)
  }
  componentDidMount = () => {
    AsyncStorage.getItem("token").then((tokenValue) => {
      RestClient.get("drivers/getimage", {}, tokenValue).then((response) => {
        console.log("response in sidedrawer", response);
        response.data && response.data.galleryImages && response.data.galleryImages.length > 0 &&
          this.setState({ imagesArray: response.data.galleryImages })
        this.forceUpdate();
        console.log("each22222", this.state.imagesArray)

        response.data && response.data.vechiles && response.data.vechiles.images && this.setState({
          bannerImageSource: { uri: `${Connection.getBaseUrl()}/${response.data.vechiles.images}` }

        })
      })
    })
  }

  openImagePickerCropper = (imageType) => {
    ImagePickerCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("galleryImage", image)
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      if (imageType == 'gallery') {
        console.log("after uri..... ", image.path);
        let arrImg = this.state.imagesArray;
        this.setState({
          avatarSource: source, galleryImages: {
            uri: image.path,
            name: name,
            filename: name,
            type: image.mime
          }
        }, () => {
          arrImg.push(this.state.avatarSource);
          this.forceUpdate();
          console.log('state for image inside image picker ******** ', this.state.imagesArray)
        })
        arrImg && this.saveGalleryImages();
      }
    })
  }

  openImagePickerCropperCamera = (imageType) => {
    ImagePickerCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("galleryImage", image)
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      if (imageType == 'gallery') {
        console.log("after uri..... ", image.path);
        let arrImg = this.state.imagesArray;
        this.setState({
          avatarSource: source, galleryImages: {
            uri: image.path,
            name: name,
            filename: name,
            type: image.mime
          }
        }, () => {
          arrImg.push(this.state.avatarSource);
          this.forceUpdate();
          console.log('state for image inside image picker ******** ', this.state.imagesArray)
        })
        arrImg && this.saveGalleryImages();
      }
    })
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    });
  }
  editCoverImage() { }
  openImagePicker(data) {
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
        let source = { uri: response.uri };

        if (data == "banner") {
          this.setState({ bannerImageSource: source, bannerImage: response })
          this.state.bannerImage && this.saveBannerImage();
        }
        else {
          console.log("after uri..... ", response.uri);
          let arrImg = this.state.imagesArray;
          this.setState({ avatarSource: source, galleryImages: response }, () => {
            arrImg.push(this.state.avatarSource);
            this.forceUpdate();
            console.log('state for image inside image picker ******** ', this.state.imagesArray)
          })
          arrImg && this.saveGalleryImages();
        }
      }
    });
  }
  logout() {
    let context = this;
    AsyncStorage.getItem("token").then((value) => {
      context.props.UserActions.logout(value);
    })
  }
  editProfile() {
    console.log("EditProfile")
    this.props.navigation.navigate("PersonalInfo", { navigateFromDrawer: true })
  }
  editDriverProfile() {
    this.props.navigation.navigate("DriverEditProfile")
  }

  saveBannerImage() {
    AsyncStorage.getItem("token").then((tokenValue) => {
      let body = new FormData();
      if (this.state.bannerImageSource) {
        var element = this.state.bannerImage
        body.append("addVehicleImage", { uri: element.uri, name: element.fileName, filename: element.fileName, type: element.type })
      }
      console.log(this.state.bannerImage);
      RestClient.imageUpload("drivers/updatebackgroundimg", body, tokenValue).then((result) => {
        ToastAndroid.show('Banner Image Uploaded SuccessFully', ToastAndroid.SHORT);
      })
    })
  }
  saveGalleryImages() {
    console.log("galleryImages", this.state.galleryImages)
    let self = this
    AsyncStorage.getItem("token").then((tokenValue) => {
      let body = new FormData();
      let galleryImg = []
      var element = this.state.galleryImages
      body.append("galleryImage", { uri: element.uri, name: element.filename, filename: element.filename, type: element.type })
      console.log("body", body)
      RestClient.imageUpload1("drivers/uploadImage", body, tokenValue).then((result) => {
        ToastAndroid.show('Gallery Image Uploaded SuccessFully', ToastAndroid.SHORT);
      })
    })
  }
  render() {

    let ImgArr = this.state.imagesArray;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground style={{ height: '100%', width: '100%' }} source={require('../../../assets/images/customer/blue.png')}>
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
            <View style={{ position: 'absolute', height: scaleHeight(22), width: scaleWidth(100), backgroundColor: Constants.Colors.LightBlue, borderRadius: scaleWidth(1), top: scaleHeight(180), marginLeft: scaleWidth(10), borderWidth: 1, borderColor: Constants.Colors.LightGray }}>
              <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '400', fontSize: normalizeFont(14) }]}>{'ID:DEL5678CE'}</Text>
            </View>
            <Text style={styles.titleCss}>
              Chris Evans
            </Text>

            <View style={styles.editCss}>
              <TouchableOpacity onPress={() => this.editDriverProfile()}>
                <Image style={styles.editIcon} source={Constants.Images.customer.editProfileIcon} />
              </TouchableOpacity>
            </View>

            <Text style={{ marginLeft: scaleWidth(125), top: scaleHeight(170), position: 'absolute', marginTop: scaleHeight(6) }}>
              <Text>
                <Image style={{ height: scaleHeight(15), width: scaleWidth(15) }} source={Constants.Images.customer.reviewStar} />
                <Image style={{ height: scaleHeight(15), width: scaleWidth(15) }} source={Constants.Images.customer.reviewStar} />
                <Image style={{ height: scaleHeight(15), width: scaleWidth(15) }} source={Constants.Images.customer.reviewStar} />
                <Image style={{ height: scaleHeight(15), width: scaleWidth(15) }} source={Constants.Images.customer.nonReviewStar} />
                <Image style={{ height: scaleHeight(15), width: scaleWidth(15) }} source={Constants.Images.customer.nonReviewStar} />
              </Text>

            </Text>
            <Text style={styles.review}>
              {'45 REVIEWS'}
            </Text>
            <View style={{ padding: scaleWidth(15), marginTop: scaleHeight(40) }}>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(5) }]}> {'About'}</Text>
              <Text style={styles.textDecor}>{'However, there are other reasons why about us page is so common in most of the bussiness pages websites why about us.'}</Text>
              {/* <View style={[styles.horizontalLine]} /> */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: scaleHeight(10) }}>
                <Text style={[styles.textDecor, { marginLeft: scaleWidth(10) }]}>{'Successful Orders'}</Text>
                <Text style={[styles.textDecor, { marginRight: scaleWidth(10) }]}>{'Failed Orders'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(10) }}>
                <Text style={[styles.textDecor, { color: Constants.Colors.LightBlue, marginLeft: scaleWidth(65), fontSize: normalizeFont(18) }]}>{'230'}</Text>
                <Text style={[styles.textDecor, { color: Constants.Colors.Orange, marginLeft: scaleHeight(125), fontSize: normalizeFont(18) }]}>{'230'}</Text>
              </View>
              {/* <View style={[styles.horizontalLine, { marginBottom: scaleHeight(14), color: Constants.Colors.LightGray }]} /> */}
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Experience'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(10) }}>
                <Text style={[styles.textDecor]}>{'White Glove Services'}</Text>
                <Text style={[styles.textDecor]}>{'3 Yrs'}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: scaleHeight(14) }}>
                <Text style={[styles.textDecor]}>{'Tailgate Services'}</Text>
                <Text style={[styles.textDecor]}>{'3 Yrs'}</Text>
              </View>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Certificates'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(10) }}>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, fontWeight: '600', marginLeft: scaleWidth(20), borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
              </View>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Equipment'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(10) }}>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
                <View style={{ height: scaleHeight(30), width: '40%', backgroundColor: Constants.Colors.Orange, fontWeight: '600', marginLeft: scaleWidth(20), borderRadius: scaleWidth(2) }}>
                  <Text style={[styles.textDecor, { textAlign: 'center', fontWeight: '600' }]}>{'Voughan, ON'}</Text>
                </View>
              </View>
              <Text style={[styles.textDecor, { marginBottom: scaleHeight(10) }]}>{'Experienced Pictures'}</Text>
              <View style={styles.ImgView}>
                <Image source={Constants.Images.customer.goback} style={styles.arrowImg} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.Car1} style={styles.imgCss} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.Car2} style={styles.imgCss} resizeMode={'cover'} />
                <Image source={Constants.Images.customer.next} style={styles.arrowImg} resizeMode={'cover'} />
              </View>
              <Text style={[styles.textDecor, { fontSize: normalizeFont(20), color: Constants.Colors.SkyBlue, textAlign: 'center', marginBottom: scaleHeight(20), textDecorationColor: Constants.Colors.SkyBlue, textDecorationLine: 'underline', }]}>{'Open Customer App'}</Text>
              <TouchableOpacity onPress={() => this.logout()}>
                <Text style={[styles.textDecor, { fontSize: normalizeFont(20), color: Constants.Colors.White, textAlign: 'center', marginBottom: scaleHeight(20) }]}>{'LOGOUT'}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.WhiteSmoke
  },
  titleCss: {
    marginLeft: scaleWidth(125), top: scaleHeight(150), position: 'absolute', fontSize: normalizeFont(18), color: Constants.Colors.White, fontWeight: '400'
  },
  editCss: {
    marginLeft: scaleWidth(270), top: scaleHeight(155), position: 'absolute', backgroundColor: 'transparent'
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
    marginTop: scaleHeight(20)
  },
  imgCss: {
    height: scaleHeight(70),
    width: scaleWidth(120),
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
  }
});


const mapStateToProps = state => ({
  // userToken: state.user.userData,
  // userData: state.user.userData
  userData: (state.user && state.user.userData) || (state.user && state.user.driverData),
  customerAction: state.CustomerReducer
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawer1);
