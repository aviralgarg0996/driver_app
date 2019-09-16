'use strict';
import React, {
  Component
} from 'react';

import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import Video from 'react-native-video';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
  }
  state = {
    rate: 1.0,
    volume: 1.0,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    paused: false,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: false,
  };

  onLoad(data) {
    console.log('On load fired!');
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  onBuffer({ isBuffering }: { isBuffering: boolean }) {
    this.setState({ isBuffering });
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  }

  render() {
    let {
      videoStyle
    } = this.props;
    return (
      <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
        {/* <Video
         poster="https://baconmockup.com/300/200/"
          source={{uri:"https://youtu.be/ZmVPCnxN-1A"}}
          style={videoStyle}
          rate={this.state.rate}
          paused={this.state.paused}
          volume={this.state.volume}
          muted={this.state.muted}
          ignoreSilentSwitch={this.state.ignoreSilentSwitch}
          resizeMode={this.state.resizeMode}
          // onLoad={this.onLoad}
          // onBuffer={this.onBuffer}
          // onProgress={this.onProgress}
          // onEnd={() => { AlertIOS.alert('Done!') }}


          onBuffer={ console.log("onBuffer")}                // Callback when remote video is buffering
          onEnd={console.log("onEnd")}                      // Callback when playback finishes
          onError={(e)=>{console.log("videoError",e)}}               // Callback when video cannot be loaded
          onFullscreenPlayerWillPresent={console.log("fullScreenPlayerWillPresent")} // Callback before fullscreen starts
          onFullscreenPlayerDidPresent={console.log("this.fullScreenPlayerDidPresent")}   // Callback after fullscreen started
          onFullscreenPlayerWillDismiss={console.log("this.fullScreenPlayerWillDismiss")} // Callback before fullscreen stops
          onFullscreenPlayerDidDismiss={console.log("this.fullScreenPlayerDidDissmiss")}  // Callback after fullscreen stopped
          onLoadStart={console.log("this.loadStart")}            // Callback when video starts to load
          onLoad={console.log("this.setDuration")}               // Callback when video loads
          onProgress={console.log("this.setTime")}               // Callback every ~250ms with currentTime
          onTimedMetadata={console.log("this.onTimedMetadata")}  

          repeat={true}
        /> */}
      </TouchableOpacity>   
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  }
});