const Category = require('../models/category');

exports.listCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.list();
    res.status(200).json(allCategories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
