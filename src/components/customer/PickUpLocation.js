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
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from 'react-native';

import SortableList from 'react-native-sortable-list';

//import SortableListView from 'react-native-sortable-listview';

import { connect } from 'react-redux';

import Background from '../../components/common/Background';
import Constants from "../../constants";

class PickUpLocation extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      //SwipePickUpArr:[],
      //SwipeDropArr : [],
    }

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 10,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
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
            <TouchableOpacity key={6} onPress={() => this.props.onPress()}>
              <Image key={7} source={Constants.Images.customer.plus} style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25 }]} resizeMode={'contain'} />
            </TouchableOpacity>
          </View>
          :
          <View key={8} style={[styles.flexRow]}>
            {this.props.tintColor ?
              <Image key={9} source={Constants.Images.customer.checkmark_orange} style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
              :
              <Image key={10} source={Constants.Images.customer.checkmark} style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
            }

            <Text key={5} numberOfLines={1} style={[styles.textStyle]}>
              {item.address}
            </Text>

            {_img != 'plus' ?
              <TouchableOpacity key={12} onPress={() => context.onDelete(item.id)}>
                <Image key={13} source={Constants.Images.customer.bin}
                  style={[styles.binrowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25 }]} resizeMode={'contain'} />
              </TouchableOpacity>
              :
              <TouchableOpacity key={14} onPress={() => this.props.onPress()}>
                <Image key={15} source={Constants.Images.customer.plus}
                  style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25 }]} resizeMode={'contain'} />
              </TouchableOpacity>
            }
          </View>
        }

      </View>
    )
  }

  _renderRow = ({ data, active }) => {
    let context = this;
    //let { dispatch } = this.props.navigation;
    var aa = data.address;
    var _img = data.img;
    var index1 = aa.indexOf("Choose");

    return (
      <Animated.View style={[this._style,]}>
        <View key={1}>
          {index1 == 0 ?
            <View key={2} style={[styles.flexRow]}>
              {this.props.tintColor ?
                <Image key={3} source={Constants.Images.customer.drop}
                  style={[styles.pickupIcons, { flex: 0.2, opacity: 1, zIndex: 1, }]}
                  resizeMode={'contain'} />
                :
                <Image key={4} source={Constants.Images.customer.pickup}
                  style={[styles.pickupIcons, { flex: 0.2, opacity: 1, zIndex: 1, }]}
                  resizeMode={'contain'} />
              }
              <Text key={5} numberOfLines={1} style={[styles.textStyle]}
                onPress={() => this.props.onChangeText()}>
                {data.address}
              </Text>
              <TouchableOpacity key={6} onPress={() => this.props.onPress()}>
                <Image key={7} source={Constants.Images.customer.plus}
                  style={[styles.rowRight, { flex: 0.5, justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25 }]} resizeMode={'contain'} />
              </TouchableOpacity>
            </View>
            :
            <View key={8} style={[styles.flexRow]}>
              {this.props.tintColor ?
                <Image key={9} source={Constants.Images.customer.drop}
                  style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
                :
                <Image key={10} source={Constants.Images.customer.pickup}
                  style={[styles.checkIcon, { flex: 0.2 }]} resizeMode={'contain'} />
              }

              <Text key={5} numberOfLines={1} style={[styles.textStyle]}>
                {data.address}
              </Text>

              {_img != 'plus' ?
                <TouchableOpacity key={12} onPress={() => context.onDelete(data.id)}>
                  <Image key={13} source={Constants.Images.customer.bin}
                    style={[styles.binrowRight, {
                      flex: 0.5, justifyContent: 'flex-end',
                      marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25
                    }]}
                    resizeMode={'contain'} />
                </TouchableOpacity>
                :
                <TouchableOpacity key={14} onPress={() => this.props.onPress()}>
                  <Image key={15} source={Constants.Images.customer.plus}
                    style={[styles.rowRight, {
                      flex: 0.5, justifyContent: 'flex-end',
                      marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 25
                    }]}
                    resizeMode={'contain'} />
                </TouchableOpacity>
              }
            </View>
          }

        </View>
      </Animated.View>
    );
  }

  onChangeOrder(data) {
    if (this.props.PickDropFlag == 1)//pickUp
    {
      var arr1 = [];
      for (var a = 0; a < data.length; a++) {
        if (data[a] < data.length - 1) {
          this.props.state.pickupArr.map((val, i) => {
            if (val.id == parseInt(data[a]))
              arr1.push({ id: val.id, address: val.address, img: val.img, next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });
        }
      }
      arr1.push({ id: data.length - 1, address: 'Choose Another Pickup Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      this.props.dispatch({ type: 'ONCHANGE_PICKUP_ORDER', arr: arr1 });
    }
    else {
      var arr1 = [];
      for (var a = 0; a < data.length; a++) {
        if (data[a] < data.length - 1) {
          this.props.state.dropArr.map((val, i) => {
            if (val.id == parseInt(data[a]))
              arr1.push({ id: val.id, address: val.address, img: val.img, next: val.next, prev: val.prev, lat: val.lat, long: val.long });
          });
        }
      }
      arr1.push({ id: data.length - 1, address: 'Choose Another Drop Off Location', img: 'plus', next: 3, prev: 1, lat: 0, long: 0 });
      this.props.dispatch({ type: 'ONCHANGE_DROP_ORDER', arr: arr1 });
    }
    //alert(data);
  }

  render() {
    return (
      <View>
        <SortableList
          contentContainerStyle={[{ width: Constants.BaseStyle.DEVICE_WIDTH }]}
          data={this.props.list}
          renderRow={this._renderRow}
          onChangeOrder={this.onChangeOrder.bind(this)}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center"
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D7D7D7',
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
  },
  pickupIcons: {
    marginTop: 5,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3.5,
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
  binrowRight: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    marginLeft: 10,
    marginHorizontal: 0,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    marginVertical: Constants.BaseStyle.DEVICE_WIDTH * 1 / 100,
    borderBottomWidth: 1,
    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 5,
    width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 6,
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
export default connect(state => ({ state: state.CustomerReducer }))(PickUpLocation);
