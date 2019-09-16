/*
 * @file: i18n.js
 * @description: App i18n Localization
 * @date: 14.12.2017
 * @author: Ankush Rishi
 * */

'use strict';

let Strings = {
  common: {
    enterCode: "Please Enter Code",
    resendCode: "RESEND CODE",
    forgotModalDesc: "Do not worry! Enter your registered Email and we will send you the verification code to reset your password.",
    promoCode: "Promo Code",
    shortDesc: "Short Description",
    startPrice: 'Starting Price',
    bio: 'Bio',
    notifications: 'Notifications',
    likeApp: 'Like the app?',
    review: 'Write a review',
    spread: 'Spread the world',
    info: 'Information',
    terms: 'Terms & Privacy Policy',
    subscription: 'Subscription Information',
    version: 'Application Version',
    logout: 'Log Out',
    applicationSettings: 'Application Settings',
    userProfile: 'User Profile',
    username: 'Username',
    forgotPwd: "Forgot Password ?",
    ok: "Ok",
    or: "or",
    save: "Save",
    name: "Name",
    fullName: "Full name",
    mobile: "Mobile No.",
    emailAddress: "Email Address",
    enterEmail: "Enter your email address.",
    enterValidEmail: "Enter valid email address.",
    emailOrMobile: "Email Address / Mobile No.",
    enterEmailOrMobile: "Enter your email address or mobile number.",
    enterValidEmailOrMobile: "Enter valid email address or mobile number.",
    password: "Password",
    old_password: "Old Password",
    new_password: "New Password",
    enterPassword: "Enter your password.",
    enterValidPassword: "Password should be 6-16 characters long and must be alphanumeric and must not contain spaces.",
    fullAddress: "Full Address",
    signup: "SIGN UP",
    signin: "SIGN IN",
    contact: "Contact Support",
    write_us: "Write for us",
    contactNumber: "Enter mobile number.",
    settings: "Settings",
    changePassword: "Change Password",
    works: "How it works",
    about: "About",
    ratings: "Ratings",
    no_internet: "Please check your internet connectivity or our server is not responding.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    enterNewPassword: "Please enter new password",
    enterOldPassword: "Please enter old password",
    enterMatchPassword: "Password and confirm password does not match"
  },
  signin: {
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have account?"
  },
  signup: {
    accountAlready: "Already have an account?",
    phoneNum: "Phone Number",
    enterMobile: "Enter your mobile number E.g. +11234567890",
    enterValidMobile: "Enter valid mobile number",
    enterFullName: 'Enter your full name',
    enterFullAdd: 'Enter your full address',
    enterShortDesc: 'Enter a short description about you',
    enterStartPrice: 'Enter your starting price'
  },
  edit: {

  },
  password: {
    password: "Password",
    change: "Change Password",
    forgot: "Forgot Password",
    reset: "Reset Password",
    current: "Current Password",
    newPass: "New Password",
    confirm: "Confirm Password",
    currentPassword: "Please enter current password.",
    newPasskey: "Please enter new password.",
    confirmPasskey: "Please enter confirm password.",
    passwordMatched: "New password does not match the confirm password.",
    save: "Save",
    validatePassword: "Password should be 6-16 characters long and must be alphanumeric.",
    forgotInstructions: "Enter your mobile number below to receive OTP to reset your password."
  },
  payments: {
    cardNumber: "Card Number",
    cardHolder: "Card Holder",
    expiry: "Expiry",
    cvv: "CVV",
    validCard: "All fields are mandatory.",
    firstNameNotEmpty: "First name should not be empty",
    enterValidFirstName: "Enter a valid first name",
    lastNameNotEmpty: "Last name should not be empty",
    enterValidLastName: "Enter a valid last name",
    enterValidCountryName: "Enter a valid country name",
    enterValidAccountNumber: "Enter a valid account number",
    enterValidRoutingNumber: "Enter a valid routing number",
    enterValidPostalCode: "Enter a valid postal code",
    enterValidCityName: "Enter a valid city name",
    enterValidStateName: "Enter a valid state name",
    enterValidSSN: "Enter a valid SSN number",
    onlyLastFourDigits: "Only last four digits",
  },
  calendar: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  permissions: {
    LocationPermissionHeader: `ManeEmergency" App Would Like  to Access  Your Location`,
    LocationPermissionText: "We need your location to locate nearby Stylists.",
    //LocationPermissionHeader: "Location Permissions",
    //LocationPermissionText:   "We need to access your location to see the list of nearby stylists. Please go to Settings > Privacy > Location to allow Stylist to access your location.",       
  },
  permissionsSignup: {
    LocationPermissionHeader: `ManeEmergency" App Would Like  to Access  Your Location`,
    LocationPermissionText: "We need your location so that Customer can search you based on your location.",
    //LocationPermissionHeader: "Location Permissions",
    //LocationPermissionText:   "We need to access your location to see the list of nearby stylists. Please go to Settings > Privacy > Location to allow Stylist to access your location.",       
  }
}

module.exports = Strings;