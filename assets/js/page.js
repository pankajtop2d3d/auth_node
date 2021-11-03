const host = window.location.protocol + "//" + window.location.host; //HOST NAME
var path = window.location.pathname;
var page = path.split("/").pop();
//console.log(page);

$(document).ready(function(){
    //LOGIN PAGE JS - START
    $('.success_msg').hide();
    $('.error_msg').hide();
    $( "#form" ).submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/login',
            data: $('#form').serialize(), // LOGIN FORM SERIALIZED
            dataType: "json",
            success: function(response){
                    console.log(response);
                    $('#form')[0].reset();
                    $('.success_msg').hide();
                    $('.error_msg').hide();
                    if(response.error){
                        $('.error_msg').show();
                        document.getElementById("error_txt").innerHTML="";
                        document.getElementById("error_txt").innerHTML=response.error;
                    }else if(response.success=="Success!"){
                        $('.success_msg').show();
                        document.getElementById("success_txt").innerHTML="";
                        document.getElementById("success_txt").innerHTML=response.success;
                        //document.getElementById("aa").click();
                        window.location = host+"/user/dashboard";
                    }
                    },
                error: function() {
                document.getElementById("error_txt").innerHTML="";
                document.getElementById("error_txt").innerHTML='Something went wrong please try again later';
                }
            })
    });
     //LOGIN PAGE JS - END


     if(page=='signup'){

        $("form[name='signup_form']").validate({
          // Specify validation rules
          rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            first_name: "required",
            last_name: "required",
            email_address: {
              required: true,
              // Specify that email should be validated
              // by the built-in "email" rule
              email: true
            },
            password: {
              required: true,
              minlength: 5
            },
            confirm_password: {
              required: true,
              minlength: 5,
              equalTo: "#password"
            }
          },
          // Specify validation error messages
          messages: {
            first_name: "Please enter your firstname",
            last_name: "Please enter your lastname",
            password: {
              required: "Please provide a password",
              minlength: "Your password must be at least 5 characters long"
            },
            confirm_password: {
              required: "Please provide a password",
              minlength: "Your password must be at least 5 characters long"
            },
            email_address: "Please enter a valid email address"
          },
          // Make sure the form is submitted to the destination defined
          // in the "action" attribute of the form when valid
          submitHandler: function(form) {
              $.ajax({
                  type: 'POST',
                  url: '/signup',
                  data: $('#signup_form').serialize(), // REGISTARTION FORM SERIALIZED
                  dataType: "json",
                  success: function(response){
                              $('.success_msg').hide();
                              $('.error_msg').hide();
                              if(response.error){
                                  $('.error_msg').show();
                                  document.getElementById("error_txt").innerHTML="";
                                  document.getElementById("error_txt").innerHTML=response.error;
                              }else if(response.success){
                                  $('.success_msg').show();
                                  $('#signup_form')[0].reset();
                                  document.getElementById("success_txt").innerHTML="";
                                  document.getElementById("success_txt").innerHTML=response.success;
                              }
                              },
                      error: function() {
                      }
                  })

          }
        });
      //REGISTARTION PAGE JS - END


     }else if(page=='profile'){

            $("form[name='profile']").validate({
              // Specify validation rules
              rules: {
                // The key name on the left side is the name attribute
                // of an input field. Validation rules are defined
                // on the right side
                first_name: "required",
                last_name: "required",
                email: {
                  required: true,
                  // Specify that email should be validated
                  // by the built-in "email" rule
                  email: true
                }
              },
              // Specify validation error messages
              messages: {
                first_name: "Please enter your firstname",
                last_name: "Please enter your lastname",
                email: "Please enter a valid email address"
              },
              // Make sure the form is submitted to the destination defined
              // in the "action" attribute of the form when valid
              submitHandler: function(form) {
                  $.ajax({
                      type: 'POST',
                      url: '/user/edit_profile',
                      data: $('#profile').serialize(), // REGISTARTION FORM SERIALIZED
                      dataType: "json",
                      success: function(response){
                                  $('.success_msg').hide();
                                  $('.error_msg').hide();
                                  if(response.error){
                                      $('.error_msg').show();
                                      document.getElementById("error_txt").innerHTML="";
                                      document.getElementById("error_txt").innerHTML=response.error;
                                  }else if(response.success){
                                      $('.success_msg').show();
                                      document.getElementById("success_txt").innerHTML="";
                                      document.getElementById("success_txt").innerHTML=response.success;
                                  }
                                  },
                          error: function() {
                          }
                      })

              }
            });

     }

     $("form[name='campaign_form']").validate({
      // Specify validation rules
      rules: {
        campaign_name: "required",
        excel_sheet: {
          required: true,
          extension: "xlsx|csv"
        }
      },
      // Specify validation error messages
      messages: {
        campaign_name: "Please enter campaign name",
        excel_sheet: "Please enter a value with a valid extension",
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {

          var data = new FormData();
          $.each($('#excel_sheet')[0].files, function(i, file) {
              data.append('file-'+i, file);
          });
          $.ajax({
            type: 'POST',
            url: '/campaign/add',
            data: data, // REGISTARTION FORM SERIALIZED
            dataType: "json",
            success: function(response){
                        console.log('HELLO');
                        // $('.success_msg').hide();
                        // $('.error_msg').hide();
                        // if(response.error){
                        //     $('.error_msg').show();
                        //     document.getElementById("error_txt").innerHTML="";
                        //     document.getElementById("error_txt").innerHTML=response.error;
                        // }else if(response.success){
                        //     $('.success_msg').show();
                        //     document.getElementById("success_txt").innerHTML="";
                        //     document.getElementById("success_txt").innerHTML=response.success;
                        // }
                },
                error: function() {
                }
            })

      }
    });




    
});