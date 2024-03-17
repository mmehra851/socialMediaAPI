const express = require("express");
require("dotenv").config();
const { postModel } = require("../config/postSchema");
const postRouter = express.Router();

postRouter.use(express.json());

// Add a post
postRouter.post("/add", async (req, res) => {
    try {
        const { user, post } = req.body;
        if (user && post) {
            let newpost = new postModel({ user, post });
            await newpost.save();
            res.status(200).send({ error: false, post: newpost });
        } else {
            res.status(400).send({ error: true, message: 'Missing id or post in request body' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

// Get all posts
postRouter.get("/getAll", async (req, res) => {
    try {
        let newpost = await postModel.find();
        res.status(200).send({ error: false, post: newpost });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

// Get posts by user id
postRouter.get("/getPostUser", async (req, res) => {
    try {
        const { id } = req.body;
        let newpost = await postModel.find({ user: id });
        res.status(200).send({ error: false, post: newpost });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

// Edit a post
postRouter.patch("/edit", async (req, res) => {
    try {
        const { _id, post } = req.body;
        let updatedPost = await postModel.findByIdAndUpdate(_id, { post });
        res.status(200).send({ error: false, post: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

// Delete a post
postRouter.delete("/delete", async (req, res) => {
    try {
        const { _id } = req.body;
        if (_id) {
            let deletedPost = await postModel.findByIdAndDelete(_id);
            res.status(200).send({ error: false, post: "Deleted post successfully" });
        } else {
            res.status(400).send({ error: true, message: 'Missing _id in request body' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: true, message: 'Internal Server Error' });
    }
});

module.exports = {
    postRouter
};
