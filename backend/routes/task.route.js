const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Task");
const Task = require("../models/Task")

router.get("/:id", async (req, res) => {
  const listId = req.params.id;
  let tasks = await Task.find({list: listId})
  res.json(tasks)
})

router.post("/add", async (req, res) => {
  const newTask = new Task({
    ...req.body.newTask,
    list: req.body.idOfList
  })

  const doc =  await newTask.save()
  res.json(doc)
})

router.put("/update/:id", async (req, res) => {

  let doc = await Task.findByIdAndUpdate(req.params.id, {
    completed: req.body.completed
  }, 
  {
    useFindAndModify: false,
    rawResult: true
  })
  res.json({msg: "Updated"})
})

router.delete("/delete/:id", async (req,res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({msg: "Deleted"})
})

module.exports = router;