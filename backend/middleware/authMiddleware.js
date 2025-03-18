const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Assuming your payload looks like { user: { id: ... } }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
