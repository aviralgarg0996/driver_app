/*
 * @file: Fonts.js
 * @description: App Fonts
 * @date: 03.01.2018
 * @author: Ankush Rishi
 * */

'use-strict';
import BaseStyle from './BaseStyle';
import { Dimensions, Platform} from 'react-native';
import { scale, verticalScale, moderateScale } from "../utilities/ResponsiveFonts";


if (Platform.OS==='android') {
  var Fonts = {
    normal: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Regular',
    },
    bold: {
      fontSize: moderateScale(14),
      fontFamily: 'Montserrat-Medium',
    },
    content: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Regular',
    },
    contentBold: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Medium',
    },
    subtitle: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Regular',
    },
    subtitle_bold: {
      fontSize: moderateScale(18),
      fontFamily: 'Montserrat-Medium',
    },
    title: {
      fontSize: moderateScale(20),
      fontFamily: 'Montserrat-Regular',
    },
    title_bold: {
      fontSize: moderateScale(20),
      fontFamily: 'Montserrat-Medium',
    },
    tab_header: {
      fontSize: moderateScale(22),
      fontFamily: 'Montserrat-Regular',
    },
    tab_header_bold: {
      fontSize: moderateScale(22),
      fontFamily: 'Montserrat-Medium',
    },
    headers: {
      fontSize: moderateScale(20),
      fontFamily: 'Montserrat-Regular',
    },
    headers_bold: {
      fontSize: moderateScale(20),
      fontFamily: 'Montserrat-Medium',
    },
    text_input: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Regular',
    },
    tiny_bold: {
      fontSize: moderateScale(12),
      fontFamily: 'Montserrat-Medium',
    },
    tiny: {
      fontSize: moderateScale(12),
      fontFamily: 'Montserrat-Regular',
    },
    tinyMedium: {
      fontSize: moderateScale(11),
      fontFamily: 'Montserrat-Regular',
    },
    tinyMedium_bold: {
      fontSize: moderateScale(11),
      fontFamily: 'Montserrat-Medium',
    },
    tinyLarge: {
      fontSize: moderateScale(13),
      fontFamily: 'Montserrat-Regular',
    },
    tinyLargeBold: {
      fontSize: moderateScale(13),
      fontFamily: 'Montserrat-Medium',
    },
    content_bold: {
      fontSize: moderateScale(16),
      fontFamily: 'Montserrat-Regular',
    },
    largest: {
      fontSize: moderateScale(22),
      fontFamily: 'Montserrat-Regular',
    },
    largest_bold: {
      fontSize: moderateScale(22),
      fontFamily: 'Montserrat-Medium',
    },
    mediumSize: {
      fontSize: moderateScale(11),
      fontFamily: 'Montserrat-Regular',
      lineHeight: 20
    },
    mediumSizeBold: {
      fontSize: moderateScale(11),
      fontFamily: 'Montserrat-Medium',
      lineHeight: 20
    },
    smallSize: {
      fontSize: moderateScale(10),
      fontFamily: 'Montserrat-Regular',
      lineHeight: 20
    },
    nav_header: {
      fontSize: moderateScale(17),
      fontFamily: 'Montserrat-Medium',
    },
    calendar_text: {
      fontSize: moderateScale(24),
      fontFamily: 'Montserrat-Regular',
    },
    calendar_text_bold: {
      fontSize: moderateScale(24),
      fontFamily: 'Montserrat-Medium',
    },
    calendar_text_selected: {
      fontSize: moderateScale(28),
      fontFamily: 'Montserrat-Regular',
    },
  }
} else {
  var Fonts = {
    normal: {
      fontSize: moderateScale(14),
      fontFamily: 'Helvetica',
    },
    bold: {
      fontSize: moderateScale(14),
      fontFamily: 'Helvetica-Bold',
    },
    content: {
      fontSize: moderateScale(16),
      fontFamily: 'Helvetica',
    },
    contentBold: {
      fontSize: moderateScale(16),
      fontFamily: 'Helvetica-Bold',
    },
    subtitle: {
      fontSize: moderateScale(18),
      fontFamily: 'Helvetica',
    },
    subtitle_bold: {
      fontSize: moderateScale(18),
      fontFamily: 'Helvetica-Bold',
    },
    title: {
      fontSize: moderateScale(20),
      fontFamily: 'Helvetica',
    },
    title_bold: {
      fontSize: moderateScale(20),
      fontFamily: 'Helvetica-Bold',
    },
    tab_header: {
      fontSize: moderateScale(22),
      fontFamily: 'Helvetica',
    },
    tab_header_bold: {
      fontSize: moderateScale(22),
      fontFamily: 'Helvetica-Bold',
    },
    headers: {
      fontSize: moderateScale(20),
      fontFamily: 'Helvetica',
    },
    headers_bold: {
      fontSize: moderateScale(20),
      fontFamily: 'Helvetica-Bold',
    },
    text_input: {
      fontSize: moderateScale(16),
      fontFamily: 'Helvetica',
    },
    tiny_bold: {
      fontSize: moderateScale(12),
      fontFamily: 'Helvetica-Bold',
    },
    tiny: {
      fontSize: moderateScale(12),
      fontFamily: 'Helvetica',
    },
    tinyMedium: {
      fontSize: moderateScale(11),
      fontFamily: 'Montserrat-Regular',
    },
    tinyMedium_bold: {
      fontSize: moderateScale(11),
      fontFamily: 'Helvetica-Bold',
    },
    tinyLarge: {
      fontSize: moderateScale(13),
      fontFamily: 'Helvetica',
    },
    tinyLargeBold: {
      fontSize: moderateScale(13),
      fontFamily: 'Helvetica-Bold',
    },
    content_bold: {
      fontSize: moderateScale(16),
      fontFamily: 'Helvetica',
    },
    largest: {
      fontSize: moderateScale(22),
      fontFamily: 'Helvetica',
    },
    largest_bold: {
      fontSize: moderateScale(22),
      fontFamily: 'Helvetica-Bold',
    },
    mediumSize: {
      fontSize: moderateScale(11),
      fontFamily: 'Helvetica',
      lineHeight: 20
    },
    mediumSizeBold: {
      fontSize: moderateScale(11),
      fontFamily: 'Helvetica-Bold',
      lineHeight: 20
    },
    smallSize: {
      fontSize: moderateScale(10),
      fontFamily: 'Helvetica',
      lineHeight: 20
    },
    nav_header: {
      fontSize: moderateScale(17),
      fontFamily: 'Helvetica-Bold',
    },
    calendar_text: {
      fontSize: moderateScale(24),
      fontFamily: 'Helvetica',
    },
    calendar_text_bold: {
      fontSize: moderateScale(24),
      fontFamily: 'Helvetica-Bold',
    },
    calendar_text_selected: {
      fontSize: moderateScale(28),
      fontFamily: 'Helvetica',
    },
  }
}


module.exports = Fonts
