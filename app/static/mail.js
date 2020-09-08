var mailform = document.getElementById("mailform");
var mailInp = document.getElementById("mailInp");

var header = document.getElementById("header");
var btn = document.getElementById("sendmail");
var animation = document.getElementById("encrAnimation");
var intro = document.getElementById("intro");
var inpDiv = document.getElementById("inpDiv");
var addDiv = document.getElementById("addDiv");

var it = 0;

function addInp() {
    var lastInp = document.getElementById("mailInp" + it);
    if (lastInp.value.trim() != "")
    {
        it++;
        newId = "mailInp" + it;
        var newInp = document.createElement('input');
        newInp.type = "email";
        newInp.name = "email";
        newInp.className="form-control my-4";
        newInp.id = newId;
        newInp.placeholder = "person@example.com"
        mailform.appendChild(newInp);
    }
    else{
        console.log("Can't add.");
    }
}

btn.addEventListener('click', showAnim);

function showAnim(){
	animation.style.display = "block";
    header.style.display = 'none';
    intro.style.display = 'none';
    btn.style.display = 'none';
}
