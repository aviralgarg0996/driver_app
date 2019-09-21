//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";

import CustomerConnection from "../../config/Connection";
let mediaUrl = CustomerConnection.mediaURL() + '/';

var blankDriverMap={};
var markerList=[];
var assignedDriver=0;
var drivercount=0;

/*
this.state.vehicleArray.map((item)=>{

    return <MapView.Marker.Animated
    ref={marker => { driverMap[item.driverId] = marker 
    
    }}
    coordinate={item}
    title={item.title}
    //image={require('../assets/pin.png')}
    >*/

// create a component



export default {

    hiddenMarkerList : function(){

        if(markerList.length>0)
        return
        
      /*  for(var i=0;i<1;i++)
        markerList.push(<MapMaker/>);
     
         return markerList;*/
      
        },

        getLatestMarkerList:function(){

      
        },


        assign:function(item){


           
          

            return {marker: blankDriverMap[assignedDriver++],
                assignedDriverCount:assignedDriver-1,
            } ;
        },


        getLatestMarkerList:function(){

            markerList.push(<MapMaker/>);
     
            return markerList;

        

        },




        onLocationChange:function(driverData,data) {
 
            if(!data)
              return;
         
            
           
              driverData._component.animateMarkerToCoordinate(
                {
          
                 latitude: data.latitude,
                 longitude: data.longitude
                },
                   1000,
                 );
            
           
           },

           appendNewMarker:function(item){

            // markerList.push(<MapMaker/>);
     
         return <MapMaker key={item._id}
           item={item}/>;
           }

};


class MapMaker extends Component {


constructor(props){
    super(props)
    this.markerCMP=null;
    this.ImageCMP=null;
}

    onLayout = (e) => {
        
       
     

    

      

      }


render ()
{

    console.log(this.props.item)

    return <MapView.Marker.Animated
key={drivercount}

    onLayout={this.onLayout}
    tracksViewChanges={false}
    ref={marker => 
       { 
        this.markerCMP=marker;
    
        blankDriverMap[drivercount++]={
            markerCMP:this.markerCMP,
         //   ImageCMP:this.ImageCMP
           }
   
       }}
   coordinate={  

         { latitude: this.props.item.geometry[0].coordinates[1],
           longitude:this.props.item.geometry[0].coordinates[0] }
    }
   title={' new ' + drivercount}
//icon={{ uri:'https://www.seekpng.com/png/detail/101-1016495_map-marker-vector-map-marker-icon-transparent.png' }} 
  
>



</MapView.Marker.Animated>
}

}

