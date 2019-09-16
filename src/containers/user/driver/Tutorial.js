//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube'
//import Orientation from 'react-native-orientation';

// create a component
class MyClass extends Component {


    constructor(props) {
        super(props)
        this.state = {
      play: true,
          currentTime: '',
          duration: ''
      }
      }
      onLoad(data) {
        this.setState({ duration: data.duration })
      }
      
      onProgress(data) {
        this.setState({ currentTime: data.currentTime })
       
      }

      componentDidMount(){

      //  this.player.presentFullscreenPlayer();


      
       
      }

     



    render() {
        return (
            <View style={styles.container}>
                 
  

<YouTube
apiKey="AIzaSyAD_dYT9A74FgpqqwvHbJMHSjAkCYjw_MY"
  videoId={'EMoXvr0Q9LE'} // The YouTube video ID
  play={this.state.play}             // control playback of video with true/false
  fullscreen={false}       // control whether the video should play in fullscreen or inline
  loop={false}             // control whether the video should loop when ended
//  controls={2}
  showFullscreenButton={false}
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  modestbranding={true}
  style={{ alignSelf: 'stretch', height: 300,marginTop:100 ,marginBottom: 100, }}
/>


 <TouchableOpacity onPress={()=>{ 
    this.setState({play:false});
   
   this.props.navigation.navigate("AppIntroduction")}}
 style={styles.TouchableOpacityPoition} 
 >
      <Text
        style={styles.text}
        Color={"white"}
      >SKIP</Text>
    </TouchableOpacity>


            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({


text:{

 // height:40,
  fontSize:40,
color:'white',
//backgroundColor:'blue',
alignSelf: 'center', 
width:'100%'

},

TouchableOpacityPoition:{
position:'absolute',
bottom:0,
right:'30%',
left:'30%',
height:40,

//backgroundColor:'#80808040', 
zIndex:1,

//alignItems: 'center',
//flexDirection: 'column', justifyContent: 'space-between',
},

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
       
       // margin:50
        
      },
});

//make this component available to the app
export default MyClass;
