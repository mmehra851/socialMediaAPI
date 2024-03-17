//-----------  All the Requirements/Imports Here  -----------------------------
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userModel } = require("../config/userSchema");
const bcrypt = require("bcrypt");
const userRouer = express.Router();
userRouer.use(express.json());
//------------- Signup User Routes ---------------------------------------------
userRouer.post("/signup", async (req, res) => {
  try {
    if (await userModel.findOne({ email: req.body.email })) {
      res.status(406).json({ err: `user is alredy present.` });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password, 2);
      const user = userModel(req.body);
      await user.save();
      res.status(202).json({ msg: `user is created.` });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});


//----------------Functions Here -----------------------------------

function token_Genretor(res, name, id) {
  let token = jwt.sign(
    { user: name, id: id },
    process.env.token_key,
    { expiresIn: "6s" }
  );
  let refreshToken = jwt.sign(
    { user: name, id: id, role: role },
    process.env.refresh_key,
    { expiresIn: "120s" }
  );
  res.cookie("token", token);
  
}

function checkInredis (key , token){
  redis.get(key, (err, result) => {
    if (err) {
      return false
    } else {
      return result == token
    }
  });
}
//-------------------- All exports ---------------------------------------------
module.exports = { userRouer };
