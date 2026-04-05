const Record = require("../models/record.model")

const getAllRecords = async (req, res) => {
  try {
    let filter = { deletedAt: null }

    if (req.query.type) filter.type = req.query.type
    if (req.query.category) filter.category = req.query.category
    if (req.query.startDate || req.query.endDate) {
      filter.date = {}
      if (req.query.startDate) filter.date.$gte = new Date(req.query.startDate)
      if (req.query.endDate) filter.date.$lte = new Date(req.query.endDate)
    }

    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 20
    let skip = (page - 1) * limit

    const records = await Record.find(filter)
      .populate("createdBy", "name email")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Record.countDocuments(filter)

    res.status(200).json({
      records,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const getRecordById = async (req, res) => {
  try {
    const record = await Record.findOne({
      _id: req.params.id,
      deletedAt: null
    }).populate("createdBy", "name email")

    if (!record) {
      return res.status(404).json({ message: "Record not found." })
    }

    res.status(200).json({ record })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes: notes || "",
      createdBy: req.user._id
    })

    res.status(201).json({ message: "Record created successfully.", record })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { $set: req.body },
      { new: true }
    )

    if (!record) {
      return res.status(404).json({ message: "Record not found." })
    }

    res.status(200).json({ message: "Record updated successfully.", record })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { $set: { deletedAt: new Date() } },
      { new: true }
    )

    if (!record) {
      return res.status(404).json({ message: "Record not found." })
    }

    res.status(200).json({ message: "Record deleted successfully." })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

module.exports = { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord }