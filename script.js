function login() {

let u = document.getElementById("user").value;
let p = document.getElementById("pass").value;

if (u == "admin" && p == "123") {

document.body.innerHTML = `
<h1>Đăng nhập thành công</h1>
`;

} else {

document.getElementById("msg").innerText = "Sai tài khoản";

}

}