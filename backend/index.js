const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

const users = [];
const JWT_SECRET = "hello sfsdfsdjkflskjdfs";

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const findUser = users.find(
    (u) => u.username == username && u.password == password
  );
  if (findUser) {
    res.status(403).send({ message: "user Already exists" });
  }
  users.push({ username, password });
  res.json({ message: "Signed up successfully" });
  console.log(users);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (u) => u.username == username && u.password == password
  );
  console.log(user);
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    user.token = token;

    res.json({ message: "Successfully signed in ", jwt_token: user.token });
    console.log(user);
    console.log(token);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: "Unauthorized",
        });
      } else {
        req.user = decoded;

        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

app.get("/me", auth, (req, res) => {
  const user = req.user;

  res.send({
    username: user.username,
  });
  res.header("jwt", token);
});

app.listen(3000);
