'use strict';
import {
	Platform,
} from 'react-native';
import moment from 'moment';
import {
	startLoading,
	stopLoading
} from './app';
import RestClient from '../../utilities/RestClient';
import {
	ToastActionsCreators
} from 'react-native-redux-toast';
import {
	goBack
} from './nav';

import { NavigationActions, StackActions } from "react-navigation";

// Actions
export const SCHEDULE_ORDER_DATE = "SCHEDULE_ORDER_DATE";
export const SCHEDULE_LIST = "SCHEDULE_LIST";
export const ADD_DAY_SLOT = "ADD_DAY_SLOT";
export const DELETE_DAY_SLOT = "DELETE_DAY_SLOT";

export const CLEAN_DAY_SLOTS = "CLEAN_DAY_SLOTS";
export const CLEAN_CALENDAR = "CLEAN_CALENDAR";
export const SAVE_DEFAULT_SCHEDULE = "SAVE_DEFAULT_SCHEDULE";


export const DEL_SCHEDULED_ITEM = "DEL_SCHEDULED_ITEM";
export const SCHEDULE_DATE_LIST = "SCHEDULE_DATE_LIST";

export const MY_SERVING_AREAS_LIST = "MY_SERVING_AREAS_LIST";
 

export const DELETED_DEFAULT_SLOTS = "DELETED_DEFAULT_SLOTS";
export const DELETED_SLOTS_IDS_DATES = "DELETED_SLOTS_IDS_DATES";




export const DELETED_SLOTS_DATES = "DELETED_SLOTS_DATES";

export const DEFAUL_SLOTS_IDS = "DEFAUL_SLOTS_IDS";
export const DEFAUL_SLOT_ID_DayId = "DEFAUL_SLOT_ID_DayId";




 

//MY_SERVING_AREAS_LIST


export const SCHEDULE_DAYS_LIST = "SCHEDULE_DAYS_LIST";
export const SET_DEFAULT_SCHEDULE2 = "SET_DEFAULT_SCHEDULE2";
//days default schedule
export const SET_DEFAULT_SCHEDULE3 = "SET_DEFAULT_SCHEDULE3";

export const SET_DEFAULT_SCHEDULE4 = "SET_DEFAULT_SCHEDULE4";

export const SET_MANUAL_SCHEDULE5 = "SET_MANUAL_SCHEDULE5";










export const CITIES_LIST = "CITIES_LIST";
// Action Creators
export const SCHEDULE_ORDER = (data) => ({
	type: SCHEDULE_ORDER_DATE,
	data
});
export const GET_SCHEDULE_LIST = (data) => ({
	type: SCHEDULE_LIST,
	data
});
export const GET_ADD_DAY_SLOT = (data) => ({
	type: ADD_DAY_SLOT,
	data
});

export const GET_DELETE_DAY_SLOT = (data) => ({
	type: DELETE_DAY_SLOT,
	data
});



export const GET_CLEAN_DAY_SLOTS = (data) => ({
	type: CLEAN_DAY_SLOTS,
	data
});
export const GET_CLEAN_CALENDAR = (data) => ({
	type: CLEAN_CALENDAR,
	data
});

export const SAVE_DEFAULT = (data) => ({
	type: SAVE_DEFAULT_SCHEDULE,
	data
});


export const DELETE_SCHEDULED_ITEM = (data) => ({
	type: DEL_SCHEDULED_ITEM,
	data
});
export const GET_SCHEDULE_DATE_LIST = (data) => ({
	type: SCHEDULE_DATE_LIST,
	data
});
export const SET_MY_SERVING_AREAS_LIST = (data) => ({
	type: MY_SERVING_AREAS_LIST,
	data
});

export const SET_DELETED_DEFAULT_SLOTS = (data) => ({
	type: DELETED_DEFAULT_SLOTS,
	data
});
export const SET_DELETED_SLOTS_IDS_DATES = (data) => ({
	type: DELETED_SLOTS_IDS_DATES,
	data
});



export const SET_DELETED_SLOTS_DATES = (data) => ({
	type: DELETED_SLOTS_DATES,
	data
});

export const SET_DEFAUL_SLOT_ID_DayId = (data) => ({
	type: DEFAUL_SLOT_ID_DayId,
	data
});








export const SET_DEFAUL_SLOTS_IDS= (data) => ({
	type: DEFAUL_SLOTS_IDS,
	data
});



export const GET_WEEKLY_SCHEDULE = (data) => ({
	type: SCHEDULE_DAYS_LIST,
	data
});
export const SET_DEFAULT_SCHEDULE = (data) => ({
	type: SET_DEFAULT_SCHEDULE2,
	data
});
export const SET_DEFAULT_DAYS_SCHEDULE = (data) => ({
	type: SET_DEFAULT_SCHEDULE3,
	data
});

export const SET_DAYS_ALL_SCHEDULE = (data) => ({
	type: SET_DEFAULT_SCHEDULE4,
	data
});
export const SET_MANUAL_SCHEDULE = (data) => ({
	type: SET_MANUAL_SCHEDULE5,
	data
});







export const GET_CITIES_LIST = (data) => ({
	type: CITIES_LIST,
	data
});

let LocalScheduleList = [];

//perform api's related to user
/*** 
 * MANAGE SCHEDULE TO SET DAY OFF 
 ***/
export const setDayOFF = (data, token) => {
	////console.log('set day off ******* ',moment(data.dateSelected).format('YYYY-MM-DD')) scheduletype
	//console.log('sch-92---data-', data)
	let requestObject = {}
	var dayOffUrl = ''
	if (data.scheduletype == 'Manual') {
		dayOffUrl = 'schedular/setmanualDayOff'
		let id3;
		if(data._id==""){
			requestObject = {
				_id: "5b9625f9972b367550e122c4",
				driver_id: data.driverId,
				week : [
					{
					  date:data.dateSelected,
					  dayOff:true
					}
					]
			}
		}else{
			requestObject = {
				_id: data._id,
				driver_id: data.driverId,
				week : [
					{
					  date:data.dateSelected,
					  dayOff:true
					}
					]
			}
		}

		  
	} else {
		dayOffUrl = 'schedular/setdefaultDayOff'
		requestObject = {
			_id: data._id,
			driver_id: data.driverId,
		}
	}
	//console.log('sch-92---requestObject-', requestObject)
	//console.log('sch-93---dayOffUrl-', dayOffUrl)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post(dayOffUrl, requestObject, token).then((result) => {
			//console.log('result setDayOff *****requestObject** ', requestObject)
			//console.log('result setDayOff *****dayOffUrl** ', dayOffUrl)
			//console.log('result setDayOff ******* ', result)
			if (result.status == 1) {				
				dispatch(stopLoading());
				getSchedule(data,token);
				dispatch(ToastActionsCreators.displayInfo(result.message));
				
				data.navigate('Home', {
					daySelected: data.dateSelected
				})

				// data.navigate('ManageSchedule', {
				// 	daySelected: data.dateSelected
				// })


			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};

/*** 
 * MANAGE SCHEDULE TO SET DAY ON 
 ***/
export const setDayOn = (data, token) => {
	 
	let requestObject = {}
	var dayOnUrl = ''

	if (data.scheduletype == 'Manual') {
		dayOnUrl = 'schedular/setmanualDayOn'
		let id3;
		 
		requestObject = {
			_id: data._id,
			driver_id: data.driverId,			
			date:data.dateSelected,
			day:moment(data.dateSelected).day()
			
		} 
	} else {
		dayOnUrl = 'schedular/setdefaultDayOn'
		requestObject = {
			_id: data._id,
			driver_id: data.driverId,
		}
	}
	////
 
	
	// if (data.scheduletype == 'Manual') {
	// 	dayOnUrl = 'schedular/setmanualDayOn'
	// } else {
	// 	dayOnUrl = 'schedular/setdefaultDayOn'
	// }
	//console.log('sch-92---requestObject-', requestObject)
	//console.log('sch-93---dayOnUrl-', dayOnUrl)

	////console.log(' SCH-135- setDayOn ******* ', data)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post(dayOnUrl, requestObject, token).then((result) => {
			////console.log('result setDayOn ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());
				getSchedule({driverId:data.driver_id},token);  
				dispatch(ToastActionsCreators.displayInfo(result.message));
				data.navigate('Home', {
					daySelected: data.dateSelected
				})

				// data.navigate('ManageSchedule', {
				// 	daySelected: data.dateSelected
				// })
				// data.navigate('Shedule', {
				// 	daySelected: data.dateSelected
				// })
				
				//data.navigate('ManageSchedule', {selectedDateObj: data.dateSelected});
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			////console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};

// /*** 
//  * ADD SCHEDULE 
// ***/
// export const addSchedule = (data,token) => {
// 	let	requestObject = {
// 		radius:data.radius,
// 		location:data.location,
// 		sDate:data.sDate,
// 		eDate:data.eDate,
// 		defaultScheduleAll:data.defaultScheduleAll,
// 		helper:data.helper
//   	}

// 	return dispatch => {
// 		dispatch(startLoading());
// 		RestClient.post("schedular/add",requestObject,token).then((result) => {
// 			////console.log('result schedule add ******* ',result)
//  		if(result.status == 1){
// 			 ////console.log('inside succeessss ********* ')
// 				dispatch(stopLoading());
// 				dispatch(goBack());
// 				dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}else{
// 	    	dispatch(stopLoading());
// 	    	alert(result.message);
// 	  	}
// 		}).catch(error => {
// 	  		////console.log("error=> ", error)
// 	  		dispatch(stopLoading());
// 		});
// 	}
// };



/*** 
 * ADD SCHEDULE 
 
export const addSchedule = (data,token) => {
	let	requestObject = {
		radius:data.radius,
		location:data.location,
		sDate:data.sDate,
		eDate:data.eDate,
		defaultScheduleAll:data.defaultScheduleAll,
		helper:data.helper,
		navigate:data.navigate,
		selectedDateObj:data.selectedDateObj
  	}

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/addmanualschedule",requestObject,token).then((result) => {
			//console.log('result addmanualschedule add ******* ',result)
 		if(result.status == 1){
			//console.log('LocalScheduleList add schedule 1 ******** ',LocalScheduleList)
				//LocalScheduleList.push(result.data.internalScheduleData)
				// //console.log('LocalScheduleList add schedule 1 ***',LocalScheduleList)
				//dispatch(GET_SCHEDULE_LIST(LocalScheduleList));
				dispatch(stopLoading());
				data.navigate('ManageSchedule', {selectedDateObj: data.selectedDateObj})
				//dispatch(goBack());
				dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}else{
	    	dispatch(stopLoading());
	    	dispatch(ToastActionsCreators.displayInfo(result.message));
	  	}
		}).catch(error => {
	  		//console.log("error=> ", error)
	  		dispatch(stopLoading());
		});
	}
};

*/



/*** 
 * ADD MANUAL SCHEDULE 
 ***/
export const addManualSchedule = (data, token) => {


	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/addmanualschedule", data.reqObject, token).then((result) => {
			//console.log('result addmanualschedule add ******* ', result)
			if (result.status == 1) {
			 getSchedule(data,token);
				dispatch(stopLoading());
			
							
				 let resetAction = StackActions.reset({
				index: 1,
				key: null,
				actions: [NavigationActions.navigate({ routeName: "Home" }),
						NavigationActions.navigate({ routeName: "ManageSchedule",params:{selectedDateObj: data.selectedDateObj} })],
			});
			
			data.navigation.dispatch(resetAction); 

		

			
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};


/*** 
 * SAVE DEFAULT  SCHEDULE TO DATABASE
 ***/
export const saveDefaultSchedule = (data, token) => {
	//console.log('*****************saveDefaultSchedule ____data____________************')
	//console.log(data)


	// radius:data.radius,
	// location:data.location,
	// sDate:data.sDate,
	// eDate:data.eDate,
	// defaultScheduleAll:data.defaultScheduleAll,
	// helper:data.helper,
	// navigate:data.navigate,
	// selectedDateObj:data.selectedDateObj

	return dispatch => {
		dispatch(startLoading());
		//dispatch(GET_CLEAN_DAY_SLOTS({msg:'clean'}))
		////console.log('result schedular/adddefaultschedule token ******* ',token)
		////console.log('result schedular/adddefaultschedule data.requestObject ******* ',data.requestObject)
		RestClient.post("schedular/adddefaultschedule", data.requestObject, token).then((result) => {
			//console.log('result schedular/adddefaultschedule ******* ', result)
			if (result.status == 1) {
				//	//console.log('saveDefaultSchedule add schedule 1 ******** ',LocalScheduleList)
				//LocalScheduleList.push(result.data.internalScheduleData)
				// //console.log('LocalScheduleList add schedule 1 ***',LocalScheduleList)
				//dispatch(GET_SCHEDULE_LIST(LocalScheduleList));
				dispatch(stopLoading());
				getSchedule({driverId:data.driver_id},token)
				//getWeeklySchedule({driverId:data.driver_id},token) ,{daySelected:this.state.daySelected}
				dispatch(GET_CLEAN_DAY_SLOTS({
					msg: 'clean'
				}))

				let resetAction = StackActions.reset({
					index: 1,
					key: null,
					actions: [NavigationActions.navigate({ routeName: "Home" }),
						NavigationActions.navigate({ routeName: "DefaultSchedule",params:{daySelected: data.daySelected} })],
				  });
				  //console.log('dispatching reset-saveDefaultSchedule-- ', resetAction)
				  
				  data.navigation.dispatch(resetAction); 

				//	//console.log('  schedular/adddefaultschedule *******dispatch(GET_CLEAN_DAY_SLOTS ' )

				//data.navigate('DefaultSchedule',{daySelected:data.daySelected})
				//data.navigate('Home', {daySelected:data.daySelected })
				//dispatch(goBack());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			} else {
				//console.log("result.status =", result.status)
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};





/*** 
 * ADD DEFAULT SCHEDULE TO STORE
 ***/
export const addDaySlotSchedule = (data) => {
	return dispatch => {
		dispatch(GET_ADD_DAY_SLOT(data));
		data.navigate('DefaultSchedule', {
			daySelected: data.daySelected
		})
	}
};




/*** 
 * ADD DEFAULT SCHEDULE TO STORE
 ***/
export const deleteDaySlotSchedule = (data) => {
	return dispatch => {
		dispatch(GET_DELETE_DAY_SLOT(data));
		data.navigate('DefaultSchedule', {
			daySelected: data.daySelected
		})
	}
};


/*** 
 * DELETE SCHEDULE 
 ***/
export const deleteDefaultSlot = (data, token) => {
	let requestObject = {
		_id: data._id,
		driver_id: data.driver_id,
		dayid:data.dayid
	}
	//console.log('###deleteDefaultSlotdeleting schedule--requestObject')
	//console.log(requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/deletedefaulttimeslot", requestObject, token).then((result) => {
			//console.log('sch-353result schedule deletedefaulttimeslot ******* ', result)
			if (result.status == 1) {
				//DELETE_SCHEDULED_ITEM(result)
				//let list = deleteScheduleById(data.id);
				//dispatch(GET_SCHEDULE_LIST(list));
				//LocalScheduleList=list;

				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
				//console.log('sch-363-getSchedule', getSchedule)
				////console.log('sch-363-this.getSchedule',this.getSchedule)
				getSchedule({driverId:data.driver_id},token)
				//getWeeklySchedule({driverId:data.driver_id},token)
				//data.navigate('DefaultSchedule',{daySelected:data.daySelected})

				let resetAction = StackActions.reset({
					index: 1,
					key: null,
					actions: [NavigationActions.navigate({ routeName: "Home" }),
							NavigationActions.navigate({ routeName: "DefaultSchedule",params:{   daySelected:data.daySelected} })],
				});
				//console.log('dispatching reset--deleteDefaultSlot- ', resetAction)
				
				data.navigation.dispatch(resetAction); 


	// data.navigate('ManageSchedule', {
	// 	selectedDateObj: data.date
	// })
				//data.navigate('ManageSchedule', {selectedDateObj: data.date})
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
				data.navigate('DefaultSchedule', {
					daySelected: data.daySelected
				})
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};



/*** 
 * DELETE SCHEDULE 
 ***/
export const deleteDefaultSlotManually = (data, token) => {
	let requestObject = {
		_id: data._id,
		driver_id: data.driver_id,
		dayid:data.dayid,
		deleted_date:data.date
	}
	console.log('###deleteDefaultSlotdeleting schedule--requestObject')
	console.log(requestObject)
	return dispatch => {
		dispatch(startLoading()); 
		RestClient.post("schedular/deletedefaultdateslot", requestObject, token).then((result) => {
			//console.log('sch-581 result schedule deleteDefaultSlotManually ******* ', result)
			if (result.status == 1) {
				//DELETE_SCHEDULED_ITEM(result)
				//let list = deleteScheduleById(data.id);
				//dispatch(GET_SCHEDULE_LIST(list));
				//LocalScheduleList=list;

				
				dispatch(ToastActionsCreators.displayInfo(result.message));
				//console.log('sch-363-getSchedule', getSchedule)
				dispatch(stopLoading());
				////console.log('sch-363-this.getSchedule',this.getSchedule)
				getSchedule({driverId:data.driver_id},token)
				//getWeeklySchedule({driverId:data.driver_id},token)
			//data.navigate('DefaultSchedule',{daySelected:data.daySelected})

	// data.navigate('ManageSchedule', {
	// 	selectedDateObj: data.date
	// })
				data.navigate('ManageSchedule', {selectedDateObj: data.date})
			
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
				// data.navigate('DefaultSchedule', {
				// 	daySelected: data.daySelected
				// })
				data.navigate('ManageSchedule', {selectedDateObj: data.date})

			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};

/*** 
 * GET_CLEAN_DAY_SLOTS  
 ***/
export const cleanDaySlotSchedule = (data) => {
	return dispatch => {
		dispatch(GET_CLEAN_DAY_SLOTS(data));
		data.navigate('Home', {
			daySelected: data.daySelected
		})
	}
};

/*** 
 * GET_DELETE_DAY_SLOT  
 ***/
export const cleanCalendar = (data) => {
	return dispatch => {
		dispatch(GET_CLEAN_CALENDAR(data));
		data.navigate('Home', {
			daySelected: data.daySelected
		})
	}
};


/*** 
 * List SCHEDULE 
 ***/
export const listSchedule = (data, token) => {
	LocalScheduleList = [];
	let requestObject = {
		date: data
	}
	//console.log('reducer---List SCHEDULE--------------')
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/list", requestObject, token).then((result) => {
			//console.log('List SCHEDULE----result schedule list ******* ', result)
			if (result.status == 1) {
				dispatch(GET_SCHEDULE_LIST(result.data));
				LocalScheduleList = result.data;
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};


/*** 
 * MERGE SCHEDULE 
 ***/
export const mergeSchedule = (data, token) => {
	let requestObject = {
		sDate: data.sDate,
		eDate: data.sDate
	}

	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/mergeSchedule", requestObject, token).then((result) => {
			//console.log('result schedule merge ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};


/*** 
 * DELETE SCHEDULE 
 ***/
// export const deleteSchedule = (data,token) => {
// 	let	requestObject = {
// 		id:data.id,
// 		date:data.date,
// 		deleteForAll:false
//   }

// 	return dispatch => {
// 		dispatch(startLoading());
// 		RestClient.post("schedular/delete",requestObject,token).then((result) => {
// 			//console.log('result schedule delete ******* ',result)
//  		if(result.status == 1){
// 			//DELETE_SCHEDULED_ITEM(result)
// 			dispatch(stopLoading());
// 			dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}else{
// 	    	dispatch(stopLoading());
// 	    	dispatch(ToastActionsCreators.displayInfo(result.message));
// 	  	}
// 		}).catch(error => {
// 	  		//console.log("error=> ", error)
// 	  		dispatch(stopLoading());
// 		});
// 	}
// };

/*** 
 * DELETE SCHEDULE 
 ***/
export const deleteSchedule = (data, token) => {
	let requestObject = {
		_id: data._id,
		driver_id: data.driver_id,
		dayid:data.dayid
	}
	//console.log('################deleting schedule--requestObject')
	//console.log(requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/deletemanualtimeslot", requestObject, token).then((result) => {
			//console.log('result schedule delete ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());
				getSchedule(data,token);
				//DELETE_SCHEDULED_ITEM(result)
			//	let list = deleteScheduleById(data.id);
			//	dispatch(GET_SCHEDULE_LIST(list));
			//	LocalScheduleList = list;

				
				dispatch(ToastActionsCreators.displayInfo(result.message));
				//console.log('SCH-512,', data)

				let resetAction = StackActions.reset({
					index: 1,
					key: null,
					actions: [NavigationActions.navigate({ routeName: "Home" }),
							NavigationActions.navigate({ routeName: "ManageSchedule",params:{selectedDateObj: data.date} })],
				});
				//console.log('dispatching reset--- ', resetAction)
				
				//data.navigation.dispatch(resetAction); 


				if (data.delete) {
					data.navigation.dispatch(resetAction); 
				}

			} else {
				dispatch(stopLoading());
				dispatch(ToastActionsCreators.displayInfo(result.message));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};

export const deleteScheduleById = (id) => {
	//console.log("LocalScheduleList***", LocalScheduleList)
	let newArray = LocalScheduleList.filter(obj => obj._id != id);
	//console.log("newArray***", newArray)
	return newArray
}

  
/*** 
 * calendor scheduled api
 ***/
export const scheduledDateList = (data, token) => {

	let requestObject = {
		startDate: data.startDate,
		endDate: data.endDate,

	}
	////console.log('rquest shedule calendor Status ****** ',requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/getScheduleDateList", requestObject, token).then((result) => {
			////console.log('result calendor ******* ',result)
			if (result.status == 1) {
				dispatch(stopLoading());

				//	//console.log('-------15----response---')
				//	//console.log(result)

				let datesData = result.data.week;



				for (var dd in datesData) {
					// //console.log('---15-iteraing data------item-old-----')
					// //console.log(dd)
					// //console.log(datesData[dd])
					if (datesData[dd].selected && datesData[dd].status == 'available') {
						newDatesData[dd] = datesData[dd]

						datesData[dd].marked = true
						datesData[dd].dotColor = 'red'
						//datesData[dd].activeOpacity= 0
					}
				}


				dispatch(GET_SCHEDULE_DATE_LIST(datesData));

				//	dispatch(ToastActionsCreators.displayInfo(result.status));
				////console.log("calendor api response",result)

			} else {
				dispatch(stopLoading());
				// 	dispatch(ToastActionsCreators.displayInfo(result));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};
 
export const getSchedule2 = (data, token,newScheduleDatesList) => {
	 
	return dispatch => { 
		dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));
	}
};


export const getSchedule3 = (newScheduleDatesList) => {
	 
	return dispatch => { 
		dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));
	}
};


/*** 
 * get all schedules
 ***/
export const getSchedule = (data, token) => {

	let requestObject = {
		driverid: data.driverId
	}
	////console.log('getSchedule ****** ', requestObject)
	return dispatch => {
		dispatch(startLoading());
		RestClient.post("schedular/getschedule", requestObject, token).then((result) => {
			////console.log('result getschedule ******* ', result)
			if (result.status == 1) {
				

				// 	//console.log('-------15--getSchedule--response---')
				//	 	//console.log(result)

			 	let datesData = result.data.week;				
			 
				var daysAllSlots = {}
				
				
				var oneDaySlots = []

				let newScheduleDatesList = {}
				////console.log('---15-iteraing data-----------')
				//myServingCities
				//array1=array1.concat(array2)
				let servingAreas = []
				let item;
				let deleted_slots_ids=[]
				let deleted_slots_dates=[]
				let deleted_slots_ids_dates={}
				for (var i = 0; i < datesData.length; i++) {
					//	//console.log('--sch-552---i-',i)
					////console.log('--sch-3188---datesData[i]-',datesData[i])


					let newDatesData = {};
					item = datesData[i]
					let sDate = item.date
					let day = item.day
					let sAreas = []
					sAreas = item.serving_city
					servingAreas = servingAreas.concat(sAreas)
					//deleted slots ids
					let dslis=[];
					let deleetdDates=[];
					let deletedIdDates=[];
					// if(item.deleted_slot!==undefined){
					// 	  dslis=item.deleted_slot.map((slt)=>{
					// 		return slt.dateid
					// 	});

					// 	deletedIdDates=item.deleted_slot.map((slt2)=>{
					// 		let temp_dateid=slt2.dateid
					// 		if(!deleted_slots_ids_dates[temp_dateid]){
					// 			deleted_slots_ids_dates[temp_dateid]=[slt2.deleted_date]
					// 		}else{
					// 			let temp2=deleted_slots_ids_dates[temp_dateid]
					// 			temp2.push(slt2.deleted_date)
					// 			deleted_slots_ids_dates[temp_dateid]=temp2
					// 		}
					// 		return slt2.deleted_date
					// 	});
					
					// 	deleted_slots_ids = deleted_slots_ids.concat(dslis)
					// 	//deleted_slots_dates = deleted_slots_dates.concat(deleetdDates)
					// }
					 

					//serving_city
					let timeSlot = {}
					let tslots = []
					timeSlot['time'] = []
					newDatesData['orders'] = item.orders
					timeSlot['serving_city'] = item.serving_city

					//deleted slots ids

					if(item.time!==undefined){
						dslis=item.time.map((slt)=>{
							if(slt.delete_date!==undefined && slt.delete_date.length>0){
								return slt._id;
							}else{
								return;
							}
						 
					  });

					  deletedIdDates=item.time.map((slt2)=>{
						  let temp_slotid=slt2._id
						  if(slt2.delete_date!==undefined && slt2.delete_date.length>0){
						  if(!deleted_slots_ids_dates[temp_slotid]){
							  deleted_slots_ids_dates[temp_slotid]=slt2.delete_date
						  }else{
							  let temp2=deleted_slots_ids_dates[temp_slotid]
							  temp2 = temp2.concat(slt2.delete_date)
							  
							  deleted_slots_ids_dates[temp_slotid]=temp2
						  }

						}

						  return slt2.delete_date
					  });
				  
					  deleted_slots_ids = deleted_slots_ids.concat(dslis)
					  //deleted_slots_dates = deleted_slots_dates.concat(deleetdDates)
				  }



					//  if(!item.dayOff && item.time ){
					if (item.dayOff !== undefined && item.dayOff != true) {
						//day on
						////console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%...old item----')
						////console.log(item)

						if (item.scheduletype[0] === 'Default') {
							!!item.time && item.time.map((item2, index) => {
								//item2['serving_city']=item.serving_city
								if (item2.serving_city.length > 0) {
									let scity = item2.serving_city.map((item3, index) => {

										return {
											_id: item3._id,
											cityName: item3.cityName
										};
									})
									servingAreas = servingAreas.concat(scity)
								}
								return item2;
							})
						}

						////console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%...new item----')
						// 	//console.log(item)

						// for (var j = 0; j < item.time.length; j++) {
						// 	let sslot=item.time[j]

						// }
						newDatesData['status'] = 'available'
						//timeSlot['time']=item.time
						//tslots.push(timeSlot)
						newDatesData['slots'] = item.time


						newDatesData['_id'] = item._id
						////console.log('....getSchedule....item.scheduletype...item.scheduletype[0]')
						////console.log(item.scheduletype)
						////console.log(item.scheduletype[0])

						if (item.scheduletype && item.scheduletype[0] == 'Manual') {
							newDatesData['selectedColor'] = '#53C8E5'
							newDatesData['selected'] = true
							newDatesData['scheduletype'] = item.scheduletype[0]
							// newDatesData['customStyles'] ={
							// 								container: {
							// 								backgroundColor: 'red',
							// 								borderRadius: 16,
							// 								},
							// 								text: {
							// 								color: 'white',
							// 								},
							// 	}
							

							const vacation = {
								key: 'vacation',
								color: 'red',
								selectedDotColor: 'red'
							};
							const massage = {
								key: 'massage',
								color: 'red',
								selectedDotColor: 'red'
							};
							const workout = {
								key: 'workout',
								color: 'red',
								selectedDotColor: 'red'
							};

							
							const vacation1 = {
								key: 'vacation1',
								color: 'red',
								selectedDotColor: 'red'
							};
							const massage1 = {
								key: 'massage1',
								color: 'red',
								selectedDotColor: 'red'
							};
							const workout1 = {
								key: 'workout1',
								color: 'red',
								selectedDotColor: 'red'
							};

							let dotsArray = []
							if (item.orders !== undefined) {
								//newDatesData['marked']=true
								//newDatesData['dotColor']='red'
								if (item.orders.length == 1) {
									dotsArray = [vacation]
								} else if (item.orders.length == 2) {
									dotsArray = [vacation, massage]
								}
								else if (item.orders.length >= 3) {
									dotsArray = [vacation, massage, workout]
								}  
								// else if (item.orders.length == 4) {
								// 	dotsArray = [vacation, massage,workout,vacation1]
								// }
								// else if (item.orders.length >= 5) {
								// 	dotsArray = [vacation, massage,workout,vacation1,massage1]
								// }
								// else if (item.orders.length >= 6) {
								// 	dotsArray = [vacation, massage,workout,vacation1,massage1,workout1]
								// }
							} else {
								dotsArray = []
							}

							newDatesData['dots'] = dotsArray

						} else {
							newDatesData['selectedColor'] = ''
							newDatesData['selected'] = false
							newDatesData['scheduletype'] = item.scheduletype[0]
							//newDatesData['selected']=false




							const vacation = {
								key: 'vacation',
								color: 'red',
								selectedDotColor: 'red'
							};
							const massage = {
								key: 'massage',
								color: 'red',
								selectedDotColor: 'red'
							};
							const workout = {
								key: 'workout',
								color: 'red',
								selectedDotColor: 'red'
							};

							let dotsArray = []
							if (item.orders !== undefined) {
								//newDatesData['marked']=true
								//newDatesData['dotColor']='red'

								if (item.orders.length == 1) {
									dotsArray = [vacation]
								} else if (item.orders.length == 2) {
									dotsArray = [vacation, massage]
								}
								if (item.orders.length >= 3) {
									dotsArray = [vacation, massage, workout]
								}
							} else {
								dotsArray = []
							}

							newDatesData['dots'] = dotsArray

						}


					} else {//day off

						////console.log(item)
						!!item.time && item.time.map((item3, index) => {
							item3['serving_city'] = item.serving_city
							return item3;
						})

						//	//console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%...new item----')
						//	//console.log(item)
						//newDatesData['_id']=item._id

						if (!!item.scheduletype && item.scheduletype.length > 0) {


							newDatesData['scheduletype'] = item.scheduletype[0]
						} else {


							newDatesData['scheduletype'] = ''
						}

						newDatesData['_id'] = item._id

						newDatesData['status'] = 'daysOff'
						newDatesData['selected'] = true
						newDatesData['selectedColor'] = '#737373'
						newDatesData['slots'] = item.time
						newDatesData['dots'] = []


						// newDatesData['status']='regular'
						// newDatesData['selected']=''
						// newDatesData['selectedColor']=''
						// newDatesData['slots']=[]
					}

					newScheduleDatesList[sDate] = newDatesData

				}

				//	//console.log('-------15--getSchedule--final data---')
			//	//console.log('728---servingAreas', servingAreas)
				//remove duplicate sAreas
				servingAreas = servingAreas.filter(function (element) {
					return element !== undefined;
				});

				deleted_slots_ids=deleted_slots_ids.filter(function (element2) {
					return element2 !== undefined;
				});

				// deleted_slots_dates=deleted_slots_dates.filter(function (element3) {
				// 	return element3 !== undefined;
				// });

				


				var obj = {};

				for (var i = 0, len = servingAreas.length; i < len; i++)
					obj[servingAreas[i]['_id']] = servingAreas[i];

				servingAreas = new Array();
				for (var key in obj)
					servingAreas.push(obj[key]);
			//	//console.log('742---servingAreas', servingAreas)

				//	servingAreas = Array.from(new Set(servingAreas)) 


				var obj2 = {};

				for (var i = 0, len = deleted_slots_ids.length; i < len; i++)
					obj2[deleted_slots_ids[i]] = deleted_slots_ids[i];

					deleted_slots_ids = new Array();
				for (var key in obj2)
				deleted_slots_ids.push(obj2[key]);

				////console.log('1081---deleted_slots_ids', deleted_slots_ids)
				////console.log('1081---deleted_slots_ids_dates', deleted_slots_ids_dates)

				

				// var obj3 = {};

				// for (var i = 0, len = deleted_slots_dates.length; i < len; i++)
				// obj3[deleted_slots_dates[i]] = deleted_slots_dates[i];

				// deleted_slots_dates = new Array();
				// for (var key in obj3)
				// deleted_slots_dates.push(obj3[key]);

				// //console.log('1081---deleted_slots_dates', deleted_slots_dates)


				dispatch(SET_MY_SERVING_AREAS_LIST(servingAreas));
				dispatch(SET_DELETED_DEFAULT_SLOTS(deleted_slots_ids));
				dispatch(SET_DELETED_SLOTS_IDS_DATES(deleted_slots_ids_dates));
			//	dispatch(SET_DELETED_SLOTS_DATES(deleted_slots_dates));
				



				dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));

				setTimeout(function(that){
					////console.log('1044-getschedule--timeout-- ',that)					 
					that.dispatch2(that.stop()); 
					
				   }, 100,{stop:stopLoading,dispatch2:dispatch} );

				// dispatch(stopLoading()); 

				//	dispatch(ToastActionsCreators.displayInfo(result.status));
				////console.log("calendor api response",result)

			} else {
				dispatch(stopLoading());
				let newScheduleDatesList = {}
				dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));
				// 	dispatch(ToastActionsCreators.displayInfo(result));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};



/*** 
 * get weekly schedule info
 ***/
export const getWeeklySchedule = (data, token) => {
	//console.log('calling---getWeeklySchedule1')
	let requestObject = {
		driverid: data.driverId
	}
	//console.log('rquest getWeeklySchedule ****** ',requestObject)
	return dispatch => {
		//console.log('calling---getWeeklySchedule1.5')
		dispatch(startLoading());
		//console.log('calling---getWeeklySchedule2')

		RestClient.post("schedular/getdefaultschedule", requestObject, token).then((result) => {
			//console.log('result getWeeklySchedule ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());


				//console.log(result)
				var weekDaysData = {}
				var defaultSchedule = {}
				var default_Slots_Ids=[]
				let deleted_slots_dates=[]
				var default_Slots_Id_DayId={}

				for (var j = 0; j < result.data.length; j++) {
					let datesData = result.data[j].week;
					let newScheduleDatesList = {}



					for (var i = 0; i < datesData.length; i++) {
						let newDaysData = {};
						let item = datesData[i]
						let day = item.day
						let _id = item._id
						day = day.toString()
						//serving_city
						let times = item.time
						let dayOff = item.dayOff
						let sids=item.time.map((abc)=>{
							return abc._id;
						});

						// if(item.deleted_slot!==undefined){
						// 	let deleetdDates=item.deleted_slot.map((abc2)=>{
						// 		return abc2.deleted_date;
						// 	});
						// 	deleted_slots_dates=deleted_slots_dates.concat(deleetdDates)
						// }
						
						//let deleetdDates=[];
						default_Slots_Ids=default_Slots_Ids.concat(sids)


						/// slit id--dayid
						let temArr=[]
						if(item.time!==undefined && item.time.length>0){
							temArr=item.time.map((slt)=>{
								default_Slots_Id_DayId[slt._id]= item._id
								return slt._id;
						  });
						}
						let tempDelDates=[]
						if(item.time!==undefined && item.time.length>0){
							let tempdates=item.time.map((slotDelDate)=>{
								if(slotDelDate.delete_date!==undefined && slotDelDate.delete_date.length>0){
									tempDelDates=tempDelDates.concat(slotDelDate.delete_date)
								}
							return;
						  });
						  deleted_slots_dates=deleted_slots_dates.concat(tempDelDates)
						}

						// if(item.deleted_slot!==undefined){
						// 	let deleetdDates=item.deleted_slot.map((abc2)=>{
						// 		return abc2.deleted_date;
						// 	});
						// 	deleted_slots_dates=deleted_slots_dates.concat(deleetdDates)
						// }
						

						

						let dayName = ''
						switch (item.day) {
							case '0':
								dayName = "Sunday";
								break;
							case '1':
								dayName = "Monday";
								break;
							case '2':
								dayName = "Tuesday";
								break;
							case '3':
								dayName = "Wednesday";
								break;
							case '4':
								dayName = "Thursday";
								break;
							case '5':
								dayName = "Friday";
								break;
							case '6':
								dayName = "Saturday";
						}
						newDaysData['day'] = day
						newDaysData['dayName'] = dayName
						newDaysData['dayOff'] = dayOff
						newDaysData['slots'] = times
						newDaysData['_id'] = _id
						
						newDaysData['serving_city'] = item.serving_city


						//
						////console.log('sch-729-weekDaysData[day]===undefined',weekDaysData[day])
						if (weekDaysData[day] === undefined) {
							weekDaysData[day] = newDaysData
						} else {
							let oldSlots = weekDaysData[day].slots
							let newSlots = times
							let totalSlots = oldSlots.concat(newSlots)
							weekDaysData[day].slots = totalSlots
							//	//console.log('sch-737-weekDaysData[day].slots=totalSlots',weekDaysData[day].slots)
						}


						//defaultSchedule[day]=times 		

					}
 
					////data loop
				}

				////console.log('-------15--weekDaysData--final data---')
				// //console.log(weekDaysData)

				//	//console.log('-R-sch756----defaultSchedule---')
				//	 //console.log(defaultSchedule)

							
			default_Slots_Ids=default_Slots_Ids.filter(function (element2) {
				return element2 !== undefined;
			});

			deleted_slots_dates=deleted_slots_dates.filter(function (element3) {
				return element3 !== undefined;
			});



			var obj2 = {};

			for (var i = 0, len = default_Slots_Ids.length; i < len; i++)
				obj2[default_Slots_Ids[i]] = default_Slots_Ids[i];

				default_Slots_Ids = new Array();
			for (var key in obj2)
			default_Slots_Ids.push(obj2[key]);

			//console.log('1244---default_Slots_Ids', default_Slots_Ids)

			
			var obj3 = {};

			for (var i = 0, len = deleted_slots_dates.length; i < len; i++)
			obj3[deleted_slots_dates[i]] = deleted_slots_dates[i];

			deleted_slots_dates = new Array();
			for (var key in obj3)
			deleted_slots_dates.push(obj3[key]);

			//console.log('1081---deleted_slots_dates', deleted_slots_dates)


			 
			
			


			
			

				if (weekDaysData['0'] === undefined) {
					defaultSchedule['0'] = []
				} else {
					defaultSchedule['0'] = weekDaysData['0'].slots
				}

				if (weekDaysData['1'] === undefined) {
					defaultSchedule['1'] = []
				} else {
					defaultSchedule['1'] = weekDaysData['1'].slots
				}

				if (weekDaysData['2'] === undefined) {
					defaultSchedule['2'] = []
				} else {
					defaultSchedule['2'] = weekDaysData['2'].slots
				}

				if (weekDaysData['3'] === undefined) {
					defaultSchedule['3'] = []
				} else {
					defaultSchedule['3'] = weekDaysData['3'].slots
				}

				if (weekDaysData['6'] === undefined) {
					defaultSchedule['6'] = []
				} else {
					defaultSchedule['6'] = weekDaysData['6'].slots
				}

				if (weekDaysData['4'] === undefined) {
					defaultSchedule['4'] = []
				} else {
					defaultSchedule['4'] = weekDaysData['4'].slots
				}

				if (weekDaysData['5'] === undefined) {
					defaultSchedule['5'] = []
				} else {
					defaultSchedule['5'] = weekDaysData['5'].slots
				}

				////console.log('-R-sch804----defaultSchedule---')
				///  //console.log(defaultSchedule)





				dispatch(GET_WEEKLY_SCHEDULE(weekDaysData));
				dispatch(SET_DEFAULT_SCHEDULE(defaultSchedule));
				dispatch(SET_DEFAUL_SLOTS_IDS(default_Slots_Ids));
				dispatch(SET_DELETED_SLOTS_DATES(deleted_slots_dates));

				dispatch(SET_DEFAUL_SLOT_ID_DayId(default_Slots_Id_DayId));

				


				// defaultSchedule


				//	dispatch(ToastActionsCreators.displayInfo(result.status));
				////console.log("calendor api response",result)


			} else {
				dispatch(stopLoading());
				let newScheduleDatesList = {}
				dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));
				// 	dispatch(ToastActionsCreators.displayInfo(result));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};




/*** 
 * get weekly schedule info
 ***/
export const getManualSchedule = (data, token) => {
	//console.log('calling---getWeeklySchedule1')
	let requestObject = {
		driverid: data.driverId
	}
	////console.log('rquest shedule calendor Status ****** ',requestObject)
	return dispatch => {
		dispatch(startLoading());
		////console.log('calling---getWeeklySchedule2')
		RestClient.post("schedular/getdefaultschedule", requestObject, token).then((result) => {
			//console.log('result getdefaultschedule ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());

				////console.log('-------19--getWeeklySchedule--response---')
				// //console.log(result)
				var weekDaysData = {}
				var defaultSchedule = {}

				for (var j = 0; j < result.data.length; j++) {
					let datesData = result.data[j].week;
					let newScheduleDatesList = {}



					for (var i = 0; i < datesData.length; i++) {
						let newDaysData = {};
						let item = datesData[i]
						let day = new Date(item.date).getDay()
						day = day.toString()
						//serving_city
						let times = item.time
						let dayOff = item.dayOff
						//	//console.log('sch-882-dayOff',dayOff)
						let dayName = ''
						switch (day) {
							case '0':
								dayName = "Sunday";
								break;
							case '1':
								dayName = "Monday";
								break;
							case '2':
								dayName = "Tuesday";
								break;
							case '3':
								dayName = "Wednesday";
								break;
							case '4':
								dayName = "Thursday";
								break;
							case '5':
								dayName = "Friday";
								break;
							case '6':
								dayName = "Saturday";
						}
						newDaysData['day'] = day
						newDaysData['dayName'] = dayName
						newDaysData['dayOff'] = dayOff
						newDaysData['slots'] = times
						newDaysData['serving_city'] = item.serving_city


						//
						////console.log('sch-729-weekDaysData[day]===undefined',weekDaysData[day])
						if (weekDaysData[day] === undefined) {
							if (dayOff == false) {
								weekDaysData[day] = newDaysData
							}

						} else {
							let oldSlots = weekDaysData[day].slots
							let newSlots = times
							let totalSlots = oldSlots.concat(newSlots)
							weekDaysData[day].slots = totalSlots
							//	//console.log('sch-925-weekDaysData[day].slots=totalSlots',weekDaysData[day].slots)
						}


						//defaultSchedule[day]=times 		

					}







					////data loop
				}

				//	 //console.log('-------15--weekDaysData--final data---')
				//		 //console.log(weekDaysData)

				//		//console.log('-R-sch756----defaultSchedule---')
				//		 //console.log(defaultSchedule)



				if (weekDaysData['0'] === undefined) {
					defaultSchedule['0'] = []
				} else {
					defaultSchedule['0'] = weekDaysData['0'].slots
				}

				if (weekDaysData['1'] === undefined) {
					defaultSchedule['1'] = []
				} else {
					defaultSchedule['1'] = weekDaysData['1'].slots
				}

				if (weekDaysData['2'] === undefined) {
					defaultSchedule['2'] = []
				} else {
					defaultSchedule['2'] = weekDaysData['2'].slots
				}

				if (weekDaysData['3'] === undefined) {
					defaultSchedule['3'] = []
				} else {
					defaultSchedule['3'] = weekDaysData['3'].slots
				}

				if (weekDaysData['6'] === undefined) {
					defaultSchedule['6'] = []
				} else {
					defaultSchedule['6'] = weekDaysData['6'].slots
				}

				if (weekDaysData['4'] === undefined) {
					defaultSchedule['4'] = []
				} else {
					defaultSchedule['4'] = weekDaysData['4'].slots
				}

				if (weekDaysData['5'] === undefined) {
					defaultSchedule['5'] = []
				} else {
					defaultSchedule['5'] = weekDaysData['5'].slots
				}

				//	//console.log('-R-sch804----defaultSchedule---')
				//  //console.log(defaultSchedule)





				dispatch(GET_WEEKLY_SCHEDULE(weekDaysData));
				dispatch(SET_MANUAL_SCHEDULE(defaultSchedule));


				// defaultSchedule


				//	dispatch(ToastActionsCreators.displayInfo(result.status));
				////console.log("calendor api response",result)


			} else {
				dispatch(stopLoading());
				let newScheduleDatesList = {}
				dispatch(GET_SCHEDULE_DATE_LIST(newScheduleDatesList));
				// 	dispatch(ToastActionsCreators.displayInfo(result));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}



};



/*** 
 * get cities api
 ***/
export const getCitiesList = (token) => {



	return dispatch => {
		let citiesData = []
		dispatch(startLoading());
		RestClient.post("admin/getcity", {}, token).then((result) => {
			//console.log('result getCity ******* ', result)
			if (result.status == 1) {
				dispatch(stopLoading());

				let citiesRaw = result.data
				let cities = citiesRaw.map((item2, index) => {
					return {
						name: item2.cityName,
						_id: item2._id,
						isSelected: false
					};
				})


				dispatch(GET_CITIES_LIST(cities));

				//	dispatch(ToastActionsCreators.displayInfo(result.status));
				////console.log("getCity api response",cities)

			} else {
				dispatch(stopLoading());
				// 	dispatch(ToastActionsCreators.displayInfo(result));
			}
		}).catch(error => {
			//console.log("error=> ", error)
			dispatch(stopLoading());
		});
	}
};







/**
 * Initial state
 */
const initialState = {
	OrderData: {},
	ScreenMaxFlag: true,
	scheduleList: [],
	scheduleDatesList: {},
	citiesList: [],
	myServingAreas: [],
	deletedDefaultSlots: [],
	defaultSlotsIds:[],
	deletedDefaultSlotsDates:[],
	deletedDefaultSlotsIdsDates:{},
	weeklySchedule: [],
	defaultSlotIdDayId:{},
	defaultDaysSchedule: {
		'0': [],
		'1': [],
		'2': [],
		'3': [],
		'4': [],
		'5': [],
		'6': []
	},
	defaultSchedule: {
		'0': [],
		'1': [],
		'2': [],
		'3': [],
		'4': [],
		'5': [],
		'6': []
	},

	daysAllSlots: {
		'0': [],
		'1': [],
		'2': [],
		'3': [],
		'4': [],
		'5': [],
		'6': []
	}
};

/**
 * Reducer
 */
export default function schedule(state = initialState, action) {

// return state; 

	console.log("#################################......... reducer state ************", state)
	console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$......action   ************",action)
	switch (action.type) {
		case SCHEDULE_LIST:
			////	//console.log('schedule actions ******** ',action.data)
			return { ...state,
				scheduleList: action.data
			};
		case SCHEDULE_DATE_LIST:
			//     //console.log('scheduleDATE actions ******** ',action.data)
			return { ...state,
				scheduleDatesList: action.data
			};


		case MY_SERVING_AREAS_LIST:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				myServingAreas: action.data
			};
			case DELETED_DEFAULT_SLOTS:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				deletedDefaultSlots: action.data
			};

			case DELETED_SLOTS_IDS_DATES:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				deletedDefaultSlotsIdsDates: action.data
			};

			


			case DELETED_SLOTS_DATES:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				deletedDefaultSlotsDates: action.data
			};
			

			case DEFAUL_SLOTS_IDS:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				defaultSlotsIds: action.data
			};

			
			case DEFAUL_SLOT_ID_DayId:
			//   //console.log('scheduleDATE actions **MY_SERVING_AREAS_LIST****** ',action.data)
			return { ...state,
				defaultSlotIdDayId: action.data
			};

			

			


		case SCHEDULE_DAYS_LIST:
			//  //console.log('SCHEDULE_DAYS_LIST actions ******** ',action.data)
			return { ...state,
				weeklySchedule: action.data
			};

		case SET_DEFAULT_SCHEDULE2:
			// //console.log('SET_DEFAULT_SCHEDULE2 actions ******** ',action.data)
			return { ...state,
				defaultSchedule: action.data
			};

		case SET_DEFAULT_SCHEDULE3:
			// //console.log('SET_DEFAULT_SCHEDULE3 actions ******** ',action.data)
			return { ...state,
				defaultDaysSchedule: action.data
			};

		case SET_DEFAULT_SCHEDULE4:
			//  //console.log('SET_DEFAULT_SCHEDULE4 actions ******** ',action.data)
			return { ...state,
				daysAllSlots: action.data
			};











		case ADD_DAY_SLOT:
			////console.log('ADD_DAY_SLOT actions ******** ',action.data)
			////console.log(' ************___17..1___*******last state And action' )
			////console.log( state)
			////console.log(action)
			let ds = state.defaultSchedule;
			//let daysh=ds[action.data.day]
			let daysh = ds[action.data.daySelected]
			daysh.push(action.data.times)
			//daysh.push(action.data.slot)
			ds[action.data.daySelected] = daysh
			//ds[action.data.day]=daysh
			let newState = { ...state,
				defaultSchedule: ds
			};
			////console.log(' ************___17..2___*******new state ' )
			////console.log( newState)
			return newState;

			// case ADD_DAY_SLOT:
			// 	//console.log('ADD_DAY_SLOT actions ******** ',action.data)
			// 	//console.log(' ************___17..1___*******last state And action' )
			// 	//console.log( state)
			// 	//console.log(action)
			// 	let ds=state.defaultSchedule;
			// 	//let daysh=ds[action.data.day]
			// 	let daysh=ds[action.data.daySelected]
			// 	daysh.push(action.data.times)
			// 	//daysh.push(action.data.slot)
			// 	ds[action.data.daySelected]=daysh
			// 	//ds[action.data.day]=daysh
			// 	let newState={ ...state, defaultSchedule: ds};
			// 	//console.log(' ************___17..2___*******new state ' )
			// 	//console.log( newState)
			// return newState;

		case DELETE_DAY_SLOT:
			//	//console.log('DELETE_DAY_SLOT actions ******** ',action.data)
			//	//console.log(' ************___18..1___*******last state And action' )
			//	//console.log( state)
			//	//console.log(action)
			let ds2 = state.defaultSchedule;
			//let daysh=ds[action.data.day]
			let daysh2 = ds2[action.data.daySelected]
			let newDayData = daysh2.filter(obj => obj.startTime != action.data.startTime)
			ds2[action.data.daySelected] = newDayData

			//daysh.push(action.data.times)
			//daysh.push(action.data.slot)
			//ds[action.data.daySelected]=daysh
			//ds[action.data.day]=daysh
			let newState3 = { ...state,
				defaultSchedule: ds2
			};
			//	//console.log(' ************___17..2___*******new state ' )
			//	//console.log( newState3)
			return newState3;

		case CLEAN_DAY_SLOTS:
			//	//console.log('CLEAN_DAY_SLOTS actions ******** ',action.data)
			//	//console.log(' ************___17..1___*******last state And action' )
			//	//console.log( state)
			//	//console.log(action)

			let newDefaultSchedule = {
				'0': [],
				'1': [],
				'2': [],
				'3': [],
				'4': [],
				'5': [],
				'6': []
			};

			let newState2 = { ...state,
				defaultSchedule: newDefaultSchedule
			};
			//	//console.log(' ************___17..2___CLEAN_DAY_SLOTS*******new state ' )
			//	//console.log( newState2)
			return newState2;

		case CITIES_LIST:
			//   //console.log('CITIES_LIST actions ******** ',action.data)
			return { ...state,
				citiesList: action.data
			};


		default:
			return state;
	}
}