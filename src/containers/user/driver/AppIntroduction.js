import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet } from 'react-native';
import Constants from '../../../constants';
import AppIntroSlider from '../../../components/common/AppIntroSlider';


const styles = StyleSheet.create({
  image: {
   height: Constants.BaseStyle.DEVICE_HEIGHT,
   width: Constants.BaseStyle.DEVICE_WIDTH,
  }
});

const slides = [
  {
    image: require('../../../assets/images/DriverIntro_1.png'),
    imageStyle: styles.image,
  },
  {
    image: require('../../../assets/images/DriverIntro_2.png'),
    imageStyle: styles.image,
  },
  {
    image: require('../../../assets/images/DriverIntro_3.png'),
    imageStyle: styles.image,
  },
  {
    image: require('../../../assets/images/DriverIntro_4.png'),
    imageStyle: styles.image,
  },
  {
    image: require('../../../assets/images/DriverIntro_5.png'),
    imageStyle: styles.image,
  }
];


export default class AppIntroduction extends Component {
  _onDone = () => {
    this.props.navigation.navigate("LandingScreen")
    // User finished the introduction. Show "real" app
  }

  

  render() {
   // alert(Constants.BaseStyle.DEVICE_HEIGHT*.06)
    return (
      <AppIntroSlider
        slides={slides}
        showSkipButton
          onDone={this._onDone}
          
        renderDoneButton={this._onDone}
        //renderNextButton={this._onDone}
      />
    );
  }
}