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
  Switch,
  AsyncStorage
} from "react-native";
import RestClient from '../../../utilities/RestClient';
import SwitchButton from "../../../components/common/SwitchButton";
import Constants from "../../../constants";
import NavigationBar from "react-native-navbar";
import SubmitButton from "../../../components/common/FormSubmitButton";
import Icon from "react-native-vector-icons/FontAwesome";
export default class NotificationSettings extends Component {
  constructor(props) {
    super(props);
this.state={
  newOrderAppNotification:true,
  newOrderSms:true,
  newOrderEmail:true,
  orderUpdateAppNotification:true,
  orderUpdateSms:true,
  orderUpdateEmail:true,
  chatAppNotification:true,
  chatSms:true,
  chatEmail:true,
  supportTeamAppNotification:true,
  supportTeamSms:true,
  supportTeamEmail:true,
  soundNotifications:true
}
  }
componentDidMount = () => {
  this.setNotificationStatus()
}

setNotificationStatus(){
  AsyncStorage.getItem("token").then((tokenValue) => {    
    RestClient.get("drivers/findnotification",{},tokenValue).then((response)=>{
      if(response.status==1)
      {
        this.setState({
  newOrderAppNotification:response.message.newOrderNotification.appNotification,
  newOrderSms:response.message.newOrderNotification.sms,
  newOrderEmail:response.message.newOrderNotification.email,

  orderUpdateAppNotification:response.message.orderUpdateNotification.appNotification,
  orderUpdateSms:response.message.orderUpdateNotification.sms,
  orderUpdateEmail:response.message.orderUpdateNotification.email,

  chatAppNotification:response.message.chatNotification.appNotification,
  chatSms:response.message.chatNotification.sms,
  chatEmail:response.message.chatNotification.email,

  supportTeamAppNotification:response.message.supportTeamNotification.appNotification,
  supportTeamSms:response.message.supportTeamNotification.sms,
  supportTeamEmail:response.message.supportTeamNotification.email,

  soundNotifications:response.message.soundNotification
        })
      }
   console.log("response in notificationSuccess222",response)
            })
          }) 
}
  onSwitchChange(type,notificationStatus,status){
    AsyncStorage.getItem("token").then((tokenValue) => {    
    RestClient.post("drivers/notificationUpdate",{type:type,status:status.toString(),notificationStatus:notificationStatus},tokenValue).then((response)=>{
   console.log("response in notificationSuccess",response)
            })
          })
  }
  render() {
    const titleConfig = {
      title: "NOTIFICATIONS",
      tintColor: "#fff",
      style: { fontSize: 18, fontWeight: "600"}
    };
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress={() => goBack()}>
              <Icon
                name="angle-left"
                size={40}
                color="white"
                style={[
                  styles.navIcons,
                  { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }
                ]}
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>New Order</Text>
          <View style={styles.switchOne}>
            <SwitchButton 
            onChange={()=>{
              this.setState({newOrderAppNotification:!this.state.newOrderAppNotification})
              this.onSwitchChange("newOrder","appNotification",!this.state.newOrderAppNotification)}}
              value={this.state.newOrderAppNotification}
              />
            <Text style={styles.settingTxt}>App Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({newOrderSms:!this.state.newOrderSms})
              this.onSwitchChange("newOrder","sms",!this.state.newOrderSms)}}
              value={this.state.newOrderSms}
            />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({newOrderEmail:!this.state.newOrderEmail})
              this.onSwitchChange("newOrder","email",!this.state.newOrderEmail)}}
              value={this.state.newOrderEmail}
            />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Order Update</Text>
          <View style={styles.switchOne}>
            <SwitchButton 
            onChange={()=>{
              this.setState({orderUpdateAppNotification:!this.state.orderUpdateAppNotification})
              this.onSwitchChange("orderUpdate","appNotification",!this.state.orderUpdateAppNotification)}}
              value={this.state.orderUpdateAppNotification}
            />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({orderUpdateSms:!this.state.orderUpdateSms})
              this.onSwitchChange("orderUpdate","sms",!this.state.orderUpdateSms)}}
              value={this.state.orderUpdateSms}
            />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({orderUpdateEmail:!this.state.orderUpdateEmail})
              this.onSwitchChange("orderUpdate","email",!this.state.orderUpdateEmail)}}
              value={this.state.orderUpdateEmail}
            />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Chat</Text>
          <View style={styles.switchOne}>
            <SwitchButton 
             onChange={()=>{
              this.setState({chatAppNotification:!this.state.chatAppNotification})
              this.onSwitchChange("chat","appNotification",!this.state.chatAppNotification)}}
              value={this.state.chatAppNotification}
            />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({chatSms:!this.state.chatSms})
              this.onSwitchChange("chat","sms",!this.state.chatSms)}}
              value={this.state.chatSms}
            />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
             onChange={()=>{
              this.setState({chatEmail:!this.state.chatEmail})
              this.onSwitchChange("chat","email",!this.state.chatEmail)}}
              value={this.state.chatEmail}
            />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
        </View>
        <View style={styles.subcontainer}>
          <Text style={styles.headTxt}>Support Team</Text>
          <View style={styles.switchOne}>
            <SwitchButton 
             onChange={()=>{
              this.setState({supportTeamAppNotification:!this.state.supportTeamAppNotification})
              this.onSwitchChange("supportTeam","appNotification",!this.state.supportTeamAppNotification)}}
              value={this.state.supportTeamAppNotification}
            />
            <Text style={styles.settingTxt}>Push Notification</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
            onChange={()=>{
              this.setState({supportTeamSms:!this.state.supportTeamSms})
              this.onSwitchChange("supportTeam","sms",!this.state.supportTeamSms)}}
              value={this.state.supportTeamSms}
            />
            <Text style={styles.settingTxt}>SMS</Text>
          </View>
          <View style={styles.switchTwo}>
            <SwitchButton 
            onChange={()=>{
              this.setState({supportTeamEmail:!this.state.supportTeamEmail})
              this.onSwitchChange("supportTeam","email",!this.state.supportTeamEmail)}}
              value={this.state.supportTeamEmail}
            />
            <Text style={styles.settingTxt}>Email</Text>
          </View>
          </View>

          <View style={styles.subcontainer}>
            <Text style={styles.headTxt}>Sound Notifications</Text>
            <View style={styles.switchOne}>
              <SwitchButton 
              onChange={()=>{
                this.setState({soundNotifications:!this.state.soundNotifications})
                this.onSwitchChange("soundNotification","appNotification",!this.state.soundNotifications)}}
                value={this.state.soundNotifications}
              />

            </View>
            <View style={styles.switchTwo}>

            </View>
            <View style={styles.switchTwo}>

            </View>
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.White,

  },
  subcontainer: {
  paddingHorizontal: Constants.BaseStyle.PADDING * 0.8,
  paddingVertical: Constants.BaseStyle.PADDING * 0.2,
    flexDirection: "row",

  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: "center"
  },
  headTxt: {

    flex:4,
    fontWeight:'800',
    color: Constants.Colors.Gray,
    fontSize: 13,
    padding: Constants.BaseStyle.PADDING * 0.5
  },
  settingTxt: {
    textAlign:'center',
    color: Constants.Colors.Gray,
    fontSize: 11,
    padding: Constants.BaseStyle.PADDING * 0.2
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
    switchOne:{
      flex: 3 ,alignItems: "center",marginTop:5},
      switchTwo:{
        flex: 2 ,alignItems: "center",marginTop:5}
});
