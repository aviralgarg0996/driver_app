/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import Constants from '../../constants';

let GOOGLE_MAPS_APIKEY = Constants.distanceAPIMatrix;
const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};
import MapViewDirections from 'react-native-maps-directions';

import MapView from 'react-native-maps';
import {BoxShadow} from 'react-native-shadow';
import {
  scaleHeight,
  scaleWidth,
  normalizeFont,
} from '../../constants/responsive';
class SelectDriverMapView extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      modalVisible: false,
      orderMarker: [],
      initialPosition: {
        latitude: this.props.locationData.currentLocation.coords.latitude,
        longitude: this.props.locationData.currentLocation.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
     
     
      wayPoints: [],
    };
    this.initialPosition = this.state.initialPosition;
    this.markerPosition = this.state.markerPosition;
  }

  watchID: ? number = null;

  componentDidMount() {

  }

   componentWillReceiveProps(nextProps) {
    let detailsInfo = nextProps.orderDetails;

    if (detailsInfo == '') {return;}
   
    let orderMarker = [];
    detailsInfo.orders[0].pickup.map(element => {
      orderMarker.push({
        coordinates: {
          latitude: parseFloat(element.pickup_point.split(',')[0]),
          longitude: parseFloat(element.pickup_point.split(',')[1]),
        },
        title: 'Pickup  ',
        id: element._id,
        img: Constants.Images.customer.pickup,
      });
      setTimeout(() => {
        this.fitAllMarkers(orderMarker);
      }, 300);
    });
  }

  fitAllMarkers(data) {
    var marker = [];
    data.forEach(element => {
      marker.push(element.coordinates);
    });

    if (data.length == 0) {return;}

  
  
    if (this.map == null) {return;}
    this.map.fitToCoordinates(marker, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  onRegionChange(region) {
    this.setState({
      initialPosition: region,
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  openModal = () => {
    this.setState({modalVisible: true});
  };

  dismissModal = () => {
    this.setState({modalVisible: false});
  };

  render() {
    let {height, controlVisible} = this.props;

    wayPoints = [];
    let destination;
    let origin;

    this.state.orderMarker.map(marker => {
      if (marker.title != '') {
        wayPoints.push(marker.coordinates);
        destination = marker.coordinates;
      }
    });

    if (wayPoints.length > 0) {origin = wayPoints[0];}

    return (
      <View style={{flex: 1}}>
        <View
          style={[
            styles.rootContainer,
            {height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * height},
          ]}>
          {(
            <MapView
              style={{
                height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * height,
                zIndex: 0,
              }}
              ref={ref => {
                this.map = ref;
              }}
              zoomEnabled={true}
              showsUserLocation={true}
              followsUserLocation={true}
              pitchEnabled={false}
              rotateEnabled={false}
            >
              {this.state.orderMarker.map(marker => (
                <MapView.Marker
                  coordinate={marker.coordinates}
                  title={marker.title}
                  image={marker.img}
                  key={marker.id}
                  onPress={() => {}}
                />
              ))}

              {wayPoints.length > 1 && (
                <MapViewDirections
                  origin={origin}
                  waypoints={wayPoints}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={8}
                  strokeColor="#809fff"
                />
              )}
            </MapView>
          )}
          {controlVisible == true ? (
            <View style={[styles.viewStyle]}>
              <View style={[styles.flexRow, {alignItems: 'center'}]}>
                <BoxShadow
                  setting={{
                    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 80,
                    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
                    color: '#000',
                    border: 3,
                    radius: 5,
                    opacity: 0.1,
                    x: 0,
                    y: 2,
                    style: {
                      marginVertical:
                        (Constants.BaseStyle.DEVICE_WIDTH * 2) / 100,
                      marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
                    },
                  }}>
                  <View style={[styles.searchContainer]}>
                    <TextInput
                      placeholder={'Search by name'}
                      style={[styles.txtInputSearch]}
                      underlineColorAndroid="transparent"
                    />
                    <Image
                      source={Constants.Images.customer.search}
                      style={styles.searchContentIcon}
                      resizeMode={'contain'}
                    />
                  </View>
                </BoxShadow>
                <Image
                  source={Constants.Images.customer.filter}
                  style={[styles.searchContentIcon, {flex: 1}]}
                  resizeMode={'contain'}
                />
              </View>
            </View>
          ) : null}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              marginTop: scaleHeight(20),
              backgroundColor: 'transparent',
            }}>
            {/* dismiss back button start*/}
            <LinearGradient
              colors={[Constants.Colors.LightBlue, Constants.Colors.LightBlue]}
              style={styles.navigationBarcontainer}>
              <View style={styles.navigationBar}>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}>
                  <Image
                    source={Constants.Images.customer.goback}
                    style={[
                      styles.navIcons,
                      {
                        marginLeft:
                          (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
                      },
                    ]}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
                  }}>
                  <Text style={[styles.HeaderTextStyle]}>{'Order Action'}</Text>
                </View>
                <View style={styles.navBarRight}>
                  <TouchableOpacity>
                    <Image
                      source={Constants.Images.customer.setting}
                      style={styles.settingIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            {/* dismiss back button end */}
            {/* <HeaderBackgroundWithBackButton goBack={() => this.dismissModal()}headerText={'Schedule Order'} /> */}
            <View style={{padding: scaleHeight(20)}}>
              <Image
                resizeMode="cover"
                style={{width: '100%', height: scaleHeight(110)}}
                source={Constants.Images.customer.driverCover}
              />
              <Image
                resizeMode="cover"
                style={{
                  width: scaleWidth(100),
                  height: scaleWidth(100),
                  marginLeft: scaleWidth(30),
                  top: scaleHeight(90),
                  position: 'absolute',
                }}
                source={Constants.Images.customer.driverName}
              />
              <Text style={styles.titleCss}>Chris Evans</Text>
              {/* Boxes */}
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: scaleWidth(275),
                    top: scaleHeight(20),
                    position: 'absolute',
                    height: 70,
                    width: 70,
                  }}
                  source={Constants.Images.customer.callCus}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: scaleWidth(275),
                    top: scaleHeight(100),
                    position: 'absolute',
                    height: 70,
                    width: 70,
                  }}
                  source={Constants.Images.customer.chatCus}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: scaleWidth(275),
                    top: scaleHeight(180),
                    position: 'absolute',
                    height: 70,
                    width: 70,
                  }}
                  source={Constants.Images.customer.noteCus}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: scaleWidth(275),
                    top: scaleHeight(260),
                    position: 'absolute',
                    height: 70,
                    width: 70,
                  }}
                  source={Constants.Images.customer.editCus}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    marginLeft: scaleWidth(275),
                    top: scaleHeight(340),
                    position: 'absolute',
                    height: 70,
                    width: 70,
                  }}
                  source={Constants.Images.customer.deleteCus}
                />
              </TouchableOpacity>

              {/* Boxes */}
              <Text
                style={{
                  marginLeft: scaleWidth(140),
                  top: scaleHeight(160),
                  position: 'absolute',
                }}>
                <Text style={styles.review}>45 REVIEWS</Text>{' '}
                <Text style={styles.followers}>50 FOLLOWERS</Text>
              </Text>
              <Text
                style={{
                  marginLeft: scaleWidth(140),
                  top: scaleHeight(180),
                  position: 'absolute',
                  flexDirection: 'row',
                  marginTop: scaleHeight(6),
                }}>
                <Image
                  style={{height: 15, width: 15}}
                  source={Constants.Images.customer.reviewStar}
                />
                <Image
                  style={{height: 15, width: 15}}
                  source={Constants.Images.customer.reviewStar}
                />
                <Image
                  style={{height: 15, width: 15}}
                  source={Constants.Images.customer.reviewStar}
                />
                <Image
                  style={{height: 15, width: 15}}
                  source={Constants.Images.customer.reviewStar}
                />
                <Image
                  style={{height: 15, width: 15}}
                  source={Constants.Images.customer.reviewStar}
                />
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.Colors.White, //'#F5FCFF'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  flexRow: {
    flexDirection: 'row',
  },
  rootContainer: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 64,
    //width: Constants.BaseStyle.DEVICE_WIDTH,
    //marginHorizontal:10
  },
  subsubContainer: {
    bottom: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 11, //34,
    //marginHorizontal: Constants.BaseStyle.DEVICE_WIDTH / 100 * 2,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH * 2) / 100,
    //opacity: 0.87,
  },
  viewStyle: {
    backgroundColor: Constants.Colors.WhiteBlur,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 14,
    bottom: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor: Constants.Colors.WhiteSmoke,
    opacity: 0.8,
    justifyContent: 'flex-start',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 80,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    //paddingLeft: 10,
    //paddingRight:10,
    //marginLeft:15,
    //marginRight:15,
    //marginTop:10,
    //marginLeft: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  searchContentIcon: {
    justifyContent: 'flex-end',
    //flex:0.3,
    //tintColor:'#898988',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 4,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
  },
  txtInputSearch: {
    //backgroundColor:'#fff',
    color: '#5D5D5D',
    fontSize: Constants.CustomerFonts.normal.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    //paddingRight:10,
    //paddingTop:3,
    //paddingBottom:3,
    flex: 1,
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
  },

  // Modal css
  viewCont: {
    backgroundColor: 'red',
    padding: 20,
  },
  titleCss: {
    marginLeft: scaleWidth(140),
    top: scaleHeight(140),
    position: 'absolute',
    fontSize: normalizeFont(14),
    color: Constants.Colors.DarkBlue,
    fontWeight: '400',
  },
  review: {
    color: Constants.Colors.SkyBlue,
    textDecorationLine: 'underline',
    textDecorationColor: Constants.Colors.SkyBlue,
    fontSize: normalizeFont(10),
  },
  followers: {
    fontSize: normalizeFont(10),
    color: Constants.Colors.DarkGrey,
  },
  // Header css
  navigationBarcontainer: {
    //flex  : 1,
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 8,
  },
  navigationBar: {
    backgroundColor: 'transparent', //Constants.Colors.LightBlue,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navBarRight: {
    flex: 1,
    flexDirection: 'row',
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    //marginTop:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },
  rightButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5,
  },

  navIcons: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 3,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 4,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  settingIcon: {
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 7,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 7,
    marginTop: 3.5,
    //marginVertical: Constants.BaseStyle.DEVICE_WIDTH*1/100,
  },
  HeaderTextStyle: {
    fontSize: Constants.CustomerFonts.small_13.fontSize, //Constants.CustomerFonts.semibold.fontSize,
    fontFamily: Constants.CustomerFonts.normal.fontFamily,
    color: '#FFFFFF',
  },
});

const mapStateToProps = state => ({
  state: state.CustomerReducer,
  locationData: state.location,
  user: state.user,
  orderDetails: state.user.orderDetails,
});

export default connect(
  mapStateToProps,
  null,
)(SelectDriverMapView);
