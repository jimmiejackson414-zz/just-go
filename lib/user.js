// Create user model using Mongoose =============================

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


// Define model

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
		lowercase: true,
		match: [/.+\@.+\..+/, 'Input is not an email']},
	firstName: String,
	lastName: String,
	phone: String,
	userCreated: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: String,
  	resetPasswordExpires: Date
});

// User encryption using bcrypt ============================================

userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});


// Check for current user ===================================================

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
        // console.log('User found in database');
    });
};



var User = mongoose.model('users', userSchema);

module.exports = User;