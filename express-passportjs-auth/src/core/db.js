import { MongoClient } from 'mongodb';

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
}

export default Db;