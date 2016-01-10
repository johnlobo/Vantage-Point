// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require("method-override");
var app = express();
// configure app
app.use(morgan('dev')); // log requests to the console
// configure body parser
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
var port = process.env.PORT || 8080; // set our port
var mongoose = require('mongoose');
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
var uristring = "mongodb://localhost/VP"
mongoose.connect(uristring, function(err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);

        //MODEL FOR USER
        //
        //
        var User = require('./model/user');

        // ROUTES FOR OUR API
        // =============================================================================
        // create our router
        var router = express.Router();
        // middleware to use for all requests
        router.use(function(req, res, next) {
            // do logging
            console.log('Something is happening.');
            next();
        });
        // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
        router.get('/', function(req, res) {
            res.json({
                message: 'hooray! welcome to our api!'
            });
        });
        // on routes that end in /users
        // ----------------------------------------------------
        router.route('/users')
            // create a user (accessed at POST http://localhost:8080/users)
            .post(function(req, res) {
                var user = new User(); // create a new instance of the user model
                //user.name = req.body.name; // set the users name (comes from the request)
                user.save(function(err,userSaved) {
                    if (err) res.send(err);
                    res.json({
                        message: 'user created!',
                        userSaved: userSaved._id
                    });
                });
            })
            // get all the users (accessed at GET http://localhost:8080/api/users)
            .get(function(req, res) {
                User.find(function(err, users) {
                    if (err) res.send(err);
                    res.json(users);
                });
            });
        // on routes that end in /users/:user_id
        // ----------------------------------------------------
        router.route('/users/:user_id')
            // get the user with that id
            .get(function(req, res) {
                user.findById(req.params.user_id, function(err, user) {
                    if (err) res.send(err);
                    res.json(user);
                });
            })
            // update the user with this id
            .put(function(req, res) {
                user.findById(req.params.user_id, function(err, user) {
                    if (err) res.send(err);
                    user.name = req.body.name;
                    user.save(function(err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'user updated!'
                        });
                    });
                });
            })
            // delete the user with this id
            .delete(function(req, res) {
                user.remove({
                    _id: req.params.user_id
                }, function(err, user) {
                    if (err) res.send(err);
                    res.json({
                        message: 'Successfully deleted'
                    });
                });
            });
        // REGISTER OUR ROUTES -------------------------------
        app.use('/api', router);
        // START THE SERVER
        // =============================================================================
        app.listen(port);
        console.log('Magic happens on port ' + port);
    }
});