/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput
} from 'react-native';

import { scaleHeight, scaleWidth, normalizeFont } from "../../../constants/responsive";
import Background from '../../../components/common/Background';
import Constants from "../../../constants";
import HeaderBackground from '../../../components/customer/HeaderBackground';

export default class CustomerNotifications extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      available: true
    }
  }

  setAvailability() {
    this.setState({
      available: !this.state.available
    })
  }

  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <HeaderBackground navigation={navigate} />
        <ScrollView style={{ flex: 1 }}>
          <Background style={styles.container}>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <View style={styles.rowContainer}>
                <View style={styles.searchContainer}>
                  <TextInput autoFocus={false} style={styles.txtInputSearch} underlineColorAndroid="transparent" />
                  <Image source={Constants.Images.customer.search} style={styles.searchContentIcon} resizeMode={'contain'} />
                </View>
                <View style={styles.rectViewIcon}>
                  <Image source={Constants.Images.customer.filter} style={[styles.filterIcon]} resizeMode={'center'} />
                </View>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            {/* second line of notification */}
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
            <ImageBackground style={{ marginTop: scaleHeight(0), width: '100%', marginBottom: scaleHeight(10) }} source={require('../../../assets/images/customer/blue.png')}>
              <Text style={[styles.notifyText, { marginLeft: scaleWidth(10), marginRight: scaleWidth(10), marginTop: scaleHeight(10) }]}>{'There are many variations of passages of Loreme Ipsum available.'}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: scaleWidth(10), marginBottom: scaleHeight(10) }}>
                <Image source={Constants.Images.customer.calendar} style={styles.calIcon} resizeMode={'contain'} />
                <Text style={[styles.notifyText]}>{'30 Jan'}</Text>
              </View>
            </ImageBackground>
          </Background>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.LightBlue
  },
  navigationBar: {
    backgroundColor: Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10,
    alignItems: 'center'
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  navIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
  },
  sectionHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Constants.BaseStyle.PADDING * .5,
    alignItems: 'center'
  },
  textBlue: {
    fontSize: 22,
    fontWeight: '700',
    color: Constants.Colors.Blue
  },
  textOrange: {
    fontSize: 16,
    fontWeight: '600',
    color: Constants.Colors.Orange
  },
  reportSection: {
    padding: Constants.BaseStyle.PADDING * .5
  },
  txtInputSearch: {
    backgroundColor: '#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.small.fontSize,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
  },
  searchContentIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginLeft: scaleWidth(230),
    position: 'absolute',
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(0)
  },
  calIcon: {
    height: scaleHeight(15),
    width: scaleWidth(15),
    marginRight: scaleWidth(8),
    marginTop: scaleHeight(5)
  },
  rectViewIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    backgroundColor: Constants.Colors.White,
    marginTop: scaleHeight(5),
    marginLeft: scaleWidth(25),
    borderRadius: scaleWidth(3),

  },
  filterIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 5,
    marginTop: scaleHeight(5),
    marginLeft: scaleHeight(12)
  },
  rowContainer: {
    flexDirection: 'row', justifyContent: 'flex-start', marginBottom: scaleHeight(2), marginTop: scaleHeight(2), marginLeft: scaleWidth(10), marginRight: scaleWidth(10)
  },
  searchContainer: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 6,
    flexDirection: 'row',
    width: scaleWidth(260),
    borderRadius: scaleWidth(3),
    marginLeft: scaleWidth(10),
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(5)
  },
  notifyText: {
    fontSize: normalizeFont(16),
    fontWeight: 'normal',
    color: Constants.Colors.White
  }
});
