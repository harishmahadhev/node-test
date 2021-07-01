import express, { request } from "express";
import { Users } from "../models/users.js";
const router = express.Router();

// Use insertMany insertOne
// Add Users - recipe router
router
  .get("/", async (request, respone) => {
    const users = await Users.find();
    respone.send(users);
  })
  .post("/", async (request, respone) => {
    const addUser = request.body;
    console.log(addUser);
    const user = new Users(addUser);

    try {
      const newUser = await user.save();
      respone.send(newUser);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });
// ORM - mongoDB deleteOne, couchDB removeOne // U can interact with multiple database
// Migration is a breeze
// remove
router
  .get("/:id", async (request, respone) => {
    const { id } = request.params;
    const user = await Users.findOne({ _id: id });
    respone.send(user);
  })
  .delete("/:id", async (request, respone) => {
    const { id } = request.params;
    try {
      const user = await Users.findById(id);
      await user.remove();
      // console.log();
      respone.send({ ...user, message: "Deleted successfully" });
    } catch (err) {
      respone.status(500);
      respone.send("User is missing");
    }
  })
  .patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, avatar } = req.body;
    try {
      const user = await Users.findById(id);
      if (name) {
        user.name = name;
      }
      if (avatar) {
        user.avatar = avatar;
      }
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500);
      res.send(err);
      console.log(err, "User is missing");
    }
  });

export const userRouter = router;
