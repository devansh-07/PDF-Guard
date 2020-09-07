var file = document.getElementById("file");
var btn = document.getElementById("submit");
var pass = document.getElementById("pass");
var passform = document.getElementById("passform");
var animation = document.getElementById("encrAnimation");
var mainDiv = document.getElementById("mainDiv");
var header = document.getElementById("header");
var intro = document.getElementById("intro");
var disp = document.getElementById("disp");

btn.addEventListener('click', showAnim);
file.addEventListener("input", action);
pass.addEventListener("input", passmatch);

function showAnim(){
	animation.style.display = "block";
	btn.style.display = 'none';
	mainDiv.style.display = 'none';
	header.style.display = 'none';
	intro.style.display = 'none';
}

function enableMe(element){
	btn.className = "btn btn-outline-success my-4";
	btn.disabled = false;
}

function disableMe(element){
	btn.className = "btn btn-outline-danger my-4 disabled";
	btn.disabled = true;
}

function passmatch(){
	if (pass.value) {
		enableMe(btn);
	}
	else {
		disableMe(btn);
	}
}

function action() {
	if (file.value){
		disp.innerHTML = file.value.split("\\").pop();
		passform.style.display = 'block';
	}
	else{
		disp.innerHTML = "Choose PDF file";
		passform.style.display = 'none';
	}
}

function passEye(){
	var x = document.getElementById("pass");
	var eye = document.getElementById("eye");
	if (x.type == "text"){
		x.type = "password";
		eye.className = "fa fa-eye-slash";
	}
	else{
		x.type = "text";
		eye.className = "fa fa-eye";
	}
}
