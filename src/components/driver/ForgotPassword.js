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
  TouchableHighlight,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';

import Background from '../../components/common/Background';
import Constants from "../../constants";
import FormTextInput from "../../components/common/FormTextInput";
import SubmitButton from "../../components/common/FormSubmitButton";
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
import { scaleHeight, scaleWidth, normalizeFont } from '../../constants/responsive';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  onPress() {
    if (!this.state.email) { Alert.alert("Please enter the email") }
    else { this.props.UserActions.forgotPassword({ ...this.state }) }
  }

  render() {
    return (
      <View style={[styles.modalOuter]}>
        <View style={styles.modalInner}>
          <KeyboardAvoidingView behavior={'position'}>
            <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => { this.props.dispatch.dispatch({ type: 'FORGOT_PASSWORD_VISIBILITY', visibility: false }) }}>
              <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]} />
            </TouchableHighlight>

            <View>
              <View style={[styles.viewStyle]}>
                <Image source={Constants.Images.driver.locked} style={styles.logo} resizeMode={'contain'} />
                <Text style={styles.Headertext}>{Constants.Strings.forgotpassword.title}</Text>
                <Text style={styles.Subheadtext}>{Constants.Strings.forgotpassword.desc}</Text>
                <FormTextInput
                  autoFocus={false}
                  ref='email'
                  placeHolderText='EMAIL'
                  placeHolderColor={Constants.Colors.Blue}
                  secureText={false}
                  keyboard='email-address'
                  isPassword={false}
                  showPassword={false}
                  onChangeText={(email) => this.setState({ email })}
                />

              </View>
              <SubmitButton
                onPress={() => this.onPress()}
                text={Constants.Strings.forgotpassword.buttonText}
                style={[styles.ButtonStyle]}
              />
            </View>
          </KeyboardAvoidingView>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
    backgroundColor: 'transparent',
    color: Constants.Colors.Blue,
    textAlign: 'center'
  },
  modalOuter: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: Constants.BaseStyle.PADDING * .5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    margin: 10,
    padding: Constants.BaseStyle.PADDING * .2,
    backgroundColor: '#fff',
    position: 'relative',
    borderRadius: 5,
  },
  btCloseModal: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  btnCloseModalIcon: {
    width: scaleWidth(25),
    height: scaleHeight(25),
    marginLeft: scaleHeight(45),
    marginTop: scaleHeight(5)
  },
  viewStyle: {
    borderBottomColor: Constants.Colors.White,
    borderBottomWidth: 1,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 7,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 2 / 100,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginLeft: scaleWidth(45),
    marginRight: scaleWidth(45),

  },
  inputTextViewStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: Constants.Colors.BlurGrey,//"rgba(115,115,115,0.4)",
    borderColor: Constants.Colors.BlurGrey,//"rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    borderRadius: 5,
    marginBottom: 25,
  },
  inputStyle: {
    fontSize: 18,
  },

  Headertext: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '900',
    backgroundColor: 'transparent',
    color: Constants.Colors.Blue,
    textAlign: 'center'
  },
  Subheadtext: {
    fontSize: 15,
    //fontWeight:'500',
    backgroundColor: 'transparent',
    color: Constants.Colors.Blue,
    textAlign: 'center'
  },

});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
