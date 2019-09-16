
let Datastore = require('react-native-local-mongodb');
let _local = new Datastore({ filename: 'draftData', autoload: true });
_local.loadDatabase(function (err) {    // Callback is optional
    
    var dataSetup={
        localOrderId:'NUMBER',
        PickUDropLocation: 'Text',
        category:'TEXT',
        selectedUnit: 'TEXT',
        startTime: 'NUMBER',
        urgencyFactor:'TEXT',
        VeichleId:'TEXT',
        orderData:'TEXT',
      } 


     

  });





class local { }

local.test=function(){
 
}

 

local.insert = (type, data) => {
  
   return new Promise((resolve, reject) => {
      try {
         _local.insert( _data, (err, newDoc) => {
            if (!err) {
               console.log('Datbase updated/inserted :-', newDoc);
               resolve(newDoc);
            }
            else {
               console.log('Database Error:-', err);
               reject(err);
            }
         });
      } catch (err) {
         console.log('Database Error:-', err);
         reject(err);
      }
   });
}


/*

local.getOne = (type) => {
   const _type = { type };
   return new Promise((resolve, reject) => {
      try {
         _local.findOne(_type, (err, docs) => {
            if (!err) {
               console.log('Datbase fetched :-', docs);
               resolve(docs);
            }
            else {
               console.log('Database Error:-', err);
               reject(err);
            }
         });
      } catch (err) {
         console.log('Database Error:-', err);
         reject(err);
      }
   });
}

local.get = (type) => {
   const _type = { type };
   return new Promise((resolve, reject) => {
      try {
         _local.find(_type, (err, docs) => {
            if (!err) {
               console.log('Datbase fetched :-', docs);
               resolve(docs);
            }
            else {
               console.log('Database Error:-', err);
               reject(err);
            }
         });
      } catch (err) {
         console.log('Database Error:-', err);
         reject(err);
      }
   });
}

local.clean = () => {
   const _data = {};
   const _all = { multi: true };
   return new Promise((resolve, reject) => {
      try {
         _local.remove(_data, _all, (err, nosRecord) => {
            if (!err) {
               console.log('Datbase deleted no of records :-', nosRecord);
               resolve(nosRecord);
            }
            else {
               console.log('Database Error:-', err);
               reject(err);
            }
         });
      } catch (err) {
         console.log('Database Error:-', err);
         reject(err);
      }
   });
}*/

export default local;