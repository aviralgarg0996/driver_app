/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";

import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as SettingActions from '../../../redux/modules/settings';


class Miscellaneous extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      usdActive:false,
      cadActive:false,
      lbs:false,
      gm:false,
      ft:false,
      m:false,
      in:false,

      serviceNo:false,
      serviceYes:false,
      currency  : "",
      weightUnits  : "",
      lengthUnits  : "",
      furnitureService  : ""

    };
  }
onSave() {
  this.props.SettingActions.miscellaneousSetting({...this.state},this.props.tokenforuser);


}
  currency(press) {
    if(press ==='usd'){
      this.setState({usdActive: !this.state.usdActive,
      cadActive: false,currency:"usd"})
    }else{
      this.setState({cadActive: !this.state.cadActive,
      usdActive: false,currency:"cad"})
    }

  }
  weightUnits(press) {
    if(press ==='lbs'){
      this.setState({lbs: !this.state.lbs,
      gm: false,weightUnits:"lbs"})
    }else{
      this.setState({gm: !this.state.gm,
      lbs: false,weightUnits:"gm"})
    }
  }
  lengthUnits(press) {
    if(press ==='ft'){
      this.setState({ft: !this.state.ft,
      m: false, in :false,lengthUnits:"ft"})
    }
    else if(press ==='m'){
      this.setState({m: !this.state.m,
      ft: false, in :false,lengthUnits:"m"})
    }else{
      this.setState({in: !this.state.in,
      m: false, ft :false,lengthUnits:"in"})
    }
  }

  serviceSlection(press) {
    if(press ==='no'){
      this.setState({serviceNo: !this.state.serviceNo,
      serviceYes: false, serviceArrange :false,furnitureService:"no"})
    }
    else{
      this.setState({serviceYes: !this.state.serviceYes,
      serviceNo: false, serviceArrange :false,furnitureService:"yes"})
    }
  }







  render() {
    const titleConfig = {
      title: "Miscellaneous",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600" }
    };
    const { navigate ,goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      <NavigationBar
        statusBar={{ hidden: true }}
        style={styles.navigationBar}
        title={titleConfig}
        leftButton={
          <TouchableOpacity onPress={()=>goBack()}>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />
        <ScrollView>
        <View style={styles.rootcontainer}>
          <View style={styles.subcontainer}>
            <Text style={styles.headingStyle}>Currency</Text>
          </View>
          <View style={styles.subcontainer}>
            <TouchableOpacity   onPress={() => this.currency('usd')}>
              <View style={styles.radioView}>
                <Image
                  source={this.state.usdActive ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                    style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>USD (United State)</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.currency('cad')}>
              <View style={styles.radioView}>
                <Image
                    source={this.state.cadActive ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                  style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>CAD (Canada)</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

          <View style={styles.rootcontainer}>
            <View style={styles.subcontainer}>
              <Text style={styles.headingStyle}>Weight units</Text>
            </View>
            <View style={styles.subcontainer}>
              <TouchableOpacity   onPress={() => this.weightUnits('lbs')}>
              <View style={styles.radioView}>
                <Image
                  source={this.state.lbs ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                    style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>lbs (Pounds)</Text>
              </View>
                </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.weightUnits('gm')}>
              <View style={styles.radioView}>
                <Image
                    source={this.state.gm ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                  style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>gm (Grams)</Text>
              </View>
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rootcontainer}>
            <View style={styles.subcontainer}>
              <Text style={styles.headingStyle}>Length units</Text>
            </View>
            <View style={styles.subcontainer}>
              <TouchableOpacity   onPress={() => this.lengthUnits('ft')}>
              <View style={styles.radioView}>
                <Image
                      source={this.state.ft ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                  style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>ft( Foot )</Text>
              </View>
                </TouchableOpacity >
                  <TouchableOpacity   onPress={() => this.lengthUnits('m')}>
              <View style={styles.radioView}>
                <Image
                      source={this.state.m ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                    style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>m ( Metres )</Text>
              </View>
                </TouchableOpacity >
                <TouchableOpacity   onPress={() => this.lengthUnits('in')}>
            <View style={styles.radioView}>
              <Image
                    source={this.state.in ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                style={ styles.radioIcons}
                resizeMode={"contain"}
              />
              <Text style={styles.radioTxt}>in ( Inch )</Text>
            </View>
              </TouchableOpacity >
            </View>
          </View>

          <View style={[styles.rootcontainer,{
            borderBottomColor: 'transparent',}]}>
            <View style={styles.subcontainer}>
              <Text style={styles.headingStyle}>Do you provide Furniture White No Glove service?</Text>
            </View>
            <View style={styles.subcontainer}>
              <TouchableOpacity   onPress={() => this.serviceSlection('no')}>
              <View style={styles.radioView}>
                <Image
                      source={this.state.serviceNo ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                    style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>No</Text>
              </View>
              </TouchableOpacity >
              <TouchableOpacity   onPress={() => this.serviceSlection('yes')}>
              <View style={styles.radioView}>
                <Image
                        source={this.state.serviceYes ? Constants.Images.driver.radioOn:Constants.Images.driver.radioOf}
                  style={ styles.radioIcons}
                  resizeMode={"contain"}
                />
                <Text style={styles.radioTxt}>Yes</Text>
              </View>
                </TouchableOpacity >

            </View>
          </View>


        <SubmitButton
          onPress={() => this.onSave()}
          text={"SAVE CHANGES"}
          style={[styles.ButtonStyle, { backgroundColor: "#53C8E5" }]}
          textStyle={[{ fontSize: 15 }]}
        />
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center"
  },
  rootcontainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray,
    paddingVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  radioTxt: {
    color: Constants.Colors.Gray,
    fontSize: 11,
    padding: Constants.BaseStyle.PADDING * 0.25
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
   radioIcons: {
      height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
      width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
      marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 0.2,
    },
  headingStyle: {
    fontSize: 13,
    color: Constants.Colors.Blue,
    padding: Constants.BaseStyle.PADDING * 0.25
  },
  ButtonStyle: {
    backgroundColor: "rgba(115,115,115,0.4)",

    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100*6,
    borderRadius: 5,

    shadowColor:Constants.Colors.LightGray,
       shadowOffset: {
         width: 2,
         height: 2
       },
       shadowRadius: 5,
       shadowOpacity: 1.0,
       borderRadius:2,
  }
});

const mapStateToProps = state => (
  {
  
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  
 
});

const mapDispatchToProps = dispatch => ({
  SettingActions: bindActionCreators(SettingActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Miscellaneous);

