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
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import Constants from "../../constants";
import { BoxShadow, BorderShadow } from 'react-native-shadow';

class Orders_DraftsLocation extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            //generalList : [{id:0,img:Constants.Images.customer.furniture,orderid:'9786',delDate:'05/02/2018',timeframe:'12:00 PM - 4:00 PM'}],

        }
    }
    render() {
        var len = 0;
        var arr1 = [];
        this.props.state.pickupArr.map((val, i) => {
            if (!(val.address.indexOf('Choose') == 0)) {
                arr1.push({ address: val.address });
                len++;
            }
        });

        var arr2 = [];
        this.props.state.dropArr.map((val, i) => {
            if (!(val.address.indexOf('Choose') == 0)) {
                arr2.push({ address: val.address });
                len++;
            }
        });

        var pickupList = arr1.map((val, b) => {
            return (
                <View style={[styles.container, { backgroundColor: '#ffffff', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/ }]}>
                    <View style={{ marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 0.5 }}>
                        <Text style={[styles.HeaderTextStyle]}>{'Pickup '}{b + 1}</Text>
                    </View>
                    <View style={{ marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 0.5 }}>
                        <Text style={[styles.AddressStyle]}>{val.address}</Text>
                    </View>
                </View>
            );
        });

        var dropList = arr2.map((val, b) => {
            return (
                <View style={[styles.container, { backgroundColor: '#ffffff', marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/ }]}>
                    <View style={{ marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 0.5 }}>
                        <Text style={[styles.HeaderTextStyle, { color: '#F58436' }]}>{'Drop-off '}{b + 1}</Text>
                    </View>
                    <View style={{ marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 0.5 }}>
                        <Text style={[styles.AddressStyle]}>{val.address}</Text>
                    </View>
                </View>
            );
        });

        return (
            <BoxShadow setting={{
                width: Constants.BaseStyle.DEVICE_WIDTH,
                height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 25,
                color: "#000",
                border: 3,
                radius: 5,
                opacity: 0.1,
                x: 0,
                y: 2,
                style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3, marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }
            }}>

                <ScrollView style={[styles.container, { backgroundColor: '#ffffff'/*,height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 18*/ }]}>
                    <Text style={[styles.BigHeaderTextStyle, { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }]}>{'Locations'}</Text>
                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ color: '#7A95C3', marginBottom: 3 }}>Pickup 1</Text>
                        <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>265, Demo Street, Block B, Edmonton-8754</Text>
                        <Text style={{ color: '#7A95C3', marginBottom: 3 }}>Pickup 2</Text>
                        <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>265, Demo Street, Block B, Edmonton-8754</Text>
                        <Text style={{ color: '#7A95C3', marginBottom: 3 }}>Pickup 3</Text>
                        <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>265, Demo Street, Block B, Edmonton-8754</Text>
                        <Text style={{ color: '#F9B998', marginBottom: 3 }}>Drop-off</Text>
                        <Text style={{ color: '#A4A2A5', marginBottom: 3 }}>265, Demo Street, Block B, Edmonton-8754</Text>
                    </View>
                </ScrollView>


            </BoxShadow>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row',
    },
    imgSize: {
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 16,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 9,
    },
    HeaderTextStyle: {
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.small.fontFamily,
        color: '#306AB3',
    },
    BigHeaderTextStyle: {
        fontSize: Constants.CustomerFonts.normal.fontSize,
        fontFamily: Constants.CustomerFonts.BigSize.fontFamily,
        color: '#081933',
    },
    AddressStyle: {
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.small.fontFamily,
        color: '#C3C1C0',
    },
    infoimgSize: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },
});
export default connect(state => ({ state: state.CustomerReducer }))(Orders_DraftsLocation);
