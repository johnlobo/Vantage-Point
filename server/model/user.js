// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	last_visit: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);