
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ListView,
    ImageBackground,
    Modal,
    AsyncStorage,
    Alert,
    StatusBar,
    //  Switch,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';
import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
import LinearGradient from 'react-native-linear-gradient';
import ShadowButton from "../../../components/common/ShadowButton";
import HeaderBackgroundWithBackButton from '../../../components/customer/HeaderBackgroundWithBackButton';

import { BoxShadow } from 'react-native-shadow';
export default class testme extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            available: true,
            //modalVisible: true,
            amount: "",
            showList: false,
            amount: "",
            flagCheck: true,
            check1: false,
            check2: false,
            check3: false,
            check4: false
        }
    }

    closeOnSelect = () => {
        this.setState({ modalVisible: false });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    checkPayment = () => {
        const { amount } = this.state;
        if (this.state.check1 == true || this.state.check2 == true || this.state.check3 == true || this.state.check4 == true) {
            this.setState({ amount: 10 })
        } else {
            this.setState({ amount: "" })
        }
        if (amount == "" || amount == null) {
            alert('Please enter tip amount.')
        } else {
            this.props.navigation.navigate("Home_PaymentProceed")
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation;

        return (
            <View style={styles.container}>
                <HeaderBackgroundWithBackButton navigation={navigate} goBack={goBack} headerText={"Driver's Profile"} />
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
                        <View style={{ padding: scaleWidth(20), marginTop: scaleHeight(40) }}>
                            <Text style={[styles.textDecor, { marginBottom: scaleHeight(5) }]}> {'About'}</Text>
                            <Text style={styles.textDecor}>{'However, there are other reasons why about us page is so common in most of the bussiness pages websites why about us.'}</Text>
                            <View style={[styles.horizontalLine]} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[styles.textDecor, { marginLeft: scaleWidth(10) }]}>{'Successful Orders'}</Text>
                                <Text style={[styles.textDecor, { marginRight: scaleWidth(10) }]}>{'Failed Orders'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={[styles.textDecor, { color: Constants.Colors.LightBlue, marginLeft: scaleWidth(70), fontSize: normalizeFont(18) }]}>{'230'}</Text>
                                <Text style={[styles.textDecor, { color: Constants.Colors.Orange, marginLeft: scaleHeight(170), fontSize: normalizeFont(18) }]}>{'230'}</Text>
                            </View>
                            <View style={[styles.horizontalLine, { marginBottom: scaleHeight(14), color: Constants.Colors.LightGray }]} />
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
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View >
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
});



