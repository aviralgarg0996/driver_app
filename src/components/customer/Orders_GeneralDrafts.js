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

import Constants from "../../constants";
import { BoxShadow, BorderShadow } from 'react-native-shadow';

export default class Orders_DraftsGeneral extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            generalList: [{ id: 0, img: Constants.Images.customer.furniture, orderid: '9786', delDate: '05/02/2018', timeframe: '12:00 PM - 4:00 PM' }],

        }
    }
    render() {
        var _generalList = this.state.generalList.map((val, b) => {
            return (
                <BoxShadow setting={{
                    width: Constants.BaseStyle.DEVICE_WIDTH,
                    height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18.2,
                    color: "#000",
                    border: 3,
                    radius: 5,
                    opacity: 0.1,
                    x: 0,
                    y: 2,
                    style: { marginBottom: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 3, marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }
                }}>
                    <View style={[styles.container, { backgroundColor: '#ffffff', height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 18 }]}>
                        <View style={[styles.flexRow]}>
                            <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Image source={val.img} style={[styles.imgSize,]} resizeMode={'contain'} />
                            </View>
                            <View style={{ flex: 0.7, alignItems: 'flex-start', justifyContent: 'flex-end', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5, marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, }}>
                                <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{'Order Id : '}{val.orderid}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexRow, { marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1, alignItems: 'center' }]}>
                            <View style={{ flex: 1, justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Text style={[styles.orderTextStyle]}>{'Delivery Date'}</Text>
                            </View>
                            <View style={{ flex: 0.7, justifyContent: 'flex-start', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{val.delDate}</Text>
                            </View>
                        </View>
                        <View style={[styles.flexRow, { alignItems: 'center' }]}>
                            <View style={[styles.flexRow, { flex: 1, alignItems: 'center' }]}>
                                <View style={{ justifyContent: 'flex-start', marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                    <Text style={[styles.orderTextStyle]}>{'Time Window'}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.onPressInfo()}>
                                    <Image source={Constants.Images.customer.info} style={[styles.infoimgSize, { marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 1 }]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.64, justifyContent: 'flex-start', marginRight: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 5 }}>
                                <Text style={[styles.orderTextStyle, { textAlign: 'left', }]}>{val.timeframe}</Text>
                            </View>
                        </View>
                    </View>
                </BoxShadow>
            );
        });

        return (
            <View>
                {_generalList}
            </View>
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
    orderTextStyle: {
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: '#5D5D5D',
    },
    infoimgSize: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },
});
