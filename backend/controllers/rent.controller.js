const Rent = require('../models/rent');

exports.listRents = async (req, res, next) => {
  try {
    const allCategories = await Rent.list();
    res.status(200).json(allCategories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.makeReservation = async (req, res, next) => {
  try {
    const reservationResult = await Rent.makeReservation(req.body.carId, req.body.userId, req.body.initialRent, req.body.days);
    res.status(200).json(reservationResult);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deliverCar = async (req, res, next) => {
  try {
    const deliverResult = await Rent.deliverCar(req.params.id, req.query.initialRent);
    res.status(200).json(deliverResult);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.receiveCar = async (req, res, next) => {
  try {
    const receiveResult = await Rent.receiveCar(req.params.id);
    res.status(200).json(receiveResult);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
