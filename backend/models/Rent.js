const db = require('../database');
const moment = require('moment');

module.exports = class Rent {
  constructor(id, userId, carId, initialRent, days, realInitialRent, endRent, responsibleUserId) {
    this.id = id;
    this.userId = userId;
    this.carId = carId;
    this.initialRent = initialRent;
    this.days = days;
    this.realInitialRent = realInitialRent;
    this.endRent = endRent;
    this.responsibleUserId = responsibleUserId;
  }

  static async list() {
    const [result] = await db.execute('SELECT * FROM rents');
    return result.map((item) => new Rent(item.id, item.users_id, item.cars_id, item.initial_rent_datetime, item.days, item.real_initial_rent_datetime, item.end_rent_datetime, item.responsible_user_id));
  }

  static async get(id) {
    const [result] = await db.execute('SELECT * FROM rents WHERE id = ?', [id]);
    const item = result[0];
    return new Rent(item.id, item.users_id, item.cars_id, item.initial_rent_datetime, item.days, item.real_initial_rent_datetime, item.end_rent_datetime, item.responsible_user_id)
  }

  static makeReservation(carId, userId, initialRent, days, responsibleUser = undefined) {
    return db.execute(`INSERT INTO rents (users_id, cars_id, initial_rental_company_id, final_rental_company_id, initial_rent_datetime, days, responsible_user_id) VALUES (?, ?, 1, 1, ?, ?, 1)`,
      [userId, carId, initialRent.format(`YYYY-MM-DD HH:mm:ss`), days]);
  }

  static deliverCar(id, notes = '') {
    return db.execute('UPDATE rents SET real_initial_rent_datetime = CURRENT_TIMESTAMP, notes = ? WHERE id = ?', [notes, id]);
  }

  static async receiveCar(id, notes = '') {
    await db.execute('UPDATE rents SET end_rent_datetime = CURRENT_TIMESTAMP, notes = CONCAT(notes, CONCAT(?, ?)) WHERE id = ?', ['\n', notes, id]);
    const [result] = await db.execute('SELECT r.real_initial_rent_datetime, r.end_rent_datetime, c.daily_price FROM rents r JOIN cars ON cars.id = r.cars_id JOIN car_category c ON c.id = cars.car_category_id WHERE r.id = ?', [id]);
    const initialDate = moment(result[0].real_initial_datetime);
    const endDate = moment(result[0].end_rent_datetime);
    const price = Math.ceil(endDate.diff(initialDate, 'hours') / 24) * result[0].daily_price;
    return db.execute('UPDATE rents SET price = ? WHERE id = ?', [price, id]);
  }
};
