const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json({ users })
  } catch (err) {
    res.status(500).json({ message: "Something  wrong.", error: err.message })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "viewer"
    })

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (err) {
    res.status(500).json({ message: "Something wrong.", error: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString() && req.body.role) {
      return res.status(400).json({ message: "You cannot change role." })
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." })
    }

    res.status(200).json({ message: "User updated.", user: updatedUser })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong.", error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete account." })
    }

    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    res.status(200).json({ message: "User deleted " })
  } catch (err) {
    res.status(500).json({ message: "Something  wrong.", error: err.message })
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }