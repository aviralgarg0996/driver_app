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
import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import StarRating from "../../../components/driver/StarRating";
import RestClient from '../../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import Connection from '../../../config/Connection'
import { stringify } from "querystring";
import { NavigationActions } from "react-navigation"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerCropper from "react-native-image-crop-picker";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
const HomeresetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
});
class CustomerProfileDrawer extends Component {

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
      ImagemodalVisible: false,
      data: []
    };
    console.log('here are profile drawer props ******* ', props)
  }

  getSideDrawerData = () => {
    AsyncStorage.getItem("token").then((tokenValue) => {
      RestClient.get("drivers/getcustomers", {}, tokenValue).then((response) => {
        console.log("response in sidedrawer", response);

        this.setState({
          data: response,

        })
        response.data && response.data.length > 0 && response.data[0].custbannerPic && this.setState({
          bannerImageSource: { uri: `${Connection.getBaseUrl()}/${response.data[0].custbannerPic.path}` }

        })
      })
    })
  }
  componentDidMount = () => {
    this.getSideDrawerData()
  }

  openImagePickerCropper = (imageType) => {
    ImagePickerCropper.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      this.setState({
        bannerImageSource: source,
        bannerImage: {
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        }
      }, () => {
        this.state.bannerImage && this.saveBannerImage();
      })
    })
  }

  openImagePickerCropperCamera = (imageType) => {
    ImagePickerCropper.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      let source = { uri: image.path };
      let fileName = image.path.split("/")
      let len = fileName.length;
      let name = fileName[len - 1]
      this.setState({
        bannerImageSource: source, bannerImage: {
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        }
      }, () => {
        this.state.bannerImage && this.saveBannerImage();
      })
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
  editProfile = () => {
    this.props.navigation.navigate("CustomerInfo")
  }
  saveBannerImage() {
    AsyncStorage.getItem("token").then((tokenValue) => {
      let body = new FormData();
      if (this.state.bannerImageSource) {
        console.log("bannerImageSource", this.state)
        var element = this.state.bannerImage
        body.append("profileimage", { uri: element.uri, name: element.name, filename: element.name, type: element.type })
      }
      console.log("bannerImageSource2222", this.state)
      RestClient.imageUpload("users/updateProfileImage", body, tokenValue).then((result) => {
        console.log("successindrawer", result)
        //  this.getSideDrawerData();
        //  AsyncStorage.setItem("profilePic",this.state.bannerImageSource)
        ToastAndroid.show('Banner Image Uploaded SuccessFully', ToastAndroid.SHORT);
      }).catch((error) => {
        console.log("error in drawer", error)
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
        <ScrollView>
          <View style={styles.rootContainer}>
            <TouchableOpacity
              style={styles.imageCover}
              onPress={() => this.setState({ ImagemodalVisible: true })}
            >
              <Image
                style={styles.imageCover}
                resizeMode='cover'
                source={this.state.bannerImageSource ? this.state.bannerImageSource : { uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg' }}
              />
            </TouchableOpacity>
          </View>
          {this.state.data.data && this.state.data.data.length > 0 && this.state.data.data[0].role == "DRIVER" && <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 0.5, alignItems: 'flex-end' }}
            >
              <Text onPress={() => {

                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({
                      routeName: 'profile'
                    })
                  ],
                  key: null
                });

                this.props.navigation.dispatch(resetAction);


                //    navigate('profile')
              }
              }
                style={[
                  styles.reviewText,
                  { color: Constants.Colors.Orange, textDecorationLine: 'underline' }
                ]}
              >
                Open Driver App
                </Text>
            </View>
          </View>}
          <Button
            style={{ width: 60, alignSelf: "center", marginRight: 20 }}
            onPress={this.editProfile}
            title="Edit Profile" />
          <Modal animationType={"slide"} transparent={true}
            visible={this.state.ImagemodalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>

            <View style={{ flex: 8 }}></View>
            <View style={{ flex: 2, backgroundColor: "white" }}>
              <TouchableHighlight
                style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                onPress={() => {
                  this.openImagePickerCropper("gallery")
                  this.setState({ ImagemodalVisible: !this.state.ImagemodalVisible })
                }}>

                <Text style={styles.text}>Select From Gallery..</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ flex: 1, borderBottomWidth: 1, borderColor: "gray", justifyContent: "center" }}
                onPress={() => {
                  this.openImagePickerCropperCamera("gallery")
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
          <TouchableOpacity style={{ marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2 }}
            onPress={() => this.logout()}>
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",

  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  rootContainer: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 34,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subContainer: {
    bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  rootReviews: { flexDirection: "row", flex: 1, alignItems: "center" },

  editIcon: {
    backgroundColor: 'transparent',
    position: "absolute",
    top: 10,
    right: 10,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  imageCover: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  imageProfile: {

    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 35,
    borderWidth: 2,
    borderColor: Constants.Colors.White
  },
  nameText: {
    color: Constants.Colors.Blue,
    //fontWeight: "800",
    fontSize: 20,
    //paddingHorizontal: Constants.BaseStyle.PADDING * 0.2,
    paddingVertical: Constants.BaseStyle.PADDING * 0.4,
  },
  reviewText: {
    color: Constants.Colors.Blue,
    //fontWeight: "500",
    fontSize: 14,
    //paddingLeft: Constants.BaseStyle.PADDING * 0.2
  },
  aboutText: {
    color: Constants.Colors.Blue,
    //fontWeight: "600",
    fontSize: 14,
    paddingVertical: Constants.BaseStyle.PADDING * 0.4
  },
  orangeText: {
    color: Constants.Colors.Orange,
    fontWeight: "800",
    fontSize: 16
  },
  gallaryImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    //margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5
  },
  cameraImages: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 13,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 20,
    //margin: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Constants.Colors.LightGray,
    borderWidth: 1,
    //paddingRight: Constants.BaseStyle.PADDING * .5
  },
  insideCamera: {
    //tintColor:Constants.Colors.Blue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 8
  },
  gallaryImagesView: {
    //justifyContent:'center',
    flexWrap: "wrap",
    flexDirection: "row"
  },
  logoutText: {

    bottom: 10,
    color: Constants.Colors.Blue,
    //fontWeight: "600",
    fontSize: 14,
    backgroundColor: Constants.Colors.White,
    paddingVertical: Constants.BaseStyle.PADDING * 0.5,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5
  },
  text: {
    fontSize: 18,
    alignSelf: "center"
  },
});


const mapStateToProps = state => ({
  userData: (state.user && state.user.userData) || (state.user && state.user.driverData),
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfileDrawer);
