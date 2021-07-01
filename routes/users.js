import express, { request } from "express";
import { Users } from "../models/users.js";
const router = express.Router();

router.get("/", async (request, respone) => {
  const users = await Users.find();
  respone.send(users);
});

router.get("/:id", async (request, respone) => {
  const { id } = request.params;
  const user = await Users.findOne({ id: id });
  respone.send(user);
});

// Use insertMany insertOne
// Add Users - recipe router
router.post("/", async (request, respone) => {
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
router.delete("/:id", async (request, respone) => {
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
});

export const userRouter = router;
