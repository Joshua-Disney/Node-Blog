const express = require("express");

const Posts = require("./postsDb.js");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the posts"
    });
  }
});

// Get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the post"
    });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json({
      ...post,
      message: "Post successfully saved to the database"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

// Delete a post
router.delete("/", async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The post has been removed"
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});

// Update a post
router.put("/", async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json({
        ...post,
        message: "Post successfully updated"
      });
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the post"
    });
  }
});

module.exports = router;
