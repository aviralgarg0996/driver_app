import React, {  Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Constants from "../../constants";
import OrderButton from '../../components/common/FormSubmitButton';
import {  Calendar} from 'react-native-calendars';
import * as ScheduleActions from '../../redux/modules/schedule';
import {  bindActionCreators} from "redux";
import {  connect} from 'react-redux';
import moment from 'moment';
import _ from 'underscore'
import { stopLoading } from '../../redux/modules/app';
var Data={};

class DriverSchedule extends Component < {} > {
  constructor(props) {
    super(props);
    let datesData = props.scheduleDatesList;
    let newDatesData = {};
    let newScheduleDatesList = {}
    console.log('---ds21-props-DS----props------')
    console.log(props)

    console.log('_____2__________newScheduleDatesList')
    console.log(datesData);


    this.state = {
      // showOrder:orderDates
      startDate: "",
      endDate: "",
      scheduleDatesList: datesData, //props.scheduleDatesList,
      driverId: props.userData.data._id,
      selectedStartDate: moment(new Date()).format('YYYY-MM-DD'),
      selectedDay: new Date().getDay(),
    }

  }
  componentWillReceiveProps(nextProps) {
    //console.log('nextProps ******* ',nextProps)
    this.setState({
      scheduleDatesList: nextProps.scheduleDatesList
    })
  }

  componentDidMount() {
    console.log('-51--DS componentDidMount------')
    this.props.onRef(this)
   // this.props.ScheduleActions.getSchedule({ ...this.state }, this.props.tokenforuser);

    //stopLoading();
  }
  componentWillUnmount() {
    console.log('-57--DS componentWillUnmount------')
   // this.props.onRef(undefined)
  }
  calendorUpdate() {
    console.log('-61--DS calendorUpdate------')
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 2, 10);
    console.log("_________4__________date range-last day____________________");
    console.log(lastDay);

    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");

    this.setState({
      startDate: firstDay,
      endDate: lastDay
    }, () => {
      //console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser) 
      this.props.ScheduleActions.getSchedule({ ...this.state
      }, this.props.tokenforuser);
    })

  }
  componentWillMount() {
    // setTimeout(function(that){ 
    //   console.log('302-setTimeout-that ',that)
    //   console.log('273--that ',that.state)
    //   console.log('273--that ',that.props)
    //   stopLoading();
    // }, 100,this );

    console.log('-84--DS componentWillMount------')
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 2, 10);

    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
    console.log("_________5__________date range-last day____________________");
    console.log(lastDay);
    console.log('######################..######################     #############')
    console.log('######################..######################     #############')
    console.log('######################..######################     #############')
    console.log('######################..######################     #############')
    console.log('######################..######################     #############')
    console.log('######################...(new Date()).getMonth() #############')
    console.log(moment(new Date()).add(56, 'days').format("YYYY-MM-DD"))
    console.log(moment(new Date()).add(2, 'days').format("YYYY-MM-DD"))
    console.log((new Date()).getMonth())
    console.log((new Date()).getDate())


    this.setState({
      startDate: firstDay,
      endDate: lastDay
    }, () => {
      //console.log('isnide componet will mount home ********* ',{...this.state},this.props.tokenforuser) 
      this.props.ScheduleActions.getSchedule({ ...this.state
      }, this.props.tokenforuser);
    })
   // this.props.ScheduleActions.getSchedule({ ...this.state
   // }, this.props.tokenforuser);

  }

  OnDayClicked(dateClicked) {
    //this.props.navigation.state.params.selectedDateObj.dateString || new Date()

    this.setState({scheduleDatesList: this.props.scheduleDatesList },()=>{
     // console.log('119--this.state...', this.state)
      console.log('120--this.props.scheduleDatesList...', this.props.scheduleDatesList)
      });  
    // this.props.navigationProps('ManageSchedule', {
    //   selectedDateObj: dateClicked.dateString,
    //   refreshCal: this.refreshCalendorFunction
    // })
  }
  refreshCalendorFunction = () => {


    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 2, 10);
console.log('136--this.props.scheduleDatesList',this.props.scheduleDatesList)
    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
    // this.props.ScheduleActions.getSchedule2({ ...this.state
    //   }, this.props.tokenforuser,this.props.scheduleDatesList);

    this.setState({
      startDate: firstDay,
      endDate: lastDay
    }, () => {
      //console.log('isnide refreshCalendorFunction ********* ',{...this.state},this.props.tokenforuser) 
      this.props.ScheduleActions.getSchedule2({ ...this.state
      }, this.props.tokenforuser,this.props.scheduleDatesList);
      // this.forceUpdate();
    })




  }

  dayOffScheduleDates() {
    console.log('dayOffScheduleDates')
  }

  availableDayScheduleDates() {
    console.log('availableDayScheduleDates')
  }

  orderScheduleDates() {
    console.log('orderScheduleDates')
  }

//   onDateChange(date) {
//     console.log('DS-145--onDateChange....',date)
//     //let newData=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
//     //let newData2=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
//     //let dataDeates=this.state.scheduleDatesList
//   //   if(dataDeates.length>0){
//   //   dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
//   //   dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
//   //   //scheduleDatesList:dataDeates


//   // }

  

//  if(Data==undefined && this.state.scheduleDatesList){
//   Data=this.state.scheduleDatesList
//  }
//  console.log('DS-196--this.state....',this.state)
   
//  let dataDeates={};
//     dataDeates[date.dateString]= {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
//   var temp={};
//    for(var key in Data) 
//   {  temp[key]=Data[key];
//   }

//   console.log('DS-194--Data....',Data)
//   var updatedKitchen = _.extend(temp, dataDeates);
//   this.setState({scheduleDatesList:updatedKitchen},()=>{
//     console.log('DS-196--this.state....',this.state)
//     console.log('DS-198--this.props....',this.props)
//   });


//   return;


//       this.setState({
//         selectedStartDate: moment(new Date(date.dateString)).format('YYYY-MM-DD'),
//         selectedDay:(new Date(date.dateString)).getDay(),

//       });
//       this.props.onDateSelected(date);
//       this.forceUpdate();
//         console.log('DS-151--this.setState....',this.state)
//   }

// onDateChange(date) {
//       console.log('DS-145--onDateChange....',date)
//       //let newData=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
//       //let newData2=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
//       let dataDeates=this.state.scheduleDatesList
//     //   if(dataDeates.length>0){
//     //   dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
//     //   dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
//     //   //scheduleDatesList:dataDeates
//     // }


//     this.setState({
//       selectedStartDate: moment(new Date(date.dateString)).format('YYYY-MM-DD'),
//       selectedDay:(new Date(date.dateString)).getDay(),

//     });
//     this.props.onDateSelected(date);
//     this.forceUpdate();
//       console.log('DS-151--this.setState....',this.state)
// }


onDateChange(date) {
  console.log('DS-145--onDateChange....', date)
  console.log('DS-193--onDateChange..this.state..', this.state)
  //let newData=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
  //let newData2=this.state.scheduleDatesList[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
 //if(this.props.scheduleDatesList.length>0){
  let dataDeates =  JSON.parse(JSON.stringify(this.props.scheduleDatesList))
  //let dataDeates =   this.props.scheduleDatesList
 
  // for (let key1 in dataDeates)
  //   Data[key1] = dataDeates[key1];

  // if (dataDeates.length > 0) {
  //   // dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selected=true;
  //   // dataDeates[moment(new Date(date.dateString)).format('YYYY-MM-DD')].selectedColor='#33C8E5';
  //   //scheduleDatesList:dataDeates
  // }
  console.log('202--this.props.scheduleDatesList...', this.props.scheduleDatesList)
  this.props.onDateSelected(date)
 this.refreshCalendorFunction()


  // this.setState({       
  //                 selectedStartDate: moment(new Date(date.dateString)).format('YYYY-MM-DD'),
  //                 selectedDay: (new Date(date.dateString)).getDay(),
  //                 },()=>{
  //                         if(Object.keys(dataDeates).length > 0){
  //                               let selectedDateData=dataDeates[date.dateString] || {}
  //                               this.forceUpdate(()=>{
  //                               dataDeates[date.dateString] =  Object.assign(selectedDateData, { selected: true,  selectedColor: 'orange',});
  //                               var temp = {};
  //                               // for (let key in Data)
  //                               //   temp[key] = Data[key];
  //                                 var updatedKitchen = _.extend({}, temp);
  //                                 this.setState({scheduleDatesList: dataDeates },()=>{
  //                                   console.log('223--this.state...', this.state)                             
  //                                   });                           
  //                                 })  
  //                               }
  //                     });      




 // }
//this.forceUpdate();
  return;
  this.setState({
    selectedStartDate: moment(new Date(date.dateString)).format('YYYY-MM-DD'),
    selectedDay: (new Date(date.dateString)).getDay(),
  });
  this.forceUpdate();
  console.log('DS-151--this.setState....', this.state)

}

shouldComponentUpdate(nextProps, nextState){
return true;
}



  monthChanged(month) {
    var date = new Date(month.timestamp)
    y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    firstDay = moment(firstDay).format("YYYY-MM-DD");
    lastDay = moment(lastDay).format("YYYY-MM-DD");
    this.setState({
      startDate: firstDay,
      endDate: lastDay
    }, () => {
    //  this.props.ScheduleActions.getSchedule({ ...this.state }, this.props.tokenforuser);
     console.log('328--month--chabge--')
      //this.forceUpdate();
    })

  }




  render() {
    //console.log('_______________________#####this.props.weeklySchedule.....')
    // console.log(this.props.weeklySchedule)
    // console.log()
    if (this.props.weeklySchedule.length == 0) {
      // console.log('____________________in if.....')

      return ( < View style = {
          [styles.container, {
            marginTop: 34
          }]
        } >

        <Calendar 
        current = {
          this.props.propSelectedDate
        }
        pastScrollRange = {          24        }
        futureScrollRange = {          24        }
        minDate = {          moment(new Date()).format("YYYY-MM-DD")        }
        maxDate = {          moment(new Date()).add(55, 'days').format("YYYY-MM-DD")        }
        //hideArrows={true}
        //disableMonthChange={true}
        //horizontal
        onMonthChange = {
          (month) => {
            console.log('month changed', month);
            this.monthChanged(month);
          }
        }
        pagingEnabled onDayPress = {
          (day) => {
            console.log('---------------day clicked-----------', day);
            this.onDateChange(day)
          }
        }

        onDayLongPress = {
          (day) => {
            this.OnDayClicked(day)
          }
        }
        markedDates = {
          this.state.scheduleDatesList
        }
        markingType={'multi-dot'}

        />

        {
          /* <View style={styles.line}></View>
            
                    <Text style={styles.shedule}>DAY SHEDULE</Text>
            
                    <Text style={styles.hours}>WORKING HOURS</Text>
                      
                    <View style={[styles.row,{marginTop:8,marginBottom:10,}]}>
                      <View style={styles.leftColumnText}>
            
                       
                      </View>
                      </View>
                    <View style={{ marginBottom:10,   marginRight:15, }}>
                    <Text style={styles.hours}>SERVING AREA</Text>
             
                    </View>
                <TouchableOpacity onPress={()=>this.props.navigationProps('ManageSchedule',{selectedDateObj:this.state.selectedStartDate})} style={{marginTop:30, marginLeft:15, marginRight:15,height:35, borderRadius:3, backgroundColor:"#53bedf", justifyContent:'center', alignItems:'center'}}>
                   <Text style={styles.btnText}>SHEDULE THIS DAY</Text>
                </TouchableOpacity> */
        }



        </View>
      );
    } else {
      // console.log('____________________in else.....')
      return ( <View style = {
          [styles.container, {
            marginTop: 34
          }]
        } >

        <Calendar current = {          this.props.propSelectedDate        }
        pastScrollRange = {          24        }
        futureScrollRange = {          24        }
        minDate = {          moment(new Date()).format("YYYY-MM-DD")        }
        maxDate = {          moment(new Date()).add(55, 'days').format("YYYY-MM-DD")        }
        //hideArrows={true}
        //disableMonthChange={true}
        //horizontal
        onMonthChange = {
          (month) => {
            console.log('month changed', month);
            this.monthChanged(month);
          }
        }
        pagingEnabled onDayPress = {
            (day) => {
              console.log('---------------day clicked-----------', day);
              this.onDateChange(day)
            }
          }
        onDayLongPress = {
          (day) => {
            this.OnDayClicked(day)
          }
        }
        markedDates = {          this.state.scheduleDatesList        } 
        markingType={'multi-dot'}
 

        />

        {
          /* <View style={styles.line}></View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.shedule}>DAY SHEDULE</Text>
                    <Text style={[styles.hours,{}]}> {this.state.selectedStartDate}  </Text>
                    </View>
                   

                        <View  style= {{flexDirection:'row',justifyContent:'space-around'}}>
                    <Text style={[styles.hours,{}]}>WORKING HOURS & SERVING AREA </Text>
                      
                        </View>
                        
                    <View style={[styles.row,{marginTop:8,marginBottom:10,flexWrap:'wrap'}]}>
                      <View style={styles.leftColumnText}>
             
                      {  !!this.props.scheduleDatesList[this.state.selectedStartDate] && this.props.scheduleDatesList[this.state.selectedStartDate].status=='available' && !!this.props.scheduleDatesList[this.state.selectedStartDate].slots && this.props.scheduleDatesList[this.state.selectedStartDate].slots.map((data, idx) => {
                            return  (<View style={ {flexDirection:'row',justifyContent:'space-around'} }>
                              <Text>{data.startTime} - {data.endTime } </Text>
                              
                               <Text  >{!!data.serving_city && data.serving_city.length>0 && data.serving_city.join()}   </Text>  
                            </View>
                          )
                                                      
                      })}
           
                      
                      {  !!this.props.weeklySchedule[this.state.selectedDay] && this.props.weeklySchedule[this.state.selectedDay].slots.map((data, idx) => {
                            return (
                                <Text style={styles.timeDuration}>{data.startTime} - {data.endTime } </Text>
                            )
                                                      
                      })}
                       
            
                      </View>
                     

                      </View>
                    
                <TouchableOpacity onPress={()=>this.props.navigationProps('ManageSchedule',{selectedDateObj:this.state.selectedStartDate})} style={{marginTop:30, marginLeft:15, marginRight:15,height:35, borderRadius:3, backgroundColor:"#53bedf", justifyContent:'center', alignItems:'center'}}>
                   <Text style={styles.btnText}>SHEDULE THIS DAY</Text>
                </TouchableOpacity>
            
             */
        }

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  dayOffButton: {
    borderColor: Constants.Colors.Black,
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  timeDuration: {
    marginLeft: 15,
    color: '#000',
    fontSize: 12,
    fontWeight: "300"
  },
  timeDuration2: {
    marginRight: 15,
    color: '#000',
    fontSize: 12,
    fontWeight: "300"
  },
  availablilityButton: {
    borderColor: Constants.Colors.LightBlue,
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  shedule: {
    marginLeft: 15,
    marginTop: 20,
    color: "#53bedf",
    fontSize: 12,
    fontWeight: "400"
  },
  hours: {
    marginLeft: 15,
    marginTop: 10,
    color: "#204781",
    fontSize: 10,
    fontWeight: "500"
  },
  timeDuration: {
    marginLeft: 15,
    color: '#000',
    fontSize: 12,
    fontWeight: "300"
  },
  btnText: {
    color: "#204781",
    fontSize: 13,
    fontWeight: "bold"
  },
  line: {
    marginTop: 20,
    height: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#204781'
  },
  leftColumnText: {
    flexDirection: 'row',
    marginLeft: 15,
    justifyContent: 'space-between',
    flex: 1
  },
  rightColumnText: {
    flexDirection: 'row',
    marginRight: 15,
    justifyContent: 'space-between',
    flex: 1
  },
  row: {
    marginTop: 0,
    height: 20,
    width: '100%',
    flexDirection: 'row'
  },




  orderScheduleButton: {
    borderColor: Constants.Colors.Blue,
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 1.5,
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginBottom: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
  }
});


const mapStateToProps = state => ({
  propSelectedDate: state.schedule.scheduleSelectedDate,
  tokenforuser: (state.user.userData && state.user.userData.token) || (state.user.driverData && state.user.driverData.token),
  scheduleDatesList: state.schedule.scheduleDatesList,
  userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  weeklySchedule: state.schedule.weeklySchedule,
});

const mapDispatchToProps = dispatch => ({
  ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverSchedule);