
import React,{ Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Easing,
    Dimensions ,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
var {height, width} = Dimensions.get('window');



import * as UserActions from '../../redux/modules/user';

import { bindActionCreators } from "redux";


 class PriorityCmp extends Component{
    constructor(props){
        super(props); 

       
       
dz=this.props.dz;
        this.state = {
            showDraggable   : true,
            dropZoneValues  : null, 
            pan             : new Animated.ValueXY()
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder    : () => true,
            onPanResponderMove              : Animated.event([null,{
                dx  : this.state.pan.x,
                dy  : this.state.pan.y
            }]),
           
            onPanResponderRelease           : (e, gesture) => {
                if(this.isDropZone(gesture)){

                    this.props.cb(this.state.pan); 

                this.markAsPriorty();
               

                    
                }else{
                    Animated.spring(
                        this.state.pan,
                        {toValue:{x:0,y:0}}
                    ).start();
                }
            }
        });
    }

    
    markAsPriorty=()=>{ 

        this.props.UserActions.chnageOorderPriority({pickupId:this.props.orderData._id,
            driverId:this.props.userData.data._id}).then((response) => {
            if(response.ok==1)

//alert("test")
            this.props.UserActions.scheduledOrder({orderId:this.state.orderId,
                driverId:this.props.userData.data._id,lat_long:'28.704112,77.1024411'}).then((response) => {
             
                    this.props.reload({reload:true});
           })
    });
    }

    isDropZone(gesture){ 
  

       if (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && 
            gesture.moveX > width-dz.width && gesture.moveX < width)
            {
              


                return true;
            }
            return false;
    }

    setDropZoneValues(event){
        this.setState({
            dropZoneValues : event.nativeEvent.layout
        });
    }

    render(){
        return (
                    this.renderDraggable()
          );
    }  

    onPress=()=>{
        alert(JSON.stringify(this.props.orderData));  
    }

    renderDraggable(){ 
        if(this.state.showDraggable){  
            return (
                <View style={styles.draggableContainer}>
                    <Animated.View 
                        {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), styles.circle]}>
                         <TouchableOpacity onPress={this.onPress} style={styles.circle1}> 
                        <Text style={styles.text}>{this.props.orderData.address}</Text>
                        </TouchableOpacity>
                    </Animated.View> 
                </View> 
            );

        }  
        else
        { 
            return <View/>
        }
    }
}

let CIRCLE_RADIUS = 38;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height  : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
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

//alignContent: 'center',
//justifyContent: 'center', 
//zIndex:12

    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS,
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
         
    } 
});


const mapStateToProps = state => ({
    modalstate: state.ModalHandleReducer,orderstate: state.OrdersHandleReducer,
    userData: (state.user && state.user.driverData) || (state.user && state.user.userData),
    locationData:state.location
  });
  
  const mapDispatchToProps = dispatch => ({
    UserActions: bindActionCreators(UserActions, dispatch)
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PriorityCmp);
  

//  export default connect(state => ({orderstate: state.OrdersHandleReducer}))();
  //export default connect(mapStateToProps,null)(PriorityCmp);