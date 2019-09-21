import openSocket from 'socket.io-client';

let socket,customerSocketObj;



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
         socket.io.on('connection', (data) => {
           alert(JSON.stringify(data));
         });
         socket.emit('send-ltlng', {"driverid":requestObj.driverid,"geometry":{"coordinates":[requestObj.lng,requestObj.lat],"type":"Point"}});
     }
    },

    customerSocket:function(request){
     
      if(customerSocketObj)
      {
    //    customerSocketObj.emit('send-ltlng', {"driverid":requestObj.driverid,"geometry":{"coordinates":[requestObj.lng,requestObj.lat],"type":"Point"}});
       return;
      }
      else{

        let requestObj={
          usertype:'consumer',
          '&userid':request.customerId,
          '&lat':request.latitude,
          '&lng':request.longitude
        }

       var queryString='';

        for(var key in requestObj)
         queryString=queryString+key+'='+requestObj[key]+'';
         queryString=queryString.substr(0,queryString.length-1);

         console.log(queryString);
        
         customerSocketObj = openSocket('http://drivertrackingapi.delgate.com/',
       { query: queryString},
       { reconnect: true });
       
       customerSocketObj.on('latlng-message-response', (data) => {
        console.log(JSON.stringify(data));
        request.socketUpdateCallback(data);
       });

       customerSocketObj.on('driver-location-response', (data) => {
        
        var callbackData={
          eventType:'customerLatLng',
          driverList:data,
        }

        console.log(callbackData);

        request.socketUpdateCallback(callbackData);

       });



       customerSocketObj.on('driver-outside-radius', (data) => {
        
        var callbackData={
          eventType:'driverOutSide',
          driverList:data,
        }
    //    request.socketUpdateCallback(callbackData);
          console.log('outSide  ' + JSON.stringify(data))

        });


       customerSocketObj.on('driver-inside-radius', (data) => 
       {
        console.log('inside' + JSON.stringify(data));

          var callbackData={
          eventType:'driverInside',
          data:data.data,
          }
    
          request.socketUpdateCallback(callbackData);
      });


      customerSocketObj.on('driver-movement', (data) => 
       {
        console.log('driver-movement' + JSON.stringify(data));

        var callbackData={
          eventType:'driverInside',
          data:data.data
          }
    
          request.socketUpdateCallback(callbackData);
        
      });

       customerSocketObj.on('driver-disconnected', (data) => {
        
        var callbackData={
          eventType:'driverDisconnected',
        //  driverList:data,
        }

//consoel.log('driverDisconnected' + JSON.stringify(data))

      //  request.socketUpdateCallback(callbackData);

       });




       



       customerSocketObj.io.on('connect', (data) => {
      // alert(customerSocketObj); // false
      });

       customerSocketObj.io.on('connection', (data) => {

       alert("connected");
      });
       }
  },





}