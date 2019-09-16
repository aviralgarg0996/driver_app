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
    ScrollView,
    TextInput,
    Modal,
    Alert,
    TouchableHighlight,
    AsyncStorage,
    KeyboardAvoidingView,
    FlatList,
    ImageBackground,
    ActionSheetIOS
} from 'react-native';
import HeaderMenu from '../../../components/customer/HeaderMenu';
import Constants from "../../../constants";
//import Background from '../../../components/common/Background';
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
//import { BoxShadow } from 'react-native-shadow';
import Button from '../../../constants/Buttons';
import ImagePickerCropper from "react-native-image-crop-picker";
import RestClient from '../../../redux/modules/RestClient';
import RestClient1 from '../../../utilities/RestClient';
import Toast, { DURATION } from 'react-native-easy-toast'
import { connect } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/modules/app';
import Regex from '../../../utilities/Regex';
const postalRegex = /^(\s*\d{6}\s*)(,\s*\d{6}\s*)*,?\s*$/;
const phoneRegex = /^(\s*\d{10}\s*)(,\s*\d{10}\s*)*,?\s*$/;
import CustomerConnection from "../../../config/Connection";
import moment from 'moment';
import { Radio } from 'native-base';
import { NavigationActions } from "react-navigation"
import ShadowButton from "../../../components/common/ShadowButton";


var chatData = []



class DraftPick extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            available: true,
            modalVisible: false,
            imageType: "",
            ImagemodalVisible: false,
            address: '',
            selectImage: false,
            // DropOff: [{ "id": 0, "address": "Terrace, BC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 54.5181925, "long": -128.6031539 }],
            Picks: this.props.state.pickupArr,
            NewPicks: this.props.state.pickupArr,
            // Picks: [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }],
            // NewPicks: [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }],
            saveData: '',
            msgdes: '',
            value: '',
            'first_name': '',
            ImagePath1: [],
            ImagePath: '',
            DraftStatus1: true,
            DraftStatus2: false,
            DraftStatus3: false,
            DraftStatus4: false,
            deliverFlag: true,
            dropFlag: false,
            role: "DELIVER",
            door: "",
            DropOff: this.props.state.dropArr,
            valy: 180,
            radioDriver: false,
            radioCustomer: true,
            frontValue: false,
            backValue: false,
            newOrderId: "",
            name: '', phone: '', buzzno: '', postal: '', unit: '', name2: '', phone2: '', buzzno2: '', postal2: '', unit2: '', name3: '', phone3: '', buzzno3: '', postal3: '', unit3: '', name4: '', phone4: '', buzzno4: '', postal4: '', unit4: ''
        }
        // this.props.state.DraftPick = [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }],

        //     this.props.state.DraftDrop = [{ "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }, { "id": 0, "address": "Terrebonne, QC, Canada", "img": "none", "next": 3, "prev": 1, "lat": 45.6929818, "long": -73.63311019999999 }]
        // Timer
        var intervalId = setInterval(() => {
            this.setState({ valy: this.state.valy - 1 });
            if (this.state.valy == 0) {
                this.refs.toast.show('Your Order has not been accepted by drivers.', DURATION.LENGTH_LONG);
                clearInterval(intervalId)
            }
        }, 1000);
        if (this.props.state.draft1) {
            this.state.name = this.props.state.draft1.Inchargename,
                this.state.phone = this.props.state.draft1.phone,
                this.state.buzzno = this.props.state.draft1.buzz_number,
                this.state.postal = this.props.state.draft1.postal_code,
                this.state.unit = this.props.state.draft1.unitnumber
            let stored = this.state.name;
            console.log('name---', stored)
        }

    }

    setAvailability() {
        this.setState({
            available: !this.state.available
        })
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
        this.setState({
            modalVisible: true
        })
    }

    openDropNote() {
        this.setState({ modalVisible: true, ImagePath: '' });
    }



    draftPick() {
        if (this.props.state.InvoiceData._id) {
            this.orderID = this.props.state.InvoiceData._id
        } else {
            if (this.props.state.Orders._id) {
                this.orderID = this.props.state.Orders._id
            }
        }

        if (this.props.state.draft2) {
            this.state.name2 = this.props.state.draft2.Inchargename,
                this.state.phone2 = this.props.state.draft2.phone,
                this.state.buzzno2 = this.props.state.draft2.buzz_number,
                this.state.postal2 = this.props.state.draft2.postal_code,
                this.state.unit2 = this.props.state.draft2.unitnumber
            let stored = this.state.name;
            console.log('name---', stored)
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
        //     this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
        // } else if (!buzzno.match(phoneRegex)) {
        //     this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
        // } else if (postal == '' || postal == null) {
        //     this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
        // } else if (!postal.match(postalRegex)) {
        //     this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
        // } else if (unit == '' || unit == null) {
        //     this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
        // }
        else {
            this.props.dispatch(startLoading())
            let obj = {
                "order_id": this.orderID,
                //order_id: '5c2d96df6c6c4a1fcafc8823',
                "Inchargename": name,
                "phone": phone,
                "buzz_number": buzzno,
                "postal_code": postal,
                "unitnumber": unit,
                "order_type": "Pickup"
            }
            RestClient.urlPost("pickupinfo/create", obj).then((result) => {
                if (result.status == true) {
                    this.props.dispatch(stopLoading())
                    console.log("data get", result.data);
                    this.props.navigation.dispatch({ type: 'DRAFT1', data: result.data })
                    if (this.props.state.DraftPick.length == 3) {
                        //this.props.navigation.navigate("DraftPick2")
                        this.setState({
                            DraftStatus1: false,
                            DraftStatus2: true,
                            DraftStatus3: false,
                            DraftStatus4: false
                        })
                    }
                    if (this.props.state.DraftPick.length == 2) {
                        //this.props.navigation.navigate("DraftPick2")
                        this.setState({
                            DraftStatus1: false,
                            DraftStatus2: true,
                            DraftStatus3: false,
                            DraftStatus4: false
                        })

                    }
                    if (this.props.state.DraftPick.length == 1) {
                        //this.props.navigation.navigate("DraftDrop")
                        this.setState({
                            DraftStatus1: false,
                            DraftStatus2: false,
                            DraftStatus3: false,
                            DraftStatus4: true
                        })
                        if (this.props.state.draft4) {
                            this.state.name4 = this.props.state.draft4.Inchargename,
                                this.state.phone4 = this.props.state.draft4.phone,
                                this.state.buzzno4 = this.props.state.draft4.buzz_number,
                                this.state.postal4 = this.props.state.draft4.postal_code,
                                this.state.unit4 = this.props.state.draft4.unitnumber
                            let stored = this.state.name;
                            console.log('name---', stored)
                        }
                    }

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

    draftPick2 = () => {
        if (this.props.state.InvoiceData._id) {
            this.orderID = this.props.state.InvoiceData._id
        } else {
            if (this.props.state.Orders._id) {
                this.orderID = this.props.state.Orders._id
            }
        }

        if (this.props.state.draft3) {
            this.state.name3 = this.props.state.draft3.Inchargename,
                this.state.phone3 = this.props.state.draft3.phone,
                this.state.buzzno3 = this.props.state.draft3.buzz_number,
                this.state.postal3 = this.props.state.draft3.postal_code,
                this.state.unit3 = this.props.state.draft3.unitnumber
            let stored = this.state.name;
            console.log('name---', stored)
        }
        const { name2, phone2, buzzno2, postal2, unit2 } = this.state;
        if (name2 == '' || name2 == null) {
            this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
        } else if (phone2 == '' || phone2 == null) {
            this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
        } else if (!phone2.match(phoneRegex)) {
            this.refs.toast.show('Please enter phone no. with 10 digits', DURATION.LENGTH_LONG);
        }
        // else if (buzzno2 == '' || buzzno2 == null) {
        //     this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
        // } else if (!buzzno2.match(phoneRegex)) {
        //     this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
        // } else if (postal2 == '' || postal2 == null) {
        //     this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
        // } else if (!postal2.match(postalRegex)) {
        //     this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
        // } else if (unit2 == '' || unit2 == null) {
        //     this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
        // }
        else {
            this.props.dispatch(startLoading())
            let obj = {
                "order_id": this.orderID,
                // order_id: '5c2d96df6c6c4a1fcafc8823',
                "Inchargename": name2,
                "phone": phone2,
                "buzz_number": buzzno2,
                "postal_code": postal2,
                "unitnumber": unit2,
                "order_type": "Pickup"
            }
            console.log('obj++', obj)
            let pickLength = JSON.stringify(this.state.Picks.length);
            RestClient.urlPost("pickupinfo/create", obj).then((result) => {
                if (result.status == true) {
                    this.props.dispatch(stopLoading())
                    this.props.navigation.dispatch({ type: 'DRAFT2', data: result.data })
                    if (this.props.state.DraftPick.length == 3) {
                        //this.props.navigation.navigate("DraftPick3")
                        this.setState({
                            DraftStatus1: false,
                            DraftStatus2: false,
                            DraftStatus3: true,
                            DraftStatus4: false
                        })
                    } else {
                        if (this.props.state.DraftPick.length == 2) {
                            //this.props.navigation.navigate("DraftDrop")
                            this.setState({
                                DraftStatus1: false,
                                DraftStatus2: false,
                                DraftStatus3: false,
                                DraftStatus4: true
                            })
                            if (this.props.state.draft4) {
                                this.state.name4 = this.props.state.draft4.Inchargename,
                                    this.state.phone4 = this.props.state.draft4.phone,
                                    this.state.buzzno4 = this.props.state.draft4.buzz_number,
                                    this.state.postal4 = this.props.state.draft4.postal_code,
                                    this.state.unit4 = this.props.state.draft4.unitnumber
                                let stored = this.state.name;
                                console.log('name---', stored)
                            }
                        }
                    }
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

    draftPick3 = () => {
        if (this.props.state.InvoiceData._id) {
            this.orderID = this.props.state.InvoiceData._id
        } else {
            if (this.props.state.Orders._id) {
                this.orderID = this.props.state.Orders._id
            }
        }
        const { name3, phone3, buzzno3, postal3, unit3 } = this.state;
        if (name3 == '' || name3 == null) {
            this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
        } else if (phone3 == '' || phone3 == null) {
            this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
        } else if (!phone3.match(phoneRegex)) {
            this.refs.toast.show('Please enter phone no. with 10 digits', DURATION.LENGTH_LONG);
        }
        // else if (buzzno3 == '' || buzzno3 == null) {
        //     this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
        // } else if (!buzzno3.match(phoneRegex)) {
        //     this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
        // } else if (postal3 == '' || postal3 == null) {
        //     this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
        // } else if (!postal3.match(postalRegex)) {
        //     this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
        // } else if (unit3 == '' || unit3 == null) {
        //     this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
        // }
        else {
            this.props.dispatch(startLoading())
            let obj = {
                "order_id": this.orderID,
                //order_id: '5c2d96df6c6c4a1fcafc8823',
                "Inchargename": name3,
                "phone": phone3,
                "buzz_number": buzzno3,
                "postal_code": postal3,
                "unitnumber": unit3,
                "order_type": "Pickup"
            }
            console.log('obj++', obj)
            RestClient.urlPost("pickupinfo/create", obj).then((result) => {
                if (result.status == true) {
                    this.props.dispatch(stopLoading())
                    this.props.navigation.dispatch({ type: 'DRAFT3', data: result.data })
                    if (this.props.state.DraftPick.length == 3) {
                        //this.props.navigation.navigate("DraftDrop")
                        this.setState({
                            DraftStatus1: false,
                            DraftStatus2: false,
                            DraftStatus3: false,
                            DraftStatus4: true
                        })
                        if (this.props.state.draft4) {
                            this.state.name4 = this.props.state.draft4.Inchargename,
                                this.state.phone4 = this.props.state.draft4.phone,
                                this.state.buzzno4 = this.props.state.draft4.buzz_number,
                                this.state.postal4 = this.props.state.draft4.postal_code,
                                this.state.unit4 = this.props.state.draft4.unitnumber
                            let stored = this.state.name;
                            console.log('name---', stored)
                        }

                    }
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

    setAvailability() {
        this.setState({
            available: !this.state.available
        })
    }

    sendMsg = () => {
        this.props.dispatch(startLoading())
        let obj = {
            "pickUpImage": this.state.ImagePath1,
            "description": this.state.msgdes
        }
        console.log('objnew', JSON.stringify(obj))
        RestClient.urlPostImage("pickupinfo/addtionalPickupInfo", obj).then((result) => {
            if (result.status == true) {
                this.props.dispatch(stopLoading())
                console.log("data get", result.data);
                var date = result.data.createdAt
                var dateFormat = moment(date).format('DD/MM/YY HH:mm');
                console.log('date_format', dateFormat)

                var objnext = {
                    date: dateFormat,
                    desc: result.data.description,
                    image: result.data.pickUpImage,
                    id: result.data._id
                }
                chatData.push(objnext)
                console.log('chatdata', chatData)
                this.setState({
                    msgdes: '',
                    ImagePath: '',
                    ImagePath1: []
                })
            } else {
                this.props.dispatch(stopLoading())
                console.log("data getting")
            }
        })
    }



    radioFun(value) {
        console.log("value on radio", value)
        if (value == 'DELIVER') {
            this.setState({
                deliverFlag: true,
                dropFlag: false
            })
        }
        if (value == 'DROP') {
            this.setState({
                dropFlag: true,
                deliverFlag: false
            })
        }
    }
    radioFun1(value) {
        console.log("value on radio", value)
    }


    checkOrderApi = () => {
        AsyncStorage.getItem("id").then((value) => {
            RestClient1.get_New('myorders/my-orders/', {
                status: 'Available',
                max: 6217708099,
                min: 0,
                page: 1,
                count: 30,
                datemin: 0,
                datemax: 1538223074000220000011,
                customerId: value,
            }, '').then((result) => {
                if (result.status == 1) {
                    for (var i = 0; i < result.data.length; i++) {
                        var obj = result.data[0].orderId;
                        this.setState({
                            newOrderId: obj
                        })
                    }
                    let newOrder = this.state.newOrderId
                    alert(JSON.stringify(newOrder))

                    this.props.navigation.navigate('OrdersInfo', { detail_id: newOrder })
                }
                else {
                    console.log('api response')
                }
            })
        })
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
            const { name4, phone4, buzzno4, postal4, unit4 } = this.state;
            if (name4 == '' || name4 == null) {
                this.refs.toast.show('Please enter name.', DURATION.LENGTH_LONG);
            } else if (phone4 == '' || phone4 == null) {
                this.refs.toast.show('Please enter phone.', DURATION.LENGTH_LONG);
            } else if (!phone4.match(phoneRegex)) {
                this.refs.toast.show('Please enter phone no. with 10 digits', DURATION.LENGTH_LONG);
            }
            // else if (buzzno4 == '' || buzzno4 == null) {
            //     this.refs.toast.show('Please enter buzz no.', DURATION.LENGTH_LONG);
            // } else if (!buzzno4.match(phoneRegex)) {
            //     this.refs.toast.show('Please enter buzz no. with 10 digits', DURATION.LENGTH_LONG);
            // } else if (postal4 == '' || postal4 == null) {
            //     this.refs.toast.show('Please enter postal code.', DURATION.LENGTH_LONG);
            // } else if (!postal4.match(postalRegex)) {
            //     this.refs.toast.show('Please enter postal code with 6 digits.', DURATION.LENGTH_LONG);
            // } else if (unit4 == '' || unit4 == null) {
            //     this.refs.toast.show('Please enter unit no.', DURATION.LENGTH_LONG);
            // }
            else {
                this.props.dispatch(startLoading())
                let obj = {
                    "order_id": this.orderID,
                    // order_id: '5c2d96df6c6c4a1fcafc8823',
                    "Inchargename": name4,
                    "phone": phone4,
                    "buzz_number": buzzno4,
                    "postal_code": postal4,
                    "unitnumber": unit4,
                    "order_type": "Drop"
                }
                console.log('obj++', obj)
                RestClient.urlPost("pickupinfo/create", obj).then((result) => {
                    if (result.status == true) {
                        this.props.dispatch(stopLoading())
                        this.props.navigation.dispatch({ type: 'DRAFT4', data: result.data })
                        this.refs.toast.show('Your information is updated successfully', DURATION.LENGTH_LONG);
                        this.setState({
                            radioDriver: true,
                            radioCustomer: false,
                            role: 'DROP'
                        })
                    } else {
                        this.props.dispatch(stopLoading())
                        console.log("data getting")
                    }
                }).catch(error => {
                    this.props.dispatch(stopLoading())
                    console.log("result of type eror", error)
                });
            }
        } else {
            let objData = {
                "order_id": this.orderID,
                //order_id: '5c2d96df6c6c4a1fcafc8823',
                "order_type": "Drop",
                "location": this.state.door,
                "locationimage": this.state.ImagePath,
            }
            console.log("objData++", objData)
            if (this.state.role == 'DROP') {
                if (this.state.door == '') {
                    this.refs.toast.show('Please select door options', DURATION.LENGTH_LONG);
                } else {
                    this.props.dispatch(startLoading())
                    RestClient.urlPostFile("dropoffinfo/create", objData).then((result) => {
                        if (result.status == true) {
                            this.props.dispatch(stopLoading())
                            this.refs.toast.show('Your information is updated successfully', DURATION.LENGTH_LONG);
                            this.setState({
                                ImagePath: '',
                                frontValue: false,
                                backValue: false,
                                door: ""
                            })
                          
                            let routeName = 'CustomerOrders';
                            this.props.navigation.navigate(routeName);
                            // this.props.navigation.navigate('OrdersInfo', { detail_id: this.orderID })

                        } else {
                            this.props.dispatch(stopLoading())
                            console.log("data getting")
                        }
                    }).catch(error => {
                        this.props.dispatch(stopLoading())
                        console.log("result of type eror", error)
                    });
                }
                console.log('drop')
            }
        }
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
    sendMsg = () => {
        let obj = {
            "pickUpImage": this.state.ImagePath1,
            "description": this.state.msgdes
        }
        console.log('objnew', JSON.stringify(obj))
        RestClient.urlPostImage("pickupinfo/addtionalPickupInfo", obj).then((result) => {
            if (result.status == true) {
                console.log("data get", result.data);
                var date = result.data.createdAt
                var dateFormat = moment(date).format('DD/MM/YY HH:mm');
                console.log('date_format', dateFormat)

                var objnext = {
                    date: dateFormat,
                    desc: result.data.description,
                    image: result.data.pickUpImage,
                    id: result.data._id
                }
                chatData.push(objnext)
                console.log('chatdata', chatData)
                this.setState({
                    msgdes: '',
                    ImagePath: '',
                    ImagePath1: []
                })
            } else {
                console.log("data getting")
            }
        })
    }

    checkFront() {
        this.setState({
            frontValue: true,
            backValue: false,
            door: 'FRONT'
        })
        // let val = this.state.frontValue
        // if (val === true) {
        //     this.setState({  })
        // }
    }

    checkBack() {
        this.setState({
            backValue: true,
            frontValue: false,
            door: 'BACK'
        })
        // let val = this.state.backValue
        // if (val === true) {
        //     this.setState({  })
        // }
    }


    componentWillMount = () => AsyncStorage.getItem('first_name').then((value) => this.setState({ 'first_name': value }))


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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null}>
                <HeaderBackground navigation={navigate} />
                <HeaderMenu />
                {/* Draft Status 1 start */}
                {
                    this.state.DraftStatus1 ? <ScrollView style={{ flex: 1 }} decelerationRate={0.5}>
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
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <View style={styles.OtherCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <View style={styles.OtherCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
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
                                <Text style={styles.pickuptext}>Pickup 1</Text>
                            }

                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 2</Text> : null
                            }

                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 3 </Text> : null
                            }

                            <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Drop-Off</Text>
                        </View>
                        <ImageBackground style={styles.shadowCss} source={require('../../../assets/images/customer/blue.png')}>
                            <View style={[styles.flexRow, { marginLeft: scaleWidth(5) }]}>
                                <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIcon]} resizeMode={'contain'} />
                                <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                    {'Pickup 1'}
                                </Text>
                            </View>
                            {
                                this.props.state.DraftPick[0].address ? <View style={{ marginLeft: scaleWidth(30) }}>
                                    <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                                        {this.props.state.DraftPick[0].address}
                                    </Text>
                                </View> : null
                            }


                            <View style={styles.textView}>
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Name of Incharge Person"
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ name: value })}
                                    value={this.state.name}
                                />
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Phone"
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
                                    maxLength={10}
                                    returnKeyType='done'
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
                        <ShadowButton
                            onPress={() => this.draftPick()}
                            text={'Next Location'}
                            style={styles.ButtonStyle}
                            textStyle={styles.ButtonTextStyle}
                        />
                        <View style={{ height: scaleHeight(40) }}></View>
                    </ScrollView> : null
                }

                {/* Draft Status 1 end */}

                {/* Draft Status 2 start */}
                {this.state.DraftStatus2 ? <ScrollView style={{ flex: 1 }}>
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
                            this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <View style={styles.focusCircle} /> : null
                        }
                        {
                            this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
                        }
                        {
                            this.props.state.DraftPick.length == 3 ? <View style={styles.OtherCircle} /> : null
                        }
                        {
                            this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
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
                            <Text style={styles.pickuptext}>Pickup 1</Text>
                        }

                        {
                            this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 2</Text> : null
                        }
                        {
                            this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 3</Text> : null
                        }

                        <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Drop-Off</Text>
                    </View>
                    <ImageBackground style={styles.shadowCss} source={require('../../../assets/images/customer/blue.png')}>
                        <View style={[styles.flexRow, { marginLeft: scaleWidth(5) }]}>
                            <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIcon]} resizeMode={'contain'} />
                            <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                {'Pickup 2'}
                            </Text>
                        </View>
                        {
                            this.props.state.DraftPick[1].address ? <View style={{ marginLeft: scaleWidth(30) }}>
                                <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                                    {this.props.state.DraftPick[1].address}
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
                                placeholder="Name of Incharge Person"
                                placeholderTextColor="#9C9C9C"
                                onChangeText={(value) => this.setState({ name2: value })}
                                value={this.state.name2}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Phone"
                                maxLength={10}
                                keyboardType={'phone-pad'}
                                returnKeyType='done'
                                placeholderTextColor="#9C9C9C"
                                onChangeText={(value) => this.setState({ phone2: value })}
                                value={this.state.phone2}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Buzz Number"
                                keyboardType={'number-pad'}
                                returnKeyType='done'
                                maxLength={10}
                                placeholderTextColor="#9C9C9C"
                                onChangeText={(value) => this.setState({ buzzno2: value })}
                                value={this.state.buzzno2}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Postal Code"
                                keyboardType={'number-pad'}
                                returnKeyType='done'
                                maxLength={6}
                                placeholderTextColor="#9C9C9C"
                                onChangeText={(value) => this.setState({ postal2: value })}
                                value={this.state.postal2}
                            />
                            <TextInput
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Unit Number"
                                keyboardType={'number-pad'}
                                returnKeyType='done'
                                placeholderTextColor="#9C9C9C"
                                onChangeText={(value) => this.setState({ unit2: value })}
                                value={this.state.unit2}
                            />
                            <View style={styles.viewCont}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <TouchableOpacity onPress={() => this.openNotes()}>
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
                    <ShadowButton
                        onPress={() => this.draftPick2()}
                        text={'Next Location'}
                        style={styles.ButtonStyle}
                        textStyle={styles.ButtonTextStyle}
                    />

                    <View style={{ height: scaleHeight(40) }}></View>

                </ScrollView> : null
                }
                {/* Draft Status 2 end */}

                {/* Draft Status 3 start  */}
                {
                    this.state.DraftStatus3 ? <ScrollView style={{ flex: 1 }}>
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
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <View style={styles.focusCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
                            }

                            {
                                this.props.state.DraftPick.length == 3 ? <View style={styles.focusCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
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
                                <Text style={[styles.pickuptext]}>Pickup 1</Text>
                            }
                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 2</Text> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 3</Text> : null
                            }

                            <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Drop-Off</Text>
                        </View>
                        <ImageBackground style={styles.shadowCss} source={require('../../../assets/images/customer/blue.png')}>
                            <View style={[styles.flexRow, { marginLeft: scaleWidth(5) }]}>
                                <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIcon]} resizeMode={'contain'} />
                                <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                    {'Pickup 3'}
                                </Text>
                            </View>
                            {
                                <View style={{ marginLeft: scaleWidth(30) }}>
                                    <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                                        {this.props.state.DraftPick[2].address}
                                    </Text>
                                </View>
                            }

                            <View style={styles.textView}>
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Name of Incharge Person"
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ name3: value })}
                                    value={this.state.name3}
                                />
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Phone"
                                    keyboardType={'phone-pad'}
                                    maxLength={10}
                                    returnKeyType='done'
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ phone3: value })}
                                    value={this.state.phone3}
                                />
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Buzz Number"
                                    keyboardType={'number-pad'}
                                    maxLength={10}
                                    returnKeyType='done'
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ buzzno3: value })}
                                    value={this.state.buzzno3}
                                />
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Postal Code"
                                    keyboardType={'number-pad'}
                                    returnKeyType='done'
                                    maxLength={6}
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ postal3: value })}
                                    value={this.state.postal3}
                                />
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="Unit Number"
                                    keyboardType={'number-pad'}
                                    returnKeyType='done'
                                    placeholderTextColor="#9C9C9C"
                                    onChangeText={(value) => this.setState({ unit3: value })}
                                    value={this.state.unit3}
                                />
                                <View style={styles.viewCont}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                        <TouchableOpacity onPress={() => this.openNotes()}>
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
                        <ShadowButton
                            onPress={() => this.draftPick3()}
                            text={'Next Location'}
                            style={styles.ButtonStyle}
                            textStyle={styles.ButtonTextStyle}
                        />


                        <View style={{ height: scaleHeight(40) }}></View>

                    </ScrollView> : null
                }
                {/* Draft status 3 end */}

                {/* Draft Status 4 start for drop location */}
                {
                    this.state.DraftStatus4 ? <ScrollView style={{ flex: 1 }}>
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
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <View style={styles.focusCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <View style={styles.focusCircle} /> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={styles.dotLine}>{'------------'}</Text> : null
                            }

                            <View style={styles.DropCircle} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: scaleHeight(6),
                            marginLeft: scaleWidth(20)
                        }}>
                            {
                                <Text style={styles.pickuptext}>Pickup 1</Text>
                            }

                            {
                                this.props.state.DraftPick.length == 2 || this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 2</Text> : null
                            }
                            {
                                this.props.state.DraftPick.length == 3 ? <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Pickup 3</Text> : null
                            }

                            <Text style={[styles.pickuptext, { marginLeft: scaleWidth(35) }]}>Drop-Off</Text>
                        </View>
                        <ImageBackground style={styles.shadowCss} source={require('../../../assets/images/customer/blue.png')}>
                            <View style={[styles.flexRow, { marginLeft: scaleWidth(5) }]}>
                                <Image source={Constants.Images.customer.markerBlue} style={[styles.pickupIcon]} resizeMode={'contain'} />
                                <Text style={[styles.textStyle, { color: Constants.Colors.White, flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }]}>
                                    {'Drop-Off'}
                                </Text>

                            </View>
                            {

                                <View style={{ marginLeft: scaleWidth(30) }}>
                                    <Text numberOfLines={1} style={[styles.textStyle, { textAlign: 'left', marginBottom: scaleHeight(8) }]}>
                                        {this.props.state.DraftDrop[0].address}
                                    </Text>
                                </View>
                            }


                            <View style={{ flexDirection: 'row', marginLeft: scaleWidth(10), marginBottom: scaleHeight(12) }}>

                                {/* <Radio selected={false} selectedColor={Constants.Colors.Orange}
                                selected={this.state.role == 'DELIVER'}
                                onPress={() => this.setState({ role: 'DELIVER' })}
                                color={"#fff"}
                                radioBtnSize={20}
                                selected={this.state.role == 'DELIVER'}
                            /> */}

                                <TouchableOpacity onPress={() => this.setState({
                                    radioCustomer: true,
                                    radioDriver: false,
                                    role: 'DELIVER'
                                })}>
                                    <Image source={this.state.radioCustomer ? Constants.Images.customer.newRadioOn : Constants.Images.customer.newRadioOff} style={[{ width: scaleWidth(20), height: scaleWidth(20) }]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({
                                    radioCustomer: true,
                                    radioDriver: false,
                                    role: 'DELIVER'
                                })}>
                                    <Text style={{ marginRight: 10, marginLeft: 8, fontSize: 16, color: Constants.Colors.White, alignSelf: "center" }}>Deliver to Person</Text>
                                </TouchableOpacity>
                                {/* <Radio selected={true} selectedColor={Constants.Colors.Orange}
                                color={"#fff"}
                                onPress={() => this.setState({ role: 'DROP' })}
                                selected={this.state.role == 'DROP'}
                            /> */}
                                <TouchableOpacity onPress={() => this.setState({
                                    radioDriver: true,
                                    radioCustomer: false,
                                    role: 'DROP'
                                })}>
                                    <Image source={this.state.radioDriver ? Constants.Images.customer.newRadioOn : Constants.Images.customer.newRadioOff} style={[{ width: scaleWidth(20), height: scaleWidth(20) }]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({
                                    radioDriver: true,
                                    radioCustomer: false,
                                    role: 'DROP'
                                })}>
                                    <Text style={{ marginRight: 10, marginLeft: 8, fontSize: 16, color: Constants.Colors.White, alignSelf: "center" }}>Drop at Location</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.role == "DELIVER" ?
                                    <View style={styles.textView}>
                                        <TextInput
                                            style={styles.input}
                                            underlineColorAndroid="transparent"
                                            placeholder="Name of Incharge Person"
                                            placeholderTextColor="#9C9C9C"
                                            onChangeText={(value) => this.setState({ name4: value })}
                                            value={this.state.name4}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            underlineColorAndroid="transparent"
                                            placeholder="Phone"
                                            keyboardType={'phone-pad'}
                                            returnKeyType='done'
                                            maxLength={10}
                                            placeholderTextColor="#9C9C9C"
                                            onChangeText={(value) => this.setState({ phone4: value })}
                                            value={this.state.phone4}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            underlineColorAndroid="transparent"
                                            placeholder="Buzz Number"
                                            keyboardType={'number-pad'}
                                            returnKeyType='done'
                                            maxLength={10}
                                            placeholderTextColor="#9C9C9C"
                                            onChangeText={(value) => this.setState({ buzzno4: value })}
                                            value={this.state.buzzno4}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            underlineColorAndroid="transparent"
                                            placeholder="Postal Code"
                                            keyboardType={'number-pad'}
                                            maxLength={6}
                                            returnKeyType='done'
                                            placeholderTextColor="#9C9C9C"
                                            onChangeText={(value) => this.setState({ postal4: value })}
                                            value={this.state.postal4}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            underlineColorAndroid="transparent"
                                            placeholder="Unit Number"
                                            keyboardType={'number-pad'}
                                            returnKeyType='done'
                                            placeholderTextColor="#9C9C9C"
                                            onChangeText={(value) => this.setState({ unit4: value })}
                                            value={this.state.unit4}
                                        />
                                        <View style={styles.viewCont}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                                <TouchableOpacity onPress={() => this.openNotes()}>
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
                                    : null
                            }
                            {
                                this.state.role == "DROP" ?
                                    <View style={{ marginTop: scaleHeight(10) }}>
                                        <View style={{ flexDirection: 'column', marginLeft: scaleWidth(10) }}>
                                            {/* <Radio selected={false} selectedColor={Constants.Colors.Orange}
                                    selected={this.state.door == 'FRONT'}
                                    onPress={() => this.setState({ door: 'FRONT' })}
                                    color={"#fff"}
                                    radioBtnSize={20}
                                    selected={this.state.door == 'FRONT'}
                                 /> */}
                                            <TouchableOpacity onPress={() => this.setState({
                                                frontValue: true,
                                                backValue: false,
                                                door: 'FRONT'
                                            })}>
                                                <Image source={this.state.frontValue ? Constants.Images.customer.rectCheckOn : Constants.Images.customer.rectCheckOff} style={[{ width: 20, height: 20 }]} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({
                                                frontValue: true,
                                                backValue: false,
                                                door: 'FRONT'
                                            })}>
                                                <Text style={{ marginLeft: scaleWidth(25), fontSize: normalizeFont(16), color: Constants.Colors.White, marginTop: scaleHeight(-18), marginBottom: scaleHeight(15) }}>Front Door</Text></TouchableOpacity>

                                            {/* <Radio selected={true} selectedColor={Constants.Colors.Orange}
                                    color={"#fff"}
                                    onPress={() => this.setState({ door: 'BACK' })}
                                    selected={this.state.door == 'BACK'}
                                 /> */}
                                            <TouchableOpacity onPress={() => this.setState({
                                                backValue: true,
                                                frontValue: false,
                                                door: 'BACK'
                                            })}>
                                                <Image source={this.state.backValue ? Constants.Images.customer.rectCheckOn : Constants.Images.customer.rectCheckOff} style={[{ width: 20, height: 20 }]} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.setState({
                                                backValue: true,
                                                frontValue: false,
                                                door: 'BACK'
                                            })}>
                                                <Text style={{ marginLeft: scaleWidth(25), fontSize: normalizeFont(16), color: Constants.Colors.White, marginTop: scaleHeight(-18) }}>Back Door</Text></TouchableOpacity>
                                        </View>

                                        {/* <View style={styles.viewCont}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                                <TouchableOpacity onPress={() => this.openOptions()}>
                                                    {
                                                        this.state.ImagePath ? <Image
                                                            style={styles.camCont}
                                                            source={this.state.ImagePath}
                                                        /> : <Image
                                                                style={styles.camCont}
                                                                source={Constants.Images.customer.CameraNotes}
                                                            />
                                                    }

                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.openOptions()}>
                                                    <Text style={styles.camText}>Add drop location pictures.</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View> */}
                                        <View style={[styles.viewCont, { marginTop: scaleHeight(10) }]}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
                                                <TouchableOpacity onPress={() => this.openNotes()}>
                                                    <View style={styles.camCont}>
                                                        <Text style={styles.plusIcon}>+</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.openNotes()}>
                                                    <Text style={[styles.camText, { marginTop: scaleHeight(5) }]}>Add Other Location, Notes and Picture.</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View></View>
                                    : null
                            }
                        </ImageBackground>
                        <ShadowButton
                            onPress={() => this.submit()}
                            text={'Done'}
                            style={styles.ButtonStyle}
                            textStyle={styles.ButtonTextStyle}
                        />
                        <View style={{ height: scaleHeight(50), color: 'transparent' }} />
                    </ScrollView> : null
                }
                {/* Draft Status 4 end for drop location */}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <KeyboardAvoidingView style={styles.transaparentView} behavior={(Platform.OS === 'ios') ? "padding" : null}>
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
        width: scaleWidth(20), height: scaleHeight(20), backgroundColor: Constants.Colors.White, borderRadius: scaleWidth(20), marginTop: scaleHeight(8)
    },
    DropCircle: {
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
        justifyContent: 'space-around',
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
        marginBottom: scaleHeight(12)

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
        borderRadius: scaleHeight(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(35),
        backgroundColor: colors.DarkBlue,
        shadowColor: '#24BDFD',
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    nextText: {
        color: colors.White,
        fontWeight: '600',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
    },
    shadowCss: {
        backgroundColor: '#fff',
        padding: 10,
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 3
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
    // nextBtn: {
    //     marginTop: scaleHeight(25),
    //     borderRadius: scaleWidth(5),
    //     height: scaleHeight(50),
    //     width: scaleWidth(300),
    //     backgroundColor: '#366CB5'
    // },
    // nextText: {
    //     fontSize: normalizeFont(16),
    //     textAlign: 'center',
    //     padding: scaleWidth(14),
    //     color: "#FCFEFE",
    //     fontFamily: Constants.CustomerFonts.semibold.fontFamily,
    // },
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
        fontSize: 18,
        alignSelf: "center"
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
    pickuptext: {
        fontSize: normalizeFont(14),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: Constants.Colors.White, marginBottom: scaleHeight(8),
    },
    circleLogo: {
        height: scaleHeight(50),
        width: scaleWidth(50),
        borderRadius: scaleWidth(50),
        marginLeft: scaleWidth(40),
        marginTop: scaleHeight(10),
        backgroundColor: Constants.Colors.LightBlue
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

export default connect(state => ({ state: state.CustomerReducer, user: state.user }))(DraftPick);