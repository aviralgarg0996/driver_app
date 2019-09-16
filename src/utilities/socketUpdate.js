import openSocket from 'socket.io-client';

let socket;



export default {

    isTest:function(requestObj){
       

        if(socket)
        {
         socket.emit('send-ltlng', {"driverid":requestObj.driverid,"geometry":{"coordinates":[requestObj.lng,requestObj.lat],"type":"Point"}});
         return;
        }
        else{
        
           socket = openSocket('http://drivertrackingapi.delgate.com/',{ query: 'userid='+requestObj.driverid }, { reconnect: true });
         socket.on('latlng-message-response', (data) => {
          alert(JSON.stringify(data));
         });
         socket.on('connection', (data) => {
           alert(JSON.stringify(data));
         });
         socket.emit('send-ltlng', {"driverid":requestObj.driverid,"geometry":{"coordinates":[requestObj.lng,requestObj.lat],"type":"Point"}});
       
        
     }
    }


}