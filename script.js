function showLogin() {

document.getElementById("app").innerHTML = `
<div class="center">

<div class="box">

<h2>Login</h2>

<input id="user" placeholder="User"><br>
<input id="pass" type="password" placeholder="Pass"><br>

<button onclick="login()">Login</button>

<p id="msg"></p>

</div>
</div>
`;

}

function login() {

let u = document.getElementById("user").value;
let p = document.getElementById("pass").value;

if (u == "admin" && p == "123") {

localStorage.setItem("login", "yes");

showDashboard();

} else {

document.getElementById("msg").innerText = "Sai";

}

}

function showDashboard() {

document.getElementById("app").innerHTML = `

<h1>Dashboard</h1>

<button onclick="logout()">Logout</button>

<p>Chào admin</p>

`;

}

function logout() {

localStorage.removeItem("login");

showLogin();

}

if (localStorage.getItem("login") == "yes") {

showDashboard();

} else {

showLogin();

}