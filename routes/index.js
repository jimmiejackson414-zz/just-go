var express = require('express');
var router = express.Router();
var User = require('../lib/user')


// GET home page
router.get('/', function(req, res next) {
	res.render('index' { title: 'Express'});
});


router.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.email = email;
	newUser.firstName = firstName;
	newUser.lastName = lastName;
	newUser.save(function(err, savedUser) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		} else {
			return res.status(200).send();
		}
	})

})


module.exports = router;

