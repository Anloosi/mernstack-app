const Task = require("../models/taskModel");
const mongoose = require("mongoose");

//Create a task
const createTask = async (req, res) => {
  try {
      const task = await Task.create(req.body)
      res.status(200).json(task)
    } catch (error) {
      res.status(500).json({message: error.message})
  }
};

//Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};

//Get a single Task
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({message:`No task with id: ${id}`});
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

 //Delete task
const deleteTask = async (req, res) => {
try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return res.status(404).json({message:`No task with ${id}`})
    }
    res.status(200).send("task deleted")
} catch (error) {
    res.status(500).json({message: error.message})
}
}

// Update a Task
const updateTask = async (req, res) => {
    try {
      const { id } = req.params
      const task = await Task.findByIdAndUpdate(
       id, req.body, {
     new: true,
    runValidators: true,
      }
    );
      if (!task) {
        return res.status(404).json({ message: `No task with id: ${id}` });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask, 
  };
  

