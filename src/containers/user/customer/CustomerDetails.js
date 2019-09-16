import React, { Component } from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions,Button,ScrollView,AsyncStorage} from "react-native"
import Background from "../../../components/common/Background"
import Constants from "../../../constants"
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import moment from "moment"
import { bindActionCreators } from "redux";
import * as UserActions from '../../../redux/modules/user';
import { connect } from 'react-redux';
import RestClient from '../../../utilities/RestClient';
const { height, width } = Dimensions.get('window');
 class CustomerDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            email:"",
            phoneNo:"",
            aboutYou:"",
            address:"",
            birthDate:"",
            gender:"",
            data:[]
        }
    }
    componentDidMount = () => {
      this.getCustomerDetails();
    }
    
    getCustomerDetails=()=>{
      AsyncStorage.getItem("token").then((tokenValue) => {
        RestClient.get("drivers/getcustomers",{},tokenValue).then((response)=>{
  console.log("response in customerdetails",response);
  data=response.data[0]
  this.setState({
    data:response,
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    gender:data.gender,
    phoneNo:data.phone,
    aboutYou:data.aboutMe,
    birthDate:data.dob
  })
        })
      })
    }
    onGoBack=()=>{
      this.props.navigation.goBack();
    }
    onPressSaveChanges = () => {
      this.props.UserActions.customerDataForm({ ...this.state }).then((resp) => {
  
        if (resp.status == 1) {
          this.refs.toast.show('Data Saved SuccessFully', DURATION.LENGTH_LONG);
        }
        else {
          this.refs.toast.show(resp.message, DURATION.LENGTH_LONG);
  
        }
      });
    }
 
  render() {
    let currentDate = moment().format("YYYY-MM-DD");
    let genderData = [{
      value: 'Male',
    }, {
      value: 'Female',
    }, {
      value: 'Others',
    }];
    return (
      <View style={{flex:1}}>
      <Background style={styles.mainContainer}>
      <ScrollView style={styles.container}>
      <View style={styles.rowContainerStyle}>

<View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>First Name</Text>
  <TextInput
    style={styles.textInputStyle}
    placeholder="First Name"
    value={this.state.firstName}
    onChangeText={(text) => this.setState({ firstName: text })}
  />
</View>
<View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>Last Name</Text>
  <TextInput
    style={styles.textInputStyle}
    placeholder="Last Name"
    value={this.state.lastName}
    onChangeText={(text) => {
      this.setState({ lastName: text })
    }}
  />
</View>
</View>
<View style={styles.rowContainerStyle}>

<View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>Email</Text>
  <TextInput
    style={styles.textInputStyle}
    placeholder="Email"
    value={this.state.email}
    editable={false}
    onChangeText={(text) => this.setState({ email: text })}
  />
</View>
<View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>Contact No</Text>
  <TextInput
    style={styles.textInputStyle}
    placeholder="Contact No"
    keyboardType='numeric'
    maxLength={10}
    editable={false}
    value={this.state.phoneNo}
    onChangeText={(text) => {
      this.setState({ phoneNo: text })
    }}
  />
</View>
</View>
<View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Date Of Birth</Text>
                <DatePicker
                  style={{ width: width * 0.45, marginTop: height * 0.03 }}
                  date={this.state.birthDate}
                  mode="date"
                  placeholder="Date of birth"
                  format="YYYY-MM-DD"
                  minDate="1970-05-01"
                  maxDate={currentDate}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    this.setState({ birthDate: date })
                  }}
                />
              </View>
              <View style={styles.columnContainerStyle}>
                {!this.state.gender ? <Text style={styles.headingText}>Gender</Text> : <Text></Text>}
                <Dropdown
                  containerStyle={styles.textInputStyle}
                  label='Gender'
                  data={genderData}
                  onChangeText={
                    (text) => {
                      this.setState({ gender: text })
                    }}
                  value={this.state.gender}
                />
              </View>
            </View>
            <View style={styles.rowContainerStyle}>
              <View style={styles.columnContainerStyle}>
                <Text style={styles.headingText}>Address</Text>
                <TextInput
                  style={styles.textInputStyle}
                  maxLength={500}
                  placeholder="Address"
                  value={this.state.address}
                  onChangeText={(text) => this.setState({ address: text })}
                />
              </View>
              <View style={styles.columnContainerStyle}>

                <Text style={styles.headingText}>About you</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="About"
                  maxLength={500}
                  value={this.state.aboutYou}
                  onChangeText={(text) => this.setState({ aboutYou: text })}
                />
              </View>
            </View>
            <View tyle={[styles.rowContainerStyle,{flex:1,marginTop:10}]}>
            <View><Button
                  title="Back"
                  color={Constants.Colors.DarkBlue}
                  onPress={this.onGoBack}
                />
                </View>
                <View>
                <Button
                title="Save Changes"
                color={Constants.Colors.DarkBlue}
                onPress={this.onPressSaveChanges}
              /></View>
            </View>
            
                </ScrollView>
</Background>
      </View>
    )
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
const styles=StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
    mainContainer: {
        flex: 1
      },
      headingText: {
        color: Constants.Colors.Black
      },
      container: {
        flex: 1,
        margin: 10
      },
      text: {
        fontSize: 18,
        alignSelf: "center"
      },
      rowContainerStyle: {
        flexDirection: "row",
        margin: 5,
        alignItems: "flex-end",
        justifyContent: "space-between",
      },
      columnContainerStyle: {
        flex: 1,
        flexDirection: 'column'
      },
      textInputStyle: {
        width: width * 0.37,
        paddingLeft: 10,
        marginLeft: -5,
        color: Constants.Colors.Black,
        borderBottomWidth: 1,
        borderBottomColor: Constants.Colors.Black
      },
})