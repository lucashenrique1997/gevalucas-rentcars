const db = require('../database');

module.exports = class Car {
  constructor(id, categoryId, model, statusId) {
    this.id = id;
    this.categoryId = categoryId;
    this.model = model;
    this.statusId = statusId;
  }

  static async list(category) {
    const [result] = await db.execute('SELECT c.* FROM cars c JOIN car_category ON cars.car_category_id = car_category.id WHERE car_category.id = ?', [category]);
    return result.map((item) => new Car(item.id, item.car_category_id, item.model, item.car_status_id));
  }
};
