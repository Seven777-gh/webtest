function login() {

    var u = document.getElementById("user").value;
    var p = document.getElementById("pass").value;

    if (u == "admin" && p == "123") {

        localStorage.setItem("user", u);

        document.body.innerHTML = `
        <div class="sidebar">
            <h2>Menu</h2>

            <button onclick="showPage('home')">Dashboard</button>
            <button onclick="showPage('profile')">Profile</button>
            <button onclick="showPage('settings')">Settings</button>
            <button onclick="logout()">Logout</button>

        </div>

        <div class="content" id="content">
            <h1>Dashboard</h1>
            <p>Chào ${u}</p>
        </div>
        `;

    } else {

        alert("Sai tài khoản");

    }

}



function showPage(page) {

    var content = document.getElementById("content");

    if (page == "home") {

        content.innerHTML = `
        <h1>Dashboard</h1>
        <p>Trang chính</p>
        `;

    }

    if (page == "profile") {

        content.innerHTML = `
        <h1>Profile</h1>
        <p>Thông tin người dùng</p>
        `;

    }

    if (page == "settings") {

        content.innerHTML = `
        <h1>Settings</h1>
        <p>Cài đặt hệ thống</p>
        `;

    }

}



function logout() {

    localStorage.removeItem("user");

    location.reload();

}
