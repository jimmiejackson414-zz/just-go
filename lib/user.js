var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	password: {
		type: String,
		required: 'Password is required',
		trim: true,
		minlength: [4, 'Password must be at least 6 characters.']
	},
	email: {
		unique: true,
		type: String,
		//set: toLower,
		match: [/.+\@.+\..+/, 'Input is not an email']},
	firstName: String,
	lastName: String,
	userCreated: {
		type: Date,
		default: Date.now
	}
});

function toLower (v) {
  return v.toLowerCase();
}

var User = mongoose.model('users', userSchema);

module.exports = User;