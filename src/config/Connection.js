'use strict';
const localhost = "localhost:8081",//"10.20.3.27:3000",
    staging = "delgate.mobilytedev.com",
    //live = "13.233.162.221:8283";
    // live = "3.17.28.223:8283",


    live = "driverapi.delgate.com",
    customer = "http://cusapi.delgate.com",
    Portal = "http://adminapi.delgate.com",


    running_url = live,
    http_url = `http://${running_url}`,
    socket_url = `ws://${running_url}/websocket`,
    apiBase_url = `http://${running_url}/api/`,
    staticPagesUrl = `http://${running_url}/`,
    mediaBase_url = `http://${running_url}/uploadedFiles/`;

export default class Connection {
    static getResturl() {
        return apiBase_url;
    };

    static getSocketResturl() {
        return socket_url;
    };

    static getBaseUrl() {
        return http_url;
    };

    static getMedia(_id) {
        return mediaBase_url;
    }

    static getStaticPage(url) {
        return staticPagesUrl + url;
    }

    // Added for because request URL is different 

    static getTempUrl() {
        return customer + '/api/';
        return 'http://18.212.245.222:9000/api/';

    }

    static getCustomerTempUrl() {

        return customer + '/api/';
        return 'http://18.212.245.222:9000/api/';

    }

    static getAdminUrl() {
        return Portal + '/api';
        return 'http://3.17.28.223:8283/api';
    }

    static mediaURL() {
        return Portal;
        return 'http://3.17.28.223:8283';
    }

    static mediaURLCus() {
        return customer;
    }


    static mediaBase_sav_url() {
        return Portal;
        return 'http://3.17.28.223:8283';
    }
}
