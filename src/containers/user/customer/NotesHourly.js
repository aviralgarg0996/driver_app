
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  TouchableHighlight,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList,
  ImageBackground,
  ActionSheetIOS,
  ActivityIndicator,
  Animated
} from 'react-native';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
import Button from '../../../constants/Buttons';
import ImagePickerCropper from "react-native-image-crop-picker";
import RestClient from '../../../redux/modules/RestClient';
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from 'react-redux';
const postalRegex = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
const phoneRegex = /^(\s*\d{10}\s*)(,\s*\d{10}\s*)*,?\s*$/;
import CustomerConnection from "../../../config/Connection";
import moment from 'moment';
import { Radio } from 'native-base';
import { NavigationActions } from "react-navigation"
import { startLoading, stopLoading } from '../../../redux/modules/app';
import ShadowButton from "../../../components/common/ShadowButton";



var chatData = []

class NotesHourly extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      available: true,
      modalVisible: false,
      imageType: "",
      ImagemodalVisible: false,
      address: '',
      Picks: this.props.state.pickupArr,
      NewPicks: this.props.state.pickupArr,
      // Picks: [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 1, "address": "Teston Road, Maple, ON, Canada", "img": "none", "next": 3, "prev": 1, "lat": 43.8694717, "long": -79.5353827 }, { "id": 2, "address": "Terrace, BC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 54.5181925, "long": -128.6031539 }],
      // NewPicks: [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 1, "address": "Teston Road, Maple, ON, Canada", "img": "none", "next": 3, "prev": 1, "lat": 43.8694717, "long": -79.5353827 }, { "id": 2, "address": "Terrace, BC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 54.5181925, "long": -128.6031539 }],
      saveData: [],
      msgdes: '',
      value: '',
      'first_name': '',
      ImagePath1: [],
      ImagePath: '',
      NotesStatus1: true,
      NotesStatus2: false,
      NotesStatus3: false,
      NotesStatus4: false,
      deliverFlag: true,
      dropFlag: false,
      role: "DELIVER",
      door: "",
      valy: 180,
      radioDriver: false,
      radioCustomer: true,
      frontValue: false,
      backValue: false,
      animating: false,
      selectImage: false,
      name: '', phone: '', buzzno: '', postal: '', unit: '',
    }
    // Timer
    var intervalId = setInterval(() => {
       this.setState({ valy: this.state.valy - 1 });
       if (this.state.valy == 0) {
          this.refs.toast.show('Your Order has not been accepted by drivers.', DURATION.LENGTH_LONG);
          clearInterval(intervalId)
       }
    }, 1000);

    if (this.props.state.pick1) {
      this.state.name = this.props.state.pick1.Inchargename,
        this.state.phone = this.props.state.pick1.phone,
        this.state.buzzno = this.props.state.pick1.buzz_number,
        this.state.postal = this.props.state.pick1.postal_code,
        this.state.unit = this.props.state.pick1.unitnumber
      let stored = this.state.name;
      console.log('name---', stored)
    }
  }

  clickOnSelect() {
    chatData = []
    this.setState({
      modalVisible: false,
      msgdes: '',
      ImagePath: '',
      ImagePath1: [],
    });
  }

  openNotes() {
    this.setState({ modalVisible: true });
  }

  openDropNote() {
    this.setState({ modalVisible: true, ImagePath: '' });
  }

  componentWillMount = () => AsyncStorage.getItem('first_name').then((value) => this.setState({ 'first_name': value }))

  async componentDidMount() {
    let pickUpp = await this.state.Picks;
    this.setState({ NewPicks: pickUpp })
    let pickUpArray = pickUpp.slice(0, -1)
    console.log('Pickup++++', pickUpArray[0].address);
    this.setState({
      address: pickUpArray[0].address,
      Picks: pickUpArray
    })
    if (this.props.state.pick1) {
      this.setState({
        name: this.props.state.pick1.Inchargename,
        phone: this.props.state.pick1.phone,
        buzzno: this.props.state.pick1.buzz_number,
        postal: this.props.state.pick1.postal_code,
        unit: this.props.state.pick1.unitnumber,
      })
      let stored = this.state.name;
      console.log('name---', stored)
    }
  }



  notePick1() {
    if (this.props.state.InvoiceData._id) {
      this.orderID = this.props.state.InvoiceData._id
    } else {
      if (this.props.state.Orders._id) {
        this.orderID = this.props.state.Orders._id
      }
    }
    const { name, phone, buzzno, postal, unit } = this.state;
    if (name == '' || name == null) {
      this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
    } else if (phone == '' || phone == null) {
      this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
    } else if (!phone.match(phoneRegex)) {
      this.refs.toast.show('Please enter phone no. with 10 digits', DURATION.LENGTH_LONG);
    }
    // else if (buzzno == '' || buzzno == null) {
    //    this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
    // } else if (!buzzno.match(phoneRegex)) {
    //    this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
    // } else if (postal == '' || postal == null) {
    //    this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
    // } else if (!postal.match(postalRegex)) {
    //    this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
    // } else if (unit == '' || unit == null) {
    //    this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
    // }
    else {
      this.props.dispatch(startLoading())
      let obj = {
        "order_id": this.orderID,
        // order_id: '5c2d96df6c6c4a1fcafc8823',
        "Inchargename": name,
        "phone": phone,
        "buzz_number": buzzno,
        "postal_code": postal,
        "unitnumber": unit,
        "order_type": "Pickup",
        //'additioinalNotes':["5c20847c684e5832e865216d"]
      }
      RestClient.urlPost("pickupinfo/create", obj).then((result) => {
        if (result.status == true) {
          this.props.dispatch(stopLoading())

        } else {
          this.props.dispatch(stopLoading())
          console.log("data getting")
        }
      }).catch(error => {
        this.props.dispatch(stopLoading())
        console.log("result of type eror", error)
      });
    }
  }



  submit = () => {
    if (this.props.state.InvoiceData._id) {
      this.orderID = this.props.state.InvoiceData._id
    } else {
      if (this.props.state.Orders._id) {
        this.orderID = this.props.state.Orders._id
      }
    }
    if (this.state.role == 'DELIVER') {
      const { name, phone, buzzno, postal, unit } = this.state;
      if (name == '' || name == null) {
        this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
      } else if (phone == '' || phone == null) {
        this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
      } else if (!phone.match(phoneRegex)) {
        this.refs.toast.show('Please enter phone no. with 10 digits', DURATION.LENGTH_LONG);
      }
      // else if (buzzno4 == '' || buzzno4 == null) {
      //    this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
      // } else if (!buzzno4.match(phoneRegex)) {
      //    this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
      // } else if (postal4 == '' || postal4 == null) {
      //    this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
      // } else if (!postal4.match(postalRegex)) {
      //    this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
      // } else if (unit4 == '' || unit4 == null) {
      //    this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
      // }
      else {
        this.props.dispatch(startLoading())
        let obj = {
          "order_id": this.orderID,
          // order_id: '5c2d96df6c6c4a1fcafc8823',
          "Inchargename": name,
          "phone": phone,
          "buzz_number": buzzno,
          "postal_code": postal,
          "unitnumber": unit,
          "order_type": "Drop"
        }
        RestClient.urlPost("pickupinfo/create", obj).then((result) => {
          if (result.status == true) {
            this.props.dispatch(stopLoading())
            this.props.navigation.dispatch({ type: 'PICK1', data: result.data })
            this.refs.toast.show('Your information is updated successfully', DURATION.LENGTH_LONG);
            let routeName = 'CustomerOrders';
            this.props.navigation.navigate(routeName);
          } else {
            this.props.dispatch(stopLoading())
            console.log("data getting")
          }
        }).catch(error => {
          this.props.dispatch(stopLoading())
          console.log("result of type eror", error)
        });
      }
    }
  }

  radioFun(value) {
    console.log("value on radio", value)
    if (value == 'DELIVER') {
      //this.state.deliverFlag = true
      this.setState({
        deliverFlag: true,
        dropFlag: false
      })
    }
    if (value == 'DROP') {
      //this.state.dropFlag = true
      this.setState({
        dropFlag: true,
        deliverFlag: false
      })
    }
  }
  radioFun1(value) {
    console.log("value on radio", value)
  }

  componentWillMount() {
    let dropOffArray = this.state.DropOff;
    console.log('drop_length---', dropOffArray.length)
    console.log('drop_array---', dropOffArray)
    this.setState({ address: dropOffArray[0].address, DropOff: dropOffArray })

    let pickUpp = this.state.Picks;
    this.setState({ NewPicks: pickUpp })
    let pickArray = pickUpp.slice(0, -1)
    this.setState({ Picks: pickArray })
    AsyncStorage.getItem('first_name').then((value) => this.setState({ 'first_name': value }))
  }

  // componentWillMount = () => AsyncStorage.getItem('first_name').then((value) => this.setState({ 'first_name': value }))




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
      console.log('image path', name)
      console.log('source ', source)
      let tempArray = this.state.ImagePath1;
      tempArray.push({
        uri: image.path,
        name: name,
        filename: name,
        type: image.mime
      })
      this.setState({
        ImagePath1: tempArray,
        isPic: true,
        selectImage: true,
        ImagePath: {
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        }
      })
      let pathImage = this.state.ImagePath;
      console.log("Path is ++", pathImage)
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
      console.log('image path', name);
      console.log('source ', source)
      let tempArray = this.state.ImagePath1;
      tempArray.push({
        uri: image.path,
        name: name,
        filename: name,
        type: image.mime
      })
      this.setState({
        ImagePath1: tempArray,
        isPic: true,
        selectImage: true,
        ImagePath: {
          uri: image.path,
          name: name,
          filename: name,
          type: image.mime
        }
      })
      let pathImage = this.state.ImagePath;
      console.log("Path is ++", pathImage)

    });
  }

  openOptions() {
    if (Platform.OS == 'android') {
      this.setState({ ImagemodalVisible: true });
    } else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', 'Camera', 'Select from Gallery'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
        (buttonIndex) => {
          if (buttonIndex === 1) { this.openExperienceImagePickerCropperCamera() } else if (buttonIndex === 2) {
            this.openExperienceImagePickerCropper()
          } else {
            if (buttonIndex === 0) { console.log('Cancel') }
          }
        });
    }
  }

  sendMsg = () => {
    let obj = {
      "pickUpImage": this.state.ImagePath1,
      "description": this.state.msgdes
    }
    console.log('objnew', JSON.stringify(obj))
    //this.setState({ animating: true })
    RestClient.urlPostImage("pickupinfo/addtionalPickupInfo", obj).then((result) => {
      if (result.status == true) {
        console.log("data get", result.data);
        var date = result.data.createdAt
        var dateFormat = moment(date).format('DD/MM/YY HH:mm');
        var objnext = {
          date: dateFormat,
          desc: result.data.description,
          image: result.data.pickUpImage,
          id: result.data._id
        }
        //this.setState({ animating: false })
        chatData.push(objnext)
        this.setState({
          msgdes: '',
          ImagePath: '',
          ImagePath1: []
        })
      } else {
        this.setState({ animating: false })
        console.log("data getting")
      }
    })
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
        <HeaderBackground navigation={navigate} />
        <HeaderMenu />
        {/* Notes Status 1 Start */}
        {
          this.state.NotesStatus1 ? <ScrollView style={{ flex: 1 }} decelerationRate={0.5}>
            <View style={styles.msgCont}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                <View style={styles.circleLogo}>
                  <Image
                    style={styles.imgCont} resizeMode={'center'}
                    source={Constants.Images.customer.marker_orange}
                  />
                </View>
                {
                  this.state.valy != 0 ? <Text style={styles.msgText}>Please provide some details while a driver accepts your order in <Text style={styles.timercss}> {this.state.valy} </Text>Seconds</Text> : <Text style={styles.msgText}>Your order is not accepted by driver, please select driver again</Text>
                }
              </View>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: scaleWidth(30)
            }}>
              <View style={styles.focusCircle} /><Text style={styles.dotLine}>{'------------'}</Text>
              {
                this.state.Picks.length == 2 || this.state.Picks.length == 3 ? <View style={styles.OtherCircle} /> : null
              }
              {
                this.state.Picks.length == 2 || this.state.Picks.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
              }
              {
                (this.state.NewPicks.length == 3) && (this.state.NewPicks[2].address !== 'Choose Another Pickup Location') ? <View style={styles.OtherCircle} /> : null
              }
              {
                (this.state.NewPicks.length == 3) && (this.state.NewPicks[2].address !== 'Choose Another Pickup Location') ? <Text style={styles.dotLine}>{'------------'}</Text> : null
              }
              <View style={styles.OtherCircle} />
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: scaleHeight(6),
              marginLeft: scaleWidth(20)
            }}>
              {
                <Text style={styles.pickuptext}>Pickup</Text>
              }
              {
                this.state.Picks.length == 2 || this.state.Picks.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 2</Text> : null
              }
              {
                (this.state.NewPicks.length == 3) && (this.state.NewPicks[2].address !== 'Choose Another Pickup Location') ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 3</Text> : null
              }
              <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Drop-Off</Text>
            </View>
            <ImageBackground style={styles.shadowCss} source={require('../../../assets/images/customer/blue.png')}>
              <View style={[styles.flexRow, { marginLeft: scaleWidth(5) }]}>
                <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIcon]} resizeMode={'contain'} />
                <Text style={[styles.textStyle, { color: Constants.Colors.White, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                  {'Start Location'}
                </Text>
              </View>
              {
                this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location' ? <View style={{ marginLeft: scaleWidth(30) }}>
                  <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                    {this.props.state.Hourly_pickupArr[0].address}
                  </Text>
                </View> : <View style={{ marginLeft: scaleWidth(30) }}>
                    <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                      {this.state.address}
                    </Text>
                  </View>
              }

              <View style={styles.textView}>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Name of incharge person*"
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(value) => this.setState({ name: value })}
                  value={this.state.name}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Phone*"
                  keyboardType={'phone-pad'}
                  maxLength={10}
                  returnKeyType='done'
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(value) => this.setState({ phone: value })}
                  value={this.state.phone}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Buzz Number"
                  keyboardType={'number-pad'}
                  returnKeyType='done'
                  maxLength={10}
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(value) => this.setState({ buzzno: value })}
                  value={this.state.buzzno}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Postal Code"
                  keyboardType={'number-pad'}
                  returnKeyType='done'
                  maxLength={6}
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(value) => this.setState({ postal: value })}
                  value={this.state.postal}
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Unit Number"
                  keyboardType={'number-pad'}
                  returnKeyType='done'
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(value) => this.setState({ unit: value })}
                  value={this.state.unit}
                />
                <View style={styles.viewCont}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                    <TouchableOpacity onPress={() => this.openNotes()}>
                      {/* <Image
                                    style={styles.camCont}
                                    source={Constants.Images.customer.CameraNew}
                                 /> */}
                      <View style={styles.camCont}>
                        <Text style={styles.plusIcon}>+</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openNotes()}>
                      <Text style={styles.camText}>Add Notes and Pictures</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
            {/* <Button onPress={() => this.notePick1()} title='NEXT LOCATION' /> */}

            <ShadowButton
              onPress={() => this.submit()}
              text={'Done'}
              style={styles.ButtonStyle}
              textStyle={styles.ButtonTextStyle}
            />
            <View style={{ height: scaleHeight(40) }}></View>
          </ScrollView> : null
        }

        {/* Notes Status 1 end  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <KeyboardAvoidingView style={styles.loaderTransView} behavior={(Platform.OS === 'ios') ? "padding" : null}>

            <ScrollView>
              <KeyboardAvoidingView style={styles.centerView}>
                <View style={styles.headerColor}>
                  <Text style={styles.headText}>Notes</Text>
                  <TouchableOpacity onPress={() => this.clickOnSelect()}>
                    <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                  </TouchableOpacity>
                </View>
                {/* Text & Image start */}
                <View style={{ flex: 1 }}>

                  <ScrollView>
                    {
                      chatData.map((data) => {
                        return (
                          data ?
                            <View style={styles.msgContImage}>
                              <ScrollView>
                                <View style={styles.ViewMsg}>
                                  <Text style={styles.textCss}>{this.state.first_name}</Text>
                                  <Text style={styles.dateCss}>{data.date}</Text>
                                </View>
                                {
                                  data.desc ? <Text style={styles.paraCss}>{data.desc}</Text> : null
                                }
                                {
                                  data.image ?
                                    <View style={styles.ImgView}>
                                      {/* <Image source={Constants.Images.customer.goback} style={styles.arrowImg} resizeMode={'center'} /> */}
                                      <FlatList
                                        data={data.image}
                                        renderItem={({ item }) =>
                                          <Image source={{ uri: CustomerConnection.mediaURLCus() + item }} style={styles.imgCss} resizeMode={'center'} />
                                        }
                                        horizontal={true} />
                                      {/* <Image source={Constants.Images.customer.next} style={styles.arrowImg} resizeMode={'center'} /> */}
                                    </View>
                                    : null
                                }
                              </ScrollView>
                            </View> : null
                        );
                      })
                    }
                  </ScrollView>
                  <View style={{ height: scaleHeight(150), color: 'transparent' }}>
                  </View>
                </View>
                {/* Text & Image end */}
                <View style={styles.chatCont}>
                  <TextInput
                    style={styles.chatInput}
                    underlineColorAndroid="transparent"
                    placeholder="Write a note here...."
                    placeholderTextColor={Constants.Colors.LightGray}
                    onChangeText={(msgdes) => this.setState({ msgdes })}
                    value={this.state.msgdes}
                  />
                  <View style={styles.addView}>
                    <TouchableOpacity onPress={() => this.openOptions()}>
                      {
                        this.state.ImagePath ? <Image source={this.state.ImagePath} style={styles.imgCssAdd} resizeMode={'contain'} /> : <Image source={Constants.Images.customer.Gallerypic} style={styles.imgCssAdd} resizeMode={'contain'} />
                      }

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openOptions()}>
                      <Text style={styles.addPic}>Add Picture</Text>
                    </TouchableOpacity>
                    {
                      this.state.msgdes.length > 0 || this.state.ImagePath.length > 0 || this.state.selectImage == true ? <TouchableOpacity onPress={() => this.sendMsg()}>
                        <Image source={Constants.Images.customer.Sendpic} style={styles.imgCssAdd1} resizeMode={'contain'} />
                      </TouchableOpacity> : null
                    }
                  </View>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>

        {/* Select Image Modal for android start*/}
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
        {/* Select Image Modal for android end */}


        <Toast
          ref="toast"
          style={{ backgroundColor: '#D6511F' }}
          position='bottom'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
        {/* Loader Start */}
        <Modal
          transparent={true}
          onRequestClose={() => null}
          visible={this.state.animating}>
          <View style={styles.loaderTransView}>
            <ActivityIndicator size="large" color='red' />
          </View>
        </Modal>

        {/* Loader End */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.LightBlue
  },
  focusCircle: {
    width: scaleWidth(20), height: scaleHeight(20), backgroundColor: Constants.Colors.DarkBlue, borderRadius: scaleWidth(20), marginTop: scaleHeight(8)
  },
  OtherCircle: {
    width: scaleWidth(20), height: scaleHeight(20), backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(20), marginTop: scaleHeight(8)
  },
  arrowImg: {
    height: scaleHeight(30),
    width: scaleWidth(15),
    marginTop: scaleHeight(18)
  },
  addView: {
    flexDirection: 'row',
    marginLeft: scaleWidth(20),
    marginRight: scaleWidth(10),
    marginTop: scaleHeight(10),
    justifyContent: 'flex-start',
    marginBottom: scaleHeight(20)
  },
  addPic: {
    color: Constants.Colors.DarkBlue,
    marginLeft: scaleWidth(5), alignItems: 'flex-start',
    fontSize: normalizeFont(17), marginTop: scaleHeight(5),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
  },
  imgCssAdd1: {
    height: scaleHeight(40),
    width: scaleWidth(30),
    alignItems: 'flex-start',
    marginLeft: scaleWidth(135),
    marginRight: 10
  },
  imgCssAdd: {
    height: scaleHeight(40),
    width: scaleWidth(30),
    alignItems: 'flex-start',
    marginLeft: scaleWidth(0)
  },
  chatInput: {
    height: scaleHeight(48), fontSize: normalizeFont(17), marginBottom: scaleHeight(0), paddingHorizontal: 20,
  },
  ViewMsg: {
    flexDirection: 'row',
    marginLeft: scaleWidth(10),
    marginRight: scaleWidth(10),
    marginTop: scaleHeight(10)
  },
  ImgView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: scaleWidth(10),
    marginRight: scaleWidth(10),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10)
  },
  imgCss: {
    height: scaleHeight(70),
    width: scaleWidth(140),
    backgroundColor: Constants.Colors.White,
    borderRadius: scaleWidth(5)
  },
  textCss: {
    alignItems: 'flex-start',
    fontSize: normalizeFont(16),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.DarkBlue
  },
  dateCss: {
    alignItems: 'flex-end',
    marginLeft: scaleWidth(92),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.Orange,
    fontSize: normalizeFont(16),
  },
  paraCss: {
    marginLeft: scaleWidth(10),
    marginRight: scaleWidth(10),
    marginTop: scaleWidth(5),
    marginBottom: scaleHeight(5),
    fontSize: normalizeFont(14),
    color: Constants.Colors.DarkGrey,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    textAlign: 'justify'
  },
  textCont: {
    height: scaleHeight(100),
    width: scaleWidth(320),
    borderRadius: scaleWidth(10),
    borderColor: Constants.Colors.DarkGrey,
    borderWidth: 0.5,
    marginTop: scaleHeight(15),
    marginBottom: scaleHeight(12)
  },
  msgContImage: {
    height: scaleHeight(175),
    width: scaleWidth(320),
    borderColor: Constants.Colors.DarkGrey,
    borderWidth: 0.5,
    borderRadius: scaleWidth(10),
    marginBottom: scaleHeight(12),

  },
  chatCont: {
    height: scaleHeight(100),
    width: scaleWidth(320),
    backgroundColor: '#F5F5F5',
    borderColor: Constants.Colors.DarkGrey,
    borderWidth: 0.5,
    borderRadius: scaleWidth(10),
    //marginBottom: scaleHeight(12),
    bottom: scaleHeight(12),
    position: 'absolute',
  },
  msgCont: {
    height: scaleHeight(65),
    width: "100%",
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(8),
    backgroundColor: Constants.Colors.White
  },
  imgCont: {
    width: scaleWidth(20),
    height: scaleHeight(35),
    marginLeft: scaleWidth(15),
    marginTop: scaleHeight(7)
  },
  msgText: {
    fontSize: normalizeFont(15),
    color: '#697477',
    marginLeft: scaleWidth(50),
    marginRight: scaleWidth(30),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
    textAlign: 'justify',
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
  },
  cirCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: scaleWidth(25),
    marginRight: scaleWidth(25)
  },
  circle: {
    width: scaleWidth(30), height: scaleHeight(30), borderRadius: scaleHeight(30), backgroundColor: '#2E68B4'
  },
  circleDark: {
    width: scaleWidth(30), height: scaleHeight(30), borderRadius: scaleHeight(30), backgroundColor: '#A7A9A8'
  },
  pickText: {
    textAlign: 'center', color: '#6B6B6B', marginTop: scaleWidth(35), marginLeft: scaleWidth(-95), marginBottom: scaleHeight(15)
  },
  flexRow: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
    textAlign: 'center',
    color: Constants.Colors.LightGray,
  },
  pickupIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    marginLeft: scaleWidth(5)
  },
  input: {
    height: scaleHeight(48), borderColor: '#C2C2C2', borderWidth: scaleWidth(1.5), backgroundColor: '#FFFFFF', fontSize: normalizeFont(17), marginBottom: scaleHeight(10), paddingHorizontal: 20,
  },
  textView: {
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(20),
    marginLeft: scaleWidth(5),
    marginRight: scaleWidth(5),
    fontFamily: Constants.CustomerFonts.normal.fontFamily,

  },
  noteBtn: {
    width: '100%',
    alignSelf: 'center',
    height: scaleHeight(50),
    borderRadius: scaleHeight(5),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(8),
    backgroundColor: "#F7F7F7",
    shadowColor: 'red',
    elevation: 3,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 0.8
  },
  noteText: {
    color: Constants.Colors.LightBlue,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(18),
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
  },
  nextBtn: {
    width: '90%',
    alignSelf: 'center',
    height: scaleHeight(50),
    borderRadius: scaleHeight(20),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(22),
    marginBottom: scaleHeight(30),
    backgroundColor: Constants.Colors.LightBlue,
    shadowColor: '#24BDFD',
    elevation: 2,
    shadowOffset: {
      width: scaleWidth(0),
      height: scaleHeight(3),
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  nextText: {
    color: Constants.Colors.White,
    fontWeight: '400',
    backgroundColor: 'transparent',
    fontSize: normalizeFont(18),
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
  },
  shadowCss: {
    backgroundColor: '#fff',
    padding: 10,
    // shadowColor: '#000000',
    // shadowOffset: {
    //    width: 0,
    //    height: 3
    // },
    // shadowRadius: 5,
    // shadowOpacity: 1.0
  },
  transaparentView: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },

  centerView: { height: scaleHeight(500), width: scaleWidth(350), borderRadius: 5, backgroundColor: '#fff', alignSelf: 'center', alignItems: 'center' },

  topText: {
    top: scaleHeight(20),
    textAlign: 'justify',
    fontSize: normalizeFont(18),
    fontWeight: '700', color: '#314054',
    marginLeft: scaleWidth(25),
    borderRadius: scaleWidth(10),
    borderColor: 'red',
    height: scaleHeight(80),
    width: scaleWidth(280)
  },

  desc: { marginTop: scaleHeight(30), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: 25 },
  desc1: { marginTop: scaleHeight(15), textAlign: 'justify', fontSize: normalizeFont(16), color: '#BBBBBB', opacity: 0.7, fontWeight: '600', marginLeft: scaleWidth(0), marginRight: scaleWidth(102), marginBottom: scaleHeight(20) },
  headerColor: {
    marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5), marginBottom: scaleHeight(10),
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
  },
  text: {
    // color: Constants.Colors.White,
    fontSize: 18,
    alignSelf: "center",
    // marginTop: scaleHeight(5)
  },
  camCont: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    marginLeft: scaleWidth(5),
    marginTop: scaleHeight(4),
    marginRight: scaleWidth(0),
    borderRadius: scaleWidth(2),
    backgroundColor: Constants.Colors.Orange
  },
  plusIcon: {
    fontSize: normalizeFont(30), fontWeight: '900', color: Constants.Colors.White, textAlign: 'center'
  },
  camText: {
    fontSize: normalizeFont(18),
    color: Constants.Colors.White,
    marginLeft: scaleWidth(12),
    marginTop: scaleHeight(14),
    marginBottom: scaleHeight(10),
    textAlign: 'justify',
    fontFamily: Constants.CustomerFonts.bold.fontFamily,
    marginRight: scaleWidth(120)
  },
  timercss: {
    fontSize: normalizeFont(18),
    color: Constants.Colors.Orange,
    marginLeft: scaleWidth(50),
    marginRight: scaleWidth(30),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(10),
    textAlign: 'justify',
    fontFamily: Constants.CustomerFonts.TopHeader.fontFamily,
  },
  DropCircle: {
    width: scaleWidth(20), height: scaleHeight(20), backgroundColor: Constants.Colors.Orange, borderRadius: scaleWidth(20), marginTop: scaleHeight(8)
  },
  pickuptext: {
    fontSize: normalizeFont(14),
    fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    color: Constants.Colors.White, marginBottom: scaleHeight(8)
  },
  circleLogo: {
    height: scaleHeight(50),
    width: scaleWidth(50),
    borderRadius: scaleWidth(50),
    marginLeft: scaleWidth(40),
    marginTop: scaleHeight(10),
    backgroundColor: Constants.Colors.LightBlue
  },
  loaderTransView: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.2)", alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
  },
  dotLine: {
    fontWeight: '900', marginTop: scaleHeight(5), color: Constants.Colors.White, fontSize: normalizeFont(18)
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
});


export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(NotesHourly);