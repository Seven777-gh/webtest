// ===== DATABASE =====

var db = JSON.parse(localStorage.getItem("db")) || {

users:[],
posts:[],
uid:1,
pid:1

};

saveDB();

function saveDB(){

localStorage.setItem("db",JSON.stringify(db));

}


// ===== ROUTER =====

function go(page){

localStorage.setItem("page",page);

render();

}


// ===== LOGIN =====

function login(){

var u = document.getElementById("user").value;
var p = document.getElementById("pass").value;

if(u=="admin" && p=="123"){

localStorage.setItem("login","yes");
go("home");

}else{

alert("Sai");

}

}


// ===== LOGOUT =====

function logout(){

localStorage.clear();
location.reload();

}


// ===== RENDER =====

function render(){

if(localStorage.getItem("login")!="yes"){

showLogin();
return;

}

var page = localStorage.getItem("page") || "home";

document.getElementById("app").innerHTML =

menu() +

`<div id="main">`+

pages(page)+

`</div>`;

}


// ===== MENU =====

function menu(){

return `

<div id="menu">

<h3>ADMIN</h3>

<button onclick="go('home')">Home</button>
<button onclick="go('users')">Users</button>
<button onclick="go('posts')">Posts</button>
<button onclick="go('data')">Data</button>
<button onclick="logout()">Logout</button>

</div>

`;

}


// ===== PAGES =====

function pages(p){

if(p=="home"){

return "<h2>Home</h2>";

}


if(p=="users"){

return `

<h2>Users</h2>

<button onclick="addUser()">Add User</button>

<table border="1" cellpadding="5">

<tr>
<th>ID</th>
<th>Name</th>
<th>Action</th>
</tr>

${db.users.map(u=>`

<tr>

<td>${u.id}</td>

<td>${u.name}</td>

<td>

<button onclick="editUser(${u.id})">Edit</button>

<button onclick="deleteUser(${u.id})">Delete</button>

</td>

</tr>

`).join("")}

</table>

`;

}


if(p=="posts"){

return `

<h2>Posts</h2>

<button onclick="addPost()">Add Post</button>

<table border="1" cellpadding="5">

<tr>
<th>ID</th>
<th>Title</th>
<th>Action</th>
</tr>

${db.posts.map(p=>`

<tr>

<td>${p.id}</td>

<td>${p.title}</td>

<td>

<button onclick="editPost(${p.id})">Edit</button>

<button onclick="deletePost(${p.id})">Delete</button>

</td>

</tr>

`).join("")}

</table>

`;

}


if(p=="data"){

return "<pre>"+JSON.stringify(db,null,2)+"</pre>";

}

}


// ===== USER =====

function addUser(){

var name = prompt("Tên");

if(!name) return;

db.users.push({

id:db.uid++,
name:name

});

saveDB();
render();

}


function editUser(id){

var u = db.users.find(x=>x.id==id);

var name = prompt("Tên mới",u.name);

if(!name) return;

u.name = name;

saveDB();
render();

}


function deleteUser(id){

if(!confirm("Xóa?")) return;

db.users = db.users.filter(x=>x.id!=id);

saveDB();
render();

}


// ===== POST =====

function addPost(){

var t = prompt("Title");

if(!t) return;

db.posts.push({

id:db.pid++,
title:t

});

saveDB();
render();

}


function editPost(id){

var p = db.posts.find(x=>x.id==id);

var t = prompt("Title",p.title);

if(!t) return;

p.title = t;

saveDB();
render();

}


function deletePost(id){

if(!confirm("Xóa?")) return;

db.posts = db.posts.filter(x=>x.id!=id);

saveDB();
render();

}


// ===== LOGIN UI =====

function showLogin(){

document.getElementById("app").innerHTML = `

<h2>Login</h2>

<input id="user" placeholder="user">

<input id="pass" type="password">

<button onclick="login()">Login</button>

`;

}


// ===== START =====

render();
