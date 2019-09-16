import React, { Component } from 'react';
import { AppRegistry, TextInput,StyleSheet,Dimensions,View,Text } from 'react-native';
const { height, width } = Dimensions.get('window');
import Constants from "../../constants"
export default class RoomsText extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

componentDidMount = () => {
  console.log("nextprops1`1111",this.props)
  if(this.props.data)
  {
    this.setState({text:this.props.data.volume})
  }
}

  render() {
    return (
        <View style={styles.roomContainer}>
       <View style={{flex:1}}><Text style={styles.headingText}>{this.props.text}</Text></View>
        <View style={{flex:3}}>
        <TextInput
        value={this.state.text}
        style={[styles.textInputStyle]}
      placeholder={this.props.text}
      onChangeText={(text) => this.setState({text})}
      onBlur={(text)=>this.props.Cb({roomid:this.props.id,volume:this.state.text})}
    /></View>
        </View>
    );
  }
}

const styles=StyleSheet.create({
    roomContainer:{
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
      },
      headingText:{
        color:Constants.Colors.Black
      },
      textInputStyle:{
        width:width*0.37,
        paddingLeft:10,
        color:Constants.Colors.WhiteUpd,
      borderBottomWidth:1,
        }
})