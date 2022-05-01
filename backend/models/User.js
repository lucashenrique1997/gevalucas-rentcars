const db = require('../database');

module.exports = class User {
  constructor(name, roleName, isOp) {
    this.name = name;
    this.roleName = roleName;
    this.isOp = isOp;
  }

  static async login(username, password) {
    const [response] = await db.execute('SELECT u.name, r.id, r.name as role FROM users u JOIN credentials c ON c.user_id = u.id JOIN roles r ON u.role_id = r.id WHERE c.username = ? AND c.encrypted_password = ?', [username, password]);
    return new User(response[0].name, response[0].role, response[0].id === 2);
  }
};
