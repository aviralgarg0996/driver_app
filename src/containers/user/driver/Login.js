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
    KeyboardAvoidingView,
    Button,
    ScrollView,
    Modal,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import FormTextInput from "../../../components/common/FormTextInput";
import SubmitButton from "../../../components/common/FormSubmitButton";
import ForgotPassword from "../../../components/driver/ForgotPassword";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import Regex from '../../../utilities/Regex';
import _ from "lodash";
import OtpVerification from "../../../components/driver/OtpVerification";
import ResetPassword from "../../../components/driver/ResetPassword";
import NewUser from "../../../components/driver/NewUser";
import PhoneVerification from "../../../components/driver/PhoneVerification";
import EmailVerification from "../../../components/driver/EmailVerification";
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin } from 'react-native-google-signin';

import { Icon } from "native-base"
// const FBSDK = require('react-native-fbsdk');
// const {
//     LoginManager, AccessToken, GraphRequestManager, GraphRequest
// } = FBSDK;
const IOS_CLIENT_ID = '332761024235-v5nl0667eblpbm6r8ae00cakamb46d1o.apps.googleusercontent.com';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "",
            // password: "",
            email: "ab.hi.mink02@gmail.com",
            password: "Steve@123456",
            // email: "",
            // password: "",
            // email: "a.vi.ral.garg099.6@gmail.com",
            // password: 'Avi@123456',
            ModalVisible: false,
            deviceToken: props.deviceToken,
        }
    }
    componentDidMount() {
        console.log("AsyncStorage", AsyncStorage.getAllKeys())
    }

    loginUser() {
        let context = this;
        let { dispatch } = this.props.navigation;
        let { email, phone, password } = this.state;
        let { navigate } = this.props.navigation;

        if (_.isEmpty(email && email.trim())) {
            dispatch(ToastActionsCreators.displayInfo('Please enter your email'))
            return;
        }

        if (!Regex.validateEmail(email && email.trim())) {
            //alert(enterValidEmail);
            dispatch(ToastActionsCreators.displayInfo('Enter a valid email'))
            return;
        }

        if (_.isEmpty(password)) {
            //alert(enterPassword);
            dispatch(ToastActionsCreators.displayInfo('Please enter your password'))
            return;
        }
        this.props.UserActions.userLogin({ ...this.state }, (data) => {

            if (data == "CUSTOMER") {
                this.props.navigation.navigate("customerprofile")
            }
            else if(data=='Success')
                this.props.navigation.navigate("Success")
        },  this.props.navigation
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Background style={styles.container}>
                <ScrollView keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps="always" keyboardDismissMode={(Platform.OS === 'ios') ? 'on-drag' : 'interactive'}>
                    <KeyboardAvoidingView behavior={'position'}>
                        <Image source={Constants.Images.user.logo} style={styles.logo} resizeMode={'contain'} />
                        <Text style={styles.text}>Sign in to Your Account</Text>
                        <FormTextInput
                            autoFocus={false}
                            ref='email'
                            placeHolderText='Email'
                            placeHolderColor={Constants.Colors.WhiteUpd}
                            secureText={false}
                            keyboard='email-address'
                            isPassword={false}
                            showPassword={false}
                            onChangeText={(email) => this.setState({ email })}
                            textColor={Constants.Colors.White}

                        />
                        <FormTextInput
                            autoFocus={false}
                            ref='password'
                            placeHolderText='Password'
                            placeHolderColor={Constants.Colors.WhiteUpd}
                            secureText={true}
                            isPassword={false}
                            showPassword={false}
                            onChangeText={(password) => this.setState({ password })}
                            textColor={Constants.Colors.White}
                        />
                        <Text style={[styles.forgotPassword]} onPress={() => { this.props.navigation.dispatch({ type: 'FORGOT_PASSWORD_VISIBILITY', visibility: true }) }}>Forgot Password?</Text>
                        <LinearGradient colors={[Constants.Colors.LightBlue, Constants.Colors.LightBlue]} style={{ width: Constants.BaseStyle.DEVICE_WIDTH, height: Constants.BaseStyle.DEVICE_HEIGHT / 7 }}>

                            <SubmitButton
                                onPress={() => this.loginUser()}
                                text="Sign In"
                            />
                        </LinearGradient>
                    </KeyboardAvoidingView>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>

                        {/* <TouchableOpacity onPress={() => {
                          GoogleSignin.configure({
                            iosClientId: IOS_CLIENT_ID, // only for iOS
                        }).then(() => {
                            // you can now call currentUserAsync()
                            obj.googleSignIn();
                        });
                        }}>
                            <Icon name="logo-google" style={{width: 40, height: 40, margin: 10,color: 'white'}}/>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => {
                            LoginManager.logInWithReadPermissions(['public_profile']).then(
                                function(result) {

                                    if (result.isCancelled) {
                                        Toast.show({
                                            text : "Problem in authenticating with Facebook"
                                        })
                                    } else {
                                        console.log(result);
                                        ///this.updateState({loading: true});
                                        const infoRequest = new GraphRequest(
                                            '/me?fields=id,name,first_name,last_name,email,gender',
                                            null,
                                            (err, result) => {
                                                //this.updateState({loading:true});
                                                // obj.socialSignin({
                                                //     firstName : result.first_name,
                                                //     lastName : result.last_name,
                                                //     username : 'fb_' + result.id,
                                                //     image : '',
                                                //     id : result.id,
                                                //     email : result.email,
                                                //     gender : result.gender,
                                                //     type : 'facebook'
                                                // });
                                                alert("Facebook login Success")
                                            }
                                        );
                                        // Start the graph request.
                                        new GraphRequestManager().addRequest(infoRequest).start();
                                    }
                                },
                                function(error) {
                                    Toast.show({
                                        text : "Problem in authenticating with Facebook"
                                    })
                                }
                            );
                        }}>
                            <Icon name="logo-facebook" style={{width: 40, height: 40, margin: 10,color: 'white'}}/>
                        </TouchableOpacity> */}
                    </View>

                    <Text onPress={() => navigate('Register')} style={styles.register}>
                        {`New User? `}
                        <Text onPress={() => navigate('Register')} style={[styles.register, { color: Constants.Colors.Orange }]}>
                            {`Register here?`}
                        </Text>
                    </Text>
                    {/* <View style={{ flexDirection: "row", alignSelf: "center" }}>
                        <Text onPress={() => alert("terms")} style={[styles.register, { color: Constants.Colors.silverGray }]}>Terms & Conditions</Text>
                        <Text style={[styles.register, { marginHorizontal: 15 }]}>|</Text>
                        <Text onPress={() => alert("privacy")} style={[styles.register, { color: Constants.Colors.silverGray }]}>Privacy Policy</Text>
                    </View> */}
                    {/* <View style={{ alignSelf: "center" }}>
                        <Text style={[styles.register, { color: Constants.Colors.WhiteUpd }]}>All Rights Reserved</Text>
                    </View> */}
                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.ForgotPassModalVisible} onRequestClose={() => { this.props.navigation.dispatch({ type: 'FORGOT_PASSWORD_VISIBILITY', visibility: false }) }}>
                        <ForgotPassword navigation={navigate} dispatch={this.props.navigation} />
                    </Modal>
                    {/* <Modal animationType={"fade"} transparent={true} visible={true} onRequestClose={() => { this.props.dispatch({ type: 'FORGOT_PASSWORD_VISIBILITY', visibility: false }) }}>
                        <AddCourierItems navigation={navigate} dispatch={this.props.navigation} />
                    </Modal> */}
                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.OtpVerificationModalVisible} onRequestClose={() => {
                        this.props.navigation.dispatch({ type: 'OTP_VERIFICATION_VISIBILITY', visibility: false })
                    }}>
                        <OtpVerification navigation={navigate} dispatch={this.props.navigation} />
                    </Modal>

                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.ResetPassModalVisible} onRequestClose={() => { this.props.navigation.dispatch({ type: 'RESET_PASSWORD_VISIBILITY', visibility: false }) }}>
                        <ResetPassword navigation={navigate} dispatch={this.props.navigation} />
                    </Modal>
                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.NewUserModalVisible} onRequestClose={() => { this.props.navigation.dispatch({ type: 'NEWUSER_VISIBILITY', visibility: false }) }}>
                        <NewUser navigation={navigate} dispatch={this.props.navigation} />
                    </Modal>

                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.PhoneVerificationModalVisible}
                    // onRequestClose={() => {this.props.navigation.dispatch({type:'PHONEVERIFICATION_VISIBILITY',visibility:false})}}
                    >
                        <PhoneVerification navigation={navigate} dispatch={this.props.navigation} cb={() => {
                            setTimeout(() => {
                                this.props.navigation.dispatch({ type: 'EMAILVERIFICATION_VISIBILITY', visibility: true })
                            }, 1000);
                        }} />
                    </Modal>
                    <Modal animationType={"fade"} transparent={true} visible={this.props.modalstate.EmailVerificationModalVisible}
                    // onRequestClose={() => {this.props.navigation.dispatch({type:'EMAILVERIFICATION_VISIBILITY',visibility:false})}}
                    >
                        <EmailVerification navigation={navigate} dispatch={this.props.navigation}
                            cb={() => {
                                console.log("abc")
                            }}
                        />
                    </Modal>

                </ScrollView>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 40,
        alignSelf: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: '900',
        backgroundColor: 'transparent',
        color: Constants.Colors.WhiteUpd,
        textAlign: 'center'
    },
    forgotPassword: {
        fontSize: 16,
        fontWeight: '800',
        backgroundColor: 'transparent',
        color: Constants.Colors.silverGray,
        textAlign: 'center',
        alignSelf: 'flex-end',
        // marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1,
        marginRight: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },
    register: {
        fontSize: 16,
        fontWeight: '900',
        backgroundColor: 'transparent',
        color: Constants.Colors.WhiteUpd,
        textAlign: 'center',
        marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2
    },
    flexRow: {
        flexDirection: 'row',
    },
    colIndex: {
        flex: 1,
    },
});
googleSignIn = async () => {
    try {
        const user = await GoogleSignin.signIn();
        console.log(user);
        // obj.socialSignin({
        //     firstName : user.givenName,
        //     lastName : user.familyName,
        //     username : 'gplus_' + user.id,
        //     image : user.photo,
        //     id : user.id,
        //     email : user.email,
        //     gender : '',
        //     type : 'google'
        // });
        alert("Google Success")
    } catch (error) {
        Toast.show({
            text: "Problem in authenticating with Google"
        })
    }
};
const mapStateToProps = state => ({
    modalstate: state.ModalHandleReducer,
    deviceToken: state.user.deviceToken
});

const mapDispatchToProps = dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
