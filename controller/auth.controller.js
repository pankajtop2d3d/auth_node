var express = require('express');
var router = express.Router();
var model = require('../models');
var config= require('../config/config');
var meta_data= require('../helpers/meta');
const User=model.user;

//console.log(previousYear); // 2019

const view_data={
	site_url:config.base_url,
	title:meta_data.meta_data.signup.title
}


router.get('/', function (req, res, next) {
	return res.render('../views/pages/index', { data: view_data, layout: './layouts/default' });
});


/**
 * SIGNUP PAGE
 */
router.get('/signup', function (req, res, next) {
	return res.render('../views/pages/authentication/signup', { data: view_data, layout: './layouts/default' });
});


/**
 * SIGNUP FORM ACTION 
 */

router.post('/signup', function(req, res, next) {
	var personInfo = req.body;
	if(personInfo.first_name=='' || personInfo.last_name=='' || personInfo.email_address=='' || personInfo.password=='' || personInfo.confirm_password==''){
		  res.send({"error":"Please fill out all fields"});
	} else {
		if (personInfo.password == personInfo.confirm_password) {

			User.findOne({email:personInfo.email_address},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						var newPerson = new User({
							unique_id:c,
							first_name:personInfo.first_name,
							last_name:personInfo.last_name,
							email:personInfo.email_address,
							username: personInfo.email_address,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"success":"You are regestered,You can login now."});
				}else{
					res.send({"error":"Email is already used."});
				}

			});
		}else{
			res.send({"error":"password is not matched"});
		}
	}
});


/**
 * LOGIN PAGE
 */

router.get('/login', function (req, res, next) {

	  if(req.session.userId){
		return res.redirect('/user/dashboard');
	  }else{
        return res.render('../views/pages/authentication/login', { data: view_data, layout: './layouts/default' });
	  }
	  
});

/**
 * LOGIN FORM ACTION 
 */

router.post('/login', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			if(data.password==req.body.password){
				req.session.userId = data.unique_id;
				res.send({"success":"Success!"});
			}else{
				res.send({"error":"Wrong password!"});
			}
		}else{
			res.send({"error":"This Email Is not regestered!"});
		}
	});
});

/**
 * LOGOUT ACTION
 */


router.get('/logout', function (req, res, next) {
        console.log("logout")
        if (req.session) {
			// delete session object
			req.session.destroy(function (err) {
				if (err) {
					return next(err);
				} else {
					return res.redirect('/login');
				}
			});
		}
});


router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;