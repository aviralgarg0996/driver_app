/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';
import Constants from "../../../constants";
import NavigationBar  from "react-native-navbar";
import Calendar from '../../../components/common/CalendarStrip';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import moment from 'moment';
import SetDayOff from '../../../components/driver/SetDayOff';

class ManageOrders extends Component<{}> {
  constructor(props){
    super(props);
    //let displayDate=props.propSelectedDate
    // if(props.navigation.state.params != null && props.navigation.state.params.DateFromLink){
    //   displayDate= new Date();
    // }
    //dateSelected:new Date(props.navigation.state.params.selectedDate),
   // this.props.navigation.state.params.selectedDateObj.dateString || new Date()
//console.log('___________12______---todays date______n props____')
   console.log('39-MS-props  ',props)
  // console.log(new Date())
   //let isdayOff=props.navigation.state.params.
   //let today=moment(new Date()).format('YYYY-MM-DD')
   let selectedDate=props.navigation.state.params.selectedDateObj || moment(new Date()).format('YYYY-MM-DD')
   let today=selectedDate
   //console.log(today)
    let offday=false 
  //  if(Object.keys(props.scheduleDatesList).length >0){
  //  // let today=moment(new Date()).format('YYYY-MM-DD')
  //   let dayStatus=props.scheduleDatesList[today].status
  //   console.log('___________14_____dayoof_____')
  //   console.log(props.scheduleDatesList[today])
  //   console.log(dayStatus)
  //   console.log(today)
  //   console.log(props.scheduleDatesList[today])
  //   if(dayStatus=='daysOff'){
  //     offday=true
  //   }
  // }
  
  //  dateSelected:new Date(props.navigation.state.params.selectedDateObj || new Date()),
  if(props.scheduleDatesList[today]){
    let offValue=props.scheduleDatesList[today].status
    if(offValue=='daysOff'){
      offday=true
    }

  }
    let daySlots2=[]
  if(props.scheduleDatesList[selectedDate]!==undefined){
    daySlots2 =props.scheduleDatesList[selectedDate].slots
  }  

  let orders2=[]
  if(props.scheduleDatesList[selectedDate]!==undefined){
    if(props.scheduleDatesList[selectedDate].orders!==undefined){
      orders2 =props.scheduleDatesList[selectedDate].orders
    }
 
  }  


  console.log('71--MS--daySlots2 ',daySlots2)
///////////////

  // var conflicts=false;
  // var allSlots =daySlots2;
  // console.log('77--daySlots2',daySlots2)

  // for (var i = 0; i < allSlots.length; i++) {
  //   slot1=allSlots[i]
  //   var otherSlots=allSlots.filter(obj => obj._id != slot1._id)
  //     for (var j = 0; j < otherSlots.length; j++) {
  //          slot2=otherSlots[j] 

             
  //           let st1= moment(initialdate + " " + slot1.startTime).toISOString();
  //           let et1= moment(initialdate + " " + slot1.endTime).toISOString();

  //           let st2= moment(initialdate + " " + slot2.startTime).toISOString();
  //           let et2= moment(initialdate + " " + slot2.endTime).toISOString();  
  //           // let st1=slot1.startTime
  //           // let st2=slot2.startTime
  //           // let et1=slot1.endTime
  //           // let et2=slot2.endTime
            
  //         //  let st1=slot1.startTime
  //         //  let st2=slot2.startTime
  //         //  let et1=slot1.endTime
  //         //  let  et2=slot2.endTime
  //          if((moment(st1).isBefore(st2)) && (moment(et1).isAfter(st2))  ){
  //           conflicts=true
  //          }else if( (moment(st2).isBefore(st1)) && (moment(et2).isAfter(st1))  ){
  //           conflicts=true
  //          }else if( (moment(st1).isAfter(st2)) && (moment(et1).isBefore(et2))  ){
  //           conflicts=true
  //          }else if((moment(st2).isAfter(st1)) && (moment(et2).isBefore(et1)) ){
  //           conflicts=true
  //          }


  //         //  if((moment(st1).isBefore(st2))st1<st2 && et1>st2){
  //         //   conflicts=true
  //         //  }else if(st2<st1 && et2>st1){
  //         //   conflicts=true
  //         //  }else if(st1>st2 &&et1<et2){
  //         //   conflicts=true
  //         //  }else if(st2>st1 && et2<et1){
  //         //   conflicts=true
  //         //  }

  //     };           
  // };


/////////////////
    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      setDayOff:offday, //props.dayOff
      navigate:this.props.navigation.navigate,
      driverId:props.userData.data._id,    
      daySlots:daySlots2,
      orders:orders2,
    
      dateSelected:selectedDate,
      ScheduleListData:props.listOfSchedule || [],
      setDayOffModalVisible:false,
      scheduleDatesList: props.scheduleDatesList,
    }

  //  console.log('___________13______---constructor state__________')
  //  console.log(this.state)

    //console.log('_________5________state--this.props.navigation.state.params.selectedDateObj.dateString');
    //console.log(props.navigation.state.params.selectedDateObj);
   // console.log('_________6________state--this.props.navigation.state.params.selectedDateObj.dateString');
 //   console.log(props);

  }

  // componentWillUpdate(nextProps,nextState){
  //   console.log('nextProps manage schedule ******* ',nextProps, this.props, nextState)
    
  //   // this.setState({
  //   //   ScheduleListData: nextProps.listOfSchedule
  //   // })
  // }

  componentWillReceiveProps(nextProps){
  //  console.log('nextProps manage schedule ******* ',nextProps, this.props)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus,
      ScheduleListData: nextProps.listOfSchedule
    })
    //this.forceUpdate();
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  }


  /***** set day off value managed ****/
  SetDayOnOffModalVisible(val){
    //console.log('value ************* ',val)
    this.setState({
      setDayOffModalVisible:val,
      _id:this.state.scheduleDatesList[this.state.dateSelected]._id,
      scheduletype: this.state.scheduleDatesList[this.state.dateSelected].scheduletype,
    })
    // this.setState({
    //   setDayOff:!this.state.setDayOff
    // },()=>{
    //   if(this.state.setDayOff){
    //     this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
    //   }else{
    //     this.props.ScheduleActions.setDayOn({...this.state},this.props.tokenforuser);
    //   }
    // })
  }
  

  setDayToGoOff(){
    //working to day off i.e setDayOff is false here
    this.setState({setDayOff:true,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
      this.props.navigation.navigate("Home",{dateSelected:this.state.dateSelected})
    })

  }

  setDayToGoOn(){
    //off to day working i.e setDayOff is true here
    console.log('MS-146-',this.state)
    this.setState({setDayOff:false,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOn({selectedDateObj: this.props.navigation.state.params.dateSelected,driver_id:this.props.userData.data._id,_id:this.state.scheduleDatesList[this.state.dateSelected]._id},this.props.tokenforuser);
      this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
      this.props.navigation.navigate("Home",{dateSelected:this.state.dateSelected})
      // setTimeout(function(data){ 
      //   console.log('MS-148-',data)
      //   data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
        
      // }, 500,this.props.navigation);
     

    })
  }

  /*** get selected date ***/
  getDateSelected(date){
  //  console.log('date selected ********* ',date)
   // console.log('MS-153 ********* ',this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')])
   // console.log('MS-153 *****slots**** ',this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')].slots)

    let daySlots3=[]
    if(this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')]!==undefined){
      daySlots3 =this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')].slots
    } 


    this.setState({
      dateSelected:moment(date._d).format('YYYY-MM-DD'),
      daySlots:daySlots3
    },()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
    //  this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);

       //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
     // this.props.navigationProps('ManageSchedule',{selectedDateObj:this.state.dateSelected });

    //  this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    //  this.forceUpdate();

    })
  }

  
  componentDidMount(){
   // this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  //  this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
  //  this.props.ScheduleActions.getCitiesList(this.props.tokenforuser)
    //this.forceUpdate();
  }


  goToManageHourSchedule(){
    this.props.navigation.navigate("ManageScheduleWorkingHours",{daySlots:this.state.daySlots,dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
  }

  goToManageHourScheduleUpdate(id,date){
    this.deleteSchedule(id,date,false);
    this.props.navigation.navigate("ManageScheduleWorkingHours",{dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
  }


  refreshFunction=()=>{
    console.log('refreshed ************ ')
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
    this.forceUpdate();
  }

  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE",
      tintColor: "#fff",
      style:{fontSize:18,fontWeight:'600'}
    };

    let displayDateOnScreen=moment(this.state.dateSelected).format('MMMM DD, YYYY')


    const { navigate, goBack } = this.props.navigation;
    console.log('_____228____ ____MS____state____')
    console.log(this.state)

     console.log('__231______ms__prop_______')
    console.log(this.props)

  //  console.log('this.state.ScheduleListData[this.state.dateSelected]')
   // console.log(this.state.scheduleDatesList[this.state.dateSelected])
    return (
      <View style={styles.container}>
      <NavigationBar
        statusBar={{hidden:true}}
        style={styles.navigationBar}
        title={titleConfig}
        rightButton={
          <View style={styles.rightButtonNav}>
            <TouchableOpacity onPress={()=>navigate('Settings')}>
              <Image
                source={Constants.Images.user.setting}
                style={styles.navIcons} resizeMode={'contain'}/>
            </TouchableOpacity>
            <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
            <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
            </View>
          </View>
        }
        leftButton={
          <TouchableOpacity onPress={()=>goBack()}>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />
  
  <View style={[styles.sectionHeaders,{flexDirection:'row', backgroundColor:'white',padding:10,justifyContent:'space-around'}]}>

    <TouchableOpacity style={{flex:1,}}>
      <Text style={[styles.textOrange,{textDecorationLine:'underline'}]}>{moment(this.state.dateSelected).format("LL")} </Text>
    </TouchableOpacity>


               
              <TouchableOpacity style={{flex:1,}} onPress={()=>{
                 this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.state.dateSelected}) 
              }
            }>
                <Text style={[styles.textOrange,{color:'orange',textDecorationLine:'underline'}]}>Manage Schedule</Text>
              </TouchableOpacity>
            </View>
        
        
        {this.renderContent()}
       
       
       
        
      </View>
    );
  }

  ScheduleList(item){
    console.log('$$$$$$$$$$$$ *********** ',item)
    // let startTime=moment(item.startTime).format("hh:mm"); 
    //moment(this.state.dateSelected).format("LLL")
    // let endTime=moment(item.endTime).format("hh:mm");
    let endTime1=item.time.endTime
    let startTime1=item.time.startTime    
    let  tempTime1 = moment.duration(startTime1);
    let  startTime = tempTime1.hours() +':' +tempTime1.minutes();

    let  tempTime2 = moment.duration(endTime1);
    let  endTime = tempTime2.hours() +':' +tempTime2.minutes();




    // let cities=item.location.join()

   // let cities='';//item.serving_city.length>0?item.serving_city.join():[]
     
    console.log('::::::::::::::::::::::::startTime:::::::::::::::::')
    console.log(startTime)
    console.log('::::::::::::::::::::::::endTime:::::::::::::::::')
    console.log(endTime)
    console.log(':::::::::::  pointerEvents="none"  :::::::::::::cities:::::::::::::::::')
  //  console.log(cities)
    //AccessibilityTraits 
    //console.log('MS-302-this.state.setDayOff',this.state.setDayOff)
    return(
      <View style={[styles.ordersList,{justifyContent:'space-around'}]}>
      
      <View style={{flex:.3,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{` ID `}{item.orderId}</Text></View>
        <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{startTime}{` to `}{endTime}</Text></View>
        {        
          <View style={{flex:.2,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{` $`}{item.totalCharge}</Text></View>
          }
          
          
        </View>
      ) 

    
  }

  deleteSchedule(id,date,isDelete){
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%delete schedule-clicked')
    console.log(id)
    console.log(date)
    let sendObj={
      _id:id,
      delete:isDelete,
      driver_id:this.props.userData.data._id,
      navigate:this.props.navigation.navigate,
		  date:this.props.navigation.state.params.selectedDateObj,
    }
    console.log(sendObj)
    let itemScheduletype=this.state.scheduleDatesList[this.state.dateSelected].scheduletype
    if(itemScheduletype=="Default"){
      this.props.ScheduleActions.deleteDefaultSlot(sendObj,this.props.tokenforuser);
    }else{
      this.props.ScheduleActions.deleteSchedule(sendObj,this.props.tokenforuser);
    }

    
    this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
    this.props.navigation.navigate('Home' )
    this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.props.navigation.state.params.selectedDateObj})

  }
   

  renderDayOff(){
    
    if(this.state.ScheduleListData.length>0){
      let today=moment(new Date()).format('YYYY-MM-DD')
      let dayStatus=this.state.ScheduleListData[today].status
      console.log('___________14_____dayoof_____')
      console.log(dayStatus)
      console.log(today)
      console.log(this.state.ScheduleListData[today])
      if(dayStatus=='daysOff'){
        this.setState({setDayOff:true})
      }

    }

  }

  renderAddButton(){
    
      return ( <View style={{ alignItems:'flex-end',justifyContent:'flex-end',marginBottom:5,marginTop:5,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
             <TouchableOpacity underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.goToManageHourSchedule()}}>
               <Image source={Constants.Images.driver.circleplus} style={[styles.btnCloseModalIcon]}/>
             </TouchableOpacity>
        </View>)
    
  }
  renderContent(){
    return (
      <FlatList
        data={this.state.orders}         
        renderItem={({item})=>this.ScheduleList(item)}
      />
    );
  }

  renderModal(){
    return(
      <Modal animationType={"fade"} transparent={true} visible={this.state.setDayOffModalVisible} onRequestClose={() => {this.setState({setDayOffModalVisible:false})}}>
            <SetDayOff navigationProps={this.props} 
            IsOff={this.state.setDayOff} 
            setDayToGoOff={()=>{this.setDayToGoOff()}} 
            setDayToGoOn={()=>{this.setDayToGoOn()}}
            SetDayOnOffModalVisible={(val)=>{this.SetDayOnOffModalVisible(val)}}/>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor:Constants.Colors.LightBlue,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    alignItems:'center'
  },
  rightButtonNav:{
    flexDirection:'row',
    alignItems:'center'
  },
  navIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 6
  },
  btCloseModal:{
			width: 40,
			height:40,
			borderRadius:40,
      backgroundColor:Constants.Colors.Orange,

	},
  btnCloseModalIcon:{
		width:20,
		height:20,
    margin:10,
    tintColor:'white',
  },
  ordersList: {
    padding:Constants.BaseStyle.PADDING * 1.2,
    borderBottomWidth:1,
    borderBottomColor:Constants.Colors.BlurGrey,
    backgroundColor:Constants.Colors.White,
    flexDirection:'row'
  },
  id: {
    color:Constants.Colors.Blue,
    fontWeight:'300',
    fontSize:12
  },
  price: {
    flex:1,
    color:Constants.Colors.Blue,
    fontWeight:'800',
    fontSize:20,
    textAlign:'center'
  },
  status: {
    flex:2,
    fontWeight:'600',
    fontSize:20,
    textAlign:'right'
  }

 
});

const mapStateToProps = state => (
  {
  //tokenforuser:state.user.userData.token,
  tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
  listOfSchedule:state.schedule.scheduleList,
  propSelectedDate:state.schedule.scheduleSelectedDate,
  driverAvailabilityStatus: state.user.driverAvailabilityStatus,
  scheduleDatesList: state.schedule.scheduleDatesList,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrders);
