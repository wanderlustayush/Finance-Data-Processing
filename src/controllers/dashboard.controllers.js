const Record = require("../models/record.model")

const getSummary = async (req, res) => {
  try {
    let filter = { deletedAt: null }

    if (req.query.startDate || req.query.endDate) {
      filter.date = {}
      if (req.query.startDate) filter.date.$gte = new Date(req.query.startDate)
      if (req.query.endDate) filter.date.$lte = new Date(req.query.endDate)
    }

    const records = await Record.find(filter)

    let totalIncome = 0
    let totalExpenses = 0

    records.forEach(r => {
      if (r.type === "income") totalIncome += r.amount
      else totalExpenses += r.amount
    })

    res.status(200).json({
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
      totalTransactions: records.length
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const getCategoryBreakdown = async (req, res) => {
  try {
    let match = { deletedAt: null }
    if (req.query.type) match.type = req.query.type

    const breakdown = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: { type: "$type", category: "$category" },
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ])

    res.status(200).json({ breakdown })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const getMonthlyTrends = async (req, res) => {
  try {
    let year = parseInt(req.query.year) || new Date().getFullYear()

    const trends = await Record.aggregate([
      {
        $match: {
          deletedAt: null,
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ])

    res.status(200).json({ year, trends })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const getRecentActivity = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10

    const records = await Record.find({ deletedAt: null })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    res.status(200).json({ recentActivity: records })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity }