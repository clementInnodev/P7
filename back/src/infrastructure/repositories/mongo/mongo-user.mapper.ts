import { Mapper } from "../../../core/common/mapper";
import {User} from "../../../core/interfaces/user";
import { IUserModel as MongoUserModel, UserModel } from './user.model'


class MongoUserMapper implements Mapper<User, MongoUserModel> {

    mapFrom(entity: User): MongoUserModel {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = entity
        const user = new UserModel({
            _id: id as string,
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
        })
        return user
    }

    mapTo(model: MongoUserModel): User {
        const { _id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = model
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
        }
        return user
    }
}

export default MongoUserMapper