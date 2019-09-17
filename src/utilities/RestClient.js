"use strict";

import Connection from "../config/Connection";
import querystring from "querystring";
import axios from "axios"
import NetInfo from "@react-native-community/netinfo";
//import { getSocketClient } from "../utilities/SocketClient";


let logintoken = "";

class RestClient {
    static isConnected() {
        let context = this;
        return new Promise(function (fulfill, reject) {

          
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

    static post(url, params, token = '', userId = '') {
        let context = this,
            logintoken;

        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                fetch(Connection.getResturl() + url, {
                    method: "POST",
                    timeout: 1000 * 1 * 60,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "token": token,
                        "x-user-id": userId
                    },
                    body: JSON.stringify(params)
                }).then((response) => {
                    return response.text()
                })
                    .then(responseText => {
                        console.log('responseText*****', responseText, "********* ", url);
                        fulfill(JSON.parse(responseText));
                    }).catch(error => {
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                        console.warn("eroro", error);
                    });
            }).catch(error => {
                fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
            });
        });
    }

    static put(url, params, token = '', userId = '') {
        let context = this;

        return new Promise(function (fulfill, reject) {
            context.isConnected()
                .then(() => {
                    fetch(Connection.getResturl() + url, {
                        method: "PUT",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                            "x-user-id": userId
                        },
                        body: JSON.stringify(params)
                    })
                        .then((response) => {
                            console.log('responseText*****11', response);
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****', responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                });
        });
    }


    static patch(url, params, token = '', userId = '') {
        let context = this;

        return new Promise(function (fulfill, reject) {
            context.isConnected()
                .then(() => {
                    // console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(Connection.getCustomerTempUrl() + url + params, {
                        method: "PATCH",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "x-auth-token": token,
                            "x-user-id": userId
                        },
                        // body: JSON.stringify(params)
                    })
                        .then((response) => {
                            console.log('responseText*****11', response);
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****', responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                });
        });
    }

    static get(url, params, token = '', userId = '') {
        let context = this;

        return new Promise(function (fulfill, reject) {
            context
                .isConnected()
                .then(() => {
                    console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                    let query = querystring.stringify(params);
                    fetch(Connection.getResturl() + url + "?" + query, {
                        method: "GET",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "token": token,
                            "x-user-id": userId
                        }
                    })
                        .then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****', responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + error });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + error });
                });
        });
    }

    static imageUpload(url, params, token = '', userId = '') {
        let context = this,
            logintoken;


        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                fetch(Connection.getResturl() + url, {
                    method: "POST",
                    headers: {
                        // 'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        "token": token,
                        "x-user-id": userId
                    },
                    body: params
                })
                    .then((response) => {
                        return response.text()
                    })
                    .then(responseText => {
                        console.log('response ******** ', responseText)
                        fulfill(JSON.parse(responseText));
                    })
                    .catch(error => {
                        console.warn(error);
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                    });
            })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                });
        });
    }



    static imageUpload1(url, params, token = '', userId = '') {
        let context = this,
            logintoken;


        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                fetch(Connection.getResturl() + url, {
                    method: "POST",
                    headers: {
                        // 'Accept': 'application/json',
                        //  'Content-Type': 'multipart/form-data',
                        "token": token,
                        // "x-user-id": userId
                    },
                    body: params
                })
                    .then((response) => {
                        return response.text()
                    })
                    .then(responseText => {
                        console.log('response ******** ', responseText)
                        fulfill(JSON.parse(responseText));
                    })
                    .catch(error => {
                        console.warn(error);
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                    });
            })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                });
        });
    }



    static putimageUpload(url, params, token = '', userId = '') {
        let context = this,
            logintoken;


        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                fetch(Connection.getResturl() + url, {
                    method: "PUT",
                    headers: {
                        // 'Accept': 'application/json',
                        //'Content-Type': 'multipart/form-data',
                        "token": token,
                        //  "x-user-id": userId
                    },
                    body: params
                })
                    .then((response) => {
                        return response.text()
                    })
                    .then(responseText => {
                        console.log('response ******** ', responseText)
                        fulfill(JSON.parse(responseText));
                    })
                    .catch(error => {
                        console.warn(error);
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                    });
            })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                });
        });
    }
    static sample(url, params, token = '', userId = '') {
        let context = this,
            logintoken;


        const headerObj = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": token
            }
        };
        //    let headers = {
        //         'Content-Type': 'multipart/form-data',
        //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJuaXNoYXMiLCJpZCI6IjViMDdlOTg4NDgwODQ4NGExZGFkYTZkNyIsImlhdCI6MTUyOTQwMzQ5N30.Eeo9sQ_sel7vXWjhJDPpa46XEviU2JrLhTgzucuOd7k"
        //     };
        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                console.log("url=> ", Connection.getResturl() + url, " requestObject=> ", params, " x-auth-token => ", token, " x-user-id => ", userId)
                axios.post(
                    Connection.getResturl() + url, params, headerObj
                )
                    .then((response) => {
                        console.log(response, 'RESPONSE *******')
                        return response;
                    })
                    // .then(responseText => {
                    //     console.log('response ******** ',responseText)
                    //     fulfill(JSON.parse(responseText));
                    // })
                    .catch(error => {
                        console.log(error, 'catch 1')
                        fulfill({ message: error });
                    });
            })
                .catch(error => {
                    console.log(error, 'catch 2')
                    fulfill({ message: error });
                });
        });
    }


    static delete(url, params, token = '', userId = '') {
        let context = this,
            logintoken;

        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                fetch(Connection.getResturl() + url, {
                    method: "DELETE",
                    timeout: 1000 * 1 * 60,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                        "x-user-id": userId
                    },
                    body: JSON.stringify(params)
                })
                    .then((response) => {
                        return response.text()
                    })
                    .then(responseText => {
                        //console.log('responseText*****',responseText);
                        fulfill(JSON.parse(responseText));
                    }).catch(error => {
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
                        console.warn(error);
                    });
            }).catch(error => {
                fulfill({ message: 'Please check your internet connectivity or our server is not responding.' });
            });
        });
    }

    static get_New(url, params, type) {
        var connectionString = Connection.getTempUrl();
        if (type == 'admin')
            connectionString = Connection.getAdminUrl();
        let context = this;
        return new Promise(function (fulfill, reject) {
            context
                .isConnected()
                .then(() => {
                    let query = querystring.stringify(params);

                    console.log(connectionString + url + '?' + query);
                    fetch(connectionString + url + '?' + query, {
                        method: "GET",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    })
                        .then((response) => {

                            return response.text()
                        })
                        .then(responseText => {
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                });
        });
    }

    static getUrlAdmin(url, params) {
        let context = this;
        return new Promise(function (fulfill, reject) {
            context
                .isConnected()
                .then(() => {
                    let query = querystring.stringify(params);
                    console.log(Connection.getAdminUrl() + url + "?" + query)
                    fetch(Connection.getAdminUrl() + url + "?" + query, {
                        method: "GET",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            // "token": token,
                            // "x-user-id": userId
                        }
                    })
                        .then((response) => {
                            console.log('!!!!!!!!!!!!!!!!!!!.......restclient--response.text()')
                            return response.text()
                        })
                        .then(responseText => {
                            //console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                });
        });
    }


    static get_New_Post(url, params, type) {
        var connectionString = Connection.getTempUrl();
        if (type == 'admin')
            connectionString = Connection.getAdminUrl();
        let context = this;
        return new Promise(function (fulfill, reject) {
            context
                .isConnected()
                .then(() => {
                    let query = querystring.stringify(params);
                    console.log(connectionString + url + '?' + query);
                    fetch(connectionString + url + '?' + query, {
                        method: "POST",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        }
                    })
                        .then((response) => {

                            return response.text()
                        })
                        .then(responseText => {
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                });
        });
    }


    static get_New_Patch(url, params) {
        let context = this;
        return new Promise(function (fulfill, reject) {
            context
                .isConnected()
                .then(() => {


                    let query = querystring.stringify(params);


                    console.log(JSON.stringify(params));

                    fetch(Connection.getTempUrl() + url, {
                        method: "Patch",
                        timeout: 1000 * 1 * 60,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",

                        },
                        body: JSON.stringify(params)
                    })
                        .then((response) => {

                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****', responseText);

                            //      alert(JSON.stringify(responseText))
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                        });
                })
                .catch(error => {
                    fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                });
        });
    }


    static post_Synch(url, params, token = '', userId = '') {
        let context = this,
            logintoken;




        //alert('http://13.127.98.44:8283/api/'+url);

        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                fetch(Connection.getAdminUrl()+'/' + url, {
                    method: "POST",
                    timeout: 1000 * 1 * 60,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params)
                }).then((response) => {
                    console.log(response);
                    return response.text()
                })
                    .then(responseText => {

                        fulfill(JSON.parse(responseText));
                    }).catch(error => {
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                    });
            }).catch(error => {
                fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
            });
        });
    }



    static getFromGoogle(orgin, destiantion) {


        return new Promise(function (fulfill, reject) {
            context.isConnected().then(() => {
                fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + orgin + '&destinations=' + destiantion + '&key=AIzaSyAQFeoAvJ9Dgz2O-E9E1hx9Tuf6ofPy9Lg', {
                    method: "GET",
                    timeout: 1000 * 1 * 60,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params)
                }).then((response) => {
                    console.log(response);
                    return response.text()
                })
                    .then(responseText => {

                        fulfill(JSON.parse(responseText));
                    }).catch(error => {
                        console.log(error);
                        fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
                    });
            }).catch(error => {
                fulfill({ message: 'Please check your internet connectivity or our server is not responding.url-' + url });
            });
        });
    }





}





export default RestClient;
