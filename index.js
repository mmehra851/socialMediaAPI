require("dotenv").config();
const {postRouter} = require(".//allRouters/postRouter");
const { connection } = require("./config/db");
const { userRouer } = require("./allRouters/userRouter");
const cookieParser = require("cookie-parser");

const express = require("express");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouer);
app.use("/post",postRouter)


app.get("/", (req, res) => {
  try{
    res.send({ msg: `This is Home Page` });
  }catch(err){
    logger.error(err)
  }
});

app.listen(process.env.PORT, async () => {
  try {
    connection;
    console.log(`connected to mongo db ...`);
  } catch (err) {
    console.log({ err: err.message });
  }
  console.log(`server is runing on ${process.env.PORT}`);
});
