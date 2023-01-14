const express = require("express");
require("dotenv").config();
const { connection } = require("./configs/db");
const {userRouter} = require("./routes/User.route")
const {noteRouter} = require("./routes/Note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const cors=require("cors")

const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/users", userRouter)
app.use(authenticate)//here it authenticates only for notes routes 
app.use("/notes", noteRouter)

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("error connecting to DB");
    console.log(err);
  }
  console.log("server is running on port 8080");
});

/*
{
  "title": "history",
  "note":"please study",
  "category":"exam",
  "author":"cbse"
}


{
  "email":"emma@gmail.com",
  "pass":"emma"
}

63c156e125a063d199b2bfa7
*/