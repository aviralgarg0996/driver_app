import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

class timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countDown: 180000
    }
    //this.startTime()
  }
    startTime = () => {
      that = this;
      timerVar = setInterval(function () {
        if (that.state.countDown > 1000) {
          that.setState({ countDown: that.state.countDown - 1000 });
          that.props.cb(that.state.countDown)
        }
      }, 1000);

    }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.countDown}</Text>
      </View>
    );
  }
  
}


export default timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});