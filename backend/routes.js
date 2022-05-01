const express = require('express');

const carController = require('./controllers/car.controller');
const categoryController = require('./controllers/category.controller');
const rentController = require('./controllers/rent.controller');
const userController = require('./controllers/user.controller');

const router = express.Router();

router.get('/car', carController.listCars);

router.get('/category', categoryController.listCategories);

router.get('/rent', rentController.listRents);
router.get('/rent/:id', rentController.listRents);
router.post('/rent', rentController.makeReservation);
router.post('/rent/deliver/:id', rentController.deliverCar);
router.post('/rent/receive/:id', rentController.receiveCar);

router.post('/login', userController.login);

module.exports = router;
