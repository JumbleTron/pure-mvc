import { db } from '../database.js';

export class UserModel {
  async getAll() {
    return await new Promise(function (resolve, reject) {
      db.all('SELECT * FROM users', (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  async getById(id) {
    return await new Promise(function (resolve, reject) {
      db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }

  async getByEmail(email) {
    return await new Promise(function (resolve, reject) {
      db.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  }
}
