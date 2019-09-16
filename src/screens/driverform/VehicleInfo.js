import React, { Component } from 'react'
import {ScrollView,View,Text,StyleSheet,TextInput,Dimensions,Button,TouchableOpacity,TouchableHighlight, Image,AsyncStorage,Alert,Modal} from "react-native"
import { CheckBox } from 'react-native-elements'
import Background from '../../components/common/Background';
import DatePicker from 'react-native-datepicker'
import ImagePickerCropper from "react-native-image-crop-picker";
import ImagePicker from "react-native-image-picker";
import { Dropdown } from 'react-native-material-dropdown';
import { bindActionCreators } from "redux";
import RestClient from '../../utilities/RestClient';
import Constants from "../../constants"
import * as UserActions from '../../redux/modules/user';
import RoomsText from "../../components/driver/RoomsText"
import { connect } from 'react-redux';
import Connection  from "../../config/Connection";
import Toast, {DURATION} from 'react-native-easy-toast';
import MultiSelect from 'react-native-multiple-select';
import * as Progress from 'react-native-progress';
import moment from "moment"
import { StackActions, NavigationActions } from 'react-navigation';
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
const { height, width } = Dimensions.get('window');
var ProgressBarArray=[50,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
const resetToHome = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'profile' })],
});
let equipmentList=[];
class VehicleInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      vehicleNumber:"",
      insuranceNumber:"",
      insuranceExpiryDate:"",
      VehicleImageSource:"",
      licenceImageSource:"",
      insuranceImageSource:"",
      backgroundCheckSource:"",
      driverExtractSource:"",
      VehicleTypeData:[],
      MakeOfVehicleData:[],
      vehicleModelData:[],
      yearData:[{value:"2005"},{value:"2006"},{value:"2007"},{value:"2008"},{value:"2009"},{value:"2010"},{value:"2011"},{value:"2012"},{value:"2013"}],
      token:"",
      vehicleCategory:[],
      selectedVehicleId:"",
      selectedCompanyId:"",
      selectedModalId:"",
      roomsList:[],
      roomsView:[],
      check:true,
      selectedVehicleType:"",
      selectedVehicleCompany:"",
      selectedVehicleModal:"",
      selectedYear:"",
      LicenceImage:{},
      InsuranceImage:{},
      Background:{},
      DriverExtract:{},
      vehicleImage:{},
      progress:50.0,
      roomsArr:[],
      ImagemodalVisible:false,
      imageType:"",
      equipmentData:[],
      checked:false
    }}
    componentWillMount = () => {
      startLoading();
      this.getToken();
      this.getVehicleTypeData();
      this.getVehicleCompany();
      this.getEquipment();
      AsyncStorage.getItem("token").then((userToken) => {
        RestClient.post("users/getDriver",{},userToken).then((result) => {
          startLoading();
          console.log("result in getDriver",result.data)
          if(result.status == 1){
           stopLoading();
           var data=result.data;
           var imgDoc={}
           data.vechiles && data.vechiles.addDocs && data.vechiles.addDocs.map(function(element,i){
             imgDoc[element.type]={uri:`${Connection.getBaseUrl()}/${element.path}`};
           });
           if(data.vechiles.insuranceNo)
           this.addProgress(10,4)
             if(data.vechiles.plateNo)
            this.addProgress(9,4)
             if(data.vechiles.insuranceExp)
            this.addProgress(16,4)
             if(data.vechiles && data.vechiles.modelYear)
            this.addProgress(18,4)
             if(data.vehicleType && data.vehicleType.name)
            this.addProgress(17,4)
             if(data.vehiclemodel && data.vehiclemodel.name)
            this.addProgress(3,4)
             if(data.vehicleMake && data.vehicleMake.name)
            this.addProgress(2,4)
             if(data.vechiles.images && data.vechiles.images.length>0)
            this.addProgress(4,4)
             if(data.vechiles.addDocs && data.vechiles.addDocs.length>0 && imgDoc['license'])
            this.addProgress(5,4)
             if(data.vechiles.addDocs && data.vechiles.addDocs.length>0 && imgDoc['insurance'])
            this.addProgress(6,4)
             if(data.vechiles.addDocs && data.vechiles.addDocs.length>0 && imgDoc['background'])
            this.addProgress(7,4)
             if(data.vechiles.addDocs && data.vechiles.addDocs.length>0 && imgDoc['abstract'])
            this.addProgress(8,4)
            if(data.vehicleType && data.vehicleType.name && data.vehicleMake && data.vehicleMake.name && data.vehiclemodel && data.vehiclemodel.name)
            {
              this.getVehicleModal(data.vehicleMake.name,data.vehiclemodel.name,data.vechiles.capacity)              
            }
           else if(data.vehicleType && data.vehicleType.name && data.vehicleMake && data.vehicleMake.name)
            { 
              this.getVehicleModal(data.vehicleMake.name)
              
            }
            var imgDoc={}
            data.vechiles && data.vechiles.addDocs && data.vechiles.addDocs.map(function(element,i){
              imgDoc[element.type]={uri:`${Connection.getBaseUrl()}/${element.path}`};
            });
            var len=data.vechiles.images && data.vechiles.images.length;
            let updroomArr=[]
            data.vechiles.capacity.map((item)=>{
              console.log("item in rooms",item);
              updroomArr.push({roomid:item.roomid,volume:item.volume})
            })
           this.setState({
            insuranceNumber:data.vechiles.insuranceNo,
            licenceImageSource:imgDoc['license'],
            insuranceImageSource:imgDoc['insurance'],
            backgroundCheckSource:imgDoc['background'],
            driverExtractSource :imgDoc['abstract'],
            VehicleImageSource :data.vechiles.images && data.vechiles.images.length>0 && {uri:`${Connection.getBaseUrl()}/${ data.vechiles.images}`},
            vehicleNumber:data.vechiles.plateNo,
            insuranceExpiryDate:data.vechiles.insuranceExp,
            selectedYear:data.vechiles && data.vechiles.modelYear,
            selectedVehicleType:data.vehicleType && data.vehicleType.name,
            selectedVehicleModal:data.vehiclemodel && data.vehiclemodel.name,
            selectedVehicleCompany:data.vehicleMake && data.vehicleMake.name,
            selectedVehicleId:data.vehicleType && data.vehicleType._id,
            selectedCompanyId:data.vehicleMake && data.vehicleMake._id,
            selectedModalId:data.vehiclemodel && data.vehiclemodel._id,
            selectedItems:data.equipment && data.equipment.map(function(item){
              return item._id
            }),
            roomsArr:updroomArr
           })
           if(data.vehicleType && data.vehicleType.name && data.vehicleMake && data.vehicleMake.name && data.vehiclemodel && data.vehiclemodel.name)
            {
              this.getVehicleModal(data.vehicleMake.name,data.vehiclemodel.name,data.vechiles.capacity)              
            }
           else if(data.vehicleType && data.vehicleType.name && data.vehicleMake && data.vehicleMake.name)
            {
              this.getVehicleModal(data.vehicleMake.name)
              
            }
          
          }
        })

      })
    }
    getToken = () =>{
      AsyncStorage.getItem("token").then((value) => {
        this.setState({token:value})
      });
    }

    getVehicleTypeData=()=>{
      RestClient.post("admin/getvehicle",{}).then((result) => {
       if(result.status == 1){
        stopLoading();
        this.setState({VehicleTypeData:result.data})
        }
      }).catch(error => {
        
          alert("error=> "+error)
          dispatch(stopLoading());
      });
    }
    getEquipment=()=>{
      RestClient.post("admin/getequipment",{}).then((result) => {
        if(result.status == 1){
         stopLoading();
         this.setState({equipmentData:result.data})
         equipmentList=[]
         this.state.equipmentData!=[] && this.state.equipmentData.map((data,key)=>{
          equipmentList.push({name:data.name,id:data._id})
         })
         }
       }).catch(error => {
           alert("error=> "+error)
           dispatch(stopLoading());
       });
    }
    addProgress(index,value){
      ProgressBarArray[index]=value;
      var length=0;
      for(var i=0;i<ProgressBarArray.length;i++)
      {
        length = length + ProgressBarArray[i];
      }
      //var length = this.state.ProgressData + 1;
      this.setState({
        progress:length
      })
      // var percentage = ((100 * length) / 30) | 0;
      // const text = `${percentage}% Completed `;
      // var widthPr=(percentage*2.4);
      // this.setState({ ProgressWidth:widthPr,OutputText: text,ProgressData: length});
  }
getVehicleCompany=(vehicleType)=>{
  this.setState({
    roomsView:[],
    MakeOfVehicleData:[],
    selectedVehicleType:vehicleType
  })
  let id=""
  startLoading();
  this.state.VehicleTypeData && this.state.VehicleTypeData.map((item)=>{
if(item.name==vehicleType)
this.setState({
  selectedVehicleId:item._id
})
})
  RestClient.post("admin/getVehicleCompany",{},this.state.token).then((result) => {
    if(result.status == 1){
     stopLoading();
     this.setState({MakeOfVehicleData:result.data})
     }
   }).catch(error => {
       dispatch(stopLoading());
   });
}

    getVehicleModal=(makeOfVehicle,modal,capacity)=>{
        this.addProgress(3,4)
      this.setState({
        roomsView:[]
      })
      let id=""
      startLoading();
      RestClient.post("admin/getVehicleModel",{vehicle_typeid:this.state.selectedVehicleId,company_id:this.state.selectedCompanyId},this.state.token).then((result) => {
        if(result.status == 1){
         stopLoading();
         this.setState({vehicleModelData:result.data})
         if(modal && capacity)
         {
           this.renderRooms(modal,capacity)
         }
         else if(modal)
         {
         this.renderRooms(modal)           
         }
        
         }
       }).catch(error => {
           console.log("error=> "+error)
           dispatch(stopLoading());
       });
    }
   
    renderRooms=(modal,data)=>{
      this.setState({roomsView:[]})
      this.addProgress(15,4)
      this.state.vehicleModelData && this.state.vehicleModelData.map((item)=>{
        if(item.name==modal)
        {
          this.setState({
            roomsList:item.room,
            selectedModalId:item._id,
            
          })
        }
      })
      
      this.state.roomsList && this.state.roomsList.map((item)=>{
        if(data)
        {
          data && data.length>0 && data.map(capacity=>{
            if(capacity.roomid==item._id)
            this.state.roomsView.push(
              <RoomsText text={item.name} id={item._id} data={capacity} Cb={(data)=>{
      this.state.roomsArr.push(data)
              }}/>
            )
          })
        }
        else
         this.state.roomsView.push(
        <RoomsText text={item.name} id={item._id} Cb={(data)=>{
this.state.roomsArr.push(data)
        }}/>
      )
      })
this.setState({check:false})

    }
    onBackGo=()=>{
      this.props.navigation.goBack();        
    }
 
    openExperienceImagePickerCropper=(imageType)=>{
      ImagePickerCropper.openPicker({
        width: 300,
        height: 400,
       cropping: true
      }).then(image => {
        let source = { uri: image.path };
        let fileName=image.path.split("/")
        let len=fileName.length;
        let name=fileName[len-1]
        if(imageType=='vehicle')
  {
    this.addProgress(4,4)
          this.setState({
            VehicleImageSource: source,
            vehicleImage:{
              uri: image.path, 
              name: name,
               filename: name,
               type: image.mime
            }
          });
        }
        else if(imageType=='licence')
        {
          this.addProgress(5,4)
        this.setState({
          licenceImageSource: source,
          LicenceImage:{
              uri: image.path, 
              name: name,
               filename: name,
               type: image.mime
            }
        });
      }
        else if(imageType=='insurance')
        {
          this.addProgress(6,4)
        this.setState({
          insuranceImageSource: source,
          InsuranceImage:{
              uri: image.path, 
              name: name,
               filename: name,
               type: image.mime
            }
        });
      }
        else if(imageType=='background')
        {
          this.addProgress(7,4)
        this.setState({
          backgroundCheckSource: source,
          Background:{
              uri: image.path, 
              name: name,
               filename: name,
               type: image.mime
            }
        });
      }
        else if(imageType=='driver')
        {
          this.addProgress(8,4)
        this.setState({
          driverExtractSource: source,
          DriverExtract:{
            uri: image.path, 
            name: name,
             filename: name,
             type: image.mime
          }
        });
      }
      });
  
    }
    openExperienceImagePickerCropperCamera=(imageType)=>{
      ImagePickerCropper.openCamera({
        width: 300,
        height: 400,
       cropping: true
      }).then(image => {
        let source = { uri: image.path };
        let fileName=image.path.split("/")
        let len=fileName.length;
        let name=fileName[len-1]
        if(imageType=='vehicle')
        {
          this.addProgress(4,4)
                this.setState({
                  VehicleImageSource: source,
                  vehicleImage:{
                    uri: image.path, 
                    name: name,
                     filename: name,
                     type: image.mime
                  }
                });
              }
              else if(imageType=='licence')
              {
                this.addProgress(5,4)
              this.setState({
                licenceImageSource: source,
                LicenceImage:{
                    uri: image.path, 
                    name: name,
                     filename: name,
                     type: image.mime
                  }
              });
            }
              else if(imageType=='insurance')
              {
                this.addProgress(6,4)
              this.setState({
                insuranceImageSource: source,
                InsuranceImage:{
                    uri: image.path, 
                    name: name,
                     filename: name,
                     type: image.mime
                  }
              });
            }
              else if(imageType=='background')
              {
                this.addProgress(7,4)
              this.setState({
                backgroundCheckSource: source,
                Background:{
                    uri: image.path, 
                    name: name,
                     filename: name,
                     type: image.mime
                  }
              });
            }
              else if(imageType=='driver')
              {
                this.addProgress(8,4)
              this.setState({
                driverExtractSource: source,
                DriverExtract:{
                  uri: image.path, 
                  name: name,
                   filename: name,
                   type: image.mime
                }
              });
            }
            });
        
          }
          onSelectedItemsChange = selectedItems => {
            this.setState({ selectedItems });
          };
    saveVehicleInfo=()=>{
  if(this.state.vehicleNumber=="")
      this.refs.toast.show('Please Enter Vehicle Number!',DURATION.LENGTH_LONG);
else if(this.state.selectedVehicleId=="")
this.refs.toast.show('Please Select Vehicle Type!',DURATION.LENGTH_LONG);
else if(this.state.selectedCompanyId=="")
this.refs.toast.show('Please Select Vehicle Company!',DURATION.LENGTH_LONG);
else if(this.state.selectedModalId=="")
this.refs.toast.show('Please Select Vehicle Modal!',DURATION.LENGTH_LONG);
else if(this.state.selectedYear=="")
this.refs.toast.show('Please Select Year!',DURATION.LENGTH_LONG);
else if(this.state.insuranceNumber=="")
this.refs.toast.show('Please Enter Insurance Number',DURATION.LENGTH_LONG);
else if(this.state.insuranceExpiryDate=="")
this.refs.toast.show('Please Select Insurance Expiry Date!',DURATION.LENGTH_LONG);
else if(this.state.VehicleImageSource=="")
this.refs.toast.show('Please Upload Vehicle Image!',DURATION.LENGTH_LONG);
else if(this.state.licenceImageSource=="")
this.refs.toast.show('Please upload Licence Image!',DURATION.LENGTH_LONG);
else if(this.state.insuranceImageSource=="")
this.refs.toast.show('Please upload Insurance Image!',DURATION.LENGTH_LONG);
else if(this.state.backgroundCheckSource=="")
this.refs.toast.show('Please Upload Background Check Image!',DURATION.LENGTH_LONG);
else if(this.state.driverExtractSource=="")
this.refs.toast.show('Please Upload Driver Extract Image!',DURATION.LENGTH_LONG);
else
{
  this.props.UserActions.userDriverSecondForm({...this.state}).then((resp)=>{
    if(resp.status==1)
    this.props.navigation.navigate("Success");
  })
}
    }

    saveMediateVehicleInfo=(data)=>{
      this.props.UserActions.userDriverSecondMediateForm({...this.state}).then((resp)=>{
        if(resp.status==1)
        {
      this.refs.toast.show('Data Saved SuccessFully',DURATION.LENGTH_LONG); 
      if(data=="Logout")
      {
        this.props.navigation.dispatch(resetAction);
      }
      else   
      this.props.navigation.goBack();        
    }  
      })
    }

  OnBackToHome=()=>{
    Alert.alert(
      'Back To Home',
      'Are you sure you want to Save Changes?',
      [         
        {text: 'Cancel', onPress: () => this.props.navigation.dispatch(resetToHome), style: 'cancel'},
        {text: 'Yes', onPress: () => { this.props.UserActions.userDriverSecondMediateForm({...this.state}).then((resp)=>{
          if(resp.status==1)
          {
            this.refs.toast.show('Data Saved SuccessFully',DURATION.LENGTH_LONG); 
            this.props.navigation.dispatch(resetToHome);       
          }
        });
      }},
      ],
      { cancelable: false }
    )
  }
  render() {
    let currentDate=moment().format("YYYY-MM-DD"); 
    let vehicleTypeList=[]
    this.state.VehicleTypeData!=[] && this.state.VehicleTypeData.map((data,key)=>{
      vehicleTypeList.push({value:data.name,id:data._id})
    })
    let makeOfVehicleList=[]
    this.state.MakeOfVehicleData!=[] && this.state.MakeOfVehicleData.map((data,key)=>{
      makeOfVehicleList.push({value:data.name,id:data._id})
    })
    let vehicleModelList=[]
    this.state.vehicleModelData!=[] && this.state.vehicleModelData.map((data,key)=>{
      vehicleModelList.push({value:data.name,id:data._id})
    })
    return (
      <View style={{flex:1}}>
      <View style={{height:50,flexDirection:"row"}}>
      <TouchableOpacity underlayColor='#fee989' style={[styles.colIndex]}>
        <Text >{'Personal information'}</Text>
      </TouchableOpacity>
      <TouchableOpacity  underlayColor='#fee989' style={[styles.colIndex,{borderBottomColor:"black",borderBottomWidth:2}]}>
        <Text >{'Vehicle Information'}</Text>
      </TouchableOpacity>
    </View>
    <Progress.Bar progress={this.state.progress/100} width={width}  color={"#d15d14"}/>
      <Background style={styles.mainContainer}>
      <ScrollView style={styles.container}>
       <View style={styles.rowContainerStyle}>
 <View>
  <Text style={styles.headingText}>Vehicle Plate Number</Text>
  <TextInput
        style={styles.textInputStyle}
        placeholder="Vehicle Plate Number"
        value={this.state.vehicleNumber}
        onBlur={()=>{
          if(this.state.vehicleNumber!="")
          this.addProgress(9,4)
          else
          this.addProgress(9,0)
        }}
        onChangeText={(text) => this.setState({vehicleNumber:text})}
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View style={styles.columnContainerStyle}>
  <Dropdown
  containerStyle={styles.textInputStyle}
  value={this.state.selectedVehicleType}
        label='Vehicle Type'
        textColor={Constants.Colors.Black}
        data={vehicleTypeList}
        onChangeText={(text)=>{
          this.state.VehicleTypeData && this.state.VehicleTypeData.map((item)=>{
            if(item.name==text)
           {
             this.setState({
               selectedVehicleId:item._id,
               selectedVehicleType:text,
               selectedCompanyId:"",
               selectedVehicleCompany:"",
               selectedModalId:"",
               selectedVehicleModal:"",
               selectedYear:""
             })
           }
          })
          this.addProgress(17,4)
        }
        }
      />
  </View>
  <View style={styles.columnContainerStyle}>
     <Dropdown
     value={this.state.selectedVehicleCompany}
  containerStyle={styles.textInputStyle}
  textColor={Constants.Colors.Black}
        label='Make Of Vehicle'
        data={makeOfVehicleList}
        onChangeText={(text)=>{
          this.state.MakeOfVehicleData && this.state.MakeOfVehicleData.map((item)=>{
            if(item.name==text)
           {
             this.setState({
               selectedCompanyId:item._id,
               selectedVehicleCompany:text,
               selectedModalId:"",
               selectedVehicleModal:"",
               selectedYear:""
             })
           }
          })
          this.getVehicleModal(text)}}
        
      />
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View style={styles.columnContainerStyle}>
  <Dropdown
  value={this.state.selectedVehicleModal}
  textColor={Constants.Colors.Black}
  containerStyle={styles.textInputStyle}
        label='Model'
        data={vehicleModelList}
        onChangeText={(text)=>this.renderRooms(text)}
      />
  </View>
  <View style={styles.columnContainerStyle}>
  <Dropdown
  value={this.state.selectedYear}
  textColor={Constants.Colors.Black}
  containerStyle={styles.textInputStyle}
        label='Year'
        data={this.state.yearData}
        onChangeText={(text)=>{
          this.addProgress(18,4)
          this.setState({selectedYear:text})}}
      />
  </View>
 </View>
 
 <View style={styles.roomContainerStyle}>
{this.state.roomsView && this.state.roomsView.map((value, index) => {
  return value
})}
 </View>

 <View style={styles.rowContainerStyle}>
 <View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>Insurance Number</Text>
  <TextInput
        style={[styles.textInputStyle,{marginTop:20}]}
        placeholder="Insurance Number"
        value={this.state.insuranceNumber}
        onBlur={()=>{
          if(this.state.insuranceNumber!="")
          this.addProgress(10,4)
          else
          this.addProgress(10,0)
        }}
        onChangeText={(text) => this.setState({insuranceNumber:text})}
      />
  </View>
  <View style={styles.columnContainerStyle}>
  <Text style={styles.headingText}>Insurance Expiry Date</Text>
  <DatePicker
        style={{width: width*0.45,marginTop:height*0.03}}
         date={this.state.insuranceExpiryDate}
        mode="date"
        placeholder="Insurance Expiry date"
        format="YYYY-MM-DD"
        minDate={currentDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {
          this.addProgress(16,4)
          this.setState({insuranceExpiryDate: date})}}
      />
  </View>
 </View>
 <View style={{width:width,marginTop:30}}>
            <MultiSelect
          hideTags
          items={equipmentList}
          uniqueKey="id"
          ref={(component) => { this.multiSelectEquipments = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          selectText="Pick Equipments"
          searchInputPlaceholderText="Search Equipments..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          submitButtonColor={Constants.Colors.DarkBlue}
        />
        {this.state.selectedItems && this.multiSelectEquipments && this.multiSelectEquipments.getSelectedItemsExt(this.state.selectedItems)}

        </View>
 <Modal animationType = {"slide"}  transparent={true}
               visible = {this.state.ImagemodalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {{flex:8}}></View>
               <View style={{flex:2,backgroundColor:"white"}}>
               <TouchableHighlight 
               style={{flex:1,borderBottomWidth:1,borderColor:"gray",justifyContent:"center"}}
               onPress = {() => {
                 this.openExperienceImagePickerCropper(this.state.imageType)
                     this.setState({ImagemodalVisible:!this.state.ImagemodalVisible})}}>
                     
                     <Text style = {styles.text}>Select From Gallery..</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
               style={{flex:1,borderBottomWidth:1,borderColor:"gray",justifyContent:"center"}}                  
                  onPress = {() => {
                 this.openExperienceImagePickerCropperCamera(this.state.imageType)                  
                     this.setState({ImagemodalVisible:!this.state.ImagemodalVisible})}}>
                     <Text style = {styles.text}>Open Camera..</Text>
                  </TouchableHighlight>
                  <TouchableHighlight 
               style={{flex:1,borderBottomWidth:1,borderColor:"gray",justifyContent:"center"}}                  
                  onPress = {() => {this.setState({ImagemodalVisible:!this.state.ImagemodalVisible})}}>
                     <Text style = {styles.text}>Cancel</Text>
                  </TouchableHighlight>
               </View>
               
            </Modal>
 <View style={styles.rowContainerStyle}>
 <View>
  <Text style={styles.headingText}>Picture Of Vehicle</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.setState({ImagemodalVisible:true,
      imageType:"vehicle"
      })
    }
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.VehicleImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>
 </View>
 <Toast
                    ref="toast"
                    style={{backgroundColor:'#D6511F'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />
<Text style={styles.headerText}>Documents</Text>

<View style={styles.rowContainerStyle}>
 <View>
  <Text style={styles.headingText}>Driver Licence Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
   onPress={()=>this.setState({ImagemodalVisible:true,
    imageType:"licence"
    })
  }
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.licenceImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>

  <View>
  <Text style={styles.headingText}>Vehicle Insurance Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
   onPress={()=>this.setState({ImagemodalVisible:true,
    imageType:"insurance"
    })
  }
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.insuranceImageSource}
/>
    </TouchableOpacity>
    </View>
  </View>
 </View>

 <View style={styles.rowContainerStyle}>
 <View>
  <Text style={styles.headingText}>BackGround Check Photo</Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.setState({ImagemodalVisible:true,
      imageType:"background"
      })
    }
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.backgroundCheckSource}
/>
    </TouchableOpacity>
    </View>
  </View>

  <View>
  <Text style={styles.headingText}>Driver Extract Photo       </Text>
 
    <View style={styles.ImagePickerView}>
    <TouchableOpacity 
    onPress={()=>this.setState({ImagemodalVisible:true,
      imageType:"driver"
      })
    }
    style={styles.ImagePicker}>
<Image
style={styles.imageView}
source={this.state.driverExtractSource}
/>
    </TouchableOpacity>
    </View>
  </View>

 </View>
 {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?<View></View>:(
 <View style={styles.rowContainerStyle}>
  <CheckBox
  title='I CONFIRM THAT THE INFORMATION IS GIVEN IN THIS FORM IS TRUE,COMPLETE AND ACCURATE'
  checked={this.state.checked}
  onPress={() => this.setState({checked: !this.state.checked})}
  textStyle={{color:"#396cb3"}}
/>
 </View>)}
<View style={styles.rowContainerStyle}>
{this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?(
//   <Button
//  onPress={()=>{
//   Alert.alert(
//     'Logout',
//     'Are you sure you want to Logout?',
//     [
//       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
//       {text: 'Yes', onPress: () => {this.saveMediateVehicleInfo("Logout");}},
//     ],
//     { cancelable: false }
//   )
         
//  }}
//  title="Logout"
//  style={{flex:1,width:width*0.5,padding:5}}
//  />
<Button
onPress={()=>{this.saveMediateVehicleInfo("save")}}
color={Constants.Colors.DarkBlue}
title="Previous"
style={{flex:1,width:width*0.5,padding:5}}
/>
):(
<Button
onPress={()=>{this.saveMediateVehicleInfo("save")}}
color={Constants.Colors.DarkBlue}
title="Previous"
style={{flex:1,width:width*0.5,padding:5}}
/>)}
{this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?(<Button
  onPress={()=>{
   Alert.alert(
     'Logout',
     'Are you sure you want to Logout?',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'Yes', onPress: () => {this.saveMediateVehicleInfo("Logout");}},
     ],
     { cancelable: false }
   )
          
  }}
  title="Logout"
  color={Constants.Colors.DarkBlue}
  style={{flex:1,width:width*0.5,padding:5}}
  />):(
 <Button
 onPress={()=>{
  Alert.alert(
    'Logout',
    'Are you sure you want to Logout?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => {this.saveMediateVehicleInfo("Logout");}},
    ],
    { cancelable: false }
  )
         
 }}
 title="Logout"
 color={Constants.Colors.DarkBlue}
 style={{flex:1,width:width*0.5,padding:5}}
 />
)}
 {this.props && this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.navigateFromDrawer?(
   <Button
   onPress={()=>{this.OnBackToHome()}}
   title="Back to Home"
   color={Constants.Colors.DarkBlue}
   style={{flex:1,width:width*0.5,padding:5}}
   />
 ):( 
<Button
onPress={()=>{this.state.checked?this.saveVehicleInfo():alert("Please confirm the Check for details")}}
title="Submit For Review"
color={Constants.Colors.DarkBlue}
style={{flex:1,width:width*0.5,padding:5}}
/>)}
</View>

 </ScrollView>
 </Background>
 </View>
    )
  }
}
const styles=StyleSheet.create({
  mainContainer:{
    flex:1
  },
container:{
  flex:1,
  margin:10
},
roomContainer:{
  flex:1,
  flexDirection:"row"
},
rowContainerStyle:{
  flex:1,
  flexDirection:"row",
  margin:5,
  // alignItems:"center",
  justifyContent:"space-between"
},
roomContainerStyle:{
  flex:1,
  flexDirection:"column",
  margin:5,
  alignItems:"flex-start",
  justifyContent:"center"
},
textInputStyle:{
  width:width*0.37,
  paddingLeft:10,
  color:Constants.Colors.Black,
borderBottomWidth:1,
// borderBottomColor:Constants.Colors.WhiteUpd
  },
  headingText:{
    color:Constants.Colors.Black
  },
  roomInputStyle:{
    paddingLeft:10,
    width:width*0.28,
    marginLeft:10
  },
  ImagePickerView:{
    width:width*0.20,
    height:height*0.13,
    borderWidth:1,
    borderRadius:5,
    margin:width*0.03
  },
  ImagePicker:{
    width:width*0.17,
    height:height* 0.115,
    borderWidth:5,
    borderWidth:1,
    margin:width*0.01,
    flex:1
  },
  imageView:{
    width:width*0.16,
    height:height*0.114
  },
  headerText:{
    fontSize:22,
    fontWeight:'bold'
  },
  colIndex:{
    backgroundColor:'gray',
    flex:1,
    height:50,
    alignItems:"center",
    justifyContent:"center"
  },
  columnContainerStyle:{
    flex:1,
    flexDirection:'column'
  },
  text:{
    fontSize:18,
    alignSelf:"center"
    },
})
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);