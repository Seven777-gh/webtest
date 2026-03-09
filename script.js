function login(){

var u = document.getElementById("user").value;
var p = document.getElementById("pass").value;

if(u=="admin" && p=="123"){

localStorage.setItem("user",u);

/* đánh dấu phiên đăng nhập */
localStorage.setItem("loginKey","12345");

loadAdmin();

}else{

alert("Sai tài khoản");

}

}


function loadAdmin(){

var u = localStorage.getItem("user");

document.body.innerHTML=`

<div class="sidebar">

<h2>Menu</h2>

<button onclick="showPage('home')">Dashboard</button>
<button onclick="showPage('profile')">Profile</button>
<button onclick="showPage('settings')">Settings</button>
<button onclick="logout()">Logout</button>

</div>

<div class="header">

Xin chào ${u}

</div>

<div class="content" id="content">

<h1>Dashboard</h1>

</div>

`;

}



function showPage(p){

var c=document.getElementById("content");

if(p=="home") c.innerHTML="<h1>Dashboard</h1>";
if(p=="profile") c.innerHTML="<h1>Profile</h1>";
if(p=="settings") c.innerHTML="<h1>Settings</h1>";

}



function logout(){

localStorage.removeItem("user");
localStorage.removeItem("loginKey");

location.reload();

}



/* auto login */

window.onload=function(){

var u=localStorage.getItem("user");

if(u){

loadAdmin();

}

};
