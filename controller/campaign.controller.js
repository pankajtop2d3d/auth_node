'use strict';
var express = require('express');
var router = express.Router();
var model = require('../models');
const User=model.user;
var config= require('../config/config');
var meta_data= require('../helpers/meta');
const excelToJson = require('convert-excel-to-json');
const cpyry=config.cpyry;
const app_dir=config.app_dir;
var multer = require('multer');
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // Uploads is the Upload_folder_name
      cb(null, config.excel_sheet_path)
  },
  filename: function (req, file, cb) {
    let file_extension=path.extname(file.originalname)
    let file_name=file.fieldname + "-" + Date.now()+file_extension;
    req.session.uploaded_file_name=file_name;
    cb(null, file_name)
  }
})
     
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
  
var upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /csv|xlsx/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (path.extname(file.originalname)=='.xlsx' || path.extname(file.originalname)=='.csv') {
          return cb(null, true); 
      }
    
      cb("Error: File upload only supports the " + "following filetypes - " + filetypes);
    } 

// mypic is the name of file attribute
}).single("excel_sheet"); 




// var upload = multer({ storage : storage}).single('excel_sheet');


router.get('/campaign/list',function(req,res,next){

  

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
			return res.render('../views/pages/campaign/list', { data:view_data,layout: '../views/layouts/dashboard' });
		}
	});
});



/**
 *  ADD CAMPAIGN
 */

router.post('/campaign/add',function(req,res,next){

        // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {

      //console.log(res.allowHalfOpen);
      //console.log(req.session.uploaded_file_name+'  file');

      if(err) {

          // ERROR occured (here it can be occured due
          // to uploading image of size greater than
          // 1MB or uploading different file type)
          res.send(err)
      }
      else {

          const excelData = excelToJson({
              sourceFile: app_dir+'assets/excels/'+req.session.uploaded_file_name,
              sheets:[{
                  // Excel Sheet Name
                  name: 'excel_sheet',
                  // Header Row -> be skipped and will not be present at our result object.
                  header:{
                      rows: 1
                  },
                  // Mapping columns to keys
                  columnToKey: {
                      A: 'sno',
                      B: 'code'
                  }
              }]
          });
          
          console.log(excelData);

          // SUCCESS, image successfully uploaded
         res.send("Success, Image uploaded!")
      }
  })


});

module.exports=router;

