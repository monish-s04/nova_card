let l = document.getElementById("l");
let r = document.getElementById('r');
l.addEventListener("click", () => {
    window.location.href = "../HTML/login.html";
})
r.addEventListener("click", () => {
    window.location.href = "../HTML/register.html";
})

let form = document.getElementById("loginForm");

form.addEventListener("submit", function (log) {
    log.preventDefault();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let check = document.getElementById("check");

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (email === "" && pass === "") {
        alert("Fill All The Fields");
        return;
    }
    if (!check.checked) {
        alert("You must accept the term and condition.");
        return;
    }
    if (!storedUser) {
        alert("No User or Acount Found. Please Register First");
        return;
    }
    if (email === storedUser.email && pass === storedUser.password) {
        alert("login Successfull !");
        window.location.href = "../HTML/home.html";
    } else {
        alert("Invalid email or password");
        return;
    }
})