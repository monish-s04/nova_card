let l = document.getElementById("l");
let r = document.getElementById('r');
l.addEventListener("click", () => {
    window.location.href = "../HTML/login.html";
})
r.addEventListener("click", () => {
    window.location.href = "../HTML/register.html";
})

let form = document.getElementById("registerForm");

form.addEventListener("submit", function(reg){
    reg.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let pass = document.getElementById("pass").value;
    let conpass = document.getElementById("conpass").value;
    let check = document.getElementById("check");

     if (name === "" || email === "" || pass === "" || conpass === "") {
        alert("Fill all fields");
        return;
    }
    if(name.length < 4){
        alert("The name should be atleast 4 Characters.");
        return;
    }
    if(!check.checked){
        alert("You must accept the term and condition.");
        return;
    }
    if(pass.length < 8){
        alert("password must be at least 8 characters.");
        return;
    }
    if(pass !== conpass){
        alert("password does not match.");
        return;
    }

    let userData = {
        name : name,
        email : email,
        password : pass
    };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration Successful !");

    window.location.href = "../HTML/home.html";
})