"use strict";

//import Connection  from "../config/Connection";
import querystring from "querystring";
import { NetInfo, Alert, Platform } from "react-native";
//import { getSocketClient } from "../utilities/SocketClient";

let ConnectionUrl = '18.205.68.238:9000';
ConnectionUrl = '18.212.245.222:7010';
const apiBase_url = `http://${ConnectionUrl}/api/`; 

//let logintoken = "";

class CustomersAPI {
    static getApiURL()
    {
      return apiBase_url;
    }

    static isConnected() {
        let context = this;
        return new Promise(function(fulfill, reject) {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected)
                        fulfill(isConnected);
                    else {
                        reject(isConnected);
                    }
                });

        });
    } 

    static post(url, params, token = '',userId='') {
        let context = this,
            logintoken;
        return new Promise(function(fulfill, reject) {
            context.isConnected().then(() => {
                    //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(apiBase_url + url, {
                            method : "POST",
                            //timeout : 1000*1*60,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                //"token": token,
                                //"x-user-id": userId
                            },
                            body: JSON.stringify(params)
                        }).then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        }).catch(error => {
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                            console.warn("eroro",error);
                        });
                }).catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }

}

export default CustomersAPI;
