//File: controllers/users.js
var mongoose = require('mongoose');

var User = mongoose.model('User');

//GET - Return all Users in the DB (accessed at GET http://localhost:8080/api/users)
exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
    if(err) res.send(500, err.message);

    console.log('GET /users')
	res.status(200).jsonp(users);
	});
};

//GET - Return a User with specified ID (accessed at GET http://localhost:8080/api/users/id)
exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.id);
	res.status(200).jsonp(user);
	});
};

//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
	console.log('POST');

	var user = new User();

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};

//PUT - Update a User already exists
exports.updateUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.last_visit = new Date()
		user.save(function(err) {
			if(err) return res.send(500, err.message);
		console.log('PUT /user/' + req.params.id);
      res.status(200).jsonp(user);
		});
	});
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
		console.log('DELETE /user/' + req.params.id);
      res.status(200).jsonp({message:"User Deleted", user});
		})
	});
};
