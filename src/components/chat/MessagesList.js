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
    View,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';
import RestClient from "../../utilities/RestClient"
import Constants from "../../constants";
import moment from "moment"
import Connection from "../../config/Connection"
export default class MessagesList extends Component {
    componentDidMount = () => {
        AsyncStorage.getItem("id").then((value) => {
            RestClient.get('admin/getcustmessage', {
                userId: value,
            }, '').then((result) => {
                let messageArr = [];
                result.data && result.data.length > 0 && result.data.map((item) => {
                    messageArr.push({
                        description: item.message,
                        name: item.CustId.firstName + " " + item.CustId.lastName,
                        date: moment(item.created_at).format('LLL'),
                        // image:Constants.Images.user.female,
                        image: { uri: `${Connection.getBaseUrl()}/${item.CustId.profilePic.path}` }
                    })
                })
                this.setState({
                    messagesData: messageArr
                })
            })
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            messagesData: []
        }
    }

    messagesList(item) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity onPress={() => navigate('Chat')} style={styles.listContainer}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.header}>
                    <View style={styles.innerHeading}>
                        <Text style={styles.boldText}>{item.name}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                data={this.state.messagesData}
                renderItem={({ item }) => this.messagesList(item)}
            />
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        padding: Constants.BaseStyle.PADDING * .5,
        borderBottomWidth: 1,
        borderBottomColor: Constants.Colors.BlurGrey
    },
    imageContainer: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
        width: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 8,
        borderRadius: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 4,
    },
    header: {
        flex: .8
    },
    innerHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boldText: {
        fontSize: 20,
        fontWeight: '700'
    },
    date: {
        fontSize: 10,
        color: Constants.Colors.BlurGrey
    }
});
