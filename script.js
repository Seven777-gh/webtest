// ===== LOGIN =====

function login(){

var u = document.getElementById("user").value;
var p = document.getElementById("pass").value;

if(u=="admin" && p=="123"){

localStorage.setItem("login","yes");

location.reload();

}else{

alert("Sai");

}

}


// ===== CHECK LOGIN =====

if(localStorage.getItem("login")=="yes"){

showAdmin();

}


// ===== DATABASE =====

var db = JSON.parse(localStorage.getItem("db")) || {

users:[],
posts:[]

};

saveDB();

function saveDB(){

localStorage.setItem("db",JSON.stringify(db));

}


// ===== ADMIN UI =====

function showAdmin(){

document.body.innerHTML = `

<h2>ADMIN</h2>

<button onclick="logout()">Logout</button>

<button onclick="addUser()">Add User</button>

<button onclick="addPost()">Add Post</button>

<button onclick="showData()">Data</button>

<div id="out"></div>

`;

}


// ===== LOGOUT =====

function logout(){

localStorage.clear();

location.reload();

}


// ===== ADD USER =====

function addUser(){

var name = prompt("Tên user");

if(!name) return;

db.users.push({

name:name

});

saveDB();

alert("Đã thêm user");

}


// ===== ADD POST =====

function addPost(){

var title = prompt("Tiêu đề");

if(!title) return;

db.posts.push({

title:title

});

saveDB();

alert("Đã thêm post");

}


// ===== SHOW DATA =====

function showData(){

document.getElementById("out").innerHTML =

"<pre>"+JSON.stringify(db,null,2)+"</pre>";

}
