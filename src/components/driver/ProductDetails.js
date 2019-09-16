import React, { Component } from 'react'
import {StyleSheet,View,KeyboardAvoidingView,Image,Text,TouchableHighlight} from 'react-native'
import Carousel  from 'react-native-snap-carousel'
import { connect } from 'react-redux';
import Constants from "../../constants";
import { ToastActionsCreators } from 'react-native-redux-toast';
import { bindActionCreators } from "redux";
import * as UserActions from '../../redux/modules/user';
 class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state={
productImages:[],
productDesc:"",
productTitle:""
    }
  }
  renderItem ({item, index}) {
    return (
        <View style={{flex:1}}>
            <Text style={styles.title}>Hello</Text>
        </View>
    );
}

  render() {
   return (
      <View  style={[styles.modalOuter,{height:"80%",marginVertical:"10%"}]}>
      {/* <Text>Heyyy</Text> */}
      <View  style={styles.modalInner}>
        <KeyboardAvoidingView behavior={'position'}>
        <View>
          <TouchableHighlight underlayColor={Constants.Colors.Orange} style={[styles.btCloseModal]} onPress={() => {
            this.props.closeModal()
            }}>
            <Image source={Constants.Images.driver.close} style={[styles.btnCloseModalIcon]}/>
           </TouchableHighlight>
           <View>
               <View style={[styles.viewStyle]}>
              <Image style={{width:"100%",height:200,backgroundColor:'gray',marginTop:70}}source={Constants.Images.driver.taxi} />
               {/* <Carousel
              ref={(c) => { this._carousel = c; }}
               data={this.state.productImages}
               renderItem={this.renderItem}
               sliderWidth={300}
               itemWidth={250}
            />  */}
               </View>
               <View>
                 <Text style={{fontSize:16,color:"gray"}}>
                 Lorem Ipsum is simply dummy text of the printing
                 and typesetting industry. Lorem Ipsum has been the
                 industry's standard
                 </Text>
                 <Text style={{fontSize:18,color:'gray',flex:1}}>
                 3 Items
                 </Text>
                 <Text style={{fontSize:18,color:'gray',flex:1}}>
                 Clothing
                 </Text>
               </View>
             </View>
             </View>
        </KeyboardAvoidingView>

        </View>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf:'center',
    marginBottom:15,
  },
  text:{
    fontSize:22,
    fontWeight:'900',
    backgroundColor:'transparent',
    color:Constants.Colors.Blue,
    textAlign:'center'
  },
  modalOuter: {

      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: Constants.BaseStyle.PADDING * .5,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
  modalInner:{
    margin: 10,
    padding:50,
    backgroundColor:'#fff',
    position: 'relative',
    borderRadius:5,
  },
  btCloseModal:{
			width: 20,
			height:20,
			borderRadius:20,
	},
  btnCloseModalIcon:{
		width:20,
		height:20,
	},

  viewStyle: {
    borderBottomColor: Constants.Colors.White,
    borderBottomWidth: 1,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*7,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH*2/100,
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2
  },
  inputTextViewStyle: {
    marginTop:Constants.BaseStyle.DEVICE_HEIGHT/100*2
  },
  ButtonStyle: {
    borderWidth: 1,
    padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    backgroundColor: "rgba(115,115,115,0.4)",
    borderColor: "rgba(115,115,115,0.4)",
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 2,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*15,
    borderRadius:5,
  },
  inputStyle: {
    fontSize:18,
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
    marginBottom : 10,
    textDecorationLine:'underline'
  },

});

const mapStateToProps = state => ({
  modalstate: state.ModalHandleReducer,
  phone: state.user.phone,
});

const mapDispatchToProps = dispatch => ({
  UserActions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);