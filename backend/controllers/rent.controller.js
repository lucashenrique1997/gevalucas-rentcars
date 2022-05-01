const Rent = require('../models/rent');
const moment = require('moment');

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
    const initialDate = moment(req.body.initialDate, 'DD/MM/YYYY');
    const endDate = moment(req.body.endDate, 'DD/MM/YYYY');
    const [reservationResult] = await Rent.makeReservation(req.body.carId, req.body.userId, initialDate, endDate.diff(initialDate, 'days'));
    res.status(200).json({ id: reservationResult.insertId });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deliverCar = async (req, res, next) => {
  try {
    const deliverResult = await Rent.deliverCar(req.params.id, req.body.notes);
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
    const receiveResult = await Rent.receiveCar(req.params.id, req.body.notes);
    res.status(200).json(receiveResult);
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
