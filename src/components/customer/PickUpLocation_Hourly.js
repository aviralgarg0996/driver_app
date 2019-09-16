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

import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";

class PickUpLocation_Hourly extends Component<{}> {
  constructor(props) {
    super(props);

  }
  onDelete(id) {
    //let { dispatch } = this.props.navigation;
    if (this.props.PickDropFlag == 1)
      this.props.dispatch({ type: 'DELETE_PICKUP', id: id });
    else {
      this.props.dispatch({ type: 'DELETE_DROP', id: id });
    }
  }



  pickupList({ item, _index }) {
    let context = this;
    //let { dispatch } = this.props.navigation;
    var aa = item.address;
    var _img = item.img;
    var index1 = aa.indexOf("Choose");
    return (
      <View key={1}>
        {index1 == 0 ?
          <View key={2} style={[styles.flexRow]}>
            {this.props.tintColor ?
              <Image key={3} source={Constants.Images.customer.drop} style={[styles.pickupIcons, { flex: 0.2, opacity: 1, zIndex: 1, }]} resizeMode={'contain'} />
              :
              <Image key={4} source={Constants.Images.customer.pickup} style={[styles.pickupIcons, { flex: 0.2, opacity: 1, zIndex: 1, }]} resizeMode={'contain'} />
            }

            <Text key={5} numberOfLines={1} style={[styles.textStyle]} onPress={() => this.props.onChangeText()}>
              {item.address}
            </Text>
            <View key={6}>
              <Image key={7} source={Constants.Images.customer.none} style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} resizeMode={'contain'} />
            </View>
          </View>
          :
          <View key={8} style={[styles.flexRow]}>
            {this.props.tintColor ?
              <Image key={9} source={Constants.Images.customer.checkmark_orange} style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
              :
              <Image key={10} source={Constants.Images.customer.checkmark} style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
            }

            <Text key={5} numberOfLines={1} style={[styles.textStyle]} onPress={() => this.props.onChangeText()}>
              {item.address}
            </Text>

            {_img != 'plus' ?
              <View key={12}>
                <Image key={13} source={Constants.Images.customer.none} style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} resizeMode={'contain'} />
              </View>
              :
              <View key={14}>
                <Image key={15} source={Constants.Images.customer.none} style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]} resizeMode={'contain'} />
              </View>
            }
          </View>
        }
      </View>
    )
  }

  render() {
    let {
      list, tintColor, placeHolderText, onChangeText, PickDropFlag
    } = this.props;
    return (
      <FlatList
        data={list}
        renderItem={this.pickupList.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  pickupIcons: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    //tintColor:Constants.Colors.Blue,
  },
  checkIcon: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    //tintColor:Constants.Colors.Blue,
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginLeft: 10,
    marginHorizontal: 0,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    borderBottomWidth: 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
  },
  textStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    flex: 1,
    justifyContent: 'center',
    marginTop: 5,
    color: '#5D5D5D',
    //opacity: 1,
    //zIndex: 1,
  },
});
export default connect(state => ({ state: state.CustomerReducer }))(PickUpLocation_Hourly);
