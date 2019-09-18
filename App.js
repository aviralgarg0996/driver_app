import React, { Component } from 'react';
import Source from "./src";
import { StatusBar ,Text} from "react-native";



export default class App extends Component<{}> {
 
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
  }


  render() {
    return (
<Source/> 
      );
  }
}
