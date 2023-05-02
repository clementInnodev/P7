"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserMapper = void 0;
const user_model_1 = require("./user.model");
class SequelizeUserMapper {
    mapFrom(entity) {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = entity;
        const user = new user_model_1.User({
            id: id,
            email,
            password,
            firstname,
            lastname,
            address,
            additionalAddress,
            postcode,
            town,
            service,
            birthday,
            gender,
            phoneNumber,
            confirmed,
            admin,
            creationDate,
            updateDate
        });
        return user;
    }
    mapTo(model) {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, birthday, gender, phoneNumber, confirmed, admin, creationDate, updateDate } = model;
        const user = {
            id,
            email,
            password,
            firstname,
            lastname,
            address,
            additionalAddress,
            postcode,
            town,
            service,
            birthday,
            gender,
            phoneNumber,
            confirmed,
            admin,
            creationDate,
            updateDate
        };
        return user;
    }
}
exports.SequelizeUserMapper = SequelizeUserMapper;
