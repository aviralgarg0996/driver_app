import React, { Component } from 'react';
import {
    AppRegistry, StyleSheet, Text, View,
    Dimensions, Image, ImageBackground,
    TextInput, TouchableOpacity, Platform, ScrollView, FlatList
} from 'react-native';
import css from '../constants/styles';
class Button extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={.5} style={css.button} onPress={() => this.props.onPress()}>

                <Text style={css.buttonText}>{this.props.title}</Text>

            </TouchableOpacity>
        );
    }
}

export default Button;