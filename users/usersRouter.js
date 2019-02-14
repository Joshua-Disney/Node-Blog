const express = require("express");

const Users = require("./usersDb.js");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the users"
    });
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the user"
    });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json({
      ...user,
      message: "User successfully saved to the database"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

// Delete a user
router.delete("/", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The user has been removed"
      });
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the user"
    });
  }
});

// Update a user
router.put("/", async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json({
        ...user,
        message: "User successfully updated"
      });
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

module.exports = router;
