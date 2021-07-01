// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import router from "./routes/recipe.js";
import { userRouter } from "./routes/users.js";
const app = express();
const PORT = process.env.PORT || 3200;

// Opened Connection to DB, movieData - db name
const url =
  "mongodb+srv://harishmahadhev:Asdfglkjh_2205@cluster0.7zh7z.mongodb.net/moviesData";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

// middleware
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send("Welcome to node app!!!! Hi Guys");
});

app.use("/users", userRouter);

app.use("/recipes", router);

app.listen(PORT, () => console.log("The server is started in " + PORT));

// npm init - It will package json
// npm install express
// npm install --save-dev nodemon
// npm install mongoose

// ORM - Object–relational mapping

// Create react app - new app
// use this user data
