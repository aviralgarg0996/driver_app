import React, { PropTypes } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
let Screen = require("Dimensions").get("window");
import Constants from '../../constants';
import { BoxShadow } from 'react-native-shadow';

const ShadowWhite = props => {
    const { text, onPress, style, textStyle, bottom } = props;

    return (
        <BoxShadow setting={{
            width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 85,
            height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6.8,
            color: "#000",
            border: 3,
            radius: 20,
            opacity: 0.1,
            x: 0,
            y: 2,
            style: {
                marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
                marginBottom: bottom
            }
        }}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.loginButtonStyle, style]}
                onPress={onPress}
            >
                <Text style={[{ color: Constants.Colors.Blue, textAlign: "center", fontWeight: '900', fontSize: 18 }, textStyle]}>{text}</Text>
            </TouchableOpacity>
        </BoxShadow>
    );
};
const styles = StyleSheet.create({
    loginButtonStyle: {
        borderWidth: 1,
        padding: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
        backgroundColor: '#fff',
        borderColor: "#53C8E5",
        marginTop: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
        marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 10,
        borderRadius: 5
    }
});

export default ShadowWhite;
