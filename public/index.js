const createUser = document.querySelector(".create-user");
const loginUser = document.querySelector(".login-user");

createUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = createUser.querySelector(".username").value;
    const password = createUser.querySelector(".password").value;
    post("/createUser", {username, password});
})

loginUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginUser.querySelector(".username").value;
    const password = loginUser.querySelector(".password").value;
    post("/login", {username, password})
        .then(({ status }) => {
            (status === 200) ? alert("Login succes!") : alert("Login failed!")
        })
})

function post (path, data) {
    return window.fetch(path, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
}