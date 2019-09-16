import React, { Component } from 'react';
import { AppRegistry, TextInput ,StyleSheet,Dimensions,View,Text,Button} from 'react-native';
import RestClient from '../../utilities/RestClient';
import Constants from "../../constants"
import { startLoading, stopLoading, showToast, hideToast } from '../../redux/modules/app';
import { Dropdown } from 'react-native-material-dropdown';
import _ from "underscore";
const { height, width } = Dimensions.get('window');
let experienceYearData=[{
    value: '1',
  }, {
    value: '2',
  }, {
    value: '3',
  },
  {
    value: '4',
  }, {
    value: '5',
  }, {
    value: '6',
  },
  {
    value: '7',
  }, {
    value: '8',
  }, {
    value: '9',
  },
  ]

  let experienceType=[{
    value: '1',
  }, {
    value: '2',
  }, {
    value: '3',
  },
  {
    value: '4',
  }, {
    value: '5',
  }, {
    value: '6',
  },
  {
    value: '7',
  }, {
    value: '8',
  }, {
    value: '9',
  },
  ]

export default class DriverExperienceView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        selectedExperience: '',
        selectedExperienceYears:"",
        certificatesData:[],
        experienceDuration:"",
        type:"",
        pickerValue:displaycertifciateList,
        propsLoaded:false
    };
  } 
componentDidMount = () => {


  this.props.onRef(this,this.props.exp);

  console.log("objjjjjjj",this.props.obj) 
  if(this.props.obj)
  {
if(this.props.obj.type && this.props.obj.duration)
{

  let title=_.findWhere(this.props.data, {id: this.props.obj.type._id});
console.log(title);
  this.setState({
type:title?title.value:'',
experienceDuration:this.props.obj.duration,
propsLoaded:true
})
}
  }
else{
  this.setState({
    propsLoaded:true
  })
}

//alert(certificatesList);
}




setPickerValues=()=>{

this.setState({pickerValue:displaycertifciateList})

}

  render() {

  
   
    return (
        this.state.propsLoaded?<View style={styles.rowContainerStyle}>
        <View>
          {/* <Text style={styles.headingText}>Experience Type</Text> */}
          <Dropdown
  containerStyle={styles.textInputStyle}
        label=''
        data={this.state.pickerValue}
        value={this.state.type}

      // renderBase={()=>{}} 
        onChangeText={(text)=>{
this.setState({type:text})
     
          this.props.Cb({
            value:text,
            exp:this.props.exp
          });
      }
      }        
      />
          </View>
       { this.state.type!='' && <View>
       <Dropdown
        
    containerStyle={styles.textInputStyle1}
          label='Total Experience'
          data={experienceYearData}
          value={this.state.experienceDuration}
          onChangeText={(text)=>this.props.Cb1({
            value:text,
            exp:this.props.exp
          })}
        />
        
          </View>
       }

       <View>
         <Button title=' - ' onPress={() => {
     

       this.props.removeRow(this.props.exp);
          //  this.addExperience()
        }} />
        
      </View>   


        </View>:<View></View>
    );
  }
}


const styles=StyleSheet.create({
    rowContainerStyle:{
        flex:1,
        flexDirection:"row",
        margin:5,
         alignItems:"flex-end",
        justifyContent:"space-between"
      },
      headingText:{
        color:"#396cb3"
      },
      textInputStyle:{
      width:width*0.55,
      paddingLeft:10
      },
      textInputStyle1:{
        width:width*0.25,
        paddingLeft:10
        },
})