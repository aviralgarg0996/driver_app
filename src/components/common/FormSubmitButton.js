import React, { PropTypes } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions ,ImageBackground} from "react-native";
let Screen = require("Dimensions").get("window");
import Constants from '../../constants';
const FormSubmitButton = props => {
  const { text, onPress, style, textStyle } = props;

  return (
    <TouchableOpacity
      style={[styles.loginButtonStyle,style]}
      onPress={onPress}
    >
     <ImageBackground source={require("../../assets/images/customer/blue.png")} style={{width:(Constants.BaseStyle.DEVICE_WIDTH/100)*80,padding:Constants.BaseStyle.DEVICE_WIDTH / 100 * 4}}>
      <Text style={[{ color: Constants.Colors.White, textAlign: "center",fontWeight:'900',fontSize:18},textStyle ]}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  loginButtonStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginHorizontal:(Constants.BaseStyle.DEVICE_WIDTH/100)*10,
    borderRadius:5
  }
});

export default FormSubmitButton;
