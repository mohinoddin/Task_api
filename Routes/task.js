const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const taskModel = require("../models/task");
router.use(bodyParser());

// Create a new Task
router.post("/api/v1/tasks", async (req, res) => {
  try {
    let id = await taskModel.findOne({ id: req.body.id });
    if (id) {
      return res.status(400).json({
        status: "failed",
        message: "task id should be unique",
      });
    } else {
      let data = await taskModel.create({
        id: req.body.id,
        title: req.body.title,
        status: req.body.status,
      });
      res.status(200).json({
        status: "success",
        data,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});

//  List all tasks created
router.get("/api/v1/tasks", async (req, res) => {
  try {
    const data = await taskModel.find();
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});

// Get a specific task
router.get("/api/v1/tasks/:id", async (req, res) => {
  try {
    const data = await taskModel.findOne({ id: req.params.id });
    if (data) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(404).json({
        error: "There is no task at that id",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});
// Delete a specific task
router.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    const id = await taskModel.findOne({ id: req.params.id });
    if (id) {
      await taskModel.deleteOne({ id: req.params.id });
      return res.status(200).json({
        message: "deleted successfully",
      });
    } else {
      return res.status(404).json({
        error: "There is no task at that id",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});

// Edit the  completion of a specific task
router.put("/api/v1/tasks/:id", async (req, res) => {
    try {
      const id = await taskModel.findOne({ id: req.params.id });
      if (id) {
        await taskModel.updateOne({ id: req.params.id },
            {
                $set:{
                    status:req.body.status
                }
            });
        return res.status(200).json({
          message: "updated successfully",
        });
      } else {
        return res.status(404).json({
          error: "There is no task at that id",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "failure",
        message: err.message,
      });
    }
  });
module.exports = router;
