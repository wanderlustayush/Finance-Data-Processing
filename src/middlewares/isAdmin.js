const ROLES = {
  viewer: 1,
  analyst: 2,
  admin: 3
}

const allowRoles = (...roles) => {
  return (req, res, next) => {
    const userLevel = ROLES[req.user.role]
    const hasAccess = roles.some(r => ROLES[r] <= userLevel)

    if (!hasAccess) {
      return res.status(403).json({ message: `Access denied. Your role: ${req.user.role}` })
    }

    next()
  }
}

module.exports = allowRoles;