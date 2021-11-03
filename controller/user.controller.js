var express = require('express');
var router = express.Router();
var model = require('../models');
const User=model.user;
var config= require('../config/config');
var meta_data= require('../helpers/meta');
const cpyry=config.cpyry;



/**
 * USER DASHBOARD
 */
router.get('/user/dashboard', function (req, res, next) {

	User.findOne({unique_id:req.session.userId},function(err,data){
		let view_data={
			site_url:config.base_url,
			title:meta_data.meta_data.dashboard.title,
			cpyry:cpyry,
			user_data:data
		}
		if(!data){
			res.redirect('/login');
		}else{
			return res.render('../views/pages/user/dashboard', { data:view_data,layout: '../views/layouts/dashboard' });
		}
	});
});


/**
 * USER PROFILE
 */


router.get('/user/profile', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		let view_data={
			site_url:config.base_url,
			title:meta_data.meta_data.dashboard.title,
			cpyry:cpyry,
			user_data:data
		}
		//console.log(view_data);
		if(!data){
			res.redirect('/login');
		}else{
			return res.render('../views/pages/user/profile', { data:view_data,layout: '../views/layouts/dashboard' });
		}
	});
});



/**
 * UPDATE PROFILE
 */

 router.post('/user/edit_profile', function (req, res, next) {
	  if(req.session.userId){
		var uid=req.session.userId;
		var doc={
           first_name:req.body.first_name,
		   last_name:req.body.last_name
		}

		User.update({unique_id: uid}, doc, function(err, raw) {
			if (err) {
			  res.send(err);
			}
			res.send({"success":'Profile has been successfully updated'});
		  });

	  }else{
		res.send({"error":"invalid user"});
	  }

	  
});




router.get('/user/page_not_found', function (req, res, next) {
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/login');
		}else{
			return res.render('../views/pages//general/page_not_found', { title: '404 Page Not Found',user_data:data,layout: '../views/layouts/dashboard' });
		}
	});

});

module.exports=router;