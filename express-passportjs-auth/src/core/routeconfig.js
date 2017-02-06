import passport from 'passport';
import Db from './db'

class RouteConfig {
  constructor() {
  }
  applyTo(app){
    this.addLocalAuthRoutes(app);
    this.addGoogleAuthRoutes(app);
    this.addApplicationRoutes(app);
    this.db = new Db({url:'mongodb://localhost:27017', database:'dbname'});
    this.db.connect();
  }


  addLocalAuthRoutes(app) {
    app.post('/login',
       function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return res.json({result:"failure"}); }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({result:"success"});
          });
        })(req, res, next);
      }
    );
  }

  addGoogleAuthRoutes(app) {
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',function(req, res, next) {
      passport.authenticate('google',  function(err, user, info) {
        req.login(user, function(err) {
          return res.redirect('http://localhost:3000/'+user._id+'/dashboard');
        });
      })(req,res)
    });
  }

  addApplicationRoutes(app) {
    var db = this.db;
    app.get('/:userid/profile', function(request, response, next) {
      var userid = request.params.userid;
      this.db.getUserProfile(userid, function(profile) {
        response.json(profile);
      });
    }.bind(this));
  }
}

export default RouteConfig;