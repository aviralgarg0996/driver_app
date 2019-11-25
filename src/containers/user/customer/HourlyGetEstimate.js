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
    Modal,
    FlatList,
    DatePickerAndroid,
    TimePickerAndroid,
    Dimensions,
    AsyncStorage,
    ImageBackground
} from 'react-native';

import { connect } from 'react-redux';
const { height, width } = Dimensions.get('window');
import HeaderBackground from '../../../components/customer/HeaderBackground';
import Constants from "../../../constants";
import ShadowButton from "../../../components/customer/ShadowButton";
import CustomerConnection from "../../../config/Connection";

import MapView_HourlyService from '../../../components/customer/MapView_HourlyService';
//import PickUpLocation from '../../../components/customer/PickUpLocation';
import Home_OrdersList from '../../../components/customer/Home_OrdersList';
import Home_DriverList from '../../../components/customer/Home_DriverList';
import BarChartReport from '../../../components/customer/BarChart';
import SearchPlace_Hourly from '../../../components/customer/SearchPlace_Hourly';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../constants/responsive';
import CheckBoxLabel from '../../../components/customer/CheckBoxLabel';
import SubmitButton from "../../../components/common/FormSubmitButton";

import HourlyServiceHeaderMenu from '../../../components/customer/HourlyServiceHeaderMenu';

import { BoxShadow } from 'react-native-shadow';
import moment from 'moment';
import { ToastActionsCreators } from 'react-native-redux-toast';
var strAddress = '228 Park Ave S, New York, NY 10003, USA';
import Toast, { DURATION } from 'react-native-easy-toast'
let showFlat = false

class HourlyGetEstimate extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            PickerDate: new Date(),
            DeliveryDate: moment().format('DD/MM/YYYY'),
            PickerTime: new Date(),
            StartTime: moment().format('hh:mm A'),
            DriverHelp: false,
            ExtraHelp: false,
            Insurance: false,
            isVisible: false,
            flatFlag: false,
            initialPosition:
            {
                latitude: 28.6139,
                longitude: 77.2090,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
            markerPosition: {
                latitude: 28.6139,
                longitude: 77.2090,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
        }
        this.initialPosition = this.state.initialPosition;
        this.markerPosition = this.state.markerPosition;

    }


   
    vehicalList(item) {
        console.log('cost====', item)
        var width = 100 / this.props.state.FilteredTransportArray.length;
        return (
            <View style={[{ backgroundColor: Constants.Colors.LightGray, height: scaleHeight(70), width: Constants.BaseStyle.DEVICE_WIDTH / 100 * width }]}>
                <TouchableOpacity onPress={() => { this.setActiveTransport(item.tag) }}>
                    <View style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
                        <Text style={[styles.transportCostStyle]}>{item.cost}</Text>
                        <Image source={{ uri: item.displayimg }} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
                        <Text style={[styles.transportLabel]}>{item.header}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    setActiveTransport(id) {
        this.props.dispatch({ type: 'ACTIVE_VEHICLE_FILTER', tagid: id });
    }

    CallInvoice() {
        // let context = this;
        let { dispatch } = this.props;
        let { navigate } = this.props.navigation;
        if ((this.props.state.Hourly_dropArr[0].address == 'Choose End Location') || (this.props.state.Hourly_pickupArr[0].address == 'Choose Start Location') || this.props.state.vehicleID == 0) {
            this.refs.toast.show('You have not select either Start Location, End Location or Vehicle', DURATION.LENGTH_LONG);
        } else if (!this.props.state.vehicleID) {
            this.refs.toast.show('Please select vehicle type.', DURATION.LENGTH_LONG);
        } else {
            var pickup = [];
            var drop = [];
            var pickup = [
                {
                    "pickup_point": this.props.state.Hourly_pickupArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                    "address": this.props.state.Hourly_pickupArr[0].address,
                    "pickup_status": 0,
                    "arrive_status": 0,
                    "priority": 0,
                }
            ]
            var drop = [
                {
                    "drop_point": this.props.state.Hourly_dropArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                    "address": this.props.state.Hourly_dropArr[0].address,
                    "drop_status": 0,
                    "priority": 0,
                }
            ]
            
            AsyncStorage.getItem("id").then((value) => {
                console.log("Pickup in hourly",JSON.stringify({
                    "pickup": pickup,
                    "drop_location": drop,
                    "date": this.props.state.HourlyServiceDate,
                    "time": this.props.state.HourlyServiceDisplayTime,
                    "id": value,
                    'vehicle': this.props.state.vehicleID,
                    'duration': this.props.state.HourlyItem,
                    "service_type": 5,
                    'extraHelper': this.state.ExtraHelp,
                    'driver_help': this.state.DriverHelp

                }))
                fetch(CustomerConnection.getTempUrl() + 'place-order/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "pickup": pickup,
                        "drop_location": drop,
                        "date": this.props.state.HourlyServiceDate,
                        "time": this.props.state.HourlyServiceDisplayTime,
                        "id": value,
                        'vehicle': this.props.state.vehicleID,
                        'duration': this.props.state.HourlyItem,
                        "service_type": 5,
                        'extraHelper': this.state.ExtraHelp,
                        'driver_help': this.state.DriverHelp

                    }),

                }).then((response) => response.json())
                    .then((arr) => {
                        console.log("array123456789",arr)
                        //dispatch({type : 'SET_HOURLYINVOICE', amount : arr.data.totalCharge,_orders:arr.data.orders,driverhelp:arr.data.driver_help_cost,extrahelper:arr.data.extra_help_cost});
                        orderID = arr.data._id;
                        dispatch({ type: 'SET_INVOICE', _data: arr.data, _orders: arr.data.orders });//,driverhelp:arr.data.driver_help_cost,extrahelper:arr.data.extra_help_cost});
                        navigate('Hourly_Invoice');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            )
        }
    }

    onHelpDriverClick() {
        this.setState({ DriverHelp: !this.state.DriverHelp },()=>{
        !((this.props.state.Hourly_dropArr[0].address == 'Choose End Location') || (this.props.state.Hourly_pickupArr[0].address == 'Choose Start Location')) &&        this.checkFlat()
          });

    }
    onExtraHelperClick() {
        this.setState({ ExtraHelp: !this.state.ExtraHelp },()=>{
        !((this.props.state.Hourly_dropArr[0].address == 'Choose End Location') || (this.props.state.Hourly_pickupArr[0].address == 'Choose Start Location')) &&        this.checkFlat()
          });
    }
    onInsuranceClick() {
        if ((this.props.state.Hourly_dropArr[0].address == 'Choose End Location') || (this.props.state.Hourly_pickupArr[0].address == 'Choose Start Location') || this.props.state.vehicleID == 0) {
            this.refs.toast.show('You have not select either Start Location, End Location or Vehicle', DURATION.LENGTH_LONG);
        } else {
            var buyHelp = !this.state.Insurance;

            var pickup = [
                {
                    "pickup_point": this.props.state.Hourly_pickupArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                    "address": this.props.state.Hourly_pickupArr[0].address,
                    "pickup_status": 0,
                    "arrive_status": 0,
                    "priority": 0,
                }
            ]
            var drop = [
                {
                    "drop_point": this.props.state.Hourly_dropArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                    "address": this.props.state.Hourly_dropArr[0].address,
                    "drop_status": 0,
                    "priority": 0,
                }
            ]
            AsyncStorage.getItem("id").then((value) => {
                fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "pickupLocation": [
                            pickup[0].address
                        ],
                        "dropoffLocation": [
                            drop[0].address
                        ],
                        "duration": this.props.state.HourlyItem,
                        "service_type": 5,
                        "driver_help": this.state.DriverHelp,
                        "extra_help": this.state.ExtraHelp
                    }),
                }).then((response) => response.json())
                    .then((arr) => {
                        this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr.data });
                        this.setState({ Insurance: buyHelp });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            )
        }

    }
    setDriverHelpImage() {
        if (this.state.DriverHelp) {
            return Constants.Images.customer.check;
        }
        else {
            return Constants.Images.customer.uncheck;
        }
    }

    setExtraHelpImage() {
        if (this.state.ExtraHelp) {
            return Constants.Images.customer.check;
        }
        else {
            return Constants.Images.customer.uncheck;
        }
    }
    setInsuranceImage() {
        if (this.state.Insurance) {
            return Constants.Images.customer.check;
        }
        else {
            return Constants.Images.customer.uncheck;
        }
    }

    onPressInfo(id) {
        this.setState({ isVisible: true });
    }

    checkFlat() {
        var pickup = [];
        var drop = [];
        this.props.state.Hourly_pickupArr.map((val, i) => {

            pickup[i] = val.lat + ',' + val.long;

        });

        this.props.state.Hourly_dropArr.map((val, i) => {

            drop[i] = val.lat + ',' + val.long;

        });
        var pickup = [
            {
                "pickup_point": this.props.state.Hourly_pickupArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                "address": this.props.state.Hourly_pickupArr[0].address,
                "pickup_status": 0,
                "arrive_status": 0,
                "priority": 0,
            }
        ]
        var drop = [
            {
                "drop_point": this.props.state.Hourly_dropArr[0].lat + ',' + this.props.state.Hourly_pickupArr[0].long,
                "address": this.props.state.Hourly_dropArr[0].address,
                "drop_status": 0,
                "priority": 0,
            }
        ]

      
            fetch(CustomerConnection.getTempUrl() + 'place-order/vehiclecalculation', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "pickupLocation": [
                        pickup[0].address
                    ],
                    "dropoffLocation": [
                        drop[0].address
                    ],
                    "duration": this.props.state.HourlyItem,
                    "service_type": 5,
                    "driverHelp": this.state.DriverHelp,
                    "extraHelper": this.state.ExtraHelp
                }),
            }).then((response) => response.json())
                .then((arr) => {
                    console.log("arr in data",arr)
                    this.props.dispatch({ type: 'SET_VEHICLECOST', _data: arr.data });
                    this.props.dispatch({ type: 'SET_HOURLYSERVICE_TABINDEX', index: 1 });
                    showFlat = true
                })
                .catch((error) => {
                    console.error(error);
                });
        
    }


    render() {
        // console.log('pickupArr', this.props.state.Hourly_pickupArr)
        // console.log('pickupArrLen', this.props.state.Hourly_dropArr[0].address)
        //console.log('Hourly_dropArr', this.props.state.Hourly_dropArr)
        if ((this.props.state.Hourly_dropArr[0].address !== 'Choose End Location') && (this.props.state.Hourly_pickupArr[0].address !== 'Choose Start Location') && (showFlat == false)) {
            this.checkFlat()
        }

        const shadowOpt = {
            width: Constants.BaseStyle.DEVICE_WIDTH,
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.6,
            color: "#000",
            border: 3,
            radius: 1,
            opacity: 0.1,
            x: 0,
            y: 2,
            style: { zIndex: 1 }
        };
        const shadowOpt1 = {
            width: Constants.BaseStyle.DEVICE_WIDTH,
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10.6,//16.8,
            color: "#000",
            border: 3,
            radius: 5,
            opacity: 0.1,
            x: 0,
            y: 2,
            style: { zIndex: 1, marginBottom: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100 }
        };
        const shadowOpt2 = {
            width: Constants.BaseStyle.DEVICE_WIDTH,
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 12.2,
            color: "#000",
            border: 3,
            radius: 5,
            opacity: 0.1,
            x: 0,
            y: 2,
            style: { zIndex: 1, marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }
        };
        const { navigate, goBack } = this.props.navigation;

        return (
            <View style={[styles.container, { backgroundColor: Constants.Colors.LightBlue }]}>
                <HeaderBackground navigation={navigate} goBack={goBack} />

                <HourlyServiceHeaderMenu navigation={navigate} />
                <ImageBackground resizeMode='cover' source={require('../../../assets/images/customer/blue.png')} style={{ height: scaleHeight(120) }}>
                    <Text style={{ color: Constants.Colors.LightGray, fontSize: normalizeFont(16), marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginTop: scaleHeight(8) }}>SERVICES</Text>
                    <CheckBoxLabel
                        viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, }}
                        imgsource={this.setDriverHelpImage()}
                        onPress={() => this.onHelpDriverClick()}
                        onPressInfo={() => this.onPressInfo(1)}
                        text={'Help from driver'}
                        isInfoImg={true}
                    />
                    <CheckBoxLabel
                        viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, }}
                        imgsource={this.setExtraHelpImage()}
                        onPress={() => this.onExtraHelperClick()}
                        onPressInfo={() => this.onPressInfo(2)}
                        text={'Extra Helper'}
                        isInfoImg={true}
                    />
                    {/* <CheckBoxLabel
                        viewStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginBottom: scaleHeight(5) }}
                        imgsource={this.setInsuranceImage()}
                        onPress={() => this.onInsuranceClick()}
                        onPressInfo={() => this.onPressInfo(3)}
                        text={'Buy Insurance'}
                        isInfoImg={true}
                    /> */}
                </ImageBackground>
                <View style={{ flex: 1 }}>
                    <MapView_HourlyService navigation={navigate} />
                    <SubmitButton
                        onPress={() => this.CallInvoice()}
                        text={'Next'}
                        style={styles.ButtonStyle}
                        textStyle={styles.ButtonTextStyle}
                    />
                    <View style={{ backgroundColor: Constants.Colors.WhiteSmoke }}>
                        {
                            showFlat ? <View style={{ opacity: 0.8, backgroundColor: Constants.Colors.LightGray }}>
                                <FlatList data={this.props.state.FilteredTransportArray} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
                            </View> : null
                        }
                    </View>


                    <Modal animationType={"fade"} transparent={true} visible={this.props.state.placeModalVisibility} onRequestClose={() => { this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false }) }}>
                        <SearchPlace_Hourly navigation={navigate} dispatch={this.props.navigation} />
                    </Modal>

                    <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
                        <View style={styles.headerColor}>
                            <Text style={styles.headText}>Content</Text>
                            <TouchableOpacity onPress={() => { this.setState({ isVisible: false }) }}>
                                <Image source={Constants.Images.customer.close} style={styles.closeicon} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <Toast
                    ref="toast"
                    style={{ backgroundColor: '#D6511F' }}
                    position='bottom'
                    positionValue={100}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.9}
                    textStyle={{ color: 'white' }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: scaleHeight(20),
        borderRadius: 5,
        backgroundColor: Constants.Colors.DarkBlue,
        borderColor: Constants.Colors.DarkBlue,
    },
    ButtonTextStyle: {
        fontSize: normalizeFont(20),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: Constants.Colors.White,
        textAlign: 'center',
    },
    transportIcons: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 14,
        padding: 0,
    },
    transportLabel: {
        textAlign: 'center',
        marginTop: 0,
        color: '#081933',
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.normal.fontFamily,
    },
    transportCostStyle: {
        textAlign: 'center',
        color: Constants.Colors.DarkGrey,
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.normal.fontFamily,
    },
    textStyle: {
        fontSize: Constants.CustomerFonts.small_13.fontSize,//Constants.CustomerFonts.semibold.fontSize,
        fontFamily: Constants.CustomerFonts.normal.fontFamily,
        marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
        marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
        color: '#5D5D5D',
    },
    inputStyle: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#B1B1B1',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imgSize: {
        //marginTop: 5,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
        marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1,
        //tintColor:Constants.Colors.Blue,
    },
    infoimgSize: {
        //marginTop: 5,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
        //marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
        //tintColor:Constants.Colors.Blue,
    },
    subsubContainer: {
        //bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 17,
        //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
        //opacity: 0.87,
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

    navIcons: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 9,
        marginTop: 3.5,
        //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    },
    settingIcon: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
        marginTop: 3.5,
        //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    },
    horizontalLine: {
        height: 2,
        backgroundColor: '#B1B1B1',
        marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    },
    flexRow: {
        flexDirection: 'row',
        marginTop: 14
    },
    flexCol: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    colIndex: {
        flex: 1,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
        alignItems: 'center',
        justifyContent: 'center',
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
    headerColor: {
        marginTop: scaleHeight(0), height: scaleHeight(60), width: '100%', borderTopRightRadius: scaleWidth(5), backgroundColor: '#EFEDEE', borderTopLeftRadius: scaleWidth(5), marginBottom: scaleHeight(10),
        flexDirection: 'row'
    },
    closeicon: {
        backgroundColor: 'transparent',
        height: scaleHeight(25),
        width: scaleWidth(25),
        marginTop: scaleHeight(18),
        marginLeft: scaleWidth(200),
    },
    headText: {
        marginLeft: scaleWidth(20),
        color: 'grey',
        fontSize: normalizeFont(20),
        width: scaleWidth(80),
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        marginTop: scaleHeight(15)
    },
});
export default connect(state => ({ state: state.CustomerReducer }))(HourlyGetEstimate);
