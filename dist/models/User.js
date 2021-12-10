"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { v4 } = require('uuid');
class User {
    constructor(user = {}) {
        this.id = v4();
        this.name = user.name;
        this.login = user.login;
        this.password = user.password;
    }
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.User = User;
