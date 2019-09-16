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
import MapView, { Marker ,Circle,AnimatedRegion, Animated } from 'react-native-maps'; 
import { startLoading, stopLoading, showToast, hideToast } from '../../../redux/modules/app';
import { StackActions, NavigationActions } from 'react-navigation';

 const resetStack = ()=> {
  return NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Home" }),
        ],
  });
};


// import { StackActions, NavigationActions } from 'react-navigation';

// const resetStack = (data)=> {
//   return NavigationActions.reset({
//     index: 1,
//     actions: [NavigationActions.navigate({ routeName: "Home" }),
//         NavigationActions.navigate({ routeName: "DefaultSchedule",params:{   daySelected:data.daySelected} })],
  
//   });
// };


class ManageSchedule extends Component<{}> {
  constructor(props){
    super(props);
    //let displayDate=props.propSelectedDate
    // if(props.navigation.state.params != null && props.navigation.state.params.DateFromLink){
    //   displayDate= new Date();
    // }
    //dateSelected:new Date(props.navigation.state.params.selectedDate),
   // this.props.navigation.state.params.selectedDateObj.dateString || new Date()
////console.log('___________12______---todays date______n props____')
   //console.log('39-MS-props  ',props)
  // ////console.log(new Date())
   //let isdayOff=props.navigation.state.params.
   //let today=moment(new Date()).format('YYYY-MM-DD')
   let selectedDate=moment(new Date()).format('YYYY-MM-DD'); //props.navigation.state.params.selectedDateObj || moment(new Date()).format('YYYY-MM-DD')
   if(props.navigation.state.params.selectedDateObj!==undefined){
    selectedDate =props.navigation.state.params.selectedDateObj //|| moment(new Date()).format('YYYY-MM-DD')
   } 
   let today=selectedDate
   //////console.log(today)
    let offday=false 
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
  
  //  dateSelected:new Date(props.navigation.state.params.selectedDateObj || new Date()),
  if(  Object.keys(props.scheduleDatesList).length>0 && props.scheduleDatesList[today]){
    let offValue=props.scheduleDatesList[today].status
    if(offValue=='daysOff'){
      offday=true
    }

  }
    let daySlots2=[]
  if( Object.keys(props.scheduleDatesList).length>0  &&  props.scheduleDatesList[selectedDate]!==undefined){
    daySlots2 =props.scheduleDatesList[selectedDate].slots
  }  

  let orders2=[]
  if(  Object.keys(props.scheduleDatesList).length>0  && props.scheduleDatesList[selectedDate]!==undefined){
    if(props.scheduleDatesList[selectedDate].orders!==undefined){
      if (props.scheduleDatesList[selectedDate].orders.length>0){
        orders2 =props.scheduleDatesList[selectedDate].orders
      }else{
        orders2=[]
      }
    }
 
  }  


//cd   alert('71--MS--daySlots2 ',daySlots2)
///////////////

  // var conflicts=false;
  // var allSlots =daySlots2;
  // //console.log('77--daySlots2',daySlots2)

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
// this.props.scheduleDatesList[this.state.dateSelected].slots
// !this.state.scheduleDatesList[this.state.dateSelected].slots || this.state.scheduleDatesList[this.state.dateSelected].slots.length==0
/////////////////
    this.state={
      availabilityStatus:props.driverAvailabilityStatus,
      setDayOff:offday, //props.dayOff
      navigate:this.props.navigation.navigate,
      driverId:props.userData.data._id,    
      daySlots:daySlots2,
      orders:orders2,
      listRefresh:false,
      dateSelected:selectedDate,
      ScheduleListData:props.listOfSchedule || [],
      setDayOffModalVisible:false,
      scheduleDatesList: props.scheduleDatesList,
      scheduletype:"Manual",
      _id:"",
      singleSlot:{},
      renderHeader: false,
    }
    let dateDay=moment(selectedDate).day()
    //console.log('161---dateDay---',dateDay)

  //  //console.log('___________13______---constructor state__________')
  //  //console.log(this.state)

    ////console.log('_________5________state--this.props.navigation.state.params.selectedDateObj.dateString');
    ////console.log(props.navigation.state.params.selectedDateObj);
   // //console.log('_________6________state--this.props.navigation.state.params.selectedDateObj.dateString');
 //   //console.log(props);

  }

  // componentWillUpdate(nextProps,nextState){
  //   //console.log('nextProps manage schedule ******* ',nextProps, this.props, nextState)
    
  //   // this.setState({
  //   //   ScheduleListData: nextProps.listOfSchedule
  //   // })
  // }

  componentDidUpdate(){


    // setTimeout(function(that){
    //   //console.log('185-componentDidUpdate- MS-timeout-- ',that)					 
    //    that.stop(); 
      
    //    }, 1000,{stop:stopLoading } );


  }
  componentWillReceiveProps(nextProps){
   //console.log('nextProps manage schedule ******* ',nextProps, this.props)
    this.setState({
      availabilityStatus:nextProps.driverAvailabilityStatus,
      scheduleDatesList: nextProps.scheduleDatesList
    })
    //this.forceUpdate();
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  }


  /***** set day off value managed ****/
  SetDayOnOffModalVisible(val){
    ////console.log('value ************* ',val)
    if(this.props.scheduleDatesList[this.state.dateSelected].status==="daysOff" && !!this.props.scheduleDatesList[this.state.dateSelected].slots && this.props.scheduleDatesList[this.state.dateSelected].slots.length==0){
      alert('Please first create a slot')
    }else{ 
            let id2;
            let dayType;
          if(  Object.keys(this.props.scheduleDatesList).length>0  ){
            if(  Object.keys(this.props.scheduleDatesList).length>0 && this.state.scheduleDatesList[this.state.dateSelected].scheduletype==="Default"){
              id2=this.state.scheduleDatesList[this.state.dateSelected]._id
              dayType="Manual"
            }else{
              id2=this.state.scheduleDatesList[this.state.dateSelected]._id
              dayType="Manual"
            }
         //   let slotForDayOn=this.props.scheduleDatesList[this.state.dateSelected].slots[0]

         let   slotForDayOn={
              endTime: "10:08",
              startTime: "10:05",
              serving_city : ["5b8d0495c405952aa0d704ac"]
            }  

            // if(this.props.scheduleDatesList[this.state.dateSelected].slots===undefined){
            //   slotForDayOn={
            //     endTime: "10:08",
            //     startTime: "10:05",
            //     serving_city : ["5b8d0495c405952aa0d704ac"]
            //   }  
            // }


            this.setState({
              setDayOffModalVisible:val,
              _id:id2,
              scheduletype: "Manual",
              singleSlot:slotForDayOn
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
        } 
}

  setDayToGoOff(){
    //working to day off i.e setDayOff is false here
    this.setState({setDayOff:true,setDayOffModalVisible:false},()=>{
      this.props.ScheduleActions.setDayOFF({...this.state},this.props.tokenforuser);
      //this.props.navigation.navigate("Home",{dateSelected:this.state.dateSelected})
    //  this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.state.dateSelected })
    })

  }

  setDayToGoOn(){
    //off to day working i.e setDayOff is true here
    //console.log('MS-146-',this.state)
    this.setState({setDayOff:false,setDayOffModalVisible:false},()=>{
      //this.props.ScheduleActions.setDayOn({selectedDateObj: this.props.navigation.state.params.dateSelected,driver_id:this.props.userData.data._id,_id:this.state.scheduleDatesList[this.state.dateSelected]._id},this.props.tokenforuser);
      this.props.ScheduleActions.setDayOn({...this.state},this.props.tokenforuser);
     // this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
     // this.props.navigation.navigate("Home",{dateSelected:this.state.dateSelected})
    // this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.state.dateSelected })
     
     
      // setTimeout(function(data){ 
      //   //console.log('MS-148-',data)
      //   data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
        
      // }, 500,this.props.navigation);
     

    })
  }

  /*** get selected date ***/
  getDateSelected(date){
   //console.log('date selected ********* ',date)
   // //console.log('MS-153 ********* ',this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')])
   // //console.log('MS-153 *****slots**** ',this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')].slots)

   //console.log('moment(moment(new Date())  isSameOrBefore(date) ',moment(moment(new Date()).format('YYYY-MM-DD')).isSameOrBefore(date) )
   //console.log('moment(moment(new Date()).add(55 .isSameOrAfter(date)',moment(moment(new Date()).add(55, 'days').format("YYYY-MM-DD")).isSameOrAfter(date))

   if(moment(moment(new Date()).format('YYYY-MM-DD')).isSameOrBefore(date)   && moment(moment(new Date()).add(55, 'days').format("YYYY-MM-DD")).isSameOrAfter(date)){
    let daySlots3=[]
    if( Object.keys(this.props.scheduleDatesList).length>0  && this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')]!==undefined){
      daySlots3 =this.props.scheduleDatesList[moment(date._d).format('YYYY-MM-DD')].slots
    } 


    this.setState({
      dateSelected:moment(date._d).format('YYYY-MM-DD'),
      daySlots:daySlots3
    },()=>{
      //console.log('date selected *updated******** ',this.state)
      //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
    //  this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    //this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);

       //this.props.ScheduleActions.SET_SCHEDULE_ORDER_DATE(this.state.dateSelected);
     // this.props.navigationProps('ManageSchedule',{selectedDateObj:this.state.dateSelected });

    //  this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    //  this.forceUpdate();

    })

  }else{
    alert('Selected date is beyond range, please select a date in range')
  }
}
 
  
  componentWillMount(){
   // startLoading();
    // setTimeout(function(that){
    //   //console.log('302-MS-componentWillMount setTimeout-Calendar ',that)
    //   //console.log('273 MS-componentWillMount -Calendar-that ',that.state)
    //   //console.log('273-MS-componentWillMount Calendar-that ',that.props)
    //   that.start();
    //  }, 50,{start:startLoading} );
// only conditionally call api 
   // this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
    //this.props.ScheduleActions.getCitiesList(this.props.tokenforuser)
  }
  componentDidMount(){
   // startLoading();
  //  setTimeout(() => {this.setState({renderHeader: true})}, 500);

   // stopLoading();

  //  setTimeout(function(that){ 
  //   //console.log('302-setTimeout-that ',that)
  //   //console.log('273--that ',that.state)
  //   //console.log('273--that ',that.props)
  //   stopLoading();
  // }, 100,this );

   // this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
  //  this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
   // this.props.ScheduleActions.getCitiesList(this.props.tokenforuser)
  //  this.props.ScheduleActions.getSchedule3(this.props.scheduleDatesList)
   // this.forceUpdate();
  //  setTimeout(function(that){ 
  //  //console.log('273--that ',that)
  //  //console.log('273--that ',that.state)
  //  //console.log('273--that ',that.props)
  //  if(!that.state.listRefresh){
  //   that.setState({listRefresh:true},()=>{
  //     that.forceUpdate(()=>{
  //       //console.log('275--that forceUpdate')
  //      })
  //    })
   
  // }
   

  //    //  data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
  //   // data.navigate('ManageSchedule', {selectedDateObj: data.state.params.dateSelected});
  // }, 1000,this );

  }


  goToManageHourSchedule(){
    this.props.navigation.navigate("ManageScheduleWorkingHours",{daySlots:this.state.daySlots,dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
  }

  goToManageHourScheduleUpdate(id,startTime2,endTime2,serving_city2,date){
    this.deleteSchedule(id,date,false);
    //console.log('273-startTime',startTime2)
    //console.log('273-endTime',endTime2)
    //console.log('273-serving_city',serving_city2)
    this.props.navigation.navigate("ManageScheduleWorkingHours",{startTime:startTime2,endTime:endTime2,serving_city:serving_city2,dateSelected:this.state.dateSelected,refresh: this.refreshFunction})
    //this.deleteSchedule(id,date,false);
  }


  refreshFunction=()=>{
    //console.log('refreshed ************ ')
    //this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);
    this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
    this.forceUpdate();
  }

  render() {
    const titleConfig = {
      title: "MANAGE SCHEDULE",
      tintColor: "#fff",
      style:{fontSize:14,fontWeight:'400'}
    };

    let displayDateOnScreen=moment(this.state.dateSelected).format('MMMM DD, YYYY')


    const { navigate, goBack } = this.props.navigation;
    //console.log('_____228____ ____MS____state____')
    //console.log(this.state)

     //console.log('__231______ms__prop_______')
    //console.log(this.props)
    //console.log('__231______ms__state_______')
    //console.log(this.state)
    const {
      renderHeader,
      
    } = this.state;

  //  //console.log('this.state.ScheduleListData[this.state.dateSelected]')
   // //console.log(this.state.scheduleDatesList[this.state.dateSelected])
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
           //resetStack({selectedDateObj:this.state.dateSelected});  
           this.props.navigation.dispatch(resetStack());
          }
          }>
            <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
          </TouchableOpacity>
        }
      />
{/*       
      { renderHeader && <Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.dateSelected}/>}
         */}
<Calendar getDateSelected={this.getDateSelected.bind(this)} currentDate={this.state.dateSelected}/>
{/*         
        {this.renderDayOff()} 
       */}

        <View style={[styles.ordersList,{flexDirection:'row',borderTopWidth:2,borderTopColor:Constants.Colors.LightBlue}]}>
          <View  style={{alignItems:'center',justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Text  style={{fontSize:14,fontWeight:'700',textAlign:'left',color:Constants.Colors.LightBlue}}>{displayDateOnScreen}</Text>
          </View>
      { Object.keys(this.props.scheduleDatesList).length>0 && !!this.props.scheduleDatesList[this.state.dateSelected] && !this.props.scheduleDatesList[this.state.dateSelected].orders && <TouchableOpacity style={{flex:1}} onPress={()=>this.SetDayOnOffModalVisible(true)}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
              <Image source={this.props.scheduleDatesList[this.state.dateSelected].status=="daysOff" ? Constants.Images.driver.checked : Constants.Images.driver.unchecked} style={[{width:10, height:10,marginRight:5}]} resizeMode={'contain'} />
              <Text style={[{color:Constants.Colors.Blue,fontSize:12,fontWeight:"900"}]}>{'Set day off'}</Text>
            </View>
          </TouchableOpacity>
      }
        </View>
       
         {this.renderContent()}
       {
         this.renderAddButton()
         
         }
        
        {this.renderModal()} 
 
        
      </View>
     

    );
  }

  ScheduleList(item){
    //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$render items *********** ',item)  
    // let startTime=moment(item.startTime).format("hh:mm");
    // let endTime=moment(item.endTime).format("hh:mm");
    //39-MS-props 
    if(!!this.props.deletedDefaultSlotsIdsDates[ item._id]){
    //console.log(' 491--this.props.deletedDefaultSlots.includes(item._id) ',this.props.deletedDefaultSlots.includes(item._id))
    //console.log('491--this.props.deletedDefaultSlotsDates .format(YYYY-MM-DD))',this.props.deletedDefaultSlotsIdsDates[ item._id].includes(moment(this.state.dateSelected).format('YYYY-MM-DD')))
    //console.log('491--this.props.deletedDefaultSlotsDates format(DD-MM-YYYY))',this.props.deletedDefaultSlotsIdsDates[ item._id].includes(moment(this.state.dateSelected).format('DD-MM-YYYY')))
    //console.log('491-- format(DD-MM-YYYY))',this.props.deletedDefaultSlotsIdsDates[ item._id].includes(moment(this.state.dateSelected).format('DD-MM-YYYY')))
    }
    

    if(this.props.deletedDefaultSlots.includes(item._id) && !!this.props.deletedDefaultSlotsIdsDates[ item._id]){

      let f1=this.props.deletedDefaultSlotsIdsDates[ item._id].includes(moment(this.state.dateSelected).format('YYYY-MM-DD'))
      let f2=this.props.deletedDefaultSlotsIdsDates[ item._id].includes(moment(this.state.dateSelected).format('DD-MM-YYYY'))
      if(f1 || f2){
        //console.log('not--rendring-slot-deleted')
        return;
      }

     
    }
    //console.log(' --rendring-slot- ')
    let startTime=item.startTime
    let endTime=item.endTime
    // let cities=item.location.join()
    let cities2=[];
  if(!!item.serving_city && item.serving_city.length>0){
     cities2=item.serving_city.map((obj)=>{
       let city3=obj.cityName.split(',');
      return city3[0]
    })
  }else{
   cities2=[];
  }
      cities=cities2.length>0?cities2.join():[]
     
    //console.log('::::::::::::::::::::::::startTime:::::::::::::::::')
    //console.log(startTime)
    //console.log('::::::::::::::::::::::::endTime:::::::::::::::::')
    //console.log(endTime)
    //console.log(':::::::::::  pointerEvents="none"  :::::::::::::cities:::::::::::::::::')
    //console.log(cities)
    //AccessibilityTraits 
    //console.log('MS-302-this.state.setDayOff',this.state.setDayOff)
    if(this.state.setDayOff){

      return(
        <View pointerEvents="none" style={[styles.ordersList,{justifyContent:'space-around'}]}>
          <View style={{flex:.30,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{startTime}{` to `}{endTime}</Text></View>
          {        
                  <View style={{flex:.5,alignItems:'center',justifyContent:'center'}}><Text style={styles.price}>{cities}</Text></View>
                  }
                  <View   style={{flex:.15,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
          
                    <TouchableOpacity onPress={()=>{this.goToManageHourScheduleUpdate(item._id,item.startTime,item.endTime,item.serving_city,item.startDate)}}>
                      <IconMat name="mode-edit" size={20} color={Constants.Colors.LightBlue}/>
                    </TouchableOpacity>
                    
          
                    <TouchableOpacity onPress={()=>{this.deleteSchedule(item._id,item.startDate,true)}}>
                      <IconMat name="delete" size={20} color={Constants.Colors.LightGray}/>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              )

    }else{
      return(
        <View style={[styles.ordersList,{justifyContent:'space-around'}]}>
          <View style={{flex:.30,alignItems:'center',justifyContent:'center'}}><Text style={styles.id}>{startTime}{` to `}{endTime}</Text></View>
    {        
            <View style={{flex:.55,alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}><Text style={styles.price}>{cities}</Text></View>
            }
            <View style={{flex:.15,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
    
              <TouchableOpacity onPress={()=>{this.goToManageHourScheduleUpdate(item._id,item.startTime,item.endTime,item.serving_city,item.startDate)}}>
                <IconMat name="mode-edit" size={20} color={Constants.Colors.LightBlue}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.deleteSchedule(item._id,item.startDate,true)}}>
                <IconMat name="delete" size={20} color={Constants.Colors.LightGray}/>
              </TouchableOpacity>
            </View>
            
          </View>
        )

    }

    
  }

  deleteSchedule(id,date,isDelete){
    //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%delete schedule-clicked')
    //console.log('this.state.scheduleDatesList[this.state.dateSelected].scheduletype ',this.state.scheduleDatesList[this.state.dateSelected].scheduletype)
    //console.log(date)
  //if(this.state.scheduleDatesList[this.state.dateSelected].scheduletype!=="Default"){
    let sendObj={
      _id:id,
      dayid:this.props.scheduleDatesList[this.state.dateSelected]._id,
      delete:isDelete,
      driver_id:this.props.userData.data._id,
      navigate:this.props.navigation.navigate,
      date:this.props.navigation.state.params.selectedDateObj,
      navigation:this.props.navigation
    }
    //console.log('--sendObj--',sendObj)
   // let itemScheduletype=this.state.scheduleDatesList[this.state.dateSelected].scheduletype
    if(this.props.defaultSlotsIds.includes(id)){
      //console.log( 'defualt slot--deleteDefaultSlotManually')
     // deleteDefaultSlotManually this.props.ScheduleActions.deleteDefaultSlot(sendObj,this.props.tokenforuser);
     console.log('delete-default-manually-dayid-',this.props.defaultSlotIdDayId[id])

     if(this.state.scheduleDatesList[this.state.dateSelected].scheduletype==="Default"){
      this.props.ScheduleActions.deleteDefaultSlotManually(sendObj,this.props.tokenforuser);
     }else{
      let temDayId=this.props.defaultSlotIdDayId[id]
      sendObj.dayid=temDayId
      this.props.ScheduleActions.deleteDefaultSlotManually(sendObj,this.props.tokenforuser);

     }
     
    }else{
      this.props.ScheduleActions.deleteSchedule(sendObj,this.props.tokenforuser);
    }

    
    this.props.ScheduleActions.getSchedule({...this.state},this.props.tokenforuser);
   // this.props.navigation.navigate('Home' )
    //this.props.navigation.navigate('ManageSchedule',{selectedDateObj:this.props.navigation.state.params.selectedDateObj})

  // }else{
  //   alert('Default schedule can not be deleted from here')
  // }
  }
   

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

  renderAddButton(){
    if(moment(moment(new Date()).format('YYYY-MM-DD')).isSameOrBefore(this.state.dateSelected)   && moment(moment(new Date()).add(55, 'days').format("YYYY-MM-DD")).isSameOrAfter(this.state.dateSelected)){
      return ( <View style={{ alignItems:'flex-end',justifyContent:'flex-end',marginBottom:5,marginTop:5,marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100)*5}}>
      <TouchableOpacity underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {this.goToManageHourSchedule()}}>
        <Image source={Constants.Images.driver.circleplus} style={[styles.btnCloseModalIcon]}/>
      </TouchableOpacity>
 </View>)
    }
    return
    
  }
  renderContent(){
    if(Object.keys(this.props.scheduleDatesList).length== 0 || (!!this.props.scheduleDatesList[this.state.dateSelected].slots &&  this.props.scheduleDatesList[this.state.dateSelected].slots.length==0)){
        if(!this.state.setDayOff){
          return(
            <View style={{alignItems:'center',justifyContent:'center',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*30/100}}>
              <Text  style={{fontSize:16,fontWeight:'700',textAlign:'center',alignItems:'center',justifyContent:'center'}}>{'No Schedule Available!!\r\nGo ahead and manage\r\navailable slots.'}</Text>
            </View>
            
          )
        }
        else{
          return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',marginVertical: Constants.BaseStyle.DEVICE_WIDTH*30/100}}>
              <Text  style={{fontSize:18,fontWeight:'700',textAlign:'center',alignItems:'center',justifyContent:'center',color:Constants.Colors.LightBlue}}>{'You are off today.'}</Text>
            </View>
          )
        }
    }
    else{
      return (
        <FlatList
          data={this.props.scheduleDatesList[this.state.dateSelected].slots}
           
          renderItem={({item})=>this.ScheduleList(item)}
        />
      );
    }
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
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  deletedDefaultSlots:state.schedule.deletedDefaultSlots,
  defaultSlotsIds:state.schedule.defaultSlotsIds,
  deletedDefaultSlotsDates:state.schedule.deletedDefaultSlotsDates,
  deletedDefaultSlotsIdsDates: state.schedule.deletedDefaultSlotsIdsDates,
  defaultSlotIdDayId: state.schedule.defaultSlotIdDayId
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
