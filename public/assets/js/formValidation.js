$().ready(function(){
	$("#personalInfoForm").validate({
	        rules: {
	        	firstName: "required",
	        	lastName: "required",
	            password: {
					required: true,
					minlength: 5
				},
				password2: {
					required: true,
					minlength: 5,
					equalTo: "#password"
				},
				email: {
					required: true,
					email: true
				}
	        },
	        messages: {
	        	confirmPassword: {
	        		equalTo: "Please enter the same password as above."
	        	}
	        },
	        errorElement : 'div',
	        errorPlacement: function(error, element) {
	          var placement = $(element).data('error');
	          if (placement) {
	            $(placement).append(error)
	          } else {
	            error.insertAfter(element);
	          }
	        }
	     });
	})