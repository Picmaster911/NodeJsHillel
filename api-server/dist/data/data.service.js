"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
let DataService = class DataService {
    constructor() {
        this.users = [
            { id: 1, username: 'user1', email: 'user1@example.com', password: 'das', age: 25 },
            { id: 2, username: 'user2', email: 'user2@example.com', password: 'das', age: 30 },
            { id: 3, username: 'user3', email: 'user3@example.com', password: 'das', age: 22 },
            { id: 4, username: 'user4', email: 'user4@example.com', password: 'das', age: 28 },
            { id: 5, username: 'user5', email: 'user5@example.com', password: 'das', age: 35 },
            { id: 6, username: 'user6', email: 'user6@example.com', password: 'das', age: 27 },
            { id: 7, username: 'user7', email: 'user7@example.com', password: 'das', age: 24 },
            { id: 8, username: 'user8', email: 'user8@example.com', password: 'das', age: 31 },
            { id: 9, username: 'user9', email: 'user9@example.com', password: 'das', age: 29 },
            { id: 10, username: 'user10', email: 'user10@example.com', password: 'das', age: 26 },
        ];
    }
    getAllUsers() {
        return this.users;
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)()
], DataService);
//# sourceMappingURL=data.service.js.map