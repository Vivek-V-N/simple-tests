import express from 'express';

class App {
  constructor(config) {
    this.port = config.port;
    this.express = express();
  }

  start() {
    this.express.listen(this.port, function () {
      console.log('Example app listening on port ' + this.port);
    }.bind(this))
  }

  initialize() {
    this.express.get('/', function (req, res) {
      console.log('Request being served!');
      res.send('Hello World!')
    })
  }
}

export default App