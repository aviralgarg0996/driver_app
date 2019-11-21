import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';
import { withNavigation } from "react-navigation"
import LinearGradient from 'react-native-linear-gradient';


import Constants from '../../constants';
import RestClient from '../../utilities/RestClient';
import Connection from '../../config/Connection';
var goBack = null;
class HeaderBackground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerImageSource: null
    }
  }
  componentDidMount = () => {
    AsyncStorage.getItem("token").then((tokenValue) => {
      RestClient.get("drivers/getcustomers", {}, tokenValue).then((response) => {        response.data && response.data.length > 0 && response.data[0].custbannerPic && this.setState({
          bannerImageSource: { uri: `${Connection.getBaseUrl()}/${response.data[0].custbannerPic.path}` }

        })
      })
    })
  }

  render() {
  const  navigate = this.props.navigation;
    return (
      <LinearGradient colors={[Constants.Colors.LightBlue, Constants.Colors.LightBlue]} style={styles.navigationBarcontainer}>
        <View style={styles.navigationBar}>
          <TouchableOpacity 
          // onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
            <Image source={(this.state.bannerImageSource && this.state.bannerImageSource!="") ? this.state.bannerImageSource : Constants.Images.customer.default_avatar}
              style={[styles.navIcons, { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 ,overflow:"hidden"}]}
               resizeMode={'cover'} />
          </TouchableOpacity>
          {(goBack) ?
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={Constants.Images.customer.goback}
                style={[styles.backIcons, { marginLeft: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2 }]} resizeMode={'contain'} />
            </TouchableOpacity>
            :
            null
          }
          <View style={styles.navBarCenter}>
            <TouchableOpacity activeOpacity={0.9} style={[{ flexDirection: 'row' }]}
              onPress={() =>
                console.log("it's here")
              }>
              <Image
                source={Constants.Images.customer.itshere}
                style={styles.mapIcon} resizeMode={'contain'} />
              {/* <Text style={styles.mapText}>it's here</Text> */}
            </TouchableOpacity>
          </View>

          <View style={[styles.navBarRight]}>
            <TouchableOpacity style={[{ flexDirection: 'row' }]}
              onPress={() => {
                navigate("customerSettings")
              }
              }>
              <Image
                source={Constants.Images.customer.setting}
                style={styles.settingIcon} 
                resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

export default withNavigation(HeaderBackground)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Constants.BaseStyle.DEVICE_WIDTH
  },
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
  },
  navigationBar: {
    backgroundColor: 'transparent',//Constants.Colors.LightBlue,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 0.5,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 20,
  },
  navBarCenter: {
    flex: 1,
    flexDirection: 'row',
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 0,
  },
  mapText: {
    fontSize: 20,
    color: '#F9F9FB',
    marginTop: 3.5,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },

  navIcons: {
    height: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 10,
    marginTop: 3.5,
    borderRadius: Constants.BaseStyle.DEVICE_WIDTH / 100 * 30,
    borderWidth:1
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  backIcons: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  mapIcon: {
    height: 100,
    width: 100,
    marginTop: 3.5,
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 22
  },
});
