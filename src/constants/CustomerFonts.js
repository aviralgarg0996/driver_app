/*
 * @file: Fonts.js
 * @description: App Fonts
 * @date: 03.01.2018
 * @author: Ankush Rishi
 * */

'use-strict';
import BaseStyle from './BaseStyle';
import { Dimensions, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from "../utilities/ResponsiveFonts";


if (Platform.OS === 'android') {
  var CustomerFonts = {
    normal: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Regular',
    },
    bold: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Bold',
    },
    small: {
      fontSize: moderateScale(12),
      fontFamily: 'OpenSans-Regular',
    },
    small_13: {
      fontSize: moderateScale(13),
      fontFamily: 'OpenSans-Regular',
    },
    semibold: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Semibold',
    },
    content: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Regular',
    },
    contentBold: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Bold',
    },
    TopHeader: {
      fontSize: moderateScale(14),
      fontFamily: 'OpenSans-Semibold',
    },
    BigSize: {
      fontSize: moderateScale(16),
      fontFamily: 'OpenSans-Semibold',
    }
  }
} else {
  var CustomerFonts = {
    normal: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-Regular',
    },
    bold: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-ExtraBold',
    },
    small: {
      fontSize: moderateScale(12),
      fontFamily: 'Gilroy-Regular',
    },
    small_13: {
      fontSize: moderateScale(13),
      fontFamily: 'Gilroy-Light',
    },
    semibold: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-Medium',
    },
    content: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-Regular',
    },
    contentBold: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-Light',
    },
    TopHeader: {
      fontSize: moderateScale(14),
      fontFamily: 'Gilroy-Medium',
    },
    BigSize: {
      fontSize: moderateScale(16),
      fontFamily: 'Gilroy-ExtraBold',
    }
  }
}

module.exports = CustomerFonts
