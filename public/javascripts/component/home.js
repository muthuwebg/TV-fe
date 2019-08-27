import { ajaxCall } from "../utils";

const loginForm = () => {
	if ($("#loginform").length) {
		$("#loginform").validate({
			focusCleanup: true,
			focusInvalid: false,
			errorClass: "error",
			ignore: [],
			rules: {
				lemail: {
					required: true,
					email: true
				},
				lpwd: {
					required: true,
				}
			},
			errorPlacement: (error, element) => {
				error.appendTo(element.closest(".form-group"));
			},
			highlight: function(element, errorClass) {
				$(element).addClass(errorClass);
			},
			unhighlight: function(element, errorClass) {
				$(element).removeClass(errorClass);
			},
		});

		$("#loginform").on("submit", e => {
			e.preventDefault();
			var $this = $(e.currentTarget);

			if ($this.valid()) {
				console.log("success");
				ajaxCall("/ajax/login", "POST", {
					"email" : $("#lemail").val(),
					"password": $("#lpwd").val(),
				}, response => {
					console.log(response);
					if (response.status == "success") {
						if (response.data.isLoggedIn && response.data.isLoggedIn == true) {
							console.log("redirection dashboard");
							window.location = "http://localhost:3000/dashboard";
						}
					}
				});
			} else console.log("form failure");
		});
	}
};

const registerForm = () => {
	if ($("#registerform").length) {
		console.log("sss");
		$("#registerform").validate({
			focusCleanup: true,
			focusInvalid: false,
			errorClass: "error",
			ignore: [],
			rules: {
				username: {
					required: true,
				},
				email: {
					required: true,
					email: true
				},
				pwd: {
					required: true,
				},
				repwd: {
					required: true,
					equalTo: "#pwd"
				},
			},
			errorPlacement: (error, element) => {
				error.appendTo(element.closest(".form-group"));
			},
			highlight: function(element, errorClass) {
				$(element).addClass(errorClass);
			},
			unhighlight: function(element, errorClass) {
				$(element).removeClass(errorClass);
			},
		});

		$("#registerform").on("submit", e => {
			e.preventDefault();
			var $this = $(e.currentTarget);

			if ($this.valid()) {
				console.log("success");
				ajaxCall("/ajax/register", "POST", {
					"name" : $("#username").val(),
					"password": $("#pwd").val(),
					"email" : $("#email").val(),
				}, response => {
					console.log(response);
					if (response.status == "success") {
						if (response.data.isLoggedIn && response.data.isLoggedIn == true) {
							console.log("redirection dashboard");
							window.location = "http://localhost:3000/dashboard";
						}
					}
				});
			} else console.log("form failure");
		});
	}
};

const choosePayment = () => {
	if ($(".payment-option").length) {
		$(".payment-option").on("click", (e) => {
			e.preventDefault();
			var $this = $(e.currentTarget);
			$(".payment-option").removeClass("active-green");
			$this.addClass("active-green");
		});
	}
};

const initPayment = () => {
	if ($("#payment").length) {
		$("#payment").on("click", (e) => {
			var $this = $(e.currentTarget);

			if($(".payment-option").hasClass("active-green")) {
				$(".pay-option").next().addClass("hide");

				ajaxCall("/ajax/payment", "POST", {
					"paymentStatus" : true,
					"planId": $this.data("plan")
				}, response => {
					if (response.status == "success") {
						window.location = "http://localhost:3000/dashboard";
					} else location.reload();
				});
			} else $(".pay-option").next().removeClass("hide");
		});
	}
};

const initHome = () => {
	loginForm();
	registerForm();
	choosePayment();
	initPayment();
};

export {
	initHome
}