import { Mapper } from "../../../core/common/mapper"
import {User} from "../../../core/interfaces/user"
import { User as SequelizeUserModel } from "./user.model"


export class SequelizeUserMapper implements Mapper<User, SequelizeUserModel> {

    mapFrom(entity: User): SequelizeUserModel {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, confirmed, admin, birthday, gender, phoneNumber, creationDate, updateDate } = entity
        const user = new SequelizeUserModel({
            id: id as number,
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
        })
        return user
    }

    mapTo(model: SequelizeUserModel): User {
        const { id, email, password, firstname, lastname, address, additionalAddress, postcode, town, service, birthday, gender, phoneNumber, confirmed, admin, creationDate, updateDate } = model
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
        }
        return user
    }
}