const mongoose = require("mongoose")

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model("Record", recordSchema)