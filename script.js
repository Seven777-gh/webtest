/* ===== DATABASE ===== */

var db = JSON.parse(localStorage.getItem("db")) || {

users:[],
posts:[]

};

function saveDB(){

localStorage.setItem("db",JSON.stringify(db));

}



/* ===== LOGIN ===== */

function login(){

var u = document.getElementById("user").value;
var p = document.getElementById("pass").value;

if(u=="admin" && p=="123"){

localStorage.setItem("user",u);

loadAdmin();

}else{

alert("Sai tài khoản");

}

}



/* ===== LOAD ADMIN ===== */

function loadAdmin(){

var u = localStorage.getItem("user");

document.body.innerHTML=`

<div class="sidebar">

<h2>Menu</h2>

<button onclick="showPage('home')">Dashboard</button>

<button onclick="showPage('data')">Data</button>

<button onclick="showPage('profile')">Profile</button>

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



/* ===== SHOW PAGE ===== */

function showPage(p){

var c=document.getElementById("content");

if(p=="home"){

c.innerHTML="<h1>Dashboard</h1>";

}

if(p=="data"){

showData();

}

if(p=="profile"){

c.innerHTML="<h1>Profile</h1>";

}

}



/* ===== LOGOUT ===== */

function logout(){

localStorage.removeItem("user");

location.reload();

}



/* ===== AUTO LOGIN ===== */

window.onload=function(){

var u=localStorage.getItem("user");

if(u){

loadAdmin();

}

};



/* ===== DATA PAGE ===== */

function showData(){

var html="";

html+=`

<h2>Users</h2>

<input id="newUser" placeholder="name">

<button onclick="addUser()">Add</button>

<div id="list"></div>

`;

document.getElementById("content").innerHTML=html;

renderUsers();

}



/* ===== ADD USER ===== */

function addUser(){

var name=document.getElementById("newUser").value;

if(name=="") return;

db.users.push(name);

saveDB();

renderUsers();

}



/* ===== SHOW USERS ===== */

function renderUsers(){

var html="";

for(var i=0;i<db.users.length;i++){

html+=`

<p>

${db.users[i]}

<button onclick="delUser(${i})">X</button>

</p>

`;

}

document.getElementById("list").innerHTML=html;

}



/* ===== DELETE USER ===== */

function delUser(i){

db.users.splice(i,1);

saveDB();

renderUsers();

}
