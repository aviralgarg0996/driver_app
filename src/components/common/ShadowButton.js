import React, { PropTypes } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions, ImageBackground } from "react-native";
let Screen = require("Dimensions").get("window");
import Constants from '../../constants';
import { scaleHeight, scaleWidth, normalizeFont } from "../../constants/responsive";

const ShadowButton = props => {
  const { text, onPress, style, textStyle } = props;

  return (
    <TouchableOpacity
      style={[styles.loginButtonStyle, style]}
      onPress={onPress}
    >
      <ImageBackground 
      source={Constants.Images.customer.shadowButton} 
      style={{ width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 100, 
      height: scaleHeight(65), padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4 ,justifyContent:"center"}}>
        <Text style={[{ color: Constants.Colors.White, textAlign: "center", fontWeight: '900', fontSize: normalizeFont(20) }, textStyle]}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  loginButtonStyle: {
    marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
    borderRadius: 5
  }
});

export default ShadowButton;
