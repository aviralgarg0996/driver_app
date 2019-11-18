/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Constants from '../../constants';

var dismissKeyboard = require('dismissKeyboard');

class SearchPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: [],
    };
  }

  FilterCityList(searchcity) {
    var url =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      searchcity +
      '&components=country:' +
      this.props.state.CountryCode +
      '&key=' +
      Constants.GoogleAPIKey +
      '';

    //  console.log();

      if (this.props.locationData.currentLocation != null) {
      let locationString =
        '&location=' +
        this.props.locationData.currentLocation.coords.latitude +
        ',' +
        this.props.locationData.currentLocation.coords.longitude;
      let radius = '&radius=' + 50000; // radius is in meter for now it 200KM
      let key = '&key=' + Constants.GoogleAPIKey;
      let strictbounds = '&strictbounds';
      url =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
        searchcity +
        locationString +
        radius +
        strictbounds +
        key;
      console.log(url);
    } else {
      // 49.2827° N, 123.1207° W
      let locationString = '&location=49.2827,-123.1207';
      let radius = '&radius=' + 200000; // radius is in meter for now it 200KM
      let key = '&key=' + Constants.GoogleAPIKey;
      let strictbounds = '&strictbounds';
      url =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
        searchcity +
        locationString +
        radius +
        strictbounds +
        key;
      console.log(url);
    }

    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        if (responseData !== null)
          this.setState({searchList: responseData.predictions});
        //  this.props.dispatch({type : 'SEARCHPLACE', arr : responseData.predictions});
        //else {
        //this.props.dispatch({type : 'SEARCHPLACE', arr : []});
        //  }
      });
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'SEARCHPLACE', arr: []});
    this.setState({searchList: []});
  }

  searchPlace(placeid, address) {
    dismissKeyboard();

    var url =
      'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
      placeid +
      '&key=' +
      Constants.GoogleAPIKey +
      '';
    
      console.log(url);



    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        if (responseData !== null) {
          var arr = responseData;
          if (this.props.state.PickDropFlag === 1) {
            this.props.dispatch({
              type: 'ADD_PICKUP',
              pickup: address,
              lat: arr.result.geometry.location.lat,
              long: arr.result.geometry.location.lng,
              addressComponent: arr.result.address_components,
              placeId: arr.result.place_id,
              visibility: false,
            });
          } else {
            this.props.dispatch({
              type: 'ADD_DROP',
              drop: address,
              lat: arr.result.geometry.location.lat,
              long: arr.result.geometry.location.lng,
              addressComponent: arr.result.address_components,
              placeId: arr.result.place_id,
              visibility: false,
            });
            //this.props.dispatch({type:'PLACE_FINDER_MODAL',visibility:false});
          }

          this.props.dispatch({type: 'PLACE_FINDER_MODAL', visibility: false});
        } else {
          this.props.dispatch({type: 'PLACE_FINDER_MODAL', visibility: false});
        }
      })
      .done();
  }

  renderRow(value) {
    return (
      <TouchableOpacity
        onPress={() => this.searchPlace(value.place_id, value.description)}
        style={styles.cardView}>
        <View style={[styles.flexRow, {flexDirection: 'row'}]}>
          <Image
            style={styles.searchContentIcon}
            resizeMode={'contain'}
            source={
              this.props.state.PickDropFlag == 1
                ? Constants.Images.customer.marker_blue
                : Constants.Images.customer.marker_orange
            }
          />
          <Text style={styles.addressTextStyle}>{value.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let {navigate} = this.props;
    navigator = navigate;
    //  var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.searchList);
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 70,
          backgroundColor: Constants.Colors.WhiteSmoke,
          marginTop: 55,
          marginBottom: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 30,
        }}>
        <View style={{flexDirection: 'row', margin: 15}}>
          <TouchableOpacity
            style={{marginleft: 15, marginRight: 30, alignSelf: 'center'}}
            onPress={() => {
              this.props.dispatch({
                type: 'PLACE_FINDER_MODAL',
                visibility: false,
              });
            }}>
            <Image
              style={{width: 35, height: 20}}
              source={require('../../assets/images/android_back.png')}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {this.props.state.PickDropFlag == 1
              ? 'Enter the Pick Up Location'
              : 'Enter the Drop Location'}{' '}
          </Text>
          {/* <Image
                       source={Constants.Images.user.cross}
                       style={styles.closeIcon} resizeMode={'contain'}/> */}
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <View style={styles.searchContainer}>
            <Image
              source={Constants.Images.customer.search}
              style={styles.searchContentIcon}
              resizeMode={'contain'}
            />
            <TextInput
              autoFocus={false}
              onChangeText={text => {
                //  if(text.length>2)
                this.FilterCityList(text);
              }}
              style={styles.txtInputSearch}
              placeholder={'Type address here'}
              underlineColorAndroid="transparent"
            />
          </View>
          {/* <ListView enableEmptySections={true} dataSource={this.state.searchList} renderRow={this.renderRow.bind(this)} keyboardShouldPersistTaps={'handled'}/> */}

          <FlatList
            data={this.state.searchList}
            renderItem={({item}) => this.renderRow(item)}
            keyboardShouldPersistTaps="always"
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
  },
  navigationBar: {
    backgroundColor: 'transparent', //Constants.Colors.LightBlue,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  closeIcon: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
    tintColor: '#ffffff',
  },
  cardView: {
    backgroundColor: '#ffffff',
    borderColor: '#d8d8d8',
    borderWidth: 0.5,
    padding: 11,
    //paddingLeft:15,
    //paddingRight: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  addressTextStyle: {
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    color: '#5D5D5D',
  },
  searchContainer: {
    //in use
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
    borderBottomColor: 'red',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  searchContentIcon: {
    //tintColor:'#898988',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  txtInputSearch: {
    backgroundColor: '#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex: 1,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*2,
  },
});
export default connect(state => ({
  state: state.CustomerReducer,
  locationData: state.location,
}))(SearchPlace);
