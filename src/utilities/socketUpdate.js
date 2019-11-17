/* eslint-disable no-unused-vars */
import openSocket from 'socket.io-client';

let socket, customerSocketObj;
let urgencyMapCallback, driverMapCallback;

export default {
  driverScoketEvent: function(requestObj) {
    if (socket) {
      socket.emit('send-ltlng', {
        driverid: requestObj.driverid,
        geometry: {
          coordinates: [requestObj.lng, requestObj.lat],
          type: 'Point',
        },
      });
      return;
    } else {
      let paramObj = {
        usertype: 'driver',
        '&userid': requestObj.driverid,
      };
      var queryString = '';
      for (var key in paramObj) {
        queryString = queryString + key + '=' + paramObj[key] + '';
      }
      queryString = queryString.substr(0, queryString.length - 1);
      socket = openSocket(
        'http://drivertrackingapi.delgate.com/',
        {query: queryString},
        {reconnect: true},
      );
      socket.on('latlng-message-response', data => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(data));
      });
      socket.io.on('connection', data => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(data));
      });
      socket.emit('send-ltlng', {
        driverid: requestObj.driverid,
        geometry: {
          coordinates: [requestObj.lng, requestObj.lat],
          type: 'Point',
        },
      });
    }
  },

  customerSocket: function(request) {
    if (customerSocketObj) {
      // This will be used for emit event once we have customer socket created

      return;
    } else {
      let requestObj = {
        usertype: 'consumer',
        '&userid': request.customerId,
        '&lat': request.latitude,
        '&lng': request.longitude,
      };

      var queryString = '';

      for (var key in requestObj) {
        queryString = queryString + key + '=' + requestObj[key] + '';
      }
      queryString = queryString.substr(0, queryString.length - 1);

      console.log(queryString);

      customerSocketObj = openSocket(
        'http://drivertrackingapi.delgate.com/',
        {query: queryString},
        {reconnect: true},
      );

      customerSocketObj.io.on('connection', data => {
        console.log(JSON.stringify(data));
      });

      customerSocketObj.on('latlng-message-response', data => {
        console.log(JSON.stringify(data));
        request.socketUpdateCallback(data);
      });

      customerSocketObj.on('driver-location-response', data => {
        console.log(customerSocketObj);

        var callbackData = {
          eventType: 'customerLatLng',
          driverList: data,
        };

        console.log(callbackData);

        if (this.selectDriverCallback) {
          this.selectDriverCallback.soccketCB(callbackData);
          return;
        }

        if (this.urgencyMapCallback) {
          this.urgencyMapCallback.soccketCB(callbackData);
          return;
        }

        request.socketUpdateCallback(callbackData);
      });

      customerSocketObj.on('driver-outside-radius', data => {
        var callbackData = {
          eventType: 'driverOutSide',
          driverList: data,
        };
        request.socketUpdateCallback(callbackData);
        console.log('outSide  ' + JSON.stringify(data));

        if (this.urgencyMapCallback) {
          this.urgencyMapCallback.soccketCB(callbackData);
        }

        if (this.selectDriverCallback) {
          this.selectDriverCallback.soccketCB(callbackData);
        }
      });

      customerSocketObj.on('driver-inside-radius', data => {
        console.log('inside' + JSON.stringify(data));

        var callbackData = {
          eventType: 'driverInside',
          data: data.data,
        };

        request.socketUpdateCallback(callbackData);

        if (this.urgencyMapCallback) {
          this.urgencyMapCallback.soccketCB(callbackData);
        }

        if (this.selectDriverCallback) {
          this.selectDriverCallback.soccketCB(callbackData);
        }
      });

      customerSocketObj.on('driver-movement', data => {
        console.log('driver-movement' + JSON.stringify(data));

        var callbackData = {
          eventType: 'driverInside',
          data: data.data,
        };

        request.socketUpdateCallback(callbackData);

        if (this.urgencyMapCallback) {
          this.urgencyMapCallback.soccketCB(callbackData);
        }

        if (this.selectDriverCallback) {
          this.selectDriverCallback.soccketCB(callbackData);
        }
      });

      customerSocketObj.on('driver-disconnected', data => {
        var callbackData = {
          eventType: 'driverDisconnected',
          //  driverList:data,
        };

        console.log(data);

        //consoel.log('driverDisconnected' + JSON.stringify(data))

        //  request.socketUpdateCallback(callbackData);
      });

      customerSocketObj.io.on('connect', data => {
        // alert(customerSocketObj); // false
      });

      // eslint-disable-next-line prettier/prettier
      customerSocketObj.io.on('connection', data => {
        // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line no-trailing-spaces
    
      });
    }
  },

  urgencyMapCallback: undefined,
  selectDriverCallback: undefined,

  getDriverListUrgencyScreen: function(data) {
    data.type = 'point';
    console.log(data);
    if (customerSocketObj) {
      customerSocketObj.emit('send-customer-lctn', data);
    }
  },

  getDriverSelectScreen: function(data) {
    data.type = 'point';
    console.log(data);
    if (customerSocketObj) {
      customerSocketObj.emit('send-customer-lctn', data);
    }

    console.log(new Date().getTime());
  },
};
