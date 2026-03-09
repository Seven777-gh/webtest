console.log("script chạy");
// ===== DATABASE =====

var db = JSON.parse(localStorage.getItem("db")) || {

users:[],
posts:[]

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

<button onclick="addUser()">Add</button>

<pre>${JSON.stringify(db.users,null,2)}</pre>

`;

}

if(p=="posts"){

return `

<h2>Posts</h2>

<button onclick="addPost()">Add</button>

<pre>${JSON.stringify(db.posts,null,2)}</pre>

`;

}

if(p=="data"){

return `

<h2>Database</h2>

<pre>${JSON.stringify(db,null,2)}</pre>

`;

}

}


// ===== ADD USER =====

function addUser(){

var name = prompt("Tên");

if(!name) return;

db.users.push({name:name});

saveDB();

render();

}


// ===== ADD POST =====

function addPost(){

var t = prompt("Title");

if(!t) return;

db.posts.push({title:t});

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

