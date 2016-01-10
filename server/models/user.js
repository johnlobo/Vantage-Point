exports = module.exports = function(app, mongoose) {

	var userSchema   = new mongoose.Schema({
	last_visit: { type: Date, default: Date.now },
});

	mongoose.model('User', userSchema);

};