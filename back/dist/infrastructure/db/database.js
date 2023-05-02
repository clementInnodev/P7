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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.Database = void 0;
const inversify_1 = require("inversify");
const db_types_1 = require("../../core/types/db.types");
const nosql_db_1 = require("./nosql-db");
const sql_associations_1 = __importDefault(require("./sql-associations"));
const sql_db_1 = require("./sql-db");
let Database = class Database {
    constructor(config) {
        this.config = config;
    }
    connect(app) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.type === 'mongo') {
                return (0, nosql_db_1.mongooseInit)(app);
            }
            if (this.config.type === 'mysql') {
                (0, sql_associations_1.default)();
                return (0, sql_db_1.sequelizeInit)(app);
            }
            throw new Error('Invalid configuration');
        });
    }
};
Database = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(db_types_1.DATABASE_CONFIG)),
    __metadata("design:paramtypes", [Object])
], Database);
exports.Database = Database;
