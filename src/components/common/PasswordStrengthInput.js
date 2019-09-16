/**
 * Created by dungtran on 8/20/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Dimensions, Text, Animated, ViewPropTypes } from 'react-native';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';
import Constants from '../../constants';

const { width: wWidth } = Dimensions.get('window');

const widthByPercent = (percentage, containerWidth = wWidth) => {
  const value = (percentage * containerWidth) / 100;
  return Math.round(value);
};

const regex = {
  digitsPattern: /\d/,
  lettersPattern: /[a-zA-Z]/,
  lowerCasePattern: /[a-z]/,
  upperCasePattern: /[A-Z]/,
  wordsPattern: /\w/
};

export default class PasswordStrengthInput extends Component {
  static defaultProps = {
    minLevel: 2,
    minLength: 0,
    ruleNames: 'lowerCase|digits',
    strengthLevels: [
      {
        label: 'Weak',
        labelColor: '#969297',
        widthPercent: '33',
        innerBarColor: '#969297'
      },
      {
        label: 'Weak',
        labelColor: '#969297',
        widthPercent: '33',
        innerBarColor: '#969297'
      },
      {
        label: 'Fair',
        labelColor: Constants.Colors.Orange,
        widthPercent: '67',
        innerBarColor: Constants.Colors.Orange
      },
      {
        label: 'Fair',
        labelColor: Constants.Colors.Orange,
        widthPercent: '67',
        innerBarColor: Constants.Colors.Orange
      },
      {
        label: 'Strong',
        labelColor: Constants.Colors.DarkBlue,
        widthPercent: '100',
        innerBarColor: Constants.Colors.DarkBlue,
      }
    ],
    tooShort: {
      enabled: false,
      labelColor: '#fff',
      label: 'Too short',
      widthPercent: 33,
      innerBarColor: '#fe6c6c'
    },
    barColor: "rgba(115,115,115,0.4)",
    barWidthPercent: 60,
    showBarOnEmpty: true
  };
  
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    minLength: PropTypes.number,
    ruleNames: PropTypes.string,
    strengthLevels: PropTypes.array,
    tooShort: PropTypes.object,
    minLevel: PropTypes.number,
    inputWrapperStyle: ViewPropTypes.style,
    inputStyle: TextInput.propTypes.style,
    strengthWrapperStyle: ViewPropTypes.style,
    strengthBarStyle: ViewPropTypes.style,
    innerStrengthBarStyle: ViewPropTypes.style,
    strengthDescriptionStyle: Text.propTypes.style,
    barColor: PropTypes.string,
    barWidthPercent: PropTypes.number,
    showBarOnEmpty: PropTypes.bool
  };
  
  constructor(props) {
    super(props);
    this.animatedInnerBarWidth = new Animated.Value(0);
    this.animatedBarWidth = new Animated.Value(0);
    this.state = {
      level: -1,
      isTooShort: false,
      isFocused : false,
      focusColor: Constants.Colors.WhiteUpd,
      borderBottomWidth : 1
    }
  }
  
  componentDidMount() {
    const { showBarOnEmpty } = this.props;
    if (showBarOnEmpty) {
      this.showFullBar();
    }
  }
  
  showFullBar(isShow = true) {
    const { barWidthPercent } = this.props;
    const barWidth = isShow ? widthByPercent(barWidthPercent) : 0;
    Animated.timing(this.animatedBarWidth, {
      toValue: barWidth,
      duration: 20
    }).start();
  }
  
  isTooShort(password) {
    const { minLength } = this.props;
    if (!minLength) {
      return true;
    }
    return password.length < minLength;
  }
  
  isMatchingRules(password) {
    const { ruleNames } = this.props;
    if (!ruleNames) {
      return true;
    }
    
    const rules = _.chain(ruleNames)
      .split('|')
      .filter(rule => !!rule)
      .map(rule => rule.trim())
      .value();
    
    for (const rule of rules) {
      if (!this.isMatchingRule(password, rule)) {
        return false;
      }
    }
    return true;
  }
  
  isMatchingRule(password, rule) {
    switch (rule) {
      case 'words':
        return regex.wordsPattern.test(password);
      case 'digits':
        return regex.digitsPattern.test(password);
      case 'letters':
        return regex.lettersPattern.test(password);
      case 'lowerCase':
        return regex.lowerCasePattern.test(password);
      case 'upperCase':
        return regex.upperCasePattern.test(password);
      default:
        return true;
    }
  }
  
  calculateScore(text) {
    if (!text) {
      this.setState({
        isTooShort: false
      });
      return -1;
    }
    
    if (this.isTooShort(text)) {
      this.setState({
        isTooShort: true
      });
      return 0;
    }
    
    this.setState({
      isTooShort: false
    });
    
    if (!this.isMatchingRules(text)) {
      return 0;
    }
    
    return zxcvbn(text).score;
  }
  
  getPasswordStrengthLevel(password) {
    return this.calculateScore(password);
  }

  onBlur() {
    this.setState({ isFocused: false, focusColor  : Constants.Colors.WhiteUpd,borderBottomWidth:1 });
    if(this.props.onBlur){
      this.props.onBlur();
    }
  }

  onFocus(){
    let colour = this.props.focusColor ? this.props.focusColor : Constants.Colors.WhiteUpd;
    this.setState({ isFocused: true, focusColor  : colour, borderBottomWidth : 2});
    if(this.props.onFocus)
      this.props.onFocus();
  }

  focus(){
    this.refs.inputBox.focus()
  }
  
  onChangeText(password) {
    const level = this.getPasswordStrengthLevel(password);
    this.setState({
      level: level
    });
    const isValid = this.isMatchingRules(password) && level >= this.props.minLevel;
    this.props.onChangeText(password, isValid);
  }
  
  renderPasswordInput() {
    const { inputWrapperStyle, inputStyle } = this.props;
    return (
      <View style={[styles.inputWrapper, inputWrapperStyle, {borderBottomColor:this.state.focusColor,borderBottomWidth:this.state.borderBottomWidth}]}>
        <TextInput
          ref={"inputBox"}
          placeholder="PASSWORD"
          placeholderColor={Constants.Colors.WhiteUpd}
          selectionColor="#fff"
          autoCapitalize="none"
          maxLength={20}
          autoCorrect={false}
          multiline={false}
          underlineColorAndroid="transparent"
          {...this.props}
          style={[styles.input, inputStyle,{color:this.props.textColor?this.props.textColor:Constants.Colors.Black}]}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChangeText={text => this.onChangeText(text)}
        />
      </View>
    );
  }
  
  renderPasswordStrength() {
    const {
      barWidthPercent,
      tooShort,
      strengthLevels,
      barColor,
      strengthWrapperStyle,
      strengthBarStyle,
      innerStrengthBarStyle,
      strengthDescriptionStyle,
      showBarOnEmpty
    } = this.props;
    
    const barWidth = widthByPercent(barWidthPercent);
    
    const { level } = this.state;
    
    let strengthLevelBarStyle = {}, strengthLevelLabelStyle = {}, strengthLevelLabel = '', innerBarWidth = 0;
    if (level !== -1) {
      
      if (!showBarOnEmpty) {
        this.showFullBar();
      }
      
      innerBarWidth = widthByPercent(strengthLevels[level].widthPercent, barWidth);
      strengthLevelBarStyle = {
        backgroundColor: strengthLevels[level].innerBarColor
      };
      
      strengthLevelLabelStyle = {
        color: strengthLevels[level].labelColor
      };
      strengthLevelLabel = strengthLevels[level].label;
      
      if (tooShort.enabled && this.state.isTooShort) {
        innerBarWidth = widthByPercent(tooShort.widthPercent, barWidth) || widthByPercent(strengthLevels[level].widthPercent, barWidth);
        strengthLevelBarStyle = {
          backgroundColor: tooShort.innerBarColor || strengthLevels[level].innerBarColor
        };
        strengthLevelLabelStyle = {
          color: tooShort.labelColor || strengthLevels[level].labelColor
        };
        strengthLevelLabel = tooShort.label || strengthLevels[level].label;
      }
    } else {
      if (!showBarOnEmpty) {
        this.showFullBar(false);
      }
    }
    
    Animated.timing(this.animatedInnerBarWidth, {
      toValue: innerBarWidth,
      duration: 800
    }).start();
    
    return (
      <View style={[styles.passwordStrengthWrapper, strengthWrapperStyle]}>
        <Animated.View style={[styles.passwordStrengthBar, strengthBarStyle, { backgroundColor: barColor, width: this.animatedBarWidth }]}>
          <Animated.View style={[styles.innerPasswordStrengthBar, innerStrengthBarStyle, { ...strengthLevelBarStyle, width: this.animatedInnerBarWidth }]} />
        </Animated.View>
        <Text style={[styles.strengthDescription, strengthDescriptionStyle, { ...strengthLevelLabelStyle }]}>{strengthLevelLabel}</Text>
      </View>
    );
  }
  
  render() {
    return (
      <View style={styles.wrapper}>
        {this.renderPasswordInput()}
        {this.renderPasswordStrength()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
    height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,
    borderBottomWidth: 1,
    borderColor: Constants.Colors.WhiteUpd,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
   // marginVertical: Constants.BaseStyle.DEVICE_HEIGHT*2/100,
  },
  input: {
    //flex: 1,
   // height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,
    color: Constants.Colors.Black,
    height:Constants.BaseStyle.DEVICE_HEIGHT/100*8,
    //borderWidth:1
    // paddingTop: 7,
    // paddingBottom: 10,
    //fontSize: 20
  },
  passwordStrengthWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH/100)*5,
  },
  passwordStrengthBar: {
    height: 10,
    position: 'relative',
    top: 5,
    bottom: 5,
    borderRadius: 5
  },
  innerPasswordStrengthBar: {
    height: 10,
    borderRadius: 5,
    width: 0
  },
  strengthDescription: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'right',
    position: 'absolute',
    right: 5,
    top: 1,
    fontSize: 14
  }
});
