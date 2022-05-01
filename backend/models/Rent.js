const db = require('../database');

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

  static makeReservation(carId, userId, initialRent, days, responsibleUser = undefined) {
    return db.execute(`INSERT INTO rents (users_id, cars_id, initial_rental_company_id, final_rental_company_id, initial_rent_datetime, days, responsible_user) VALUES (${userId}, ${carId}, 0, 0, ${initialRent}, ${days}, ${responsibleUser ?? 1})`);
  }

  static deliverCar(id, realInitialRent) {
    return db.execute('UPDATE rents SET real_initial_rent_datetime = ? WHERE id = ?', [realInitialRent, id]);
  }

  static receiveCar(id) {
    return db.execute('UPDATE rents SET end_rent_datetime = CURRENT_TIMESTAMP WHERE id = ?', [id]);
  }
};
