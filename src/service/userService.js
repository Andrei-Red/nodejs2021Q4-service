const db = require('../db');

class UserService {
  constructor() {
    this.db = db;
  }

  getUsers() {
    return this.db.users;
  }

  getUsersById(id) {
    const user = this.db.users.find((u) => u.id === id);
    return user;
  }

  setUser(user) {
    this.db.users.push(user)
    return user
  }

  updateUser(id, newUser) {
    const user = this.db.users.find((u) => u.id === id);
    user.name = newUser.name
    user.login = newUser.login
    return user
  }

  deleteUser(id) {
    const userIndex = this.db.users.findIndex((u) => u.id === id);
    if(userIndex) {
      this.db.users.splice(userIndex,1)
      return true
    } else {
      return false
    }
  }
}

module.exports = UserService;
