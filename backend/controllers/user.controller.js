const User = require('../models/User');

exports.login = async (req, res, next) => {
  try {
    const user = await User.login(req.body.username, req.body.password);
    res.status(200).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
