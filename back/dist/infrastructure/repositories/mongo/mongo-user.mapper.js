"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
class MongoUserMapper {
    mapFrom(entity) {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = entity;
        const user = new user_model_1.UserModel({
            _id: id,
            email,
            password,
            firstname,
            lastname,
            address,
            additionalAddress,
            postcode,
            town,
            service,
            confirmed,
            admin,
            birthday,
            gender,
            phoneNumber,
            creationDate,
            updateDate
        });
        return user;
    }
    mapTo(model) {
        const { _id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = model;
        const user = {
            id: _id,
            email,
            password,
            firstname,
            lastname,
            address,
            additionalAddress,
            postcode,
            town,
            service,
            confirmed,
            admin,
            birthday,
            gender,
            phoneNumber,
            creationDate,
            updateDate
        };
        return user;
    }
}
exports.default = MongoUserMapper;
