import { MongoClient, ObjectID } from 'mongodb';

const DEFAULT_URL='mongodb://localhost:2017';

class Db {
  constructor(config={}) {
    console.log("Db initialization.");
    this.url = config.url === undefined? DEFAULT_URL : config.url;
    this.database = config.database === undefined ? 'test': config.database;
  }

  connect() {
    console.log('Database connecting...');
    var _this = this;
    MongoClient.connect(this.url+'/'+this.database).then(
      function(db) {
        _this.mongodb = db;
      }, function (error) {

      }
    );
  }

  saveUser(user, callback) {

  }

  isValid(user, password, callback) {
    var valid = false;
    console.log('Validating user...' + user + password);
    this.mongodb.collection('users').findOne({name:user, password:password}) .then(
      function(item) {
        valid = (item !== null);
        callback(valid);
      }, function (error) {

      }
    );
    return valid;
  }

  getUserProfile(userId, callback) {
    var valid = false;
    console.log('Getting User Profile: ' + userId);
    this.mongodb.collection('users').findOne({_id:ObjectID(userId)}) .then(
      function(item) {
        callback(item);
      }, function (error) {

      }
    );
  }

  isGoogleUser(user, callback) {
    var valid = false;
    var db = this.mongodb;
    console.log('Validating user...' + user );
    this.mongodb.collection('users').findOne({"google.id":user.google.id}) .then(
      function(item) {
        if(item===null)
        {
          var col = db.collection('users');
        // Insert a bunch of documents
          col.insert(user, function(err, result) {
            if(err)
              callback(err);
            else callback(user);
          });
        }
        else callback(item);
      }, function (error) {


      }
    );
  }
}

export default Db;