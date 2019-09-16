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
import { Container, Card, CardItem, Body, Left, Right, Thumbnail, Content } from 'native-base';

class Orders_DraftsProducts extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            //generalList : [{id:0,img:Constants.Images.customer.furniture,orderid:'9786',delDate:'05/02/2018',timeframe:'12:00 PM - 4:00 PM'}],

        }
    }
    render() {

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ color: '#83858E' }}>Pickup 1:</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>228 Park Avs S, New York, NY 10003</Text>
                            </CardItem>
                        </CardItem>
                        <CardItem>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize1} source={Constants.Images.customer.bed} />
                                <Body style={{ marginLeft: 4 }}>
                                    <Text style={{ fontSize: 18, color: "#060320" }}>King Bed</Text>
                                    <Text style={{ fontSize: 14, marginTop: 6, color: '#83858E' }}>(6'0"x6'8") (72"x80")</Text>
                                </Body>
                            </CardItem>
                            <Right>
                                <Text style={{ fontSize: 18 }}>02</Text>
                            </Right>
                        </CardItem>
                        <View
                            style={{
                                borderBottomColor: '#F3F3F3',
                                borderBottomWidth: 2,
                            }}
                        />
                        <CardItem>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize1} source={Constants.Images.customer.television} />
                                <Body style={{ marginLeft: 4 }}>
                                    <Text style={{ fontSize: 18, color: "#060320" }}>Television</Text>
                                    <Text style={{ fontSize: 14, marginTop: 6, color: '#83858E' }}>TV,Lcd, Led, Plasma, etc.</Text>
                                </Body>
                            </CardItem>
                            <Right>
                                <Text style={{ fontSize: 18 }}>02</Text>
                            </Right>
                        </CardItem>
                    </Card>

                    {/* SECOND CARD */}
                    <Card>
                        <CardItem>
                            <Left>
                                <Text style={{ color: '#83858E' }}>Pickup 2:</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>228 Park Avs S, New York, NY 10003</Text>
                            </CardItem>
                        </CardItem>
                        <CardItem>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize1} source={Constants.Images.customer.bed} />
                                <Body style={{ marginLeft: 4 }}>
                                    <Text style={{ fontSize: 18, color: "#060320" }}>King Bed</Text>
                                    <Text style={{ fontSize: 14, marginTop: 6, color: '#83858E' }}>(6'0"x6'8") (72"x80")</Text>
                                </Body>
                            </CardItem>
                            <Right>
                                <Text style={{ fontSize: 18 }}>02</Text>
                            </Right>
                        </CardItem>
                        <View
                            style={{
                                borderBottomColor: '#F3F3F3',
                                borderBottomWidth: 2,
                            }}
                        />
                        <CardItem>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize1} source={Constants.Images.customer.television} />
                                <Body style={{ marginLeft: 4 }}>
                                    <Text style={{ fontSize: 20, color: "#060320" }}>Television</Text>
                                    <Text style={{ fontSize: 16, marginTop: 6, color: '#83858E' }}>TV,Lcd, Led, Plasma, etc.</Text>
                                </Body>
                            </CardItem>
                            <Right>
                                <Text style={{ fontSize: 20 }}>02</Text>
                            </Right>
                        </CardItem>
                    </Card>

                </Content>
            </Container>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
    },
    hline: {
        borderBottomColor: '#CBCBCB',
        borderBottomWidth: 7,
    },
    viewShadow: {
        borderBottomWidth: 5,
        backgroundColor: '#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },
    imgSize: {
        width: 22,
        height: 22,
    },
    imgSize1: {
        width: 50,
        height: 50,
    },
    HeaderTextStyle: {
        fontSize: Constants.CustomerFonts.small.fontSize,
        fontFamily: Constants.CustomerFonts.semibold.fontFamily,
        color: '#081933',
    },
    infoimgSize: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 3,
    },
});
export default connect(state => ({ state: state.CustomerReducer }))(Orders_DraftsProducts);
