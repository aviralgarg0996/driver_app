'use strict';
import {
    Platform,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import _ from "underscore";
import {
    startLoading,
    stopLoading,
    showToast,
    hideToast
} from './app';
import {
    goBack,
    reset
} from './nav';
import {
    setDetails,
    setCurrentUser
} from './location';
import RestClient from '../../utilities/RestClient';
import {
    ToastActionsCreators
} from 'react-native-redux-toast';
//import { destroySocketClient } from '../../utilities/SocketClient';
import {
    cancelAllLocalNotifications
} from '../../utilities/PushNotification';
import axios from "axios";

// Actions
export const REGISTER_NEW_USER = "REGISTER_NEW_USER";
export const PHONE_VERIFICATION = "PHONE_VERIFICATION";
export const USER_LOGIN = "USER_LOGIN";
export const LOG_OUT = "LOGOUT";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const OTP_VERIFY = "OTP_VERIFY";
export const CONSUMER_SIGNUP_PHONE = "CONSUMER_SIGNUP_PHONE";
export const DEVICE_TOKEN = "DEVICE_TOKEN";
export const GET_DRIVER_DATA = "GET_DRIVER_DATA";
export const GET_DRIVER_DATA_STATUS = "GET_DRIVER_DATA_STATUS";

export const NAVIGATE_TO_DRIVER_FORM = "NAVIGATE_TO_DRIVER_FORM";
export const DRIVER_AVAILABILITY_STATUS = "DRIVER_AVAILABILITY_STATUS";
export const DRIVER_FORM_NAV = "DRIVER_FORM_NAV";
export const CITIES_LIST = "CITIES_LIST";
export const CERTIFICATES_LIST = "CERTIFICATES_LIST";
export const EXPERIENCETYPE_LIST = "EXPERIENCETYPE_LIST";
export const VEHICLETYPE_LIST = "VEHICLETYPE_LIST";
export const VEHICLECOMPANY_LIST = "VEHICLECOMPANY_LIST";
export const VEHICLEMODAL_LIST = "VEHICLEMODAL_LIST";
export const SET_ORDERED_DATA = "SET_ORDERED_DATA";


// Action Creators
export const CONSUMER_SIGNUP = (data) => ({
    type: REGISTER_NEW_USER,
    data
});
export const VERIFY_PHONE = (data) => ({
    type: PHONE_VERIFICATION,
    data
});
export const LOGIN = (data) => ({
    type: USER_LOGIN,
    data
});
export const LOG_OUT_SUCCESS = () => ({
    type: LOG_OUT
});
export const FORGOT_PASSWORD_SUCCESS = (data) => ({
    type: FORGOT_PASSWORD,
    data
});
export const OTP_VERIFY_SUCCESS = (data) => ({
    type: OTP_VERIFY,
    data
});
export const CONSUMER_SIGNUP_PHONE_VERICATION = (data) => ({
    type: CONSUMER_SIGNUP_PHONE,
    data
});
export const setDeviceToken = (data) => ({
    type: DEVICE_TOKEN,
    data
});
export const GET_DRIVER = (data) => ({
    type: GET_DRIVER_DATA,
    data
});
export const GET_DRIVER_STATUS = (data) => ({
    type: GET_DRIVER_DATA_STATUS,
    data
});
export const NAVIGATE_DRIVER_FORM = (data) => ({
    type: NAVIGATE_TO_DRIVER_FORM,
    data
});
export const DRIVER_AVAILABILITY = (data) => ({
    type: DRIVER_AVAILABILITY_STATUS,
    data
});
export const DRIVER_FORM_NAVIGATION = (data) => ({
    type: DRIVER_FORM_NAV,
    data
});
export const GET_CITIES_LIST = (data) => ({
    type: CITIES_LIST,
    data
});
export const GET_CERTIFICATES_LIST = (data) => ({
    type: CERTIFICATES_LIST,
    data
});
export const GET_EXPERIENCETYPE_LIST = (data) => ({
    type: EXPERIENCETYPE_LIST,
    data
});
export const GET_VEHICLETYPE_LIST = (data) => ({
    type: VEHICLETYPE_LIST,
    data
});
export const GET_VEHICLECOMPANY_LIST = (data) => ({
    type: VEHICLECOMPANY_LIST,
    data
});
export const GET_VEHICLEMODAL_LIST = (data) => ({
    type: VEHICLEMODAL_LIST,
    data
});

//perform api's related to user

/**
 * Signup API.
 */
export const consumerSignup = (data, nav) => {
    //console.log('data ********* ',data)
    let agreeTerms;
    if (data.termsAndConditions) {
        agreeTerms = 'agree'
    }
    let requestObject = {
        email: data.email && data.email.trim(),
        //password  : data.password.value,
        password: data.password && data.password.value && data.password.value.trim(),
        phone: data.phone && data.phone.trim(),
        agree: agreeTerms,
        deviceToken: data.deviceToken,
        role: data.role
    }
    let deviceDetails = {
        deviceType: Platform.OS === "ios" ? "ios" : "android",
        deviceToken: data.deviceToken,
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/", requestObject).then((result) => {
            console.log('result signup ******* ', result)
            if (result.status == 1) {
                AsyncStorage.setItem("token", result.token)
                console.log("token", result.token)
                dispatch(stopLoading());
                if (result.data.emailVerified == 0 && result.data.phoneVerified == 0) {
                    dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({
                        phone: result.data.phone,
                        email: result.data.email
                    }));

                    if (result.data.phoneVerified == 0) {
                        dispatch({
                            type: 'PHONEVERIFICATION_VISIBILITY',
                            visibility: true
                        })
                    } else if (result.data.emailVerified == 0) {
                        dispatch({
                            type: 'EMAILVERIFICATION_VISIBILITY',
                            visibility: true
                        })
                    }

                } else if (result.data.emailVerified == 0) {
                    dispatch({
                        type: 'EMAILVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else if (result.data.phoneVerified == 0) {
                    dispatch({
                        type: 'PHONEVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else if (result.data) {
                    if (result.data.role == "CUSTOMER") {
                        nav("CUSTOMER")
                    }
                    else {
                        if (result.data.multiRole[0].status == false) {
                            if (result.data.currentstatuss == 'active') {
                                nav();
                                return;
                            } else
                                dispatch(DRIVER_FORM_NAVIGATION(result))
                        } else {
                            if (result.data.driverStatus == 'pending') {
                                dispatch({
                                    type: 'FORMSUBMIT_VISIBILITY',
                                    visibility: true
                                })
                            }
                            dispatch(LOGIN(result));
                        }
                    }
                } else {
                    dispatch(stopLoading());
                    dispatch(ToastActionsCreators.displayInfo(result.message));
                }
            } else {
                dispatch(stopLoading());
                dispatch(ToastActionsCreators.displayInfo(result.message));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};






export const setUserIdOnLcoation = (item) => {
    return dispatch => {

        setCurrentUser(item);
        console.log(JSON.stringify(item));
    }
}

/**
 * Phone Verification API.
 */
export const phoneVerification = (data, nav) => {
    //console.log('data ********* ',data)
    let requestObject = {
        phone: data.phone,
        phoneOtp: data.code
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/phoneOtpMatch", requestObject).then((result) => {
            console.log('result signup ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                dispatch({
                    type: 'PHONEVERIFICATION_VISIBILITY',
                    visibility: false
                })
                if (result.data && result.data.emailVerified == 0) {
                    dispatch({
                        type: 'EMAILVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else if (result.data && result.data.emailVerified == 1) {
                    if (result.data.role == "CUSTOMER") {
                        nav("CUSTOMER")
                    }
                    else {
                        console.log('inside email Verification  done ********* ', result.data.phone)
                        ch({
                            type: 'NEWUSER_VISIBILITY',
                            visibility: true,
                            token: result.token
                        })
                        dispatch(NAVIGATE_DRIVER_FORM(result))
                    }
                } else
                    dispatch({
                        type: 'EMAILVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                //dispatch(ToastActionsCreators.displayInfo(result.message));
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};

/**
 * Phone resend API.
 */
export const resendPhoneApi = (data) => {
    //console.log('data ********* ',data)
    let requestObject = {
        phone: data,
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/phoneResendRegistration", requestObject).then((result) => {
            console.log('result resend ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                alert(result.message);
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};

/**
 * Email Verification API.
 */
export const emailVerification = (data, nav) => {
    //console.log('data ********* ',data)
    let requestObject = {
        emailOtp: data.code,
        email: data.email && data.email.trim()
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/emailOtpMatch", requestObject).then((result) => {
            console.log('result email verify ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                dispatch({
                    type: 'EMAILVERIFICATION_VISIBILITY',
                    visibility: false
                })
                if (result.data.phoneVerified == 0) {
                    console.log('inside phone Verification not done ********* ', result.data.phone)
                    dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({
                        phone: result.data.phone,
                        email: result.data.email
                    }));
                    dispatch({
                        type: 'PHONEVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else {
                    if (result.data.role == "CUSTOMER") {
                        nav("CUSTOMER")
                    }
                    else {
                        dispatch({
                            type: 'NEWUSER_VISIBILITY',
                            visibility: true,
                            token: result.token
                        })
                        dispatch(NAVIGATE_DRIVER_FORM(result))
                    }
                }
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};

/**
 * Resend Email API.
 */
export const resendEmailApi = (data) => {
    //console.log('data ********* ',data)
    let requestObject = {
        email: data
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/emailResendRegistration", requestObject).then((result) => {
            //console.log('result email verify ******* ',result)
            if (result.status == 1) {
                dispatch(stopLoading());
                alert(result.message);
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};

/**
 * Login API.
 */
export const userLogin = (data, nav) => {
    let requestObject = {
        email: data.email && data.email.trim(),
        password: data.password && data.password.trim(),
        deviceToken: data.deviceToken,
    }

    return dispatch => {

        dispatch(startLoading());
        RestClient.post("users/login", requestObject).then((result) => {
            console.log('result login ******* ', result)


            if (result.status == 1) {
                AsyncStorage.setItem("token", result.token)
                AsyncStorage.setItem("email", result.data && result.data.email)
                AsyncStorage.setItem("first_name", result.data && result.data.firstName)
                AsyncStorage.setItem("last_name", result.data && result.data.lastName)
                AsyncStorage.setItem("id", result.data && result.data._id)
                AsyncStorage.setItem("profilePic", result.data.profile)
                dispatch(stopLoading());
                if (result.data.emailVerified == 0 && result.data.phoneVerified == 0) {
                    dispatch(CONSUMER_SIGNUP_PHONE_VERICATION({
                        phone: result.data.phone,
                        email: result.data.email
                    }));
                    if (result.data.phoneVerified == 0) {
                        dispatch({
                            type: 'PHONEVERIFICATION_VISIBILITY',
                            visibility: true
                        })
                    } else if (result.data.emailVerified == 0) {
                        dispatch({
                            type: 'EMAILVERIFICATION_VISIBILITY',
                            visibility: true
                        })
                    }
                } else if (result.data.emailVerified == 0) {
                    dispatch({
                        type: 'EMAILVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else if (result.data.phoneVerified == 0) {
                    dispatch({
                        type: 'PHONEVERIFICATION_VISIBILITY',
                        visibility: true
                    })
                } else if (result.data) {
                    if (result.data.role == "CUSTOMER") {
                        nav("CUSTOMER")
                    }
                    else {
                        if (result.data.multiRole[0].status == false) {
                            //alert('1')
                            if (result.data.currentstatuss == 'active') {

                                nav("DRIVER");
                                return;
                            } else
                                //dispatch(DRIVER_FORM_NAVIGATION(result))
                                dispatch(NAVIGATE_DRIVER_FORM(result))
                        } else {
                            if (result.data.driverStatus == 'pending') {
                                dispatch({
                                    type: 'FORMSUBMIT_VISIBILITY',
                                    visibility: true
                                })
                            }
                            dispatch(LOGIN(result));
                        }
                    }
                }
            } else {
                dispatch(stopLoading());
                ToastAndroid.show(result.message, ToastAndroid.LONG);
                // dispatch(ToastActionsCreators.displayInfo(result.message),2000);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};
/**
 * Driver Profile page one API.
 */
export const userDriverMediateForm = (data) => {
    console.log('data ********* ', data)
    let body = new FormData();
    if (data.profilePic && data.profilePic.fileName) {
        body.append('profilePic', {
            uri: data.profilePic.path,
            name: data.profilePic.fileName,
            filename: data.profilePic.fileName,
            type: data.profilePic.mime
        });
    } else {
        body.append('profilePic', data.profilePic)
    }

    var exp = [];
    data.expImg.forEach(element => {
        if (data.profilePic && data.profilePic.fileName) {
            //	exp.push({uri: element.uri, name: element.fileName, filename: element.fileName, type: element.type});
            body.append("experiencePic", {
                uri: element.uri,
                name: element.fileName,
                filename: element.fileName,
                type: element.type
            })
        } else {
            body.append("experiencePic", element)
        }

    });
    body.append('licenseNo', data.licenceNumber && data.licenceNumber.trim());
    body.append('licenceDate', data.licenceIssueDate);
    body.append('dob', data.birthDate);
    body.append('gender', data.gender);
    body.append('ssn', data.sinNumber && data.sinNumber.trim());
    body.append('address', data.address && data.address.trim());
    body.append('about', data.aboutYou && data.aboutYou.trim());
    body.append('page', "1");
    var arr1 = [];
    for (var key in data.Experience) {
        if (data.Experience[key].title && data.Experience[key].duration)
            arr1.push({
                type: data.Experience[key].title,
                duration: data.Experience[key].duration
            });
    }
    body.append('experiences', JSON.stringify(arr1));
    body.append('firstName', data.firstName && data.firstName.trim());
    body.append('lastName', data.lastName && data.lastName.trim());
    body.append('role', "DRIVER");
    body.append('lat', "45.63");
    body.append('lng', "52.36");
    body.append("licenceExpDate", data.licenceExpiryDate)
    body.append('cities', JSON.stringify(data.selectedItems));
    var arr1 = [];
    let certificateArray = [];
    for (var key in data.selectedExperienceItems) {
        console.log("selectedExp", key)
        if (data.selectedExperienceItems[key])
            certificateArray.push({
                title: data.selectedExperienceItems[key],
                isSelected: true
            });
    }
    body.append('certificates', JSON.stringify(certificateArray));
    ////body.append('cities', data.locationServe);
    console.log('data body  ********* ', body)


    return dispatch => {
        return new Promise(function (fulfill, reject) {
            let userToken = ""
            AsyncStorage.getItem("token").then((tokenValue) => {
                userToken = tokenValue;
                console.log("tokenvalue---->", tokenValue)
                dispatch(startLoading());
                RestClient.imageUpload("users/saveuserinfo", body, tokenValue).then((result) => {
                    console.log('result profile ******* ', result)

                    if (result.status == 1) {
                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
                        fulfill(result);
                        // dispatch(ToastActionsCreators.displayInfo(result.message));
                    } else {

                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo(result.message));
                    }
                }).catch(error => {
                    console.log("error=> ", error)
                    dispatch(stopLoading());
                });
            })
        })
    }
};


//Customer Form Data Save

export const customerDataForm = (data) => {
    console.log('data ********* ', data)
    let body = new FormData();

    body.append('dob', data.birthDate);
    body.append('gender', data.gender);
    body.append('address', data.address && data.address.trim());
    body.append('about', data.aboutYou && data.aboutYou.trim());
    body.append('page', "1");
    body.append('firstName', data.firstName && data.firstName.trim());
    body.append('lastName', data.lastName && data.lastName.trim());
    body.append('role', "CUSTOMER");


    return dispatch => {
        return new Promise(function (fulfill, reject) {
            let userToken = ""
            AsyncStorage.getItem("token").then((tokenValue) => {
                userToken = tokenValue;
                console.log("tokenvalue---->", tokenValue)
                dispatch(startLoading());
                RestClient.imageUpload("users/profile", body, tokenValue).then((result) => {
                    console.log('result profile ******* ', result)

                    if (result.status == 1) {
                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
                        fulfill(result);
                        // dispatch(ToastActionsCreators.displayInfo(result.message));
                    } else {

                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo(result.message));
                    }
                }).catch(error => {
                    console.log("error=> ", error)
                    dispatch(stopLoading());
                });
            })
        })
    }
};

export const userDriverForm = (data) => {
    console.log('data ********* ', data)
    let body = new FormData();
    if (data.profilePic && data.profilePic.fileName) {
        body.append('profilePic', {
            uri: data.profilePic.path,
            name: data.profilePic.fileName,
            filename: data.profilePic.fileName,
            type: data.profilePic.mime
        });
    } else {
        body.append('profilePic', data.profilePic)
    }

    var exp = [];
    data.expImg.forEach(element => {
        if (data.profilePic && data.profilePic.fileName) {
            //	exp.push({uri: element.uri, name: element.fileName, filename: element.fileName, type: element.type});
            body.append("experiencePic", {
                uri: element.uri,
                name: element.fileName,
                filename: element.fileName,
                type: element.type
            })
        } else {
            body.append("experiencePic", element);
        }

    });
    body.append('licenseNo', data.licenceNumber && data.licenceNumber.trim());
    body.append('licenceDate', data.licenceIssueDate);
    body.append('dob', data.birthDate);
    body.append('gender', data.gender);
    body.append('ssn', data.sinNumber && data.sinNumber.trim());
    body.append('address', data.address && data.address.trim());
    body.append('about', data.aboutYou && data.aboutYou.trim());

    body.append('page', "1");
    var arr1 = [];
    for (var key in data.Experience) {
        if (data.Experience[key].title && data.Experience[key].duration)
            arr1.push({
                type: data.Experience[key].title,
                duration: data.Experience[key].duration
            });
    }
    body.append('experiences', JSON.stringify(arr1));
    body.append('firstName', data.firstName && data.firstName.trim());
    body.append('lastName', data.lastName && data.lastName.trim());
    body.append('role', "DRIVER");
    body.append('lat', "45.63");
    body.append('lng', "52.36");
    body.append("licenceExpDate", data.licenceExpiryDate)
    body.append('cities', JSON.stringify(data.selectedItems));
    var arr1 = [];
    let certificateArray = [];
    for (var key in data.selectedExperienceItems) {
        console.log("selectedExp", key)
        if (data.selectedExperienceItems[key])
            certificateArray.push({
                title: data.selectedExperienceItems[key],
                isSelected: true
            });
    }
    body.append('certificates', JSON.stringify(certificateArray));
    console.log('data body  ********* ', JSON.stringify(body))


    return dispatch => {
        return new Promise(function (fulfill, reject) {
            let userToken = ""
            AsyncStorage.getItem("token").then((tokenValue) => {
                userToken = tokenValue;
                console.log("tokenvalue---->", tokenValue)
                dispatch(startLoading());
                RestClient.imageUpload("users/profile", body, tokenValue).then((result) => {
                    console.log('result profile ******* ', result)

                    if (result.status == 1) {
                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
                        fulfill(result);
                        // dispatch(ToastActionsCreators.displayInfo(result.message));
                    } else {

                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo(result.message));
                    }
                }).catch(error => {
                    console.log("error=> ", error)
                    dispatch(stopLoading());
                });
            })
        })
    }
};
/**
 * Driver Profile page two API.
 */
export const userDriverSecondForm = (data, saveState, onSubmitform) => {
    console.log(' vehicle ********* ', data)

    let body = new FormData();

    body.append('plateNo', data.vehicleNumber && data.vehicleNumber.trim());
    body.append('type', data.selectedVehicleId);
    body.append('make', data.selectedCompanyId);
    body.append('modelYear', data.selectedYear);
    body.append('model', data.selectedModalId)
    body.append('insuranceNo', data.insuranceNumber && data.insuranceNumber.trim());
    body.append('insuranceExp', data.insuranceExpiryDate);
    body.append('equipment', data.selectedItems ? JSON.stringify(data.selectedItems) : null);

    body.append('capacity', JSON.stringify(data.roomsArr));

    if (data.vehicleImage && data.vehicleImage.filename) {
        body.append('addVehicleImage', {
            uri: data.vehicleImage.uri,
            name: data.vehicleImage.filename,
            filename: data.vehicleImage.filename,
            type: data.vehicleImage.type
        });
    } else {
        body.append('addVehicleImage', "")
    }


    if (data.LicenceImage && data.LicenceImage.filename) {
        body.append('license', {
            uri: data.LicenceImage.uri,
            name: data.LicenceImage.filename,
            filename: data.LicenceImage.filename,
            type: data.LicenceImage.type
        });
    } else {
        body.append('license', "")
    }
    if (data.InsuranceImage && data.InsuranceImage.filename) {
        body.append('insurance', {
            uri: data.InsuranceImage.uri,
            name: data.InsuranceImage.filename,
            filename: data.InsuranceImage.filename,
            type: data.InsuranceImage.type
        });
    } else {
        body.append('insurance', "")
    }
    if (data.Background && data.Background.filename) {
        body.append('background', {
            uri: data.Background.uri,
            name: data.Background.filename,
            filename: data.Background.filename,
            type: data.Background.type
        });
    } else {
        body.append('background', "")
    }
    if (data.DriverExtract && data.DriverExtract.filename) {
        body.append('abstract', {
            uri: data.DriverExtract.uri,
            name: data.DriverExtract.filename,
            filename: data.DriverExtract.filename,
            type: data.DriverExtract.type
        });
    } else {
        body.append('abstract', "")
    }
    body.append('page', '2');
    body.append('role', "DRIVER");
    body.append('agree', "1");
    body.append('submit', onSubmitform ? "1" : "");

    // if (data.vehicleDocs) {
    // 	data.vehicleDocs.map((item, i) => {
    //           let filename = item.fileName;
    //           body.append(data.imageType, {
    //               uri: item.uri,
    //               name: filename,
    //               type: item.type
    //           });
    //       	})
    // }else{
    // 	body.append('addDocs', data.vehicleDocs)
    // }

    //body.append('addDocs', data.vehicleDocs);
    body.append('driverForm', data.saveState);
    console.log("body===========>", body)
    let userToken = AsyncStorage.getItem("token")
    return dispatch => {
        return new Promise(function (fulfill, reject) {
            AsyncStorage.getItem("token").then((tokenValue) => {
                dispatch(startLoading());
                RestClient.imageUpload("users/profile", body, tokenValue).then((result) => {
                    console.log('result vehicle info ******* ', result);
                    fulfill(result);
                    if (result.status == 1) {
                        dispatch(stopLoading());
                        if (saveState) {
                            if (result.data.driverStatus == 'pending') {
                                dispatch({
                                    type: 'FORMSUBMIT_VISIBILITY',
                                    visibility: true
                                })
                            }
                            if (result.data.driverStatus == 'rejected') {
                                dispatch({
                                    type: 'FORMREJECT_VISIBILITY',
                                    visibility: true
                                })
                            }
                        }
                        dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
                        // dispatch(ToastActionsCreators.displayInfo(result.message));
                    } else {
                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo(result.message));
                    }
                }).catch(error => {
                    console.log("error=> ", error)
                    dispatch(stopLoading());
                });

            })
        })

    };
}


export const userDriverSecondMediateForm = (data, saveState, onSubmitform) => {
    console.log(' vehicle ********* ', data)

    let body = new FormData();

    body.append('plateNo', !data.vehicleNumber ? "" : data.vehicleNumber && data.vehicleNumber.trim());
    body.append('type', !data.selectedVehicleId ? "" : data.selectedVehicleId);
    body.append('make', !data.selectedCompanyId ? "" : data.selectedCompanyId);
    body.append('modelYear', !data.selectedYear ? "" : data.selectedYear);
    body.append('model', !data.selectedModalId ? "" : data.selectedModalId)
    body.append('insuranceNo', !data.insuranceNumber ? "" : data.insuranceNumber && data.insuranceNumber.trim());
    body.append('insuranceExp', !data.insuranceExpiryDate ? "" : data.insuranceExpiryDate);
    body.append('equipment', data.selectedItems ? JSON.stringify(data.selectedItems) : null);

    body.append('capacity', JSON.stringify(data.roomsArr));
    if (data.vehicleImage && data.vehicleImage.filename) {
        body.append('addVehicleImage', {
            uri: data.vehicleImage.uri,
            name: data.vehicleImage.filename,
            filename: data.vehicleImage.filename,
            type: data.vehicleImage.type
        });
    } else {
        body.append('addVehicleImage', "")
    }
    if (data.LicenceImage && data.LicenceImage.filename) {
        body.append('license', {
            uri: data.LicenceImage.uri,
            name: data.LicenceImage.filename,
            filename: data.LicenceImage.filename,
            type: data.LicenceImage.type
        });
    } else {
        body.append('license', "")
    }
    if (data.InsuranceImage && data.InsuranceImage.filename) {
        body.append('insurance', {
            uri: data.InsuranceImage.uri,
            name: data.InsuranceImage.filename,
            filename: data.InsuranceImage.filename,
            type: data.InsuranceImage.type
        });
    } else {
        body.append('insurance', "")
    }
    if (data.Background && data.Background.filename) {
        body.append('background', {
            uri: data.Background.uri,
            name: data.Background.filename,
            filename: data.Background.filename,
            type: data.Background.type
        });
    } else {
        body.append('background', "")
    }
    if (data.DriverExtract && data.DriverExtract.filename) {
        body.append('abstract', {
            uri: data.DriverExtract.uri,
            name: data.DriverExtract.filename,
            filename: data.DriverExtract.filename,
            type: data.DriverExtract.type
        });
    } else {
        body.append('abstract', "")
    }
    body.append('page', '2');
    body.append('role', "DRIVER");
    body.append('agree', "1");
    body.append('submit', onSubmitform ? "1" : "");
    let userToken = AsyncStorage.getItem("token")

    console.log(body);

    return dispatch => {
        return new Promise(function (fulfill, reject) {
            AsyncStorage.getItem("token").then((tokenValue) => {
                dispatch(startLoading());
                RestClient.imageUpload("users/savevehicleinfo", body, tokenValue).then((result) => {
                    console.log('result vehicle info ******* ', result);
                    fulfill(result);
                    if (result.status == 1) {
                        dispatch(stopLoading());
                        if (saveState) {
                            if (result.data.driverStatus == 'pending') {
                                dispatch({
                                    type: 'FORMSUBMIT_VISIBILITY',
                                    visibility: true
                                })
                            }
                            if (result.data.driverStatus == 'rejected') {
                                dispatch({
                                    type: 'FORMREJECT_VISIBILITY',
                                    visibility: true
                                })
                            }
                        }
                        dispatch(ToastActionsCreators.displayInfo('Data saved successfully'))
                        // dispatch(ToastActionsCreators.displayInfo(result.message));
                    } else {
                        dispatch(stopLoading());
                        dispatch(ToastActionsCreators.displayInfo(result.message));
                    }
                }).catch(error => {
                    console.log("error=> ", error)
                    dispatch(stopLoading());
                });

            })
        })

    };
}

/* Get Driver Api */
export const getDriverData = (token) => {
    return dispatch => {
        let userToken = AsyncStorage.getItem("token")
        dispatch(startLoading());
        RestClient.post("users/getDriver", {}, userToken).then((result) => {
            console.log('result getDriverData ****** ', result)
            if (result.status === 1) {
                dispatch(stopLoading());
                // dispatch(ToastActionsCreators.displayInfo(result.message));
                dispatch(GET_DRIVER(result));
            } else {
                dispatch(stopLoading());
                // dispatch(ToastActionsCreators.displayInfo(result.message));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}

/* Get Driver Api */
export const getDriverStatus = (token) => {
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/getDriver", {}, token).then((result) => {
            console.log('result getDriverData ****** ', result)
            if (result.status === 1) {
                dispatch(stopLoading());
                // dispatch(ToastActionsCreators.displayInfo(result.message));
                dispatch(GET_DRIVER_STATUS(result));
            } else {
                dispatch(stopLoading());
                // dispatch(ToastActionsCreators.displayInfo(result.message));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}

/**
 *Logout user
 **/
export const logout = (data) => {
    //	console.log('data ****** ',data)
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/logout", {}, data).then((result) => {
            console.log('result logout ****** ', result)
            if (result.status === 1) {

                dispatch(ToastActionsCreators.displayInfo(result.message));
                dispatch(LOG_OUT_SUCCESS());
                dispatch(stopLoading());
            } else {

                dispatch(ToastActionsCreators.displayInfo(result.message));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}

/**
 * Forgot Password
 **/
export const forgotPassword = (data) => {
    console.log('data ****** ', data)
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/forgotPassword", {
            email: data.email && data.email.trim()
        }).then((result) => {
            console.log('result forgot ****** ', result)
            if (result.status === 1) {
                dispatch(stopLoading());
                //alert(result.message);
                dispatch(FORGOT_PASSWORD_SUCCESS(data.email))
                dispatch({
                    type: 'FORGOT_PASSWORD_VISIBILITY',
                    visibility: false
                })
                dispatch({
                    type: 'OTP_VERIFICATION_VISIBILITY',
                    visibility: true
                })

            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}

/**
 * OTP Verification
 **/
export const otpVerification = (data) => {
    console.log('data ****** ', data)
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/otpMatch", {
            otp: data.code,
            email: data.email && data.email.trim()
        }).then((result) => {
            console.log('result otp ****** ', result)
            if (result.status === 1) {
                dispatch(stopLoading());
                dispatch(OTP_VERIFY_SUCCESS(data.code))
                dispatch({
                    type: 'OTP_VERIFICATION_VISIBILITY',
                    visibility: false
                })
                dispatch({
                    type: 'RESET_PASSWORD_VISIBILITY',
                    visibility: true
                })
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}
export const resendForgotApi = (data) => {
    //console.log('data ********* ',data)
    let requestObject = {
        email: data
    }

    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/resend", requestObject).then((result) => {
            //console.log('result email verify ******* ',result)
            if (result.status == 1) {
                dispatch(stopLoading());
                alert(result.message);
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};
/**
 * rest Password
 **/
export const resetPassword = (data) => {
    console.log('data ****** ', data)
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("users/resetPassword", {
            email: data.email && data.email.trim(),
            password: data.password.value,
            otp: data.otp
        }).then((result) => {
            console.log('result otp ****** ', result)
            if (result.status === 1) {
                dispatch(stopLoading());
                dispatch({
                    type: 'RESET_PASSWORD_VISIBILITY',
                    visibility: false
                })
                dispatch(ToastActionsCreators.displayInfo(result.message));
            } else {
                dispatch(stopLoading());
                alert(result.message);
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
}


/*** 
 * Availibility status
 ***/
export const availibilityStatus = (data, token) => {

    let requestObject = {
        "status": data.status,
        "isHelper": data.isHelper,
        "isMobileHandler": data.isMobileHandler
    }
    console.log('rquest object  availibility Status ****** ', requestObject)
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("drivers/setAvailablity", requestObject, token).then((result) => {
            console.log('result availibility ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                dispatch(ToastActionsCreators.displayInfo(result.message));
                dispatch(DRIVER_AVAILABILITY(result.data));
            } else {
                dispatch(stopLoading());
                dispatch(ToastActionsCreators.displayInfo(result.message));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};



/*** 
 * get cities api
 ***/
export const getCitiesList = (token) => {
    return dispatch => {
        dispatch(startLoading());
        RestClient.post("admin/getcity").then((result) => {
            console.log('result getCity ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                dispatch(GET_CITIES_LIST(result.data));
            } else {
                dispatch(stopLoading());
                // 	dispatch(ToastActionsCreators.displayInfo(result));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};

/*** 
 * get CERTIFICATES_LIST api
 ***/
export const getCertificatesList = (token) => {
    return dispatch => {
        dispatch(startLoading());
        RestClient.get("drivers/getCertificate", {}, token).then((result) => {
            console.log('result getCertificate ******* ', result)
            if (result.status == 1) {
                dispatch(stopLoading());
                dispatch(GET_CERTIFICATES_LIST(result.data));
            }
        }).catch(error => {
            console.log("error=> ", error)
            dispatch(stopLoading());
        });
    }
};




/** Code added by Saket **/


export const get_New_test = (url, data) => {
    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New(url, data, '').then((result) => {

                if (result.status == 1) {
                    dispatch(stopLoading());

                    dispatch({
                        type: 'SET_ORDER_STATE',
                        data: result.data
                    });

                    fulfill(result);


                } else {
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());
                reject(result);
            });
        });
    }


}




export const get_order_History = (url, data) => {


    return dispatch => {

        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New('/place-order/order-history?driverId=5ba512c5405cff32dcd952f4', {}, '').then((result) => {

                console.log("test");

                if (result.status == 1) {
                    dispatch(stopLoading());

                    dispatch({
                        type: 'SET_ORDER_HISTORY',
                        data: result.data
                    });

                    fulfill();


                } else {
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());
                reject(result);
            });
        });
    }


}

export const acceptOrder = (data) => {


    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());



            RestClient.get_New_Patch("/place-order/accept", data, '').then((result) => {
                if (result.status == 1) {

                    //console.log(JSON.stringify());

                    dispatch({
                        type: 'SET_ACCEPTED_OREDERDATA',
                        data: result.data
                    });

                    fulfill(result.data);
                    dispatch(stopLoading());
                } else {
                    reject(data);
                    dispatch(stopLoading());

                }
            }).catch(error => {
                console.log("error==================> ", error)
                dispatch(stopLoading());
                reject(result);
            });
        });
    }


}


export const rejectOrder = (data) => {


    return dispatch => {
        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/reject-order", data, '').then((result) => {



                if (result.status == 1) {
					/*dispatch({
						type: 'SET_ACCEPTED_OREDERDATA',
						data: result.data
					});*/

                    fulfill(result.data);
                    dispatch(stopLoading());
                } else {
                    dispatch(stopLoading());
                    reject(result);


                }
            }).catch(error => {
                alert("error=> " + error)
                reject(result);
                dispatch(stopLoading());

            });
        });
    }


}





export const orderPicked = (data) => {



    return dispatch => {
        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/pickup/", data, '').then((result) => {

                if (result.status == 1) {

                    //dispatch({type:'SET_START_ORDERDATA',data:result.data});
                    //dispatch({type:'NEXT_PICKUP',data:result.data});

                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}



export const markArrive = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/arrive/", data, '').then((result) => {

                if (result.status == 1) {

                    //dispatch({type:'SET_START_ORDERDATA',data:result.data});
                    //dispatch({type:'NEXT_PICKUP',data:result.data});

                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}

export const dropArrive = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/dropup-arrive/", data, '').then((result) => {

                if (result.status == 1) {

                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}

export const dropDone = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/dropup/", data, '').then((result) => {
                if (result.status == 1) {


                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}


export const pickUpDone = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/pickup/", data, '').then((result) => {

                if (result.status == 1) {
                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}




export const nextStop = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/start-order/", data, '').then((result) => {

                if (result.status == 1) {





                    fulfill(result);
                    dispatch(stopLoading());
                } else {

                }

            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}



export const scheduledOrder = (data) => {



    return dispatch => {


        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/start-order/", data, '').then((result) => {



                //  alert(JSON.stringify(result));

                if (result.status == 1) {



                    dispatch({
                        type: 'SET_START_ORDERDATA',
                        data: result.data
                    });
                    dispatch({
                        type: 'NEXT_PICKUP',
                        data: result.data ? result.data : []
                    });

                    dispatch({
                        type: 'SET_PICKUPDATA',
                        data: result
                    });

                    //	dispatch({type:'SET_PICKUPDATA',data:{done:result.done}});

                    fulfill(result.data);
                    dispatch(stopLoading());
                } else {

                }

            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }


}



export const chnageOorderPriority = (data) => {


    return dispatch => {
        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch("/place-order/pickup-priority", data, '').then((result) => {

                if (result.status == 1) {
                    fulfill(result.data);
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());

                reject(result);
            });
        });
    }
}

export const Ordered_details = (data) => {
    return dispatch => {
        return new Promise(function (fulfill, reject) {
            dispatch(startLoading());
            RestClient.get_New_Patch('place-order/orderDetails/' + data).then((result) => {
                console.log('order_details++', result);
                if (result.status == 1) {
                    dispatch(stopLoading());
                    dispatch({ type: 'SET_ORDERED_DATA', data: result.data });
                    fulfill();
                }
                else {
                    dispatch(stopLoading());
                }
            }).catch(error => {
                console.log("error=> ", error)
                dispatch(stopLoading());
                reject(result);
            });
        });
    }
}



export const setOrderedData = (item) => {
    return dispatch => {
        dispatch({
            type: 'SET_ORDERDATA',
            data: item
        });
    }
}

export const setAccpetedData = (item) => {
    return dispatch => {
        dispatch({
            type: 'SET_ACCEPTED_OREDERDATA',
            data: item
        });
    }
}






/**
 * Initial state
 */
const initialState = {
    deviceToken: "test",
    email: '',
    otp: '',
    phone: '',
    userData: null,
    driverData: null,
    driverAvailabilityStatus: true,
    citiesList: [],
    certificatesList: [],
    experienceTypeList: [],
    vehicleTypeList: [],
    vehicleMakeList: [],
    vehicleModelList: [],
    driverStatus: '',
    newdriverStatus: '',
    orderDetails: '',
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
    //console.log("action verification data phone ************",action.data)
    var newstate = Object.assign({}, state);
    switch (action.type) {
        case REGISTER_NEW_USER:
            return {
                ...state,
                userData: action.data
            };

        case CONSUMER_SIGNUP_PHONE:
            return {
                ...state,
                phone: action.data
            };

        case USER_LOGIN:
            return {
                ...state,
                userData: action.data
            };

        case FORGOT_PASSWORD:
            return {
                ...state,
                email: action.data
            };

        case OTP_VERIFY:
            return {
                ...state,
                otp: action.data
            };

        case DEVICE_TOKEN:
            return {
                ...state,
                deviceToken: action.data
            }

        case GET_DRIVER_DATA:
            return {
                ...state,
                driverData: action.data
            };
        case GET_DRIVER_DATA_STATUS:
            newstate.newdriverStatus = action.data.data.driverStatus;
            return newstate;

        case NAVIGATE_TO_DRIVER_FORM:
            return {
                ...state,
                userData: null
            };

        case DRIVER_FORM_NAV:
            return {
                ...state,
                driverData: action.data
            };

        case DRIVER_AVAILABILITY_STATUS:
            return {
                ...state,
                driverAvailabilityStatus: action.data.availableStatus
            };

        case CITIES_LIST:
            return {
                ...state,
                citiesList: action.data
            };
        case CERTIFICATES_LIST:
            return {
                ...state,
                certificatesList: action.data
            };

        case LOG_OUT:
            return {
                ...initialState,
                deviceToken: state.deviceToken
            };
        case SET_ORDERED_DATA:
            return { ...initialState, orderDetails: action.data };

        default:
            return state;
    }
}