
import React from 'react';
import { Text, View, TouchableOpacity,TextInput,Modal } from 'react-native';
import SocketIOClient from 'socket.io-client';
import openSocket from 'socket.io-client';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';


export default class Play extends React.Component {

  

  constructor(props) {
    super(props);
    //this.socket = SocketIOClient('http://13.127.98.44:6263/'); // replace 'environment.serverUrl' with your server url
   
    this.state={
      tst:true,
      hight:0,
      initialPositionCircle: {
        latitude: 22,
        longitude: 77,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    }

    this.height=true;
    let driverId='5bda93c59f19ad5e722d8ca3';
   // driverId='5c63e76b67bc330011b0485b';
   this.socket = openSocket('http://drivertrackingapi.delgate.com/',{ query: 'userid='+driverId }, { reconnect: true });
   let latLng=[-123.31434887,49];

   // http://adminapi.delgate.com/api/admin/driverlocations
  var location= {"status":1,"data":[{"geometry":{"coordinates":[65.42455338731264,-109.544439212724]},"_id":"5bda93c59f19ad5e722d8ca3","image":"/images/top_vehicle_category_large_1554577380643.png","firstName":"Wonder","lastName":"Driver","profilePic":"upload/additional/5bda93c59f19ad5e722d8ca3/driver_additional_image_1551544588677","email":"ansh@gmail.com","phone":"1111111111"},{"geometry":{"coordinates":[45.63,52.36]},"_id":"5bff9d7932e05007b67ee494","image":"/images/1542967208872.png","firstName":"Steve","lastName":"Ved","profilePic":"upload/profile/5bff9d7932e05007b67ee494/beaf44d3-4298-40aa-9b26-42dbd4ba50d2.jpg","email":"a.bhi.mink02@gmail.com","phone":"2492003483"},{"geometry":{"coordinates":[28.6402157,77.3810135]},"_id":"5c00adbf56b711154419f236","image":"/images/top_vehicle_category_medium_1553669702568.png","firstName":"Steve","lastName":"Vedang","profilePic":"upload/additional/5c00adbf56b711154419f236/driver_additional_image_1553099203635","email":"ab.hi.mink02@gmail.com","phone":"6393994057"},{"geometry":{"coordinates":[49.333842,-122.050109]},"_id":"5c124b701a0dc253bdf4529b","image":"/images/1542967208872.png","firstName":"Deepak","lastName":"Bhaskar","profilePic":"upload/profile/5c124b701a0dc253bdf4529b/document delivery.jpg","email":"deepakbhaskar.wonderpillars@gmail.com","phone":"9891196841"},{"geometry":{"coordinates":[28.6402225,77.3810016]},"_id":"5c5dd827583056001738e974","image":"/images/1542967221300.png","firstName":"Testing","lastName":"Driver","profilePic":"upload/profile/5c5dd827583056001738e974/driver_profile_image_1549654346304","email":"a.vi.ral.garg099.6@gmail.com","phone":"8194152991"},{"geometry":{"coordinates":[49,-123.31434887],"type":"Point"},"_id":"5c63e76b67bc330011b0485b","image":"/images/1542967221300.png","firstName":"Ajit","lastName":"Singh","profilePic":"upload/profile/5c63e76b67bc330011b0485b/driver_profile_image_1550051268123","email":"ajit.singh1304@gmail.com","phone":"7982504947"},{"geometry":{"coordinates":[49.3570645,-123.2549399]},"_id":"5c887a01126d100011a31b6f","image":"/images/top_vehicle_category_large_1554577380643.png","firstName":"Reza","lastName":"Shojae","profilePic":"upload/profile/5c887a01126d100011a31b6f/driver_profile_image_1552448483289","email":"reza.shojae2018@gmail.com","phone":"6047152616"},{"geometry":{"type":"Point","coordinates":[45.63,52.36]},"_id":"5c89e6bf126d100011a31c10","image":"/images/1542967221300.png","firstName":"T1","lastName":"T","profilePic":"upload/profile/5c89e6bf126d100011a31c10/driver_profile_image_1552541497991","email":"test-it@yopmail.com","phone":"8198009417"},{"geometry":{"coordinates":[50.1166174,-122.9483644]},"_id":"5c9ee0a12529940011d80e4f","image":"/images/top_vehicle_category_medium_1553669702568.png","firstName":"Tester","lastName":"Test","profilePic":"upload/profile/5c9ee0a12529940011d80e4f/driver_profile_image_1553916916806","email":"tablo@yopmail.com","phone":"2267788022"},{"geometry":{"coordinates":[-123.116226,49.246292],"type":"Point"},"_id":"5cad79402529940011d80f32","image":"/images/1542967221300.png","firstName":"Jimmi","lastName":"Palang","profilePic":"upload/profile/5cad79402529940011d80f32/driver_profile_image_1554872967203","email":"goolparvar@hotmail.com","phone":"6047675051"}]}


  location.data.map((val, i) => {


    this.socket.emit('send-ltlng', {"driverid":val._id,"geometry":{"coordinates":latLng,"type":"Point"}});
    
});





   
   
      this.socket.emit('send-ltlng', {"driverid":driverId,"geometry":{"coordinates":latLng,"type":"Point"}});
    this.socket.on('latlng-message-response', (data) => {


console.log("hhhhhhhhh");
   

 // alert(JSON.stringify(data))
    });

    alert("sgahsahd")
  
  }

  _handlePress() {

    this.setState({tst:!this.state.tst})
    
    this._textInput.setNativeProps({ text: '' })


setInterval(() => {

   this._root.setNativeProps({
      style: { height: this.height?0:'80%' }
    })

    this.height=!this.height;
  
}, 3000);

 
  }

  clicked = () => {
    const dataObj = {
      action: 'click'
    };

    this.setState({tst:!this.state.tst})

  

    this.socket.emit('send-ltlng', {"driverid":"5c00adbf56b711154419f236","geometry":{"coordinates":[49,-123.31434887],"type":"Point"}});
  
  }

  render() {
    return (
      <View>





<View  ref={component => this._root = component}
 style={{ height: '80%', zIndex: 0 }}>
              

                
                
             
</View>

<TextInput
          ref={component => this._textInput = component}
          />
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Text>Clear text</Text>
        </TouchableOpacity>

       <TouchableOpacity
         
         onPress={this.clicked}
       >
         <Text style={{color:'blue'}}> Touch Here </Text>
       </TouchableOpacity>
       <View >
       
        </View>
      </View>
    );
  }
}