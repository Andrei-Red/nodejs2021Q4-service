"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const userService_1 = require("../service/userService");
const User_1 = require("../models/User");
exports.routerUser = new koa_router_1.default();
const userService = new userService_1.UserService();
exports.routerUser.get('/users', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = userService.getUsers();
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerUser.get('/users/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = ctx.params.id;
        const user = userService.getUsersById(userId);
        if (user) {
            ctx.body = user;
        }
        else {
            ctx.response.status = 404;
            ctx.body = { message: `User not found by id: ${userId}` };
        }
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerUser.post('/users', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = ctx.request.body;
        const user = new User_1.User(userData);
        const userDataToResponse = User_1.User.toResponse(user);
        userService.addUser(userDataToResponse);
        ctx.response.status = 201;
        ctx.body = userDataToResponse;
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerUser.put('/users/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = ctx.request.body;
        const userId = ctx.params.id;
        ctx.body = userService.updateUser(userId, userData);
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerUser.delete('/users/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = ctx.params.id;
        const isUserDeleted = userService.deleteUser(userId);
        if (isUserDeleted) {
            ctx.response.status = 204;
        }
        else {
            ctx.response.status = 400;
            ctx.body = { message: 'something went wrong' };
        }
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
