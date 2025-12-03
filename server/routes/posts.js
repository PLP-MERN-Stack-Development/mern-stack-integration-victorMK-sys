const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

const Post = require("../models/Post");

router.get("/", async(req, res) => {
  try {
    const posts = await Post.find();
    if(posts) res.status(200).json(posts)
    else res.status(404).json({ message: "No posts found" })
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async(req, res) => {
  const [...post] = [res.body];
  
  try {
    const post = new Post({...post});
    const saved = await post.save();

    if(saved) res.status(200).json(saved);
    else res.status(500).json({ message: "A server error occured, post was not saved" });
  } catch(err) {
      console.error(err.message);
    }
})

router.delete("/", async(req, res) => {
  const post = await Post.findOneAndDelete(req.params.id);

  if(post) res.status(200).json({ message: "Post deleted successfuly" });
  else res.status(404).json({ messsage: "Error, we could not delete the post" });
})

module.exports = router;