import React, { Component } from 'react';
import { AppRegistry, TextInput,View,Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
let data;
import _ from 'underscore'

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount(){
  }

  render() {

    return (
 <View>
          <Text>Experience Type</Text>
          <Dropdown
            data={displaycertifciateListNew}
            onChangeText={(text)=>{
              certifciateListSelectedNew[this.props.exp]={value:text};

          
            displaycertifciateList=[];

        displaycertifciateListNew=dummyList;
          for(var key in certifciateListSelected)
          {
            displaycertifciateListNew = _.without(displaycertifciateListNew, _.findWhere(displaycertifciateListNew,
                                    certifciateListSelectedNew[key]));
          }
         this.props.cb();
              
      }
 
    }     
            
          />
         
    
      </View>
    );
  }
}


