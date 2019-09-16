import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
 //import VideoPlayer from 'react-native-video-player';
import VideoPlayer from 'react-native-video-controls';
import Constants from "../../constants";

export default class Video extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        {/* <Text style={{ fontSize: 22, marginTop: 22 }}>React Native Video Player</Text> */}
        {/* <VideoPlayer
            source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}}
          ref={r => this.player = r}
          disableControlsAutoHide
          autoplay
          loop
          disableSeek={false}
        /> */}
         <VideoPlayer  style={{ height:Constants.BaseStyle.DEVICE_HEIGHT / 100 * 40}}
              source={{ uri: 'http://techslides.com/demos/sample-videos/small.mp4'}}
              //autoplay
              playInBackground={false}
              paused= {true}
              muted={false}
              disableBack={true}
              disableFullscreen= {true}
          />
      </View>
    );
  }
}

// video={require('../../assets/videos/broadchurch.mp4')}
//source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}