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
  ScrollView,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import Constants from "../../constants";
import {BoxShadow} from 'react-native-shadow';
import ShadowButton from '../common/ShadowButton';
var navigate=null;
class AddFurnitureItems extends Component<{}> {
  constructor(props){
    super(props);
    this.state={


    }
  }

  AddItem()
  {
      this.props.dispatch({type:'FURNITURE_ITEMADD',ItemList:this.props.state.FurnitureItemList});
      this.props.dispatch({type : 'COURIER_MODAL', visibility:false,itemindex:this.props.state.CourierItemIndex});
  }

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

  onClickCirclePlus(category,id)
  {
    this.props.dispatch({type:'FURNITURE_ONCLICK_CIRCLEPLUS',category:category,id:id});
  }
  onClickCircleQuantity(category,id)
  {
    this.props.dispatch({type:'FURNITURE_ONCLICK_CIRCLEQUANTITY',category:category,id:id});
  }
  onClickSubtract(category,id)
  {
    this.props.dispatch({type:'FURNITURE_ONCLICKMINUS',category:category,id:id});
  }

  onClickAdd(category,id)
  {
    this.props.dispatch({type:'FURNITURE_ONCLICKPLUS',category:category,id:id});
  }
  onClickDelete(category,id)
  {
    this.props.dispatch({type:'FURNITURE_ONCLICKDELETE',category:category,id:id});
  }

  productList(item)
  {

   
    return(
            <View key={1} style={[{backgroundColor:Constants.Colors.BackgroundBlue,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 21,width:Constants.BaseStyle.DEVICE_WIDTH/100 * 35}]}>
              {item.quantity > 0 ?
                (item.qtyInCircle == 0) ?
                  <View style={[styles.flexRow,styles.PlusMinusViewStyle]}>
                    {item.quantity==1 ?
                      <TouchableOpacity style={styles.LeftMinusStyle} activeOpacity={0.5} onPress={() => this.onClickDelete(item.category,item.id)}>
                          <Image source={Constants.Images.customer.delete} style={[styles.deleteIcon]} resizeMode={'contain'}/>
                      </TouchableOpacity>
                    :
                      <TouchableOpacity style={styles.LeftMinusStyle} activeOpacity={0.5} onPress={() => this.onClickSubtract(item.category,item.id)}>
                          <Image source={Constants.Images.customer.minus} style={[styles.minusIcon]} resizeMode={'contain'}/>
                      </TouchableOpacity>
                    }
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={[styles.textStyle,{color:Constants.Colors.newOrange}]}>
                        {item.quantity}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.RightPlusStyle} 
                    activeOpacity={0.5} onPress={() => this.onClickAdd(item.category,item.id)}>
                      <Image source={Constants.Images.customer.plus} style={[styles.plusIcon]} resizeMode={'contain'}/>
                    </TouchableOpacity>
                  </View>
                  :

                  <TouchableOpacity style={[styles.flexRow,styles.coloredItemNoView,{alignItems:'center',justifyContent:'center'}]} activeOpacity={0.5} 
                  onPress={() => this.onClickCircleQuantity(item.category,item.id)}>
                        <Text style={[styles.InnerCircleText]}>{item.qtyInCircle}</Text>
                  </TouchableOpacity>

                :
                  <TouchableOpacity style={[styles.flexRow,{justifyContent:'flex-end'}]} 
                  activeOpacity={0.5} 
                  onPress={() => this.onClickCirclePlus(item.category,item.id)}>
                      <Image source={Constants.Images.customer.plus_circle} 
                      
                      style={[styles.circleplusIcon]} resizeMode={'contain'}/>
                  </TouchableOpacity>
              }
                <View key={3} style={{alignItems:'center'}}>
                  <Image key={4} source={{uri:item.img}} style={[styles.productIcons,{alignItems:'center'}]} resizeMode={'contain'}/>
                  <Text key={5} style={[styles.productLabel]}>{item.name}</Text>
                </View>
            </View>
    	)
  }


  render() {

    var list=this.props.state.FurnitureItemList.map((val,i) => {
      return(
             <View style={[{backgroundColor:Constants.Colors.BackgroundBlue,marginTop:20,textTransform: 'uppercase',fontSize:16}]}>
          <Text style={{marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2,color:Constants.Colors.WhiteUpd}}>{val.categoryName.toUpperCase()}</Text>
          <FlatList data={val.products} renderItem={({item})=>this.productList(item)} horizontal={true}
          /> 
        </View>
        );
    });

    return (
        <View  style={[styles.modalOuter]}>
            <View  style={styles.modalInner}>
              <View style={[styles.flexRow,{borderTopLeftRadius: 10,borderTopRightRadius: 10,backgroundColor:'#EFEDED',borderBottomWidth:1,borderBottomColor:'#969297',justifyContent:'center',alignItems:'center',height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5.5,}]}>
                <View style={{flex:1,justifyContent:'flex-start',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2}}>
                  <Text style={{color:'#969297',fontFamily:Constants.CustomerFonts.semibold.fontFamily,fontSize:Constants.CustomerFonts.semibold.fontSize}}>{'Add Furniture and Appliances'}</Text>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity activeOpacity={0.6} style={[styles.btCloseModal]} onPress={() => {this.props.dispatch({type : 'COURIER_MODAL', visibility:false})}}>
                    <Image source={Constants.Images.customer.close} style={[styles.btnCloseModalIcon]} resizeMode={'contain'}/>
                  </TouchableOpacity>
                </View>
              </View>

                <View style={{backgroundColor:Constants.Colors.BackgroundBlue}}>
                  <View style={{flexDirection:"row",alignItems:"center"}}> 
                  <Image source={this.props.state.LocationImgForService} style={[styles.pickupIcon]} resizeMode={'contain'}/>
                  <Text style={[styles.textStyle,{color:Constants.Colors.White,flex:0.3,justifyContent:'flex-start',textAlign:'left',marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2,fontSize:16,fontWeight:"400"}]}>
                      {this.props.state.LocationForService}{this.props.state.CourierItemIndex+1}{': '}
                    </Text>
                  </View>
                   
                      <Text numberOfLines={1} style={[styles.textStyle,{textAlign:'left',color:Constants.Colors.WhiteUpd,marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 6,fontSize:16}]}>
                        {this.props.state.DisplayLocationAddress[this.props.state.CourierItemIndex].address}
                      </Text>
                </View>
              <ScrollView style={{flex:1}}>
              {list}
              </ScrollView>
              <ShadowButton
                            text="Done"
                            textStyle={styles.ButtonTextStyle}
                            style={[styles.ButtonStyle]} 
                            onPress={() => this.AddItem()}
                        />
              {/* <BoxShadow setting={{width:Constants.BaseStyle.DEVICE_WIDTH/100 * 80,
                                  height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 6.3,
                                  color:"#000",
                                  border:3,
                                  radius:20,
                                  opacity:0.1,
                                  x:2,
                                  y:2,
                                  style:{marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
                                    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
                                  marginBottom:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3}}}> */}
                {/* <TouchableOpacity activeOpacity={0.5} style={[styles.ButtonStyle]} onPress={() => this.AddItem()}>
                  <Text style={[styles.ButtonTextStyle]}>
                    {'DONE'}
                  </Text>
                </TouchableOpacity> */}
              {/* </BoxShadow> */}


            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
    textAlign:'left'
	},
  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {
      // opacity:0.7,
      padding: Constants.BaseStyle.PADDING * .5,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  modalInner:{
    margin: 10,
    width:Constants.BaseStyle.DEVICE_WIDTH,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 90,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 5,
    backgroundColor:Constants.Colors.BackgroundBlue,
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
  plusIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    tintColor:Constants.Colors.DarkBlue,
    marginRight:Constants.BaseStyle.DEVICE_WIDTH/100 * 2,
  },
  minusIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    tintColor:Constants.Colors.DarkBlue,
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
  },
  deleteIcon:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 4,
    // tintColor:'#F58436',
    marginLeft:Constants.BaseStyle.DEVICE_WIDTH/100 * 1,
  },
  circleplusIcon:{
    height:Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginRight:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2,
    // tintColor:Constants.Colors.White,
    borderWidth:1,
    backgroundColor:Constants.Colors.White,
    // resizeMode:"contain"
  },
  coloredItemNoView : {
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 4.5,
    width: Constants.BaseStyle.DEVICE_HEIGHT/100 * 4.5,//Constants.BaseStyle.DEVICE_WIDTH/100 * 7,
    marginLeft:(Constants.BaseStyle.DEVICE_WIDTH/100) * 20,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    backgroundColor:Constants.Colors.White,
  },
  InnerCircleText:{
    color: Constants.Colors.DarkBlue,
    fontSize:Constants.CustomerFonts.contentBold.fontSize,
    fontFamily:Constants.CustomerFonts.bold.fontFamily,
  },

  textStyle:{
    fontSize:Constants.CustomerFonts.small_13.fontSize,
    fontFamily:Constants.CustomerFonts.normal.fontFamily,
    textAlign:'center',
    color:'#081933',
  },
  ButtonStyle: {
    // borderWidth: 1,
    // padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2.6,
    // marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginBottom:10,
    width:Constants.BaseStyle.DEVICE_WIDTH*0.7,
    alignSelf:"center",
    // marginTop:0,
    // marginLeft:0,//(Constants.BaseStyle.DEVICE_WIDTH/100)*10,//10,
    // marginRight:0,//(Constants.BaseStyle.DEVICE_WIDTH/100)*10,//10,
    // borderRadius:30,
    // backgroundColor: Constants.Colors.DarkBlue,
    // borderColor: Constants.Colors.DarkBlue,
  },
  ButtonTextStyle:{
    fontSize:Constants.CustomerFonts.BigSize.fontSize,
    fontFamily:Constants.CustomerFonts.BigSize.fontFamily,
    color:Constants.Colors.White,
    textAlign: "center",
    alignSelf:"center"
  },
  productIcons:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH/100 * 18,
    //padding:0,
  },
  productLabel:{
    textAlign:'center',
    marginTop:0,
    color:Constants.Colors.WhiteUpd,
    fontSize:Constants.CustomerFonts.semibold.fontSize,
    fontFamily:Constants.CustomerFonts.small.fontFamily,
  },
  PlusMinusViewStyle:{
    height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 5,
    //width:Constants.BaseStyle.DEVICE_WIDTH/100 * 25,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    //marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100) * 2,
    backgroundColor:'#ffffff',
    borderRadius:3,
    borderWidth:1,
    borderColor:Constants.Colors.BlurGrey,
  },
  LeftMinusStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Constants.Colors.White,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  RightPlusStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Constants.Colors.White,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },



});

export default connect(state => ({state: state.CustomerReducer}))(AddFurnitureItems);
