var file = document.getElementById("file");
var btn = document.getElementById("submit");
var pass = document.getElementById("pass");
var passform = document.getElementById("passform");
var animation = document.getElementById("encrAnimation");
var mainDiv = document.getElementById("mainDiv");
var header = document.getElementById("header");
var intro = document.getElementById("intro");


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
		passform.style.display = 'block';
	}
	else{
		passform.style.display = 'none';
	}
}
