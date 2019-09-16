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
import { Container, Card, CardItem, Body, Left, Right, Thumbnail, Content } from 'native-base'

class Orders_DraftsService extends Component<{}> {
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
                            <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>White Glove</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Extra Helper</Text>
                            </CardItem>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Residential</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Tailgate</Text>
                            </CardItem>
                        </CardItem>
                    </Card>
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
                            <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>White Glove</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Extra Helper</Text>
                            </CardItem>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Residential</Text>
                            </Left>
                            <CardItem cardBody>
                                <Thumbnail style={styles.imgSize} source={Constants.Images.driver.map} />
                                <Text style={{ color: '#83858E' }}>Tailgate</Text>
                            </CardItem>
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
        width: 18,
        height: 18,
    },
    imgSize1: {
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 4,
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
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
export default connect(state => ({ state: state.CustomerReducer }))(Orders_DraftsService);
