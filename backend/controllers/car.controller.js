const Car = require('../models/car');

exports.listCars = async (req, res, next) => {
  try {
    const allGroceries = await Car.list(req.query.categoryId);
    res.status(200).json(allGroceries);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
