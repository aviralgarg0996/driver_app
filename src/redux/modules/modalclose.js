'use strict';
import {
  Platform,
} from 'react-native';


// Actions


// Action Creators


//perform api's related to user


/**
* Initial state
*/
const initialState = {
  ModalVisible : false,
  EmailVerificationModalVisible : false,
  OtpVerificationModalVisible : false,
  ForgotPassModalVisible : false,
  ResetPassModalVisible : false,
  PhoneVerificationModalVisible : false,
  NewUserModalVisible : false,
  FormSubmitModalVisible : false,
  FormRejectModalVisible : false,
  AdminMessageModalVisibility : false,
  WorkingDayOnOffModalVisibility : false,
  FilterAndSortModalVisibility : false,
  ProductDetailsModalVisibility:false,
  DriverInfo : 1,//set 1 for Personal Info and set 2 for Vehicle Info
  tokenDriverForm:'test'
};

/**
* Reducer
*/
export default function ModalHandleReducer(state = initialState, action = {})
{
    var newstate = Object.assign({}, state);
    switch (action.type) {
      case 'EMAILVERIFICATION_VISIBILITY':
        newstate.EmailVerificationModalVisible = action.visibility;
        return newstate;
      case 'OTP_VERIFICATION_VISIBILITY':
        newstate.OtpVerificationModalVisible = action.visibility;
        return newstate;
      case 'FORGOT_PASSWORD_VISIBILITY':
        newstate.ForgotPassModalVisible = action.visibility;
        return newstate;
      case 'RESET_PASSWORD_VISIBILITY':
        newstate.ResetPassModalVisible = action.visibility;
        return newstate;
      case 'PHONEVERIFICATION_VISIBILITY':
        newstate.PhoneVerificationModalVisible = action.visibility;
        return newstate;
        case 'PRODUCTDETAILS_VISIBILITY':
        newstate.ProductDetailsModalVisibility=action.visibility;
        return newstate;
      case 'NEWUSER_VISIBILITY':
        console.log('action new user visible ****** ',action)
        newstate.NewUserModalVisible = action.visibility;
        newstate.tokenDriverForm = action.token;
        return newstate;
      case 'FORMSUBMIT_VISIBILITY':
        newstate.FormSubmitModalVisible = action.visibility;
        return newstate;
      case 'FORMREJECT_VISIBILITY':
        newstate.FormRejectModalVisible = action.visibility;
        return newstate;
      case 'ADMIN_MESSAGE_VISIBILITY':
        newstate.AdminMessageModalVisibility = action.visibility;
        return newstate;
      case 'DAYONOFF_VISIBILITY':
        newstate.WorkingDayOnOffModalVisibility = action.visibility;
        return newstate;
      case 'FILTER_VISIBILITY':
        newstate.FilterAndSortModalVisibility = action.visibility;
        return newstate;

      case 'LOAD_DRIVERINFO_PAGE':
        newstate.DriverInfo = parseInt(action.info);
        return newstate;

      default:
          return newstate;

    }
}
