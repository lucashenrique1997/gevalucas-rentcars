const db = require('../database');

module.exports = class Category {
  constructor(id, code, name, price) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.price = price;
  }

  static async list() {
    const [result] = await db.execute('SELECT * FROM car_category');
    return result.map((item) => new Category(item.id, item.code, item.name, item.daily_price));
  }
};
