"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("../data/data.service");
let UsersService = class UsersService {
    constructor(dataService) {
        this.dataService = dataService;
    }
    create(createUserDto) {
        let allUser = this.dataService.getAllUsers();
        allUser.push(createUserDto);
        return createUserDto;
    }
    findAll() {
        return this.dataService.getAllUsers();
    }
    findOne(id) {
        return this.dataService.getAllUsers()
            .find(user => user.id == id);
    }
    update(id, updateUserDto) {
        let needUser = this.dataService.getAllUsers()
            .find(user => user.id == id);
        for (const key in updateUserDto) {
            needUser[key] = updateUserDto[key];
        }
        return needUser;
    }
    remove(id) {
        let needUserForDelete = this.dataService.getAllUsers()
            .find(user => user.id == id);
        let allColection = this.dataService.getAllUsers();
        allColection = allColection.filter(function (item) {
            return item !== needUserForDelete;
        });
        console.log(allColection);
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], UsersService);
//# sourceMappingURL=users.service.js.map