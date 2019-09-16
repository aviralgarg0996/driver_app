
import React,{ Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Easing,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native';

import PriorityCmp from '../../../components/driver/PriorityCmp';
import Constants from "../../../constants";
import MapView,{Marker} from 'react-native-maps';
import NavigationBar from "react-native-navbar";
import { connect } from 'react-redux'; 
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 28.669;
const LONGITUDE = 77.380311;
const LATITUDE_DELTA = 0.25;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let markers=[];
let prioirtyPickup;
let currentPriority=[];
import Icon from 'react-native-vector-icons/FontAwesome';



 class Priority extends Component{



   
    
    constructor(props){
        super(props);

    
    this.setData();

    let {
      navigate,ButtonScreenNo
    } = this.props;

        this.state = {
            Exp:{},
            showDraggable   : true,
            dropZoneValues  : null, 
            pan             : new Animated.ValueXY(),
            data:this.props.orderstate.ongoingResult.done,
            currentPriority:currentPriority,
            reload:true,
    
            mapRegion:{
                latitude: LATITUDE,
                 longitude: LONGITUDE,
                 latitudeDelta: LATITUDE_DELTA,
                 longitudeDelta: LONGITUDE_DELTA,
                },
              polyLineCoordinates:[],
              markers:markers,
        };

        
    }



    

    isDropZone(gesture){
        var dz = this.state.dropZoneValues;

      
        return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    } 

    componentWillUnmount(){


        const { navigation } = this.props;
       if(navigation.state.params.changeRoute)
       {
        navigation.state.params.changeRoute();
       }
    }




    setData=()=>{

        markers=[];
        currentPriority=[];

        

        this.props.orderstate.ongoingResult.done.forEach(function(element){
            if(element.type=='pickup')
            markers.push({
                coordinate:{
                    latitude:parseFloat(element.pickup_point.split(',')[0]),
                    longitude:parseFloat(element.pickup_point.split(',')[1])
                },
                title:element.order_id +' ' + element.type,
                description:element.address
            })
            else

            {

                markers.push({
                    coordinate:{
                        latitude:parseFloat(element.drop_point.split(',')[0]),
                        longitude:parseFloat(element.drop_point.split(',')[1])
                    },
                    title:element.order_id +' ' + element.type,
                    description:element.address
                })

            }
        })


        this.props.orderstate.ongoingResult.data.forEach(function(element){
            console.log(element);
            if(element.type=='pickup')
            {
                currentPriority.push(
                    <View style={styles.circle}>
                         <TouchableOpacity onPress={this.onPress} style={styles.circle1}> 
                        <Text style={styles.text}>{element.order_id}</Text>
                        <Text style={styles.text}>{element.end_address}</Text>
                        </TouchableOpacity>
                   
                </View> 
                )

            }
           
            else

            {

                currentPriority.push(
                    <View style={[styles.circle,{backgroundColor:'#7FB0F2'}]}>
                   
                      
                       
                     <TouchableOpacity onPress={this.onPress} style={styles.circle1}> 
                        <Text style={styles.text}>{''}{element.order_id}</Text>
                        <Text style={styles.text}>{element.type}</Text>
                        <Text style={styles.text}>{element.end_address}</Text>
                    </TouchableOpacity>
                   

                </View> 
                )

              
            }
        })
  



    this.setState( {
        currentPriority:currentPriority});
    };


    reload=()=>{


        this.setState({reload:false});
        
        setTimeout(() => {
            this.setData();
            this.setState({reload:true})
        }, 200);

        const { navigation } = this.props;
       // alert(navigation.state.params.itemId)
       
       


    }

    cb=(obj)=>{
        

if(prioirtyPickup)
    Animated.spring(
        prioirtyPickup,
     {toValue:{x:0,y:0}}
    ).start();
 
    prioirtyPickup=obj; 
    }

    getAllPickUp=()=>{
       
        orderArray={};
        data=[]
        this.state.data.forEach(element => {
       
            if(orderArray[element.order_id])
            {
                orderArray[element.order_id].push(element);
            }
            else
            {
                orderArray[element.order_id]=[];
                orderArray[element.order_id].push(element);

            } 
        });

        pushData=[]

for(let key in orderArray)
         {
        pushData.push(
           <View style={{flexDirection : 'row', margin:5}}> 
               <Text style={{height:50,width:50,textAlign:'center',
            alignSelf:'center'}}> {"ORDER "}{key} </Text>
            {orderArray[key].map((item) => {
                if(item.pickup_status==0)
             return ( 
                <PriorityCmp dz={this.state.dropZoneValues} orderData={item} cb={this.cb} reload={this.reload}/>
                  ); 
                  else if(item.pickup_status==1 || item.drop_status==1) 
                 {
                     return(
                    <View style={[styles.circleX]}>
                            <TouchableOpacity onPress={this.onPress} style={styles.circle1}> 
                            <Text style={styles.textX}>{item.address}</Text>
                    </TouchableOpacity>
                   
                </View> 
                     )
                     
                 }
else if(item.drop_status==0)
{

    return ( 
        <PriorityCmp dz={this.state.dropZoneValues} orderData={item} cb={this.cb} reload={this.reload}/>
          ); 
}

                
                })
                 
           }
    </View>
    );
    }

    return pushData;

    }


    componentDidMount(){
      
    }


    render(){

        

        const titleConfig = {
            title: "Change Prioirty",
            tintColor: "#fff",
            style: { fontSize: 18, fontWeight: "600" }
          };
        return (
            <ScrollView style={styles.mainContainer}>
                
           
        <NavigationBar
          statusBar={{ hidden: true }}
          style={styles.navigationBar}
          title={titleConfig}
          rightButton={
            <View 
            onLayout={this.setDropZoneValues.bind(this)}
            style={styles.dropZone}>
            <Text style={[styles.text,{margin:5}]}>{'Drag and drop your priority.'}</Text>
            </View>
          } 
          leftButton={<TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.circle1}> 
          <Text style={styles.text}>Back</Text>
          </TouchableOpacity>}
        />
             <View>   
         <MapView
            style={{height:Constants.BaseStyle.DEVICE_HEIGHT/100 * 40,zIndex:-1,backgroundColor:'white'}}
            region={this.state.mapRegion}
            zoomEnabled={true}
            showsUserLocation={true}
            pitchEnabled={false}
            rotateEnabled={false}
            //customMapStyle={Constants.MapStyle}
          >
          {this.state.markers.map((marker, index) => {
    return (
      <MapView.Marker key={index} coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
      
      >
       
      </MapView.Marker>
    );
  })}
  </MapView>

 {  <ScrollView style={{flexDirection:'row',zIndex:-1,height:100}} 
     horizontal={true} alwaysBounceHorizontal={true} showsHorizontalScrollIndicator={false}>
    <Text style={[styles.text,{color:'#000'}]}>Current Route</Text>
      {this.state.reload && this.state.currentPriority}
    </ScrollView>}
            </View>   
               
    {this.state.dropZoneValues && <View>  
                
                  {this.getAllPickUp()}    
                  </View>
                 
                }
                
            </ScrollView> 
        );
    }  

  
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1,
        backgroundColor:'white'
    },

    cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
      },
      marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
      ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
      },

    dropZone    : {
        height  : 80,
        backgroundColor:'#2c3e5080',
      //  zIndex:-1,
     //   position:'absolute',
        top:0,
        width:'100%',
        width:80,
        borderRadius:40
    },
    text        : {
        marginTop   : 2,
        marginLeft  : 2,
        marginRight : 2, 
        textAlign   : 'center',
        color       : '#fff'
    },


    textX        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff',
        fontSize: 8,
    },
    draggableContainer: {
      //  position    : 'absolute',
       // top         : Window.height/2 - CIRCLE_RADIUS,
       // left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : 100,
        height              : 100,
        borderRadius        : 50
    },

    circleX      : {
        backgroundColor     : '#7FB0F2',
        width               : 76,
        height              : 76,
        borderRadius        : 38,
        marginLeft:2,
        zIndex:1
    },
     circle1      : {
    //    backgroundColor     : '#1abc9c',
        alignSelf: 'center',  
        borderRadius:6, 
      //  height:20,
  //      backgroundColor:'red',
      //  width:30,
    //    marginTop :8, 
         
    }, 

    navigationBar: {
        backgroundColor: Constants.Colors.LightBlue,

        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 10, 
        alignItems: "center"
      },
      rightButtonNav: {
        flexDirection: "row",
        alignItems: "center"
      },
      navIcons: {
        height: Constants.BaseStyle.DEVICE_HEIGHT / 100 * 7,
        width: Constants.BaseStyle.DEVICE_WIDTH / 100 * 7
      }
});

export default connect(state => ({orderstate: state.OrdersHandleReducer}))(Priority);