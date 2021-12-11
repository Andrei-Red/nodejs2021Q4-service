const db = require('../db');

class UserService {
  constructor() {
    this.db = db;
  }

  getUsers() {
    return this.db.users;
  }

  getUsersById(id) {
    return this.db.users.find((u) => u.id === id);
  }

  addUser(user) {
    this.db.users.push(user);
    return user;
  }

  updateUser(id, newUser) {
    const user = this.db.users.find((u) => u.id === id);
    user.name = newUser.name;
    user.login = newUser.login;
    return user;
  }

  deleteUser(id) {
    const userIndex = this.db.users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      this.db.users.splice(userIndex, 1);
      this._updateUserIdInTacks(id);
      return true;
    }
    return false;
  }

  _updateUserIdInTacks(userId) {
    function setNullValue(value) {
      const theValue = value;
      theValue.userId = null;
    }

    this.db.tacks.forEach((task) => {
      if (task.userId === userId) {
        setNullValue(task);
      }
    });
  }
}

module.exports = UserService;
