const router = require("express").Router();
const List = require("../models/List")

router.post('/create', (req,res) => {
  const {title} = req.body

  const newList = new List({
    title
  })

  newList
    .save()
    .then((doc) => res.status(201).json(doc))
    .catch((err) => res.json({class: "error", msg: "Ошибка!"}))
})

router.get("/all", async (req, res) => {
  const all = await List.find({ });
  res.send(all)
})

router.delete("/delete/:id", async (req, res) => {
  await List.findByIdAndDelete(req.params.id)
  res.json({class: "success", msg: "Deleted"})
})
module.exports = router;