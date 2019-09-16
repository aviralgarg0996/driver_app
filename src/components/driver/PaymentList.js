/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";

import Background from "../../components/common/Background";
import Constants from "../../constants";

export default class PaymentList extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      PaymentData: [
        {
          payment: 922,
          TransactionsID: 92828,
          OrderID: "928 ",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        },
        {
          payment: 928,
          TransactionsID: 92828,
          OrderID: "928 ",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        },
        {
          payment: 928,
          TransactionsID: 92828,
          OrderID: "928 ",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        },
        {
          payment: 928,
          TransactionsID: 92828,
          OrderID: "928 ",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        },
        {
          payment: 982,
          TransactionsID: 92828,
          OrderID: "928 ",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        },
        {
          payment: 922,
          TransactionsID: 92828,
          OrderID: "928",
          status: "Success",
          time: "MAR/28/2018, 12:00",
          accNo: "XXXXXXXXXXX9129"
        }
      ]
    };
  }

  renderPaymentList(value) {
    return (
      <TouchableOpacity style={[styles.cardView]}>
        <View style={styles.categoryRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.paymentMsg]}>&#36;{value.payment}</Text>
            <Text style={[styles.greenText]}>{value.status}</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={[styles.textStyle]}>
              TransactionsID: {value.TransactionsID}
            </Text>
            <Text style={[styles.textStyle]}>{value.time}</Text>
          </View>

          <View tyle={{ flex: 2 }}>
            <Text
              style={[
                styles.textStyle,
                { paddingTop: Constants.BaseStyle.PADDING * 0.1 }
              ]}
            >
              OrderID: {value.OrderID}
            </Text>
            <Text style={[styles.textStyle, { padding: 0 }]}>
              Payment to Bank
            </Text>
            <Text
              style={[
                styles.textStyle,
                { paddingBottom: Constants.BaseStyle.PADDING * 0.1 }
              ]}
            >
              {value.accNo}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.PaymentData}
          renderItem={({ item }) => this.renderPaymentList(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  categoryRow: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: Constants.BaseStyle.PADDING * 0.6,
    paddingHorizontal: Constants.BaseStyle.PADDING * 0.2
    //  padding: Constants.BaseStyle.PADDING * 0.5
  },

  cardView: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.LightGray
  },

  paymentMsg: {
    color: Constants.Colors.Blue,
    fontWeight: "800",
    fontSize: 17,
    padding: Constants.BaseStyle.PADDING * 0.1
  },
  textStyle: {
    flex: 2.1,
    color: Constants.Colors.LightGray,
    fontWeight: "400",
    fontSize: 14,
    padding: Constants.BaseStyle.PADDING * 0.1
  },
  greenText: {
    color: Constants.Colors.LightGreen,
    fontWeight: "800",
    fontSize: 17,
    padding: Constants.BaseStyle.PADDING * 0.1
  }
});
