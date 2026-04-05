const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please login first." })
    }

    token = token.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({ message: "User not found." })
    }

    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account is deactivated, contact admin." })
    }

    req.user = user
    next()

  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired." })
  }
}

module.exports = isAuth