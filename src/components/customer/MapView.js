
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
    ScrollView,
    TouchableOpacity,
    FlatList,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableHighlight,
    Modal,
    KeyboardAvoidingView,
    TimePickerIos,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux';
import Constants from "../../constants";
import CustomerConnection from "../../config/Connection";
import SubmitButton from "../../components/common/FormSubmitButton";
import { ToastActionsCreators } from 'react-native-redux-toast';
import PickUpLocation from './PickUpLocation';
import ServiceCall from '../../redux/modules/RestClient';
import * as AdminActions from '../../redux/modules/adminReducer';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;
import MapOnly from './mapOnly'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";


import moment from 'moment';
var navigate = null;
let wayPoints = [];
let placeModalVisibility = false;
let SET_SERVICEFLAG = undefined
let pickupLength = dropLength = 1;
let ACTIVE_VEHICLE = undefined;
let HourlyServiceDate = undefined;
let HourlyServiceTime = undefined;
let DurationSelected = undefined;
let isVisible_test = false;

class CustomerMapView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            showMap: true,
            VehicleList: [],
            vehicals: [],
            isDateTimePickerVisible: false,

            initialPosition:
            {

                latitude: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.latitude : 0,
                longitude: this.props.locationData.currentLocation != null ? this.props.locationData.currentLocation.coords.longitude : 0,

                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
            initialRegion:
            {
                latitude: 49.2827, longitude: -123.1207,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
            markerPosition: {
                latitude: 28.6139,
                longitude: 77.2090,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },

            TransportArr: [
                {
                    tag: '1', displayimg: Constants.Images.customer.bike, imgsource: Constants.Images.customer.bike,
                    activeimgsource: Constants.Images.customer.active_bike, header: 'Bike', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$10', name: 'bike'
                },
                {
                    tag: '2', displayimg: Constants.Images.customer.small, imgsource: Constants.Images.customer.small,
                    activeimgsource: Constants.Images.customer.active_small, header: 'Small', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$30', name: 'small'
                },
                {
                    tag: '3', displayimg: Constants.Images.customer.medium, imgsource: Constants.Images.customer.medium,
                    activeimgsource: Constants.Images.customer.active_medium, header: 'Medium', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$40', name: 'medium'
                },
                {
                    tag: '7', displayimg: Constants.Images.customer.truck_fridge, imgsource: Constants.Images.customer.truck_fridge,
                    activeimgsource: Constants.Images.customer.active_truck_fridge, header: 'FridgeTruck', backgroundColor: 'transparent', borderBottomWidth: 0, borderBottomColor: 'transparent', cost: '$60', name: 'fridge'
                }
            ],
            isVisible: false,
            selectedItem: 4,
            durationTime: ['3 hours', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours', '9 hours', '10 hours', '11 hours', '12 hours', '13 hours', '14 hours', '15 hours', '16 hours', '17 hours', '18 hours',
                '19 hours', '20 hours', '21 hours', '22 hours', '23 hours', '24 hours'],
        }

        this.initialPosition = this.state.initialPosition;
        this.markerPosition = this.state.markerPosition;

    }


    searchPlace(_flag) {
        let dropAddress = this.props.state.dropArr;
        AsyncStorage.setItem("DropOff", JSON.stringify(dropAddress))
        let PickUpAddress = this.props.state.pickupArr;
        AsyncStorage.setItem("PickUp", JSON.stringify(PickUpAddress))
        var lendrop = this.props.state.dropArr.length - 1;
        var lenpick = this.props.state.pickupArr.length - 1;
        var addFlag = true;
        if (_flag == 1)//pickup
        {
            if (lenpick > 1) {
                if (lenpick == 3) {
                    addFlag = false;
                }
                else if (lendrop == 1 && lenpick == 3) {
                    addFlag = false;
                }
            }
            else if (lendrop > 1 && lenpick == 1) {
                addFlag = false;
            }
        }
        else if (_flag == 2) {
            if (lendrop > 1) {
                if (lendrop == 3) {
                    addFlag = false;
                }
                else if (lenpick == 1 && lendrop == 3) {
                    addFlag = false;
                }
            }
            else if (lendrop == 1 && lenpick > 1) {
                addFlag = false;
            }
        }
        if (addFlag) {
            this.props.dispatch({ type: 'SETPICKDROPFLAG', flag: _flag });
            this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: true });
        }
        else if (lendrop == 3 || lenpick == 3) {
            this.props.dispatch(ToastActionsCreators.displayInfo('You can enter max 3 pickup/drop locations.'));
            this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
        }
        else {
            this.props.dispatch(ToastActionsCreators.displayInfo('You can enter multiple locations either for Pickups or for Drops.'));
            this.props.dispatch({ type: 'PLACE_FINDER_MODAL', visibility: false });
        }
    }

    vehicalList(item) {
        return (
            <View key={1} style={[{ backgroundColor: Constants.Colors.WhiteSmoke, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9.8, width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 25 }]}>
                <TouchableOpacity key={2} onPress={() => { this.setActiveTransport(item.tag) }}>
                    <View key={3} style={{ alignItems: 'center', backgroundColor: item.backgroundColor, borderBottomColor: item.borderBottomColor, borderBottomWidth: item.borderBottomWidth }}>
                        <Image key={4} source={item.displayimg} style={[styles.transportIcons, { alignItems: 'center' }]} resizeMode={'contain'} />
                        <Text key={5} style={[styles.transportLabel]}>{item.header}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });
    setActiveTransport(id) {
        if (this.props.state.AddressCount > 0 || this.props.HourlyFlag != 0)
            this.props.dispatch({ type: 'ACTIVE_VEHICLE', tagid: id });
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _showTimePicker = () => this.setState({ isTimePickerVisible: true });
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {

        //date = new Date(this.props.state.HourlyServiceDate)
        var strDate = moment(date).format('DD/MM/YYYY');
        this.props.dispatch({ type: 'SET_HOUR', displayDate: strDate });
        this._hideDateTimePicker();
    };

    _handleTimePicked = (time) => {
        var strDate = moment(time).format('hh:mm A');
        this.props.dispatch({ type: 'SET_TIME', displayTime: strDate });
        this._hideTimePicker();
    }




    CallDatePicker() {
        if (Platform.OS === 'android') {
            DatePickerAndroid.open({
                date: new Date(this.props.state.HourlyServiceDate),
                minDate: new Date(),
            }).then(({ action, year, month, day }) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    var ss = new Date(year, month, day);
                    var strDate = moment(ss).format('DD/MM/YYYY');
                    this.props.dispatch({ type: 'SET_HOUR', displayDate: strDate, date: new Date(year, month, day) });
                }
            });
        }
    }

    CallTimePicker() {
        //let context = this;
        var timeMoment = moment(this.props.state.HourlyServiceTime);
        TimePickerAndroid.open({
            hour: timeMoment.hour(),
            minute: timeMoment.minutes(),
            is24Hour: false,
        }).then(({ action, hour, minute, pm }) => {
            if (action !== DatePickerAndroid.dismissedAction) {
                var ss = moment().hour(hour).minute(minute).toDate();
                var strDate = moment(ss).format('hh:mm A');

                this.props.dispatch({ type: 'SET_TIME', displayTime: strDate, time: moment().hour(hour).minute(minute).toDate() });
            }
        });
    }

    setDurationTime() {

        this.props.dispatch({ type: 'SET_DURATION', displayDuration: this.state.durationTime[this.state.selectedItem], displayItem: [this.state.selectedItem] });
        this.setState({ isVisible: false });
    }

    componentWillMount() {
        this.setState({ showMap: true })
    }

    clickOnEstimate() {
        //let { dispatch } = this.props.navigation;
        if (this.props.state.pickupArr.length < 2 && this.props.state.HourlyFlag == 0) {
            this.props.dispatch(ToastActionsCreators.displayInfo('Please enter Pickup Location..'));
        }
        else if (this.props.state.pickupArr.length < 3 && this.props.state.dropArr.length < 2 && this.props.state.HourlyFlag == 0) {
            this.props.dispatch(ToastActionsCreators.displayInfo('Please enter Drop Location..'));

        }
        else if (this.props.state.DeliveryServiceOpacity == 0.8 && this.props.state.HourlyFlag == 0) {
            AdminActions.Get_Admin_Data('/admin/getservice', {}, 'admin').then((res) => {
                this.props.dispatch({ type: 'SET_DETAILS_CATEGORY', data: res.data })
                this.props.dispatch({ type: 'SET_TABINDEX', index: 1 });
                navigate('Home_Food');
           
                this.setState({ showMap: false })
                this.props.dispatch({ type: 'SET_SELECTED_FLAG', selectedTabFlag: 1 });
            });
            return;
        } else if (this.props.state.HourlyServiceCount == 3 && this.props.state.HourlyFlag == 1) {
            navigate('HourlyGetEstimate');
        }
        // else
        // {
        //     this.props.dispatch(ToastActionsCreators.displayInfo('Please fill required details..'));
        // }
    }

    onPickerSelect(index) {
        //this.props.dispatch({type:'SET_DURATION', displayDuration : this.state.durationTime[index]});
        this.setState({ selectedItem: index });
    }



    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    shouldComponentUpdate(currentProp, nextProp) {
        if (this.state.isVisible != isVisible_test) {
            isVisible_test = this.state.isVisible;
            return true;
        }
        if (!HourlyServiceDate)
            HourlyServiceDate = currentProp.state.HourlyServiceDate;
        if (!HourlyServiceTime)
            HourlyServiceTime = currentProp.state.HourlyServiceDisplayTime;
        if (!DurationSelected)
            DurationSelected = currentProp.state.HourlyServiceDuration;
        if (currentProp.state.HourlyServiceDate != HourlyServiceDate
            || currentProp.state.HourlyServiceDisplayTime != HourlyServiceTime
            || currentProp.state.HourlyServiceDuration != DurationSelected) {
            HourlyServiceDate = currentProp.state.HourlyServiceDate;
            HourlyServiceTime = currentProp.state.HourlyServiceDisplayTime;
            DurationSelected = currentProp.state.HourlyServiceDuration;
            return true;
        }
        HourlyServiceDate = currentProp.state.HourlyServiceDate;
        HourlyServiceTime = currentProp.state.HourlyServiceDisplayTime;
        DurationSelected = currentProp.state.HourlyServiceDuration;
        if (currentProp.state.placeModalVisibility != placeModalVisibility) {
            placeModalVisibility = currentProp.state.placeModalVisibility;
            return true
        }

        if (currentProp.state.placeModalVisibility != placeModalVisibility) {
            placeModalVisibility = currentProp.state.placeModalVisibility;
            return true
        }

        if (SET_SERVICEFLAG == undefined)
            SET_SERVICEFLAG = currentProp.state.HourlyFlag;



        if (currentProp.state.HourlyFlag != SET_SERVICEFLAG) {
            SET_SERVICEFLAG = currentProp.state.HourlyFlag;
            return true;
        }


        if (currentProp.state.pickupArr.length < pickupLength ||
            currentProp.state.dropArr.length < dropLength) {
            pickupLength = currentProp.state.pickupArr.length;
            dropLength = currentProp.state.dropArr.length;
            return true;
        }

        if (!ACTIVE_VEHICLE == undefined)
            ACTIVE_VEHICLE = currentProp.state.vehicleID;

        if (ACTIVE_VEHICLE != currentProp.state.vehicleID) {
            ACTIVE_VEHICLE = currentProp.vehicleID
            return true;
        }

        ACTIVE_VEHICLE = currentProp.state.vehicleID
        pickupLength = currentProp.state.pickupArr.length;
        dropLength = currentProp.state.dropArr.length;
        SET_SERVICEFLAG = currentProp.state.HourlyFlag;
        placeModalVisibility = currentProp.state.placeModalVisibility;
        return false;
    }
    render() {
        navigate = this.props.navigation;
        goBack = this.props.navigation;
        wayPoints = [];
        this.props.state.markerPositions.map((marker, i) => {
            if (marker.title != '') {
                newRegion = marker.coordinates;
                wayPoints.push(marker.coordinates);
            }
        });
        if (wayPoints.length > 0) {
            origin = wayPoints[0];
            destination = [wayPoints.length - 1];
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.rootContainer]}>
                    {/* {(this.props.locationData.showmap.customerprofile
                        || this.props.locationData.showmap.CustomerHomeNewx
                    ) &&*/
                        <MapOnly /> }
                    }
                    <View style={{
                        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
                        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7.2,
                        bottom: this.props.HourlyFlag === 0 ? Constants.BaseStyle.DEVICE_HEIGHT / 100 * 27 : Constants.BaseStyle.DEVICE_HEIGHT / 100 * 27,
                        marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
                    }}>
                        {
                            Platform.OS === 'android' ?
                                <SubmitButton
                                    onPress={() => this.clickOnEstimate()}
                                    text="Continue"
                                /> : <TouchableOpacity activeOpacity={.5} style={styles.buttonView} onPress={() => this.clickOnEstimate()}>
                                    <Text style={styles.buttonTextView}>{'Continue'}</Text>
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={[styles.subsubContainer, { opacity: 0.8 }]}>
                        <FlatList data={this.props.state.TransportArr} renderItem={({ item }) => this.vehicalList(item)} horizontal={true} />
                    </View>
                    {this.props.HourlyFlag === 0 ?
                        <View style={{
                            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80,
                            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6.4 * this.props.state.pickUpControlCount,
                            bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 85,
                            marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
                        }}
                        >
                            <View style={[styles.ButtonPickupStyle, { backgroundColor: '#ffffff', borderColor: '#ffffff' }]}>
                                <PickUpLocation
                                    onChangeText={() => this.searchPlace(1)}
                                    onPress={() => this.searchPlace(1)}
                                    PickDropFlag={1}
                                    list={this.props.state.pickupArr}
                                />
                                <View style={[styles.horizontalLine, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10 }]} />
                                <PickUpLocation
                                    onChangeText={() => this.searchPlace(2)}
                                    onPress={() => this.searchPlace(2)}
                                    PickDropFlag={2}
                                    list={this.props.state.dropArr}
                                    tintColor={[{ tintColor: '#F58436' }]}
                                />
                            </View>
                        </View>
                        : <View
                            style={{
                                width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 95,
                                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 20.5,
                                bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 91,
                                marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2
                            }}
                        >
                            <View style={[styles.ButtonPickupStyle, { opacity: 0.8/*this.props.state.DeliveryServiceOpacity*/, backgroundColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/, borderColor: '#ffffff'/*this.props.state.EstimateButtonBackgroundColor*/ }]}>
                                {
                                    Platform.OS === 'android' ? <TouchableOpacity onPress={() => this.CallDatePicker()}>
                                        <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                                            <Image source={Constants.Images.customer.calendar} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                                            <Text style={styles.HourlyTextStyle}>
                                                {'Date'}
                                            </Text>
                                            <Text style={[styles.HourlyRightText]}>
                                                {this.props.state.HourlyServiceDisplayDate}
                                            </Text>
                                        </View>
                                    </TouchableOpacity> : <TouchableOpacity onPress={this._showDateTimePicker}>
                                            <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                                                <Image source={Constants.Images.customer.calendar} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                                                <Text style={styles.HourlyTextStyle}>
                                                    {'Date'}
                                                </Text>
                                                <Text style={[styles.HourlyRightText]}>
                                                    {this.props.state.HourlyServiceDisplayDate}
                                                </Text>
                                            </View>
                                            <DateTimePicker
                                                isVisible={this.state.isDateTimePickerVisible}
                                                onConfirm={this._handleDatePicked}
                                                onCancel={this._hideDateTimePicker}
                                            />
                                        </TouchableOpacity>
                                }

                                <View style={[styles.horizontalLine]} />
                                {
                                    Platform.OS === 'android' ? <TouchableOpacity onPress={() => this.CallTimePicker()}>
                                        <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                                            <Image source={Constants.Images.customer.clock} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                                            <Text style={styles.HourlyTextStyle}>
                                                {'Start Time'}
                                            </Text>
                                            <Text style={[styles.HourlyRightText]}>
                                                {this.props.state.HourlyServiceDisplayTime}
                                            </Text>
                                        </View>
                                    </TouchableOpacity> : <TouchableOpacity onPress={this._showTimePicker}>
                                            <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                                                <Image source={Constants.Images.customer.clock} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                                                <Text style={styles.HourlyTextStyle}>
                                                    {'Start Time'}
                                                </Text>
                                                <Text style={[styles.HourlyRightText]}>
                                                    {this.props.state.HourlyServiceDisplayTime}
                                                </Text>
                                            </View>
                                            <DateTimePicker
                                                isVisible={this.state.isTimePickerVisible}
                                                onConfirm={this._handleTimePicked}
                                                onCancel={this._hideTimePicker}
                                                mode='time'
                                            />
                                        </TouchableOpacity>
                                }
                                <View style={[styles.horizontalLine]} />
                                <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                                    <View style={[styles.flexRow, { marginTop: 5, marginBottom: 5, alignItems: 'center' }]}>
                                        <Image source={Constants.Images.customer.duration} style={[styles.pickupIcons, { flex: 0.2 }]} resizeMode={'contain'} />
                                        <Text style={styles.HourlyTextStyle}>
                                            {'Duration'}
                                        </Text>
                                        <Text style={[styles.HourlyRightText]}>
                                            {this.props.state.HourlyServiceDisplayDuration}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.horizontalLine, { height: 0 }]} />
                            </View>
                        </View>
                    }

                </View>

                <Modal animationType={"fade"} transparent={true} visible={this.state.isVisible} onRequestClose={() => { this.setState({ isVisible: false }) }}>
                    <View style={[styles.modalOuter]}>
                        <View style={[styles.modalInner, { width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 80, borderRadius: 5, padding: 0 }]}>
                            <View style={[styles.flexRow, { borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Constants.Colors.DarkBlue, borderBottomWidth: 1, borderBottomColor: Constants.Colors.DarkBlue, justifyContent: 'center', alignItems: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7, }]}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 }}>
                                    <Text style={{ color: Constants.Colors.White, fontFamily: Constants.CustomerFonts.semibold.fontFamily, fontSize: Constants.CustomerFonts.semibold.fontSize }}>{'Set Duration'}</Text>
                                </View>
                                <View style={[styles.flexRow, { justifyContent: 'flex-end' }]}>
                                    <TouchableOpacity style={[styles.btCloseModal]} onPress={() => { this.setState({ isVisible: false }) }}>
                                        <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <View style={{ justifyContent: 'center', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40, marginBottom: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100, }}>
                                    <Picker style={{ marginLeft: scaleWidth(100), width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 30, height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25 }}
                                        selectedValue={this.state.selectedItem}
                                        itemStyle={{ color: Constants.Colors.DarkGrey, fontSize: 17, fontWeight: 'bold', }}
                                        onValueChange={(index) => this.onPickerSelect(index)}>
                                        {this.state.durationTime.map((value, i) => (
                                            <PickerItem label={value} value={i} key={"money" + value} />
                                        ))}
                                    </Picker>
                                    <TouchableOpacity activeOpacity={0.5} style={[styles.OKButtonStyle]} onPress={() => this.setDurationTime()}>
                                        <Text style={[styles.OKButtonTextStyle]}>
                                            {'OK'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 75,
    },
    subsubContainer: {
        bottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 19,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    },
    ButtonPickupStyle: {
        borderWidth: 1,
        borderRadius: 5,
    },
    horizontalLine: {
        height: 2,
        backgroundColor: '#D7D7D7',
        marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
        marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    },
    ButtonStyle: {
        padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
        marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
        marginBottom: 10,
        marginTop: 0,//10,
        marginLeft: 0,//10,
        marginRight: 0,//10,
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
        marginBottom: 3,
        marginTop: 20,//10,
        marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
        marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 20,//10,
        borderRadius: 30,
        backgroundColor: Constants.Colors.DarkBlue,//Constants.Colors.White,
        borderColor: Constants.Colors.DarkBlue,//Constants.Colors.White,
    },
    OKButtonTextStyle: {
        fontSize: Constants.CustomerFonts.semibold.fontSize,
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: Constants.Colors.WhiteUpd,//'#53C8E5',
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
    vanCss: {
        alignItems: 'center',
    },
    buttonView: {
        width: '90%',
        alignSelf: 'center',
        height: scaleHeight(50),
        borderRadius: scaleHeight(3),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(35),
        backgroundColor: Constants.Colors.DarkBlue,
        shadowColor: Constants.Colors.SkyBlue,
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(2),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    buttonTextView: {
        color: Constants.Colors.White,
        fontWeight: '600',
        backgroundColor: 'transparent',
        fontSize: normalizeFont(20),
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
    },
});




const mapStateToProps = state => ({
    state: state.CustomerReducer,
    locationData: state.location
});




export default connect(mapStateToProps, null)(CustomerMapView);