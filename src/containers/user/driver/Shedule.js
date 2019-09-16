import React, { Component } from 'react';
import {
     StyleSheet, Text, View,TouchableOpacity,
     Image,ScrollView,BackHandler
} from 'react-native';
import NavigationBar from "react-native-navbar";

import IconMat from 'react-native-vector-icons/MaterialIcons';
import Constants from "../../../constants";
//const edit = require(""); //Play image

import * as ScheduleActions from '../../../redux/modules/schedule';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToogleSwitch from '../../../components/common/ToggleSwitch';

  class Shedule extends Component {
    constructor(props){
        super(props);
        //console.log('sch-20-props',props)
        this.state={
            availabilityStatus:props.driverAvailabilityStatus,
            navigate:this.props.navigation.navigate,
            driverId:props.userData.data._id,        
            
          }
      
          //console.log('___________23______--Shedule-constructor state__________')
          //console.log(this.state)

          //console.log('___________23______---Sheduleconstructor props __________')
          //console.log(props)

          
    }

    static navigationOptions = ({ navigation }) => ({
       header: null,
    });


  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

 componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
}
componentDidMount(){
    // this.props.ScheduleActions.listSchedule(this.state.dateSelected,this.props.tokenforuser);driverId
    // this.props.ScheduleActions.getWeeklySchedule({...this.state},this.props.tokenforuser);
     //this.forceUpdate();
   }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
}

backPressed = () => {
    this.props.navigation.goBack();
    return true;
}

    render() {
        const titleConfig = {
            title: "Weekly  Schedule",
            tintColor: "#fff",
            style:{fontSize:14,fontWeight:'400'}
          };

          const { navigate, goBack } = this.props.navigation;

        return (
           <View style={styles.background}>

               <NavigationBar
                    statusBar={{hidden:true}}
                    style={styles.navigationBar}
                    title={titleConfig}
                    rightButton={
                    <View style={styles.rightButtonNav}>
                        <TouchableOpacity onPress={()=>navigate('Settings')}>
                        <Image source={Constants.Images.user.setting} style={styles.navIcons} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <View style={{marginHorizontal:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}} >
                            <ToogleSwitch availabilityStatus={this.state.availabilityStatus}/>
                        </View>
                    </View>
                    }
                    leftButton={
                        <TouchableOpacity onPress={()=>goBack()}>
                        <Icon name="angle-left" size={40} color='white' style={[styles.navIcons,{marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 2}]} />
                        </TouchableOpacity>}
                />

                
             <ScrollView style={styles.container}>
             {/* Monday */}
             <View style={styles.wrapper}>
                    <View style={styles.row}>
                            <View style={styles.leftColumn}>
                                <Text style={styles.days}>MONDAY</Text>
                            </View>
                            <View style={styles.rightCoulmn}>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:1})} >
                                        <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                                    </TouchableOpacity>
                            
                            {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                            </View>
                    </View>
                    <View style={[styles.row,{marginTop:8}]}>
                            <View style={styles.leftColumnText}>
                            {  (this.props.weeklySchedule['1']==undefined ||this.props.weeklySchedule['1'].dayOff) && <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                        {this.props.weeklySchedule['1']!==undefined && !this.props.weeklySchedule['1'].dayOff && this.props.weeklySchedule['1'].slots.map((data, idx) => {
                                return (
                                    <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                )
                                
                        })}        
                            
                                 
                            </View>
                             
                    </View>
                 <View style={styles.line}></View>
                 </View>

                  {/* Tuesday */}
             <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>TUESDAY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:2})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>
                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>

                 { (this.props.weeklySchedule['2']==undefined ||this.props.weeklySchedule['2'].dayOff) && <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                                 { this.props.weeklySchedule['2']!==undefined && !this.props.weeklySchedule['2'].dayOff && this.props.weeklySchedule['2'].slots.map((data, idx) => {
                                          return (
                                             <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                          )
                                          
                                 })}
                               
                         </View>
                 </View>
                 <View style={styles.line}></View>
                 </View>
           

                  {/* Wednesday */}
                  <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>WEDNESDAY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:3})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>
                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>
                 {  (this.props.weeklySchedule['3']==undefined ||this.props.weeklySchedule['3'].dayOff)  && <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                                 { this.props.weeklySchedule['3']!==undefined && !this.props.weeklySchedule['3'].dayOff && this.props.weeklySchedule['3'].slots.map((data, idx) => {
                                          return (
                                             <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                          )
                                          
                                 })}  
                                  
                   </View>
                 </View>
                 <View style={styles.line}></View>
                 </View>


                  {/* Thursday */}
             <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>THURSADY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:4})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>
                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>
                                 
                    {   (this.props.weeklySchedule['4']==undefined ||this.props.weeklySchedule['4'].dayOff) &&   <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                        {  this.props.weeklySchedule['4']!==undefined && !this.props.weeklySchedule['4'].dayOff  &&  this.props.weeklySchedule['4'].slots.map((data, idx) => {
                                return (
                                    <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                )
                                
                        })}  
                               
                         </View>                        
                 </View>
                 <View style={styles.line}></View>
                 </View>


                  {/* Friday */}
             <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>FRIDAY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:5})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>
                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>
                 {   (this.props.weeklySchedule['5']==undefined ||this.props.weeklySchedule['5'].dayOff) && <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                                 {this.props.weeklySchedule['5']!==undefined && !this.props.weeklySchedule['5'].dayOff  && this.props.weeklySchedule['5'].slots.map((data, idx) => {
                                          return (
                                             <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                          )
                                          
                                 })}                   
                    
                               
                </View>
                 </View>
                 <View style={styles.line}></View>
                 </View>


                  {/* Saturday */}
             <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>SATURDAY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:6})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>

                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>

                    {  (this.props.weeklySchedule['6']==undefined ||this.props.weeklySchedule['6'].dayOff)&&   <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                                 {this.props.weeklySchedule['6']!==undefined && !this.props.weeklySchedule['6'].dayOff  && this.props.weeklySchedule['6'].slots.map((data, idx) => {
                                          return (
                                             <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                          )
                                          
                                 })}  
                               
                  </View>
                 </View>
                 <View style={styles.line}></View>
                 </View>


                  {/* Sunday */}
             <View style={[styles.wrapper,{marginTop:15}]}>
                 <View style={styles.row}>
                 <View style={styles.leftColumn}>
                 <Text style={styles.days}>SUNDAY</Text>
                 </View>
                 <View style={styles.rightCoulmn}>
                 <TouchableOpacity onPress={()=>this.props.navigation.navigate('DefaultSchedule',{daySelected:0})} >
                    <IconMat name="mode-edit" size={30} color={Constants.Colors.LightBlue}/>
                </TouchableOpacity>
                {/* <Image style={styles.editIcon} source={edit} resizeMode="contain"/> */}
                </View>
                 </View>
                 <View style={[styles.row,{marginTop:8}]}>
                 <View style={styles.leftColumnText}>
                 {  (this.props.weeklySchedule['0']==undefined ||this.props.weeklySchedule['0'].dayOff)  && <Text style={[styles.timeDuration,{fontSize:16, opacity:0.7}]}>Day Off</Text>}
                                 
                                 {this.props.weeklySchedule['0']!==undefined && !this.props.weeklySchedule['0'].dayOff  && this.props.weeklySchedule['0'].slots.map((data, idx) => {
                                          return (
                                             <Text style={styles.timeDuration}>{data.startTime} -{data.endTime } </Text>
                                          )
                                          
                                 })}           
                         </View>
                 </View>
                 {/* <View style={styles.line}></View> */}
                 </View>
       </ScrollView >
      </View>
        )
    }

}

const styles = StyleSheet.create({
   mark2: {
    width:50,
    height: 50,
  },
  wrapper:{marginTop:20,marginLeft:15, marginRight:15, height:60},
  row:{marginTop:0, height:20, width:'100%', flexDirection:'row'},
  leftColumn:{flexDirection:'row', justifyContent:'flex-start', flex:1},

  leftColumnText:{flexDirection:'row', justifyContent:'space-between', flex:1},


  days:{marginLeft:0, color:'#204781', fontSize:13, fontWeight:"500"},
  rightCoulmn:{flexDirection:'row', justifyContent:'flex-end',flex:1},
  editIcon:{height:15, width:15},
  timeDuration:{marginLeft:0, color:'#000', fontSize:13, fontWeight:"400"},
  line:{marginTop:10,height:1, width:'100%', backgroundColor:'#204781'},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:'100%',
    width:'100%',
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
  background: {
    height:'100%',
    width:'100%'
  },

 
});

// 

const mapStateToProps = state => (
    {
    //tokenforuser:state.user.userData.token,
    tokenforuser: (state.user.driverData != null) ? state.user.driverData.token : state.user.userData.token,
    listOfSchedule:state.schedule.scheduleList,
    propSelectedDate:state.schedule.scheduleSelectedDate,
    driverAvailabilityStatus: state.user.driverAvailabilityStatus,
    scheduleDatesList: state.schedule.scheduleDatesList,
    weeklySchedule:state.schedule.weeklySchedule,
    userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
  });
  
  const mapDispatchToProps = dispatch => ({
    ScheduleActions: bindActionCreators(ScheduleActions, dispatch)
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Shedule);