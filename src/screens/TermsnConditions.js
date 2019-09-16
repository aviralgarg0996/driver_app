import React, { Component } from 'react'
import {View,Text} from "react-native"
import Background from '../../src/components/common/Background';
export default class TermsnConditions extends Component {
  render() {
    return (
      <Background>
<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
<Text style={{color:"white",fontSize:20}}>
Terms & Conditions
</Text>

</View>

      </Background>
    )
  }
}
