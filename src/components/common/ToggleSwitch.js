import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity, Switch, AsyncStorage
} from 'react-native';

import Constants from '../../constants';
import * as UserActions from '../../redux/modules/user';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
//import { Switch } from 'react-native-switch';
import SubmitButton from "./FormSubmitButton";
import RestClient from '../../redux/modules/RestClient';


class ToogleSwitch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHelper: '',
      status: props.availabilityStatus || props.driverAvailabilityStatus,
      isMobileHandler: '',
      quesOneYesActive: false,
      quesOneNoActive: false,
      quesTwoYesActive: false,
      quesTwoNoActive: false,

      // available:true,
      toggleModalVisible: false,
      // Yes1:false,
      // No1:false,
      // Yes2:false,
      //  No2:false,
      // isAnswered:false,
      SwitchOnValueHolder: false,
      toggleSecondtModalVisible: false,
      toggleThirdtModalVisible: false,
    }
    //console.log('props driverAvailabilityStatus ******* ',this.props.availabilityStatus)
  }

  locationOn() {
    AsyncStorage.getItem("id").then((value) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let requestObject = {
            "driverid": value,
            "geometry": {
              "coordinates": { "type": [position.coords.latitude, position.coords.longitude] }
            },
            "distance": ""
          }
          RestClient.urlAdmin("/drivers/savedriverlatlng", requestObject).then((result) => {
            console.log('result availibility ******* ', result)
            if (result.status == 1) {
              console.log('location response ====', result)
            } else {
              console.log('location no response ====', result.data)
            }
          })
        },
      );
    })
  }
  locationOff() {
    AsyncStorage.getItem("id").then((value) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          let requestObject = {
            "driverid": value,
            "geometry": {
              "coordinates": { "type": ["", ""] }
            },
            "distance": ""
          }
          RestClient.urlAdmin("/drivers/savedriverlatlng", requestObject).then((result) => {
            console.log('result availibility ******* ', result)
            if (result.status == 1) {
              console.log('location response ====', result)
            } else {
              console.log('location no response ====', result.data)
            }
          })
        },
      );
    })
  }

  ShowAlert(value) {
    //alert(JSON.stringify(this.props.state.userData.data._id))
    if (value == true) {
      this.locationOn()
    }
    else {
      if (value == false) {
        //this.locationOff()
        console.log('Driver is Offline')
      }
    }
    if (value) {
      this.setState({ toggleModalVisible: !this.state.toggleModalVisibles, status: value })
    } else {
      Alert.alert(
        'Status',
        'Confirm if you want to go offline',
        [
          {
            text: 'Yes', onPress: () => {
              this.setState({ status: value }, () => {
                this.props.UserActions.availibilityStatus({ ...this.state }, this.props.tokenforuser);

                this.setState({
                  quesOneYesActive: false,
                  quesOneNoActive: false,
                  quesTwoYesActive: false,
                  quesTwoNoActive: false,
                })
              })
            }
          },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        ],
        { cancelable: false })
    }
  }

  /*** method to answer checkbox for first question ****/
  questionOne(ansType) {

    if (ansType) {
      this.setState({
        quesOneYesActive: !this.state.quesOneYesActive,
        quesOneNoActive: false, isHelper: true, toggleSecondtModalVisible: true, toggleModalVisible: false
      })

      console.log(" ques 1 yes", this.state.isHelper)

    } else {
      this.setState({
        quesOneNoActive: !this.state.quesOneNoActive,
        quesOneYesActive: false, isHelper: false, toggleSecondtModalVisible: true, toggleModalVisible: false
      })
      console.log(" ques 1 no", this.state.isHelper)
    }



    // switch(ansType){
    //   case 'YES':
    //     if(this.state.No1){
    //       this.setState({Yes1:!this.state.Yes1,No1:false,isAnswered:!this.state.isAnswered})
    //     }else{
    //       this.setState({Yes1:!this.state.Yes1,isAnswered:!this.state.isAnswered})
    //     }
    //     this.setState({toggleSecondtModalVisible:true,toggleModalVisible:false})
    //   break;
    //   case 'NO':
    //     if(this.state.Yes1){
    //       this.setState({No1:!this.state.No1,Yes1:false,isAnswered:!this.state.isAnswered})
    //     }else{
    //       this.setState({No1:!this.state.No1,isAnswered:!this.state.isAnswered})
    //     }
    //     this.setState({toggleSecondtModalVisible:true,toggleModalVisible:false})
    //   break;
    //   default:
    //   break;
    // }
  }

  /*** method to answer checkbox for second question ****/
  questionTwo(ansType) {

    if (ansType) {
      this.setState({
        quesTwoYesActive: !this.state.quesTwoYesActive,
        quesTwoNoActive: false, isMobileHandler: true, toggleSecondtModalVisible: false
      }, () => {
        console.log(" ques 2 yes", this.state)
        this.props.UserActions.availibilityStatus({ ...this.state }, this.props.tokenforuser);
        this.setState({
          quesOneYesActive: false,
          quesOneNoActive: false,
          quesTwoYesActive: false,
          quesTwoNoActive: false,
        })

      })



    } else {
      this.setState({
        quesTwoNoActive: !this.state.quesTwoNoActive,
        quesTwoYesActive: false, isMobileHandler: false, toggleSecondtModalVisible: false, toggleThirdtModalVisible: true
      }, () => {
        console.log(" ques 2 No", this.state)
        this.props.UserActions.availibilityStatus({ ...this.state }, this.props.tokenforuser);
        this.setState({
          quesOneYesActive: false,
          quesOneNoActive: false,
          quesTwoYesActive: false,
          quesTwoNoActive: false,
        })
      })

    }



    // switch(ansType){
    //   case 'YES':
    //     if(this.state.No2){
    //       this.setState({Yes2:!this.state.Yes2,No2:false,toggleSecondtModalVisible:false})
    //     }else{
    //       this.setState({Yes2:!this.state.Yes2,toggleSecondtModalVisible:false})
    //     }
    //   // this.props.UserActions.availibilityStatus({...this.state},this.props.tokenforuser);


    //   break;
    //   case 'NO':
    //     if(this.state.Yes2){
    //       this.setState({No2:!this.state.No2,Yes2:false,toggleThirdtModalVisible:true,toggleSecondtModalVisible:false})
    //     }else{
    //       this.setState({No2:!this.state.No2,toggleThirdtModalVisible:true,toggleSecondtModalVisible:false})
    //     }
    //    // this.props.UserActions.availibilityStatus({...this.state},this.props.tokenforuser);
    //   break;
    //   default:
    //   break;
    // }
  }

  // setAvailability{
  //     this.setState({
  //       available:!this.state.available,
  //     })
  //     this.props.UserActions.availibilityStatus({...this.state},this.props.tokenforuser);
  // }

  // getConfirmation(value){

  //   if(value){
  //     this.setState({toggleModalVisible:!this.state.toggleModalVisible,available:value})
  //   }else{

  //     this.setAvailibility(value)
  //   }
  // }

  setAvailibility(value) {
    //alert('hi')
    //console.log('available outside callback',this.state.available)
    this.setState({
      status: value,
    }, () => {
      //console.log('available inside callback ******** ',value)

      //this.props.UserActions.availibilityStatus({...this.state},this.props.tokenforuser);
    })
  }

  onDone() {
    //let { dispatch } = this.props.navigation;

    this.setState({
      toggleModalVisible: false,

      toggleSecondtModalVisible: false,
      toggleThirdtModalVisible: false
    })


  }



  render() {
    //const { availabilityStatus } = this.props;
    console.log(" props  driver status *********** ", this.props.availabilityStatus);
    const { availabilityStatus } = this.props;

    return (
      <View>
        <Switch
          onValueChange={this.ShowAlert.bind(this)}
          value={availabilityStatus}
        />
        {this.renderToggleModal()}
        {this.renderSecondToggleModal()}
        {this.renderThirdToggleModal()}
      </View>
    );
  }

  renderToggleModal() {


    return (
      <Modal animationType={"fade"}
        transparent={true}
        visible={this.state.toggleModalVisible}
        onRequestClose={() => { this.onCancel() }}>

        <View style={[styles.modalOuter]}>
          <View style={styles.modalInner}>

            <View>
              <Text style={[styles.checkboxText]}>{`1. Is Helper Available?`}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                {/* <TouchableOpacity onPress={()=>{this.questionOne('YES')}} style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.state.Yes1 ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[styles.checkboxIcon]} resizeMode={'contain'} />
                    <Text style={[styles.checkboxText]}>{`Yes`}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.questionOne('NO')}} style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.state.No1 ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[styles.checkboxIcon]} resizeMode={'contain'} />
                    <Text style={[styles.checkboxText]}>{`No`}</Text>
                  </TouchableOpacity> */}

                <TouchableOpacity onPress={() => this.questionOne(true)}>
                  <View style={styles.radioView}>
                    <Image
                      source={this.state.quesOneYesActive ? Constants.Images.driver.radioOn : Constants.Images.driver.radioOf}
                      style={styles.radioIcons}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.radioTxt}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.questionOne(false)}>
                  <View style={styles.radioView}>
                    <Image
                      source={this.state.quesOneNoActive ? Constants.Images.driver.radioOn : Constants.Images.driver.radioOf}
                      style={styles.radioIcons}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.radioTxt}>No</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>



          </View>
        </View>

      </Modal>
    )
  }

  renderButtons() {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <SubmitButton
            onPress={() => this.onDone()}
            text={`GOT IT`}
            style={[styles.ButtonStyle, { backgroundColor: '#53C8E5' }]}
            textStyle={[{ fontSize: 15 }]}
          />
        </View>

        {/* <View style={{flex : 0.5}}>
            <SubmitButton
            onPress={() => this.onCancel()}
            text={`Cancel`}
            style={[styles.ButtonStyle]}
            textStyle={[{fontSize:15}]}
            />
          </View> */}
      </View>
    )
  }
  renderSecondToggleModal() {
    return (
      <Modal animationType={"fade"}
        transparent={true}
        visible={this.state.toggleSecondtModalVisible}
        onRequestClose={() => { this.onCancel() }}>

        <View style={[styles.modalOuter]}>
          <View style={styles.modalInner}>

            <View style={{ marginTop: 10 }}>
              <Text style={[styles.checkboxText]}>{`2. Do you have some one to assist you with the mobile app while driving ?`}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => this.questionTwo(true)}>
                  <View style={styles.radioView}>
                    <Image
                      source={this.state.quesTwoYesActive ? Constants.Images.driver.radioOn : Constants.Images.driver.radioOf}
                      style={styles.radioIcons}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.radioTxt}>Yes</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.questionTwo(false)}>
                  <View style={styles.radioView}>
                    <Image
                      source={this.state.quesTwoNoActive ? Constants.Images.driver.radioOn : Constants.Images.driver.radioOf}
                      style={styles.radioIcons}
                      resizeMode={"contain"}
                    />
                    <Text style={styles.radioTxt}>No</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>





          </View>
        </View>

      </Modal>
    )
  }

  renderThirdToggleModal() {
    return (
      <Modal animationType={"fade"}
        transparent={true}
        visible={this.state.toggleThirdtModalVisible}
        onRequestClose={() => { this.onCancel() }}>

        <View style={[styles.modalOuter]}>
          <View style={styles.modalInner}>

            <View style={{ marginTop: 10 }}>
              <Text style={[styles.checkboxText, { textAlign: 'center' }]}>{`you wont receive any new order notification while moving.`}</Text>

            </View>

            {this.renderButtons()}



          </View>
        </View>

      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOuter: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
  },
  modalInner: {
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
    backgroundColor: '#fff',
    //height:200,
    padding: 20,
    borderRadius: 5
  },
  checkboxIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  checkboxText: {
    fontSize: 15,
    fontWeight: '900',
    backgroundColor: 'transparent',
    color: Constants.Colors.Blue,
    //textAlign:'center'
  },
  ButtonStyle: {
    borderWidth: 1,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    borderRadius: 5,
    paddingLeft: 3,
    paddingRight: 3,
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center"
  },
  radioTxt: {
    color: Constants.Colors.Gray,
    fontSize: 11,
    padding: Constants.BaseStyle.PADDING * 0.25
  },

  radioIcons: {
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 0.2,
  },
});


const mapStateToProps = state => ({
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  driverAvailabilityStatus: state.user.driverAvailabilityStatus
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ToogleSwitch);
