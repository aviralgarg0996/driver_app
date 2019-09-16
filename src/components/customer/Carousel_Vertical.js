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
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';


import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import { connect } from 'react-redux';

//import Background from '../../components/common/Background';
import Constants from "../../constants";
const { Popover } = renderers;
class Carousel_Vertical extends Component<{}> {
  constructor(props) {
    super(props);

  }

  render() {
    let {
      imgsource, text, MyTextStyle, isInfoImg, checkimgsize, infoimgSize, viewStyle
    } = this.props;
    return (

      <View style={[styles.flexRow, viewStyle]}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.onPress()} style={[styles.flexRow, { alignItems: 'center' }]}>
          <Image source={imgsource} style={[styles.imgSize, checkimgsize]} resizeMode={'contain'} />
          <Text style={[styles.textStyle, MyTextStyle]}>{text}</Text>
        </TouchableOpacity>
        {isInfoImg == true ?
          <TouchableOpacity onPress={() => this.props.onPressInfo()}>
            <Image source={Constants.Images.customer.info} style={[styles.infoimgSize, infoimgSize]} resizeMode={'contain'} />
          </TouchableOpacity>
          :
          null
        }

        {/*<Menu renderer={Popover} rendererProps={{ preferredPlacement: 'top' }}>
            <MenuTrigger style={[styles.menuTrigger]}>
              <Image source={Constants.Images.customer.info} style={[styles.infoimgSize,infoimgSize]} resizeMode={'contain'}/>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptionTitle}>
                <Text style={[styles.textStyle,{lineHeight:20},MyTextStyle]}>{'You clicked on \r\n'}{text}</Text>
            </MenuOptions>
          </Menu>*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({

});
export default connect(state => ({ state: state.CustomerReducer }))(Carousel_Vertical);
