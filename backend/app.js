const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); /* CORS is a node.js package for providing a Connect/Express middleware that can be used to */
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(cors());
const todoRoutes = express.Router();
app.use(bodyParser.json()); // Parse JSON from the request bod
app.use(morgan("combined"));
const path = require("path");
app.use(express.static(path.join(__dirname, "../build")));

let Todo = require("./todo.model");

mongoose.connect(
  "mongodb+srv://admin:admin1@cluster0-jcmuy.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  // intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    // respond with 200
    console.log("Allowing OPTIONS");
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});

/****** Helper functions *****/
//

/****** Routes *****/
app.get("/api/todos", (req, res) => {
  Todo.find((err, todos) => {
    res.json(todos);
  });
});

app.get("/api/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, Todo) => {
    res.json(Todo);
  });
});

app.post("/api/todos/add", (req, res) => {
  let todo = new Todo(req.body);
  todo.save().then(todo => {
    if (err) {
      res.status(400).send("adding new note failed");
    }
    res.json(todo);
  });
});

app.post("/api/todos/update/:id", (req, res) => {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;
    todo
      .save()
      .then(todo => {
        res.json("Todo updated!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

app.delete("/api/delete/:id", (req, res, next) => {
  Todo.deleteOne(req.params.id), (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  }
});

app.use("/todos", todoRoutes);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
