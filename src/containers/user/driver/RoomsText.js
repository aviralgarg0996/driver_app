import React, { Component } from 'react';
import { AppRegistry, TextInput,StyleSheet,Dimensions,View,Text } from 'react-native';
const { height, width } = Dimensions.get('window');

export default class RoomsText extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
        <View style={styles.roomContainer}>
        <Text>{this.props.text}</Text>
        <TextInput
      style={styles.roomInputStyle}
      placeholder={this.props.text}
      onChangeText={(text) => this.setState({text})}
      onBlur={(text)=>this.props.Cb({roomid:this.props.id,volume:this.state.text})}
    />
        </View>
    );
  }
}

const styles=StyleSheet.create({
    roomContainer:{
        flex:1,
        flexDirection:"row"
      },
      roomInputStyle:{
        paddingLeft:10,
        width:width*0.28,
        marginLeft:10
      },  
})