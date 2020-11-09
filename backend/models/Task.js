const { model, Schema, Types } =  require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  list: {
    type: Types.ObjectId,
    ref: "List"
  }
})

taskSchema.set("timestamps", true)

module.exports = model("Task", taskSchema)