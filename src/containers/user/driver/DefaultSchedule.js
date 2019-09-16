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
import SubmitButton from "../../../components/common/FormSubmitButton";
import ToogleSwitch from '../../../components/common/ToggleSwitch';
import moment from 'moment';
import SetDayOff from '../../../components/driver/SetDayOff';
 
import series from 'async/series';
import constant from 'async/constant';

import { StackActions, NavigationActions } from 'react-navigation';

const resetStack = ()=> {
  return NavigationActions.reset({
    index: 1,
    actions: [NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "Shedule" })],
  
  });
};



class DefaultSchedule extends Component<{}> {
  constructor(props){
    super(props);
    //let displayDate=props.propSelectedDate
    // if(props.navigation.state.params != null && props.navigation.state.params.DateFromLink){
    //   displayDate= new Date();
    // }
    //dateSelected:new Date(props.navigation.state.params.selectedDate),
   // this.props.navigation.state.params.selectedDateObj.dateString || new Date()
   //console.log('default---todays date______n props____')
   //console.log(props)
   //console.log(new Date())
   let offday=true 
   let today=props.navigation.state.params.daySelected
   let dayId=''

   
   if(!!props.weeklySchedule[today]){
    offday=props.weeklySchedule[today].dayOff
    dayId=props.weeklySchedule[today]._id
    // if(offValue=='daysOff'){
    //   offday=true
    // }

  }



   //let isdayOff=props.navigation.state.params.
   //let today=moment(new Date()).format('YYYY-MM-DD')
  //  let today=props.navigation.state.params.selectedDateObj
  //  //console.log(today)
  //   let offday=false 
  //  if(Object.keys(props.scheduleDatesList).length >0){
  //  // let today=moment(new Date()).format('YYYY-MM-DD')
  //   let dayStatus=props.scheduleDatesList[today].status
  //   //console.log('___________14_____dayoof_____')
  //   //console.log(props.scheduleDatesList[today])
  //   //console.log(dayStatus)
  //   //console.log(today)
  //   //console.log(props.scheduleDatesList[today])
  //   if(dayStatus=='daysOff'){
  //     offday=true
  //   }
  // }
  


    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      //setDayOff:offday, //props.dayOff
      //dateSelected:new Date(props.navigation.state.params.selectedDateObj || new Date()),
      scheduletype:'Default',
      setDayOff:offday,
      _id:dayId,
      driverId:props.userData.data._id,  
      dateSelected:new Date(),
      driver_id:props.userData.data._id,    
      ScheduleListData:props.listOfSchedule || [],
      navigate:this.props.navigation.navigate,
      setDayOffModalVisible:false,
      daySelected:props.navigation.state.params.daySelected,
      defaultSchedule:props.defaultSchedule[props.navigation.state.params.daySelected],
      scheduleDatesList: props.scheduleDatesList,
    }

    //console.log('___________13______---constructor state__________')
    //console.log(this.state)

    //console.log('_________5________state--this.props.navigation.state.params.selectedDateObj.dateString');
   // //console.log(props.navigation.state.params.selectedDateObj);
    //console.log('_________6________state--this.props.navigation.state.params.selectedDateObj.dateString');
    //console.log(props);

  }

  componentWillMount(){
    // setTimeout(function(that){ 
    //   //console.log('302-setTimeout-that ',that)
    //   //console.log('273--that ',that.state)
    //   //console.log('273--that ',that.props)
    //   stopLoading();
    // }, 100,this );

    //console.log('113---componentWillMount ******* ', this.props)
   // this.props.ScheduleActions.getSchedule({driverId:this.state.driver_id},this.props.tokenforuser)
    this.props.ScheduleActions.getWeeklySchedule({driverId:this.state.driver_id},this.props.tokenforuser)
  }
  // componentWillUpdate(nextProps,nextState){
  //   //console.log('nextProps manage schedule ******* ',nextProps, this.props, nextState)
    
  //   // this.setState({
  //   //   ScheduleListData: nextProps.listOfSchedule
  //   // })
  // }
   
  componentWillReceiveProps(nextProps){
    //console.log('nextProps manage schedule ******* ',nextProps, this.props)
    let offday2=true
    let today2=this.props.navigation.state.params.daySelected
    let dayId2;
    if(!!this.props.weeklySchedule[today2]){
      offday2=this.props.weeklySchedule[today2].dayOff
      dayId2=this.props.weeklySchedule[today2]._id
      // if(offValue=='daysOff'){
      //   offday=true
      // }
  
    }

    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus,
      ScheduleListData: nextProps.listOfSchedule,
      setDayOff:offday2,
      _id:dayId2
    })
    //this.forceUpdate();
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  }


  /***** set day off value managed ****/
  SetDayOnOffModalVisible(val){
    //console.log('DS---this.props.weeklySchedule[this.props.navigation.state.params.daySelected]',this.props.weeklySchedule[this.props.navigation.state.params.daySelected])
    if( this.props.weeklySchedule[this.props.navigation.state.params.daySelected]!== undefined && this.props.weeklySchedule[this.props.navigation.state.params.daySelected].slots.length>0){
      
    ////console.log('value ************* ',val)
    // Object.keys(this.props.scheduleDatesList).length>0 
    this.setState({
      setDayOffModalVisible:val
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
  }else{
    alert('Please first create slots')
  }
  }
  

  setDayToGoOff(){
    //working to day off i.e setDayOff is false here
    //console.log('151--setDayToGoOff--satte--',this.state)
    //console.log('152---setDayToGoOff--props--',this.props)
    this.setState({setDayOff:true,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
    })
  }

  setDayToGoOn(){
    //off to day working i.e setDayOff is true here
    //console.log('158---setDayToGoOn--satte--',this.state)
    //console.log('158---setDayToGoOn--props--',this.props)
    this.setState({setDayOff:false,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOn({...this.state},this.props.tokenforuser);
    })
  }

  /*** get selected date ***/
  getDateSelected(date){
    ////console.log('date selected ********* ',date)
    this.setState({
      dateSelected:moment(date._d).format('YYYY-MM-DD')
    },()=>{
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
      this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    })
  }

  componentDidMount(){
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    //this.forceUpdate();
    //console.log('185---componentDidMount ******* ', this.props)
    this.props.ScheduleActions.getCitiesList(this.props.tokenforuser)
    // setTimeout(function(that){ 
    //   //console.log('302-setTimeout-that ',that)
    //   //console.log('273--that ',that.state)
    //   //console.log('273--that ',that.props)
    //   stopLoading();
    // }, 100,this );
  }


  goToManageHourSchedule(){
    this.props.navigation.navigate("ManageDefaultScheduleWorkingHours",{daySelected:this.state.daySelected,dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
  }

  goToManageHourScheduleUpdate(id,date){
    this.deleteSchedule(id,date);
    this.props.navigation.navigate("ManageDefaultScheduleWorkingHours",{daySelected:this.state.daySelected,refresh: this.refreshFunction})
  }


  refreshFunction=()=>{
    //console.log('refreshed ************ ')
    this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    this.forceUpdate();
  }

  render() {

    const days={
                '0':'Sunday',
                '1':'Monday',
                '2':'Tuesday',
                '3':'Wednesday',
                '4':'Thursday',
                '5':'Friday',
                '6':'Saturday'              
              }
    const titleConfig = {
      title:days[this.state.daySelected] ,
      tintColor: "#fff",
      style:{fontSize:14,fontWeight:'400'}
    };

    let displayDateOnScreen=moment(this.state.dateSelected).format('MMMM DD, YYYY')


    const { navigate, goBack } = this.props.navigation;
   
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
          <TouchableOpacity onPress={()=>{
            //goBack() 
            this.props.navigation.dispatch(resetStack());
          }
          }>
            <Icon name="angle-left" size={30} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />

      <View style={[styles.ordersList,{flexDirection:'row',borderTopWidth:2,borderTopColor:Constants.Colors.LightBlue}]}>
      <View  style={{alignItems:'center',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Text  style={{fontSize:14,fontWeight:'700',textAlign:'left',color:Constants.Colors.LightBlue}}>{titleConfig.title}</Text>
          </View>
        <TouchableOpacity style={{flex:1}} onPress={()=>this.SetDayOnOffModalVisible(true)}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Image source={this.state.setDayOff ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[{width:10, height:10,marginRight:5}]} resizeMode={'contain'} />
              <Text style={[{color:Constants.Colors.Blue,fontSize:12,fontWeight:"900"}]}>{'Set day off'}</Text>
            </View>
          </TouchableOpacity>
          
        </View>
       
 
  
       {this.renderContent()}
    
      
        <View style={{ alignItems:'flex-end',justifyContent:'flex-end',marginBottom:5,marginTop:5,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
             <TouchableOpacity underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.goToManageHourSchedule()}}>
               <Image source={Constants.Images.driver.circleplus} style={[styles.btnCloseModalIcon]}/>
             </TouchableOpacity>
        </View>
        
        {/* <View style={[{flexDirection:'row',marginBottom:10}]}>
              <View style={[{flex : 1}]}>
                <SubmitButton
                  onPress={() => this.saveDefaultScheduleHours()}
                  text={'SAVE'}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
               
        </View> */}

        
        {this.renderModal()}
       
{/*        
       {this.renderBottomButtons()}
        */}
        
      </View>
    );
  }


  
  renderBottomButtons(){
    const { goBack } = this.props.navigation;
    return(
      <View style={[{flexDirection:'row',marginBottom:10}]}>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => this.saveScheduleHours()}
                  text={'SAVE'}
                  style={[styles.ButtonStyle,{backgroundColor:'#53C8E5'}]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
              <View style={[{flex : 0.5}]}>
                <SubmitButton
                  onPress={() => goBack()}
                  text={'CANCEL'}
                  style={[styles.ButtonStyle]}
                  textStyle={[{fontSize:15}]}
                />
              </View>
        </View>
    )
  }
 
      
  saveScheduleHours()
  {
    
    let weekslots=this.props.defaultSchedule;
    let weekDataList=[];
    let sendData={}
    sendData['navigate']=this.props.navigation.navigate

    for(let dayKey in  Object.keys(weekslots)){
        let weekData={}
        weekData['day']=dayKey        

        if(weekslots[dayKey].length>0){
          weekData['lat']='77'
          weekData['lng']='12'
          weekData['radius']='12'
          weekData['geometry_type']='Point'
          weekData['helper']=false
          
          weekData['equipment']=false
          weekData['message']='www'
          weekData['serving_city']=["noida","meerut"]
          weekData['location']=["noida","meerut"]

          let weekDaySlots=weekslots[dayKey]
          weekData['time']=weekDaySlots  
          weekDataList.push(weekData)

        }else{
          weekData['dayOff']= false
          weekData['message']='www'          
          weekDataList.push(weekData)
        }

    }

    let	requestObject = {
      driver_id:'5b5ab66b86e4295c2b519558',
      week:weekDataList,
      created_by:'DRIVER',
      timezone:'11',
      
      creater_id:'1222',
      serving_city:["noida","meerut"],
      sDate:'2018-08-22T11:19:00.000Z',      
      }
      sendData['requestObject']=requestObject

      //navigate:this.props.navigation.navigate,

      //console.log('****************requestObject ________________________')
      //console.log(sendData)
      

    this.props.ScheduleActions.saveDefaultSchedule(sendData,this.props.tokenforuser)
    // this.props.ScheduleActions.deleteDaySlotSchedule(sendData,this.props.tokenforuser)
    
  }

  saveDefaultScheduleHours()
  {
    //console.log('****************saveScheduleHours_________________________')
    
    let weekslots=this.props.defaultSchedule;
    let weekDataList=[];
    //console.log('****************weekslots________________________')
    //console.log(weekslots)
    let sendData={}
    sendData['navigate']=this.props.navigation.navigate

    for(let dayKey in  Object.keys(weekslots)){
     // let key of Object.keys(meals)
        let weekData={}
        weekData['day']=dayKey        

        if(weekslots[dayKey].length>0){
          //console.log('###################,,,,,,,,,,,,,,,=weekslots[dayKey][0].serving_city')
          //console.log(weekslots[dayKey][0].serving_city)
          weekData['lat']='77'
          weekData['lng']='12'
          weekData['radius']='12'
          weekData['geometry_type']='Point'
          weekData['helper']='true'
          weekData['scheduletype']=["Default"]
          weekData['equipment']='true'
          
          weekData['message']='www'
          weekData['serving_city']=weekslots[dayKey][0].serving_city
          weekData['location']=weekslots[dayKey][0].serving_city

          let weekDaySlots=weekslots[dayKey]

          var timeSlotsOnly = weekDaySlots.map(obj => ({ startTime: obj.startTime, endTime: obj.endTime }));

          //console.log('................timeSlotsOnly..........')
          //console.log(timeSlotsOnly)

        //   for (let i = 0; i < weekDaySlots.length; i++) {
        //     let slotItemObj=weekDaySlots[i]   
        // }
 

          weekData['time']=timeSlotsOnly  
          weekDataList.push(weekData)

        }
        // else{
        //   weekData['dayOff']= 'false'
        //   weekData['message']='www'          
        //   weekDataList.push(weekData)
        // }

    }

    let	requestObject = {
      driver_id:'5b5ab66b86e4295c2b519558',
      week:weekDataList,
      created_by:'DRIVER',
      timezone:'11',
      
      creater_id:'1222',
      serving_city:["noida","meerut"],
      sDate:new Date().toISOString(),      
      }
      sendData['requestObject']=requestObject

      //navigate:this.props.navigation.navigate,

      //console.log('****************requestObject ________________________')
      //console.log(sendData)
      let clean={msg:'clean'}
      clean['navigate']=this.props.navigation.navigate

    this.props.ScheduleActions.saveDefaultSchedule(sendData,this.props.tokenforuser)
    //this.props.ScheduleActions.cleanDaySlotSchedule(clean,this.props.tokenforuser)

    

  }


  ScheduleList(item){
   // //console.log('items *********** ',item)
    let startTime=item.startTime
    //let startTime=moment(item.startTime).format("hh:mm");
    let endTime=item.endTime
    let cities=[]
      if(item.serving_city!==undefined){
        cities=item.serving_city.map(obj=>{
           let city3=obj.cityName.split(',');
          return city3[0]
         // return obj.cityName;
        });
        //item.serving_city.length>0?item.serving_city.join():[]
      }
     
   // //console.log('##############################..........startTime............')
   // //console.log(startTime)
  //  //console.log(endTime)
   // //console.log(cities)
    return(
      <View style={[styles.ordersList,{justifyContent:'space-around'}]}>
        <View style={{flex:.3,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{startTime}{` to `}{endTime}</Text></View>
        
        { <View style={{flex:.55,alignItems:'center',justifyContent:'center'}}><Text style={styles.price}>{cities.join()}</Text></View>
         }

         
        {/* <View style={{flex:.25,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>

           <TouchableOpacity onPress={()=>{this.goToManageHourScheduleUpdate(item._id,item.startDate)}}>
            <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={()=>{this.deleteSchedule(item._id,item.startDate)}}>
            <IconMat name="delete" size={30} color={Constants.Colors.LightGray}/>
          </TouchableOpacity>
        </View> */}

        <View style={{flex:.15,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                 <TouchableOpacity onPress={()=>{this.deleteSchedule(item._id, item.startTime,item.endTime,this.state.daySelected)}}>
                       <IconMat name="delete" size={20} color={Constants.Colors.LightGray}/>
                </TouchableOpacity>
        </View>

        
      </View>
    )
  }

  deleteSchedule(id,startTime2,endTime2,daySelected2){
    //dayid:this.props.scheduleDatesList[this.state.dateSelected]._id, 
    let did=this.props.weeklySchedule[this.state.daySelected]._id
    //console.log('this.props.weeklySchedule[this.state.daySelected]._id',this.props.weeklySchedule[this.state.daySelected]._id)
    let sendObj={
      _id:id,
      dayid:did,
      navigate:this.props.navigation.navigate,
      daySelected:daySelected2,
      driver_id:this.state.driver_id,
      navigation:this.props.navigation
    }
    let navigate=this.props.navigation.navigate
    //console.log('  DS_485...default-schedule---deleteSchedule')
    //console.log(sendObj)

    this.props.ScheduleActions.deleteDefaultSlot(sendObj,this.props.tokenforuser)
   // this.props.ScheduleActions.getSchedule({driverId:this.state.driver_id},this.props.tokenforuser)
   // this.props.navigation.navigate('Home' )
   // this.props.navigation.navigate('DefaultSchedule',{daySelected:daySelected2})

    // setTimeout(function() {
     
       
    // }, 2000);


 

  //   series([
  //     function(callback) {
  //       this.props.ScheduleActions.deleteDefaultSlot(sendObj,this.props.tokenforuser)
  //         callback(null, 'one');
  //     },
  //     function(callback) {
  //       this.props.ScheduleActions.getSchedule(sendObj)
  //         callback(null, 'two');
  //     }, 
  //     function(callback) {
  //       this.props.navigation.navigate('DefaultSchedule',{daySelected:daySelected2})
  //         callback(null, 'one');
  //     }
  // ],
  // // optional callback
  // function(err, results) {
  //    //console.log('sch-506-done async call')

  // });

  
   
    
  }


  // deleteSchedule(id,date){
  //   //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%delete schedule-clicked')
  //   //console.log(id)
  //   //console.log(date)
  //   //console.log('$$$$$$$$$$$$$$$$$$$$.....props')
  //   //console.log(this.props)

  //   let sendObj={
  //     id:id,
  //     navigate:this.props.navigation.navigate,
	// 	  date:this.props.navigation.state.params.daySelected,
  //   }
  //   //console.log(sendObj)
  //  // this.props.ScheduleActions.deleteSchedule(sendObj,this.props.tokenforuser);
  //   this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
  //   this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.props.navigation.state.params.selectedDateObj})

  // }
   

  renderDayOff(){
    
    if(this.state.ScheduleListData.length>0){
      let today=moment(new Date()).format('YYYY-MM-DD')
      let dayStatus=this.state.ScheduleListData[today].status
      //console.log('___________14_____dayoof_____')
      //console.log(dayStatus)
      //console.log(today)
      //console.log(this.state.ScheduleListData[today])
      if(dayStatus=='daysOff'){
        this.setState({setDayOff:true})
      }

    }

  }

  renderContent(){
    return (
      <FlatList
        data={Object.values(this.props.defaultSchedule[this.props.navigation.state.params.daySelected])}
         
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
    fontWeight:'300',
    fontSize:12,
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
  defaultSchedule:state.schedule.defaultSchedule,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  weeklySchedule:state.schedule.weeklySchedule
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSchedule);
