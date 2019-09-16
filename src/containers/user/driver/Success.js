import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedBacks } from 'react-native'
import Background from '../../../components/common/Background';
export default class Success extends Component {
  render() {
    return (
      <Background>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "white" }}>Your Registration is Done</Text>
          <Text style={{ fontSize: 18, color: "white" }}>Wait For the email to get your status approved</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          ><Text style={{ fontSize: 18, color: "green", marginTop: 15 }}>Go to Login Screen?Click Here</Text>
          </TouchableOpacity>
        </View>
      </Background>
    )
  }
}
