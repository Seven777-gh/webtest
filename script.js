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


// ===== FAKE API =====

function delay(){

return new Promise(r=>setTimeout(r,300));

}


var api = {

async login(user,pass){

await delay();

if(user=="admin" && pass=="123"){

var token = "token123";

localStorage.setItem("token",token);

return {ok:true,token};

}

return {ok:false};

},


async getUsers(){

await delay();

return db.users;

},


async addUser(name){

await delay();

db.users.push({

id:db.uid++,
name:name

});

saveDB();

},


async deleteUser(id){

await delay();

db.users = db.users.filter(x=>x.id!=id);

saveDB();

},


async editUser(id,name){

await delay();

var u = db.users.find(x=>x.id==id);

u.name = name;

saveDB();

}

};


// ===== ROUTER =====

function go(page){

localStorage.setItem("page",page);

render();

}


// ===== LOGIN =====

async function login(){

var u = document.getElementById("user").value;
var p = document.getElementById("pass").value;

var r = await api.login(u,p);

if(r.ok){

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

async function render(){

if(!localStorage.getItem("token")){

showLogin();
return;

}

var page = localStorage.getItem("page") || "home";

document.getElementById("app").innerHTML =
menu() +
`<div id="main">Loading...</div>`;

if(page=="home"){

show("Home");

}

if(page=="users"){

var users = await api.getUsers();

showUsers(users);

}

if(page=="data"){

show(JSON.stringify(db,null,2));

}

}


// ===== MENU =====

function menu(){

return `

<div id="menu">

<h3>ADMIN</h3>

<button onclick="go('home')">Home</button>
<button onclick="go('users')">Users</button>
<button onclick="go('data')">Data</button>
<button onclick="logout()">Logout</button>

</div>

`;

}


// ===== SHOW =====

function show(html){

document.getElementById("main").innerHTML = html;

}


// ===== USERS =====

function showUsers(users){

show(`

<h2>Users</h2>

<button onclick="addUser()">Add</button>

<table border=1>

<tr>
<th>ID</th>
<th>Name</th>
<th>Action</th>
</tr>

${users.map(u=>`

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

`);

}


// ===== ACTIONS =====

async function addUser(){

var name = prompt("Name");

if(!name) return;

await api.addUser(name);

render();

}


async function deleteUser(id){

if(!confirm("Xóa?")) return;

await api.deleteUser(id);

render();

}


async function editUser(id){

var name = prompt("Name");

if(!name) return;

await api.editUser(id,name);

render();

}


// ===== LOGIN UI =====

function showLogin(){

document.getElementById("app").innerHTML = `

<h2>Login</h2>

<input id="user">
<input id="pass" type="password">

<button onclick="login()">Login</button>

`;

}


// ===== START =====

render();
