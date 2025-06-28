const express= require("express")
const path= require("path")
const app= express()
app.use(express.json())

const fs = require("fs");

function loadUsers() {
    try {
        const data = fs.readFileSync("data.json", "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
}

let users = loadUsers();


app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname,"signup.html"))
})

app.get("/signin",(req,res)=>{   
    res.sendFile(path.join(__dirname,"signin.html"))
}
)

app.get("/dashboard",(req,res)=>{       
    res.sendFile(path.join(__dirname,"dashboard.html"))
})  

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("credentials required");
    }
    if (users.find(user => user.username === username)) {
        return res.send("User exists");
    }
    users.push({ username, password, todos: [] });
    saveUsers(users);
    res.send("User signed up successfully!");
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("credentials required");
    }

    const userIndex = users.findIndex(user => user.username === username && user.password === password);
    if (userIndex === -1) {
        return res.send("Profile doesn't exist");
    }

    const token = Math.random().toString(36).substring(2);
    users[userIndex].token = token;

    res.json({
        message: `Welcome, ${username}! Your Token: ${token}`,
        token: token
    });
});

app.post("/dashboard", (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.send("No token provided");
    }

    const user = users.find(user => user.token === token);

    if (!user) {
        return res.send("Invalid token");
    }

    res.send(`Hello ${user.username}, welcome to your dashboard!`);
});

app.post("/dashboard/todos", (req, res) => {
    const token = req.headers['auth'];
    const { todos } = req.body;

    if (!token) return res.send("No token provided");

    const user = users.find(u => u.token === token);
    if (!user) return res.send("Invalid token");

    if (!Array.isArray(todos)) {
        return res.send("Todos should be an array");
    }

    user.todos = todos;
    saveUsers(users);
    res.send("Todos updated");
});

app.delete("/dashboard/todos/:index", (req, res) => {
    const token = req.headers['auth'];
    const idx = parseInt(req.params.index, 10);
    if (!token) return res.send("No token provided");
    const user = users.find(u => u.token === token);
    if (!user) return res.send("Invalid token");
    if (isNaN(idx) || idx < 0 || idx >= user.todos.length) {
        return res.send("Invalid todo index");
    }
    user.todos.splice(idx, 1);
    saveUsers(users);
    res.send("Todo deleted");
});

app.get("/dashboard/todos", (req, res) => {
    const token = req.headers['auth'];
    if (!token) return res.send("No token provided");

    const user = users.find(u => u.token === token);
    if (!user) return res.send("Invalid token");

    res.json(user.todos);
});

app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`)
})