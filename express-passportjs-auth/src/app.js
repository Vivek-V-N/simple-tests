import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Auth from './core/auth';
import RouteConfig from './core/routeconfig'

class App {
  constructor(config) {
    this.port = config.port;
    this.express = express();
    this.auth = new Auth();
    this.routeConfig = new RouteConfig();
  }

  start() {
    this.express.listen(this.port, function () {
      console.log('Sitetrax server listening on port ' + this.port);
    }.bind(this))
  }

  initialize() {
    this.auth.initialize();
    this.configureMiddleware();
    this.configureRoutes();
  }

  configureMiddleware() {
    var expressApp = this.express;

    expressApp.use(express.static('public'));
    expressApp.use(cookieParser());
    expressApp.use(bodyParser.urlencoded({extended: true}));
    expressApp.use(bodyParser.json());
    expressApp.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
  }

  configureRoutes() {
    this.routeConfig.applyTo(this.express);
  }
}

export default App