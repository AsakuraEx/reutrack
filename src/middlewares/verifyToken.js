const jwt = require('jsonwebtoken');

const db = require('../models');

const verifyToken = async (req, res, next) => {

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No active session' });
  }
  const token = authorizationHeader.split(' ')[1];  
  const tokenExists = await db.personal_access_token.findOne({ where: { token: token } });
  if (!tokenExists) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, []);  

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.verifyToken = verifyToken;
