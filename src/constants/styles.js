import { StyleSheet, PixelRatio, Platform, Dimensions } from 'react-native';
const deviceScreen = require('Dimensions').get('window')
const { width, height } = Dimensions.get('window');
import colors from './Colors'
import { scaleHeight, scaleWidth} from "./responsive";
import Constants from "../constants";
module.exports = StyleSheet.create({
    scrollView: {
        backgroundColor: '#B99BC4',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center"
    },
    background: {
        height: '100%',
        width: '100%'
    },
    button: {
        width: '90%',
        alignSelf: 'center',
        height: scaleHeight(50),
        borderRadius: scaleHeight(5),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(35),
        backgroundColor: colors.DarkBlue,
        shadowColor: '#24BDFD',
        elevation: 2,
        shadowOffset: {
            width: scaleWidth(0),
            height: scaleHeight(3),
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
    buttonText: {
        color: colors.White,
        fontWeight: '600',
        backgroundColor: 'transparent',
        fontSize: 18,
        fontFamily: Constants.CustomerFonts.bold.fontFamily,
    },
});
