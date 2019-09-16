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
// import Icon from "react-native-vector-icons/FontAwesome";
import RestClient from '../../../utilities/RestClient';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import Connection from '../../../config/Connection'
import { stringify } from "querystring";
import { NavigationActions, StackActions } from "react-navigation"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerCropper from "react-native-image-crop-picker";

class ProfileDrawer extends Component {

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
        <ScrollView>
          <View style={styles.rootContainer}>
            <TouchableOpacity
              style={styles.imageCover}
              onPress={() => this.openImagePicker("banner")}
            >
              <Image
                style={styles.imageCover}
                resizeMode='cover'
                source={this.state.bannerImageSource ? this.state.bannerImageSource : { uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg' }}
              />
            </TouchableOpacity>
            {/* <ImageBackground
              source={{
                uri:
                  "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
              }}
              style={styles.imageCover}
            >
              <TouchableOpacity onPress={() => this.editCoverImage()}>
              <Icon name='pencil' style={styles.editIcon}  size={25} color="black" />
              </TouchableOpacity>
            </ImageBackground> 
             <View style={styles.subContainer}> */}
            {/* <Image
                style={styles.imageProfile}
                source={{
                  uri:this.props.userData ? Connection.getMedia()+ this.props.userData.data.profile : "https://reactnativecode.com/wp-content/uploads/2018/02/motorcycle.jpg"
                }}
              /> */}
            {/* <View style={{bottom:Constants.BaseStyle.DEVICE_HEIGHT/100*9,marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*36}}>
                <Text style={[styles.nameText]}>{this.props.userData && this.props.userData.data.firstName} {this.props.userData && this.props.userData.data.lastName}</Text>
                <View>
                  <Text onPress={()=>navigate('RatingReviews')} style={[styles.reviewText]}><Text style={[styles.reviewText]}>0 </Text>REVIEWS</Text>
                  <Text
                  onPress={()=>navigate('Followers')}
                    style={[
                      styles.reviewText,
                      { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }
                    ]}
                  >
                   <Text style={[styles.reviewText,{fontWeight: "800",}]}>50 </Text>
                   FOLLOWERS
                  </Text>
                </View>
              </View>
            </View>  */}
          </View>
          <View style={{ marginHorizontal: 20 }}>
            {/* <StarRating
              rating={"3"}
              iconWidth={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
              iconHeight={Constants.BaseStyle.DEVICE_WIDTH / 100 * 5}
            /> */}
            <View style={{ flexDirection: "row" }}>
              <View
                style={{ flex: 0.5, alignItems: 'flex-end' }}
              >
                <Text onPress={() => {

                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'customerprofile'
                      })



                    ],
                    key: null
                  });

                  this.props.navigation.dispatch(resetAction);
                }
                }
                  style={[
                    styles.reviewText,
                    { color: Constants.Colors.Orange, textDecorationLine: 'underline' }
                  ]}
                >
                  Open Customer App
                </Text>
              </View>
            </View>
            <Text style={[styles.aboutText]}>ABOUT ME</Text>
            <Text>
              {
                this.props.userData && this.props.userData.data.about
              }
            </Text>
            <Text style={[styles.aboutText]}>IMAGE GALLERY</Text>

            <View style={styles.gallaryImagesView}>
              {this.state.imagesArray && this.state.imagesArray.map((each, index) => {
                {
                  console.log("eachhhh", each.uri ? { uri: each.uri } : `${Connection.getBaseUrl()}/${each.path}`
                  )
                }
                return (
                  <View>
                    {/* <Icon
              name="close-circle"
              style={{
                fontSize: 22,
                marginLeft: 0,
                position:'absolute'
              }}
            /> */}
                    <Image
                      key={index}
                      source={each.uri ? { uri: each.uri } : { uri: `${Connection.getBaseUrl()}/${each.path}` }}
                      style={styles.gallaryImages}
                      resizeMode={"cover"}
                    />
                  </View>
                );
              })}
              <TouchableOpacity
                style={styles.cameraImages}
                onPress={() => this.setState({ ImagemodalVisible: true })}
              >
                <Image source={Constants.Images.driver.camera} style={styles.insideCamera} resizeMode={'contain'} />
              </TouchableOpacity>
            </View>

          </View>
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
          <TouchableOpacity style={{ marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2 }} onPress={() => this.logout()}>
            {/* <Text style={{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100*5,}}>Logout</Text> */}
            <Text style={styles.logoutText}>LOGOUT</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* <Button style={{marginLeft:20,width:60,alignSelf:"center"}}
            onPress={()=>{this.saveGalleryImages()
            if(this.state.avatarSource)
            this.saveBannerImage();
            }} title="Save Data"/>*/}
            <Button
              style={{ width: 60, alignSelf: "center", marginRight: 20 }}
              onPress={() => this.editProfile()}
              title="Edit Profile" />
          </View>
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
    //flexDirection: "row",
    //justifyContent: "flex-end",
    //alignItems: "flex-end",
    // position: "absolute",
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
    // borderWidth:3
  },
  imageProfile: {

    //backgroundColor: "red",
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 35,
    borderWidth: 2,
    borderColor: Constants.Colors.White
  },
  nameText: {
    //textAlign:'right',
    //bottom:Constants.BaseStyle.DEVICE_HEIGHT/100*8,
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
  // userToken: state.user.userData,
  // userData: state.user.userData
  userData: (state.user && state.user.userData) || (state.user && state.user.driverData),
  customerAction: state.CustomerReducer
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDrawer);
