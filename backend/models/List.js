const { model, Schema, Types } = require("mongoose");

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [{type: Types.ObjectId, ref: "List"}]
  
})

module.exports = model("List", listSchema)