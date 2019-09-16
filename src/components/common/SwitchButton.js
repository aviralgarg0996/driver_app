import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Switch,
  ImageBackground
} from 'react-native';

import Constants from '../../constants';

export default class SwitchButton extends Component<{}> {
  constructor(props){
    super(props);
    this.state={
      available:true
    }
  }

  setAvailability(){
    this.setState({
      available:!this.state.available
    })
  }


  render() {
    return (
      <Switch
      tintColor={ Constants.Colors.Gray}
      onTintColor={ Constants.Colors.Blue}
      onChange={()=>{this.props.onChange(),
      this.setAvailability()
      }}
      value={this.props.value}
        style={styles.container}>

      </Switch>
    );
  }
}

const styles = StyleSheet.create({
  container:{

  },
});
