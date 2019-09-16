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

} from "react-native";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Background from "../../../components/common/Background";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import Icon from 'react-native-vector-icons/FontAwesome';
export default class PaymentSettings extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      isBank:true,
      isPaypal:true,
    };
  }

  onSave()
  {

  }
  onDiscard()
  {

  }
  bankCheck()
  {

    this.setState({isBank: !this.state.isBank,
    })

  }
  paymentHistory()
  {

  this.props.navigation.navigate('PaymentHistory');

  }
   Paypal()
    {
      this.setState({isPaypal: !this.state.isPaypal,
      })
    }
  render() {
    const titleConfig = {
      title: "Payment Settings",
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
        <View style={styles.subcontainer}>

        <View style={{flexDirection:'row'}}>
        <TouchableOpacity  style={{flex:1}} onPress={() => this.bankCheck()}>
          <View style={styles.checkView}>
            <Image
              source={this.state.isBank ? Constants.Images.driver.checkboxClick:Constants.Images.driver.checkbox}
                style={ styles.checkIcons}
              resizeMode={"contain"}
            />
            <Text style={styles.textOrange}>Bank Accounts</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity  style={{flex:1,justifyContent:'flex-end'}} onPress={() => this.paymentHistory()}>

            <Text style={[styles.textOrange,{textDecorationLine: "underline",textAlign:'right'}]}>Payment History</Text>

        </TouchableOpacity>
</View>

          <Text style={styles.textBlue}>Account Number</Text>
          <View style={styles.inputCard}>
            <TextInput
            style={styles.inputText}
              underlineColorAndroid="transparent"
              autoCapitalize={"none"}
              placeholder={"92828254268838"}
              placeholderTextColor={Constants.Colors.Blue}
              autoCorrect={false}
            />
          </View>
          <Text style={styles.textBlue}>Bank Name</Text>
          <View style={styles.inputRootCard}>
        <View style={[styles.inputCard,{flex:1,}]}>
          <TextInput
          style={styles.inputText}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            placeholder={"ABC BANK"}
            placeholderTextColor={Constants.Colors.Blue}
            autoCorrect={false}
          />
        </View>
        <View style={[styles.inputCard,{flex:1,marginLeft:10}]}>
          <TextInput
          style={styles.inputText}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            placeholder={"XYZ"}
            placeholderTextColor={Constants.Colors.Blue}
            autoCorrect={false}
          />
        </View>
        </View>
          <Text style={styles.textBlue}>IFSC</Text>
          <View style={styles.inputCard}>
            <TextInput
            style={styles.inputText}
              underlineColorAndroid="transparent"
              autoCapitalize={"none"}
              placeholder={"HDGWK9029"}
              placeholderTextColor={Constants.Colors.Blue}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity   onPress={() => this.Paypal()}>
            <View style={styles.checkView}>
              <Image
                source={this.state.isPaypal ? Constants.Images.driver.checkboxClick:Constants.Images.driver.checkbox}
                  style={ styles.checkIcons}
                resizeMode={"contain"}
              />
              <Text style={styles.textOrange}>Paypal</Text>
            </View>
          </TouchableOpacity>

        <Text style={styles.textBlue}>Paypal ID</Text>
        <View style={styles.inputCard}>
          <TextInput
          style={styles.inputText}
            underlineColorAndroid="transparent"
            autoCapitalize={"none"}
            placeholder={"XXXXXXXXXXXX"}
            placeholderTextColor={Constants.Colors.Blue}
            autoCorrect={false}
          />
        </View>


        <View style={[styles.flexRow,{marginTop:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}]}>
  <View style={[{flex : 0.5}]}>
            <SubmitButton
              onPress={() => this.onSave()}
              text={Constants.Strings.driverVehicle.save}
              style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
              textStyle={[{fontSize:15}]}
            />
        </View>
          <View style={[{flex : 0.5,}]}>
            <SubmitButton
              onPress={() => this.onDiscard()}
              text={"DISCARD"}
              style={[styles.ButtonStyle,{paddingLeft : 3, paddingRight : 3}]}
              textStyle={[{fontSize:15}]}
            />
          </View>
        </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  flexRow: {
    flex: 1,
flexDirection:'row',
  },
  subcontainer: {
    flex: 1,
    padding: Constants.BaseStyle.PADDING * 0.6
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  checkIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5
  },
  checkView: {
    flexDirection: "row",
    alignItems: "center"
  },
  textOrange: {
    fontSize: 18,
    fontWeight: "800",
    color: Constants.Colors.Orange,
    marginVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH / 100 *1,
  },
  textBlue: {
    fontSize: 12,
    color: Constants.Colors.Blue,
    paddingVertical: Constants.BaseStyle.PADDING * 0.2
  },
  inputText: {

    padding: Constants.BaseStyle.PADDING * 0.5
  },
  inputCard: {
    backgroundColor:'white',
  shadowColor:Constants.Colors.LightGray,
     shadowOffset: {
       width: 2,
       height: 2
     },
     shadowRadius: 5,
     shadowOpacity: 1.0,
     borderRadius:2,
     marginVertical: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 1
  },
  inputRootCard : {
    flexDirection:"row"
  },
  ButtonStyle: {
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor:'transparent',
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*2,
    borderRadius:12,
    paddingLeft : 3,
    paddingRight : 3,

    shadowColor:Constants.Colors.LightGray,
       shadowOffset: {
         width: 2,
         height: 2
       },
       shadowRadius: 5,
       shadowOpacity: 1.0,
       borderRadius:2,
  },
});
