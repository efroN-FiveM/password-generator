function generatePassword() {
	var length = 16,
		charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",
		password = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		password += charset.charAt(Math.floor(Math.random() * n));
	}
	document.getElementById("password").innerHTML = password;
	var strength = calculatePasswordStrength(password);
	var progress = document.querySelector(".progress");
	progress.style.width = strength + "%";
}

function calculatePasswordStrength(password) {
	var strength = 0;
	if (password.match(/[a-z]+/)) {
		strength += 1;
	}
	if (password.match(/[A-Z]+/)) {
		strength += 1;
	}
	if (password.match(/[0-9]+/)) {
		strength += 1;
	}
	if (password.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-]+/)) {
		strength += 1;
	}
	var precent = strength * 25
	if (precent === 100) {
		document.getElementById("strong").innerHTML = "Strong";
	} else if (precent === 75) {
		document.getElementById("strong").innerHTML = "Good";
	} else if (precent === 50) {
		document.getElementById("strong").innerHTML = "Fine";
	} else if (precent === 25) {
		document.getElementById("strong").innerHTML = "Weak";
	}
	return strength * 25;
}

function copyPassword() {
	var password = document.getElementById("password").textContent;
	var textarea = document.createElement("textarea");
	if (password.length === 1) {
		showNotification("Please generate password!", "error")
	} else {
		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		showNotification("Copied the password: " + password, "success")
	}
}

function showNotification(message, type) {
	var notification = document.getElementById("notification");
	var notificationIcon = notification.querySelector("i");
	var notificationMessage = document.getElementById("notification-message");
	notificationMessage.innerHTML = message;
	if (type == "success") {
		notificationIcon.classList.add("fas", "fa-check-circle");
	} else if (type == "error") {
		notificationIcon.classList.add("fas", "fa-exclamation-circle");
	} else if (type == "fail") {
		notificationIcon.classList.add("fas", "fa-times-circle");
	} else {
		notificationIcon.classList.add("fas", "fa-info-circle");
	}
	notification.classList.add(type);
	notification.classList.add("show");
	setTimeout(function() {
		notification.classList.remove("show");
		notification.classList.add("hide");
	}, 5000);
	setTimeout(function() {
		notification.classList.remove("hide");
		notification.classList.remove(type);
		notificationIcon.classList.remove("fas", "fa-check-circle", "fa-exclamation-circle", "fa-times-circle", "fa-info-circle");
	}, 5500);
}