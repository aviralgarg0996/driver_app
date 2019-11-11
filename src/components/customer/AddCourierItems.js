/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Constants from "../../constants";
import CheckBoxLabel from '../../components/customer/CheckBoxLabel';
import { Radio} from 'native-base';
import {BoxShadow} from 'react-native-shadow';
import FormSubmitButton from '../common/FormSubmitButton';

var navigate=null;
var itemLength,itemWeight,itemheight,
itemWidth,itemheight1=0,itemWidth1=0,itemLength1=0,itemWeight1=0;
class AddCourierItems extends Component<{}> {
  constructor(props){
    super(props);


console.log(this.props.data)

    this.state={
      itemname:'',
      height:3,
      height2:5,
      heightUnit:'feet',
      role:'FIP',
      heightUnitText:'feet',
      heightUnitText1:'inch',
      WeightUnitText:'pounds',
      WeightUnitText1:'ounce',
    
      width:3,
      width2:5,
      widthUnit:1, 
      depth:3,
      depth2:5,
      depthUnit:1,
      weight:15,
      weight2:5,
      weightUnit:'ounce',
      skid:false,
      itemNoList : ['0','1','2','3','4','5','6','7','8','9','10',
                    '11','12','13','14','15','16','17','18','19','20',
                    '21','22','23','24','25','26','27','28','29','30',
                    '31','32','33','34','35','36','37','38','39','40',
                    '41','42','43','44','45','46','47','48','49','50'],
      unitList : ['cm','in','feet'],
      unitWeightList : ['ounce','kg','pounds'],
    }
  }



  validateData(){




 

if(!itemLength && !itemWeight && !itemheight && !itemWidth )
{
alert("Please enter Dimension");
return;  
}




if(!isNaN(itemLength) && !isNaN(itemWeight) && !isNaN(itemheight) && !isNaN(itemWidth) )
{

var tempHeight,tempHeight2,tempWidth,tempWidth2,tempLength,tempLength2,tempweight,tempweight2;
var data=  itemheight.split('.');

  if(isNaN(itemLength1) && isNaN(itemWeight1) && isNaN(itemheight1) && isNaN(itemWidth1) )
{
  alert("Dimensions are not valid..");
  return false;
}
  
  
 

return {

  height:itemheight,height2:itemheight1,width:itemWidth,width2:itemWidth1,
depth:itemLength,depth2:itemLength1,weight:itemWeight,weight2:itemWeight1
}

}
else
{
  alert("Dimensions are not valid..")
}


return false;




  }

  AddItem()
  {
    if(this.state.itemname=="")
    {
      alert("Please enter item name")
    }
    else{
    itemLength1=itemLength1?itemLength1:0
    itemWidth1=itemWidth1?itemWidth1:0
   itemheight1=itemheight1?itemheight1:0
   itemWeight1=itemWeight1?itemWeight1:0

   try{
  
  
  itemLength=itemLength+'.'+itemLength1;
  itemWeight=itemWeight+'.'+itemWeight1;
  itemheight=itemheight+'.'+itemheight1;
  itemWidth=itemWidth+'.'+itemWidth1;




if(isNaN(parseFloat(itemLength))  || isNaN(parseFloat(itemWeight) ) ||
isNaN(parseFloat(itemheight) ) || isNaN(parseFloat(itemWidth) )
)
{

  alert("Please enter a valid dimesion")
  return;
}



  


}
catch(ex)
{
   alert("Please enter valid Dimensions..");
   return;
}





 


    

    if(this.state.itemname=='')
    {
      //this.props.dispatch(ToastActionsCreators.displayInfo('Please fill all the items property.'));
      this.props.dispatch({type : 'COURIER_MODAL', visibility:false,itemindex:this.props.state.CourierItemIndex});
    }
    else {
    
 
      console.log(

        {type:'COURIER_ITEMADD',itemname:this.state.itemname,
        unitLength:this.state.heightUnit,unitWeight:this.state.weightUnit,
        role:this.state.role,
       height:itemheight, width:itemWidth,depth:itemLength,weight:itemWeight,isSkid:this.state.skid}

      )
      

      this.props.dispatch({type:'COURIER_ITEMADD',itemname:this.state.itemname,
         unitLength:this.state.heightUnit,unitWeight:this.state.weightUnit,
         role:this.state.role,
        height:itemheight, width:itemWidth,depth:itemLength,weight:itemWeight,isSkid:this.state.skid});
      this.props.dispatch({type : 'COURIER_MODAL', visibility:false,itemindex:this.props.state.CourierItemIndex});
    }

  }}
  onClick()
  {
    var id=!this.state.skid;
    this.setState({skid:!this.state.skid});
  }
  setCheckImage(value)
  {
    if(value)
    {
      return Constants.Images.customer.check;
    }
    else
    {
      return Constants.Images.customer.uncheck;
    }
  }

  

  onPickerHeightSelect(index)
  {
    this.setState({height:index});
  }
  onPickerHeight2Select(index)
  {
    this.setState({height2:index});
  }
  onPickerHeightUnitSelect(value,index)
  {


 

    this.setState({heightUnit:value});
  }
  onPickerWeightSelect(index)
  {
    this.setState({weight:index});
  }
  onPickerWeight2Select(index)
  {
    this.setState({weight2:index});
  }
  onPickerWeightUnitSelect(value,index)
  {

    this.setState({weightUnit:value});
  }
  onPickerDepthSelect(index)
  {
    this.setState({depth:index});
  }
  onPickerDepth2Select(index)
  {
    this.setState({depth2:index});
  }
  onPickerDepthUnitSelect(value,index )
  {
   this.setState({depthUnit:value});
   // alert(value +  ' ' +index);

  }
  onPickerWidthSelect(index)
  {
    this.setState({width:index});
  }
  onPickerWidth2Select(index)
  {
    this.setState({width2:index});
  }
  onPickerWidthUnitSelect(value,index)
  {
  
    this.setState({widthUnit:value});
   // alert(value +  ' ' +index);

  }

  render() {

    return (
        <View  style={[styles.modalOuter]}>
            <View  style={styles.modalInner}>
               
              <View style={[styles.flexRow,{backgroundColor:Constants.Colors.BackgroundBlue,borderBottomWidth:1,borderBottomColor:Constants.Colors.BackgroundBlue,justifyContent:'center',alignItems:'center',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6,}]}>
                <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}>
                  <Text style={{color:Constants.Colors.WhiteUpd,fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>{'Add Item'}</Text>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity activeOpacity={0.6} style={[styles.btCloseModal]} onPress={() => {this.props.dispatch({type : 'COURIER_MODAL', visibility:false})}}>
                    <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'}/>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView>
                         <View style={{backgroundColor:Constants.Colors.DarkBlue}}>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,borderBottomWidth:0.6,borderBottomColor:Constants.Colors.DarkBlue}]}>
                      <Text style={[styles.textStyle,{color:Constants.Colors.WhiteUpd,flex:0.3,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                        {this.props.state.LocationForService}{this.props.state.CourierItemIndex+1}{': '}
                      </Text>
                      <View style={[styles.flexRow,{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6}]}>
                        <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'}/>
                        <Text numberOfLines={1} style={[styles.textStyle,{textAlign:'left',marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                          {/* {this.props.state.DisplayLocationAddress[this.props.state.CourierItemIndex].address} */}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.flexRow,{justifyContent:'flex-start',alignItems:'flex-start',marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}]}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        placeholder='Item Name'
                        multiline={false}
                        style={[styles.inputStyle]}
                        onChangeText={(itemname) => this.setState({itemname})}
                      />
                    </View>
                    <CheckBoxLabel
                      viewStyle={{justifyContent:'flex-start',alignItems:'center',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5}}
                      imgsource={this.setCheckImage(this.state.skid)}
                      onPress={() => this.onClick()}
                      text={'This Parcel is on Skid'}

                      isInfoImg={false}
                    />
             
             <View style={{marginLeft:20,marginBottom:20,
             width: Constants.BaseStyle.DEVICE_WIDTH/1.5}}>
               <Text style={styles.unitFont}>
                          {'Unit'}
              </Text>
              <View style={[styles.flexRow,{marginTop:10}]}>
             
              <Radio  selectedColor={Constants.Colors.newOrange}
                    selected={this.state.role == 'FIP'}
                    onPress={() => this.setState({ role: 'FIP',
                     heightUnitText:'feet',heightUnitText1:'in',
                     WeightUnitText:'pounds', WeightUnitText1:'ounce'
                  })}

                    color={Constants.Colors.WhiteUpd}
                   
                  />
              <Text style={[{marginLeft:10,color:Constants.Colors.WhiteUpd}]}>
                          {'Feet , Inch , Pound'}
              </Text>
              </View>
            
              <View style={[styles.flexRow,{marginTop:10}]}>
             
              <Radio selectedColor={Constants.Colors.newOrange}
                    selected={this.state.role == 'MCK'}
                    onPress={() => this.setState({ role: 'MCK' ,
                    heightUnitText:'m',heightUnitText1:'cm',
                    WeightUnitText:'kg', WeightUnitText1:'g'
                  })}
                     color={Constants.Colors.WhiteUpd}
                  />
              <Text style={[{marginLeft:10,color:Constants.Colors.WhiteUpd}]}>
              {'Meter,Centimeter,Kilograms'}
              </Text>
              </View>
              </View>

              <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
                    justifyContent:'space-around',alignItems:'center',marginBottom:Constants.BaseStyle.DEVICE_WIDTH*1/100}]}>
                  <Text style={styles.unitFont}>
                          {'Weight'}
                        </Text>
                        <View style={styles.unitView}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                        itemWeight=value;
                        }
                      }
                      placeholder="00"
                      />

                       <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.WeightUnitText}
                        </Text>
                        </View>
                        <View style={styles.unitView}>
                        <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                          itemWeight1=value;
                        }
                      }
                      placeholder="00"
                      />

                        <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                         {this.state.WeightUnitText1}
                        </Text>
                        </View>
                    </View>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
                    justifyContent:'space-around',alignItems:'center'}]}>
                        <Text style={styles.unitFont}>
                          {'Height'}
                        </Text>
                      <View style={styles.unitView}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                        itemheight=value;
                        }
                      }
                      placeholder="00"
                      />

                       <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.heightUnitText}
                        </Text>
                        </View>
                        <View style={styles.unitView}>
                   
                        <TextInput
                        underlineColorAndroid="transparent"
                     //   placeholder='Height e.g 12.2'
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                        itemheight1=value;
                        }
                      }
                      placeholder="00"
                      />

                        <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.heightUnitText1}
                        </Text>
                        </View>
                    </View>
                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
                    justifyContent:'space-around',alignItems:'center'}]}>
                       <Text style={styles.unitFont}>
                          {'Width '}
                        </Text>
                        <View style={styles.unitView}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                        itemWidth=value;
                        }
                      }
                      placeholder="00"
                      />

                       <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.heightUnitText}
                        </Text>
                        </View>
                        <View style={styles.unitView}>
                        <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                          itemWidth1=value;
                        }
                      }
                      placeholder="00"
                      />

                        <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.heightUnitText1}
                        </Text>
                    </View>
                    </View> 


                    <View style={[styles.flexRow,{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
                    justifyContent:'space-around',alignItems:'center'}]}>
                       <Text style={styles.unitFont}>
                           {'Depth '}
                        </Text>
                        <View style={styles.unitView}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                        itemLength=value;
                        }
                      }
                      placeholder="00"
                      />

                       <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                           {this.state.heightUnitText}
                        </Text>
                        </View>
                        <View style={styles.unitView}>
                        <TextInput
                        underlineColorAndroid="transparent"
                        multiline={false}
                        maxLength={4}
                        keyboardType={'numeric'}
                        style={[styles.inputTextStyle]}
                        onChangeText={(value) => {
                          itemLength1=value;
                        }
                      }
                      placeholder="00"
                      />

                        <Text style={{color:Constants.Colors.WhiteUpd,marginLeft:10,
                        fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>
                          {this.state.heightUnitText1}
                        </Text>
                        </View>
                    </View>

                  </View> 
                
                <View style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 2,
                                    // color:Constants.Colors.BackgroundBlue
                                    }}>
                                     </View>
                <FormSubmitButton
              onPress={() => this.AddItem()}
              text="Done"
              style={[styles.ButtonStyle]}
              textStyle={[styles.ButtonTextStyle]}
            />
           
              </ScrollView>
            </View>
           
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },


  unitView:
    {flexDirection:'row',width:'25%', justifyContent:'space-around',alignItems:'center'},

    unitFont:{color:Constants.Colors.WhiteUpd,width:'15%',
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize},
  


  flexRow:{
		flexDirection: 'row',
	},
  logo: {
    height: 50,
    width: 50,
    alignSelf:'center',
    marginBottom:15,
  },
  inputStyle:{
		flex:1,
		borderWidth: 0.5,
		borderColor:'#B1B1B1',
		paddingTop:2,
		paddingBottom:2,
		paddingLeft:5,
		paddingRight: 5,
    textAlign:'left',
    backgroundColor:Constants.Colors.White
    // placeholderTextColor:Constants.Colors.WhiteUpd
  },
  
inputTextStyle:{

    textAlign:'center',
    height:40,
    width:50,
    borderColor:'#B1B1B1',
    borderWidth:1,
    backgroundColor:Constants.Colors.White

},

  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {
      backgroundColor: 'rgba(100,100,100,0.6)',
      //opacity:0.7,
      padding: Constants.BaseStyle.PADDING * .5,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  modalInner:{
    flex:1,
    marginBottom: 5,
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    //padding:Constants.BaseStyle.PADDING * .2,
    width:Constants.BaseStyle.DEVICE_WIDTH/100*90,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 75,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    backgroundColor:Constants.Colors.BackgroundBlue,
    //position: 'relative',
    borderRadius:10,
  },
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
		width:Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
		height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
	},
  pickupIcon:{
    //marginTop: 5,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 3,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
    //tintColor:Constants.Colors.Blue,
  },
  textStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    textAlign:'center',
    color:'#081933',
  },
  ButtonStyle: {
    // borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    alignSelf:"center"
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.semibold.fontFamily,
    color:Constants.Colors.White,
    textAlign: "center"
  },

  Headertext:{
    fontSize:20,
    marginBottom:15,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  Subheadtext:{
    fontSize:16,
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  recieveMsg:{
    fontSize:16,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Orange,
    textAlign:'center',
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100 *2,
    marginBottom : 10
  },

});

export default connect(state => ({state: state.CustomerReducer}))(AddCourierItems);
