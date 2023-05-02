import { PostRepository } from "../../../core/repositories/posts.repository"
import { UserRepository } from "../../../core/repositories/users.repository"

import { Post as PostGeneric, PostToCreateData, postToUpdateData } from "../../../core/interfaces/post"
import { User as UserGeneric, UserSignupBody, UserUpdateBody } from "../../../core/interfaces/user"

import { Post } from "./post.model"
import { User } from "./user.model"
import { PostUserLike as Like } from "./post-user-like.model"

import { SequelizePostMapper } from "./sequelize-post.mapper"
import { SequelizeUserMapper } from "./sequelize-user.mapper"

import { ID } from "../../../core/interfaces/id"

import { injectable } from "inversify"
import { SequelizePostUserMapper } from "./sequelize-post-user.mapper"
import { PostUser } from "./post-user.model"
import { hash } from "bcrypt"
import { LikeRepository } from "../../../core/repositories/likes.repository"

/********************************************************/
/*************************POST***************************/
/********************************************************/
@injectable()
export class SequelizePost implements PostRepository {
    async getPosts(limit: number): Promise<PostGeneric[]> {
        const result =  await Post.findAll({
            include: {
                model: User,
                attributes: [
                    'firstname',
                    'lastname',
                    'service'
                ]
            },
            limit
        })
        console.log(result)
        const posts = result.map(el => new SequelizePostUserMapper().mapTo(el as unknown as PostUser))
        return posts
    }

    //@ts-ignore
    async getPostsReverse(limit: number): Promise<PostGeneric[]> {
        const result =  await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'firstname',
                        'lastname',
                        'service'
                    ]
                }
            ],
            limit,
            order: [
                ['id', 'DESC']
            ]
        })
        const posts = result.map(el => new SequelizePostUserMapper().mapTo(el as unknown as PostUser))
        return posts
    }

    async getPostById(postId: ID): Promise<PostGeneric | null> {
        const result = await Post.findByPk(postId)

        if(!result){
            return result
        }

        const post = new SequelizePostMapper().mapTo(result)
        return post
    }

    async getUserPosts(userId: string): Promise<PostGeneric[]> {
        const result = await Post.findAll({
            where: {
                UserId: userId
            }
        })
        const posts = result.map(el => new SequelizePostMapper().mapTo(el))
        return posts
    }

    async createPost(userId: ID, postData: PostToCreateData): Promise<PostGeneric> {
        const result = await Post.create({
            ...postData,
            UserId: userId as number
        })
        const post = new SequelizePostMapper().mapTo(result)
        return post
    }

    async updatePost(postId: ID, post: postToUpdateData): Promise<PostGeneric | null> {
        const result = await Post.findByPk(postId)
        if(!result){
            return result
        }
        result.set({
            ...post
        })
        await result.save()
        const postUpdated = new SequelizePostMapper().mapTo(result)
        return postUpdated
    }

    async deletePost(postId: ID): Promise<void> {
        await Post.destroy({
            where: {
                id: postId
            }
        })
    }

    async createFakePosts(): Promise<void> {
        const fakePosts = [
            {
                title: 'Lorem ipsum.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor.',
                content: `Lorem ipsum dolor sit amet.`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi.`,
                UserId: 1
            },
            {
                title: 'Lorem.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat.`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet.',
                content: `Lorem ipsum dolor sit amet.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique.`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing.`,
                UserId: 2
            },
            {
                title: 'Lorem.',
                content: `Lorem ipsum dolor.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, numquam blanditiis harum quisquam eius sed odit fugiat.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga.`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae.`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum!`,
                UserId: 1
            }
        ]
        for(let fakePost of fakePosts){
            await Post.create({
                ...fakePost
            })
        }
    }
}



/********************************************************/
/*************************LIKE***************************/
/********************************************************/
@injectable()
export class SequelizeLike implements LikeRepository {
    async like(UserId: ID, PostId: ID): Promise<void> {
        await Like.create({
            PostId,
            UserId
        })
    }

    async unlike(UserId: ID, PostId: ID): Promise<void> {
        await Like.destroy({
            where: {
                PostId,
                UserId
            }
        })
    }

    async verifyExistingLike(UserId: ID, PostId: ID): Promise<boolean> {
        const like = await Like.findOne({
            where:{
                PostId,
                UserId
            }
        })
        if(!like){
            return false
        }else{
            return true
        }
    }

    async countPostLike(PostId: ID): Promise<number> {
        const count = await Like.count({
            where: {
                PostId
            }
        })
        return count
    }
}


/********************************************************/
/*************************USER***************************/
/********************************************************/
@injectable()
export class SequelizeUser implements UserRepository {
    async createFakeUsers(): Promise<void> {
        const fakeUsers = [
            {
                email: 'guillaume.gamelin@test.test',
                password: 'Test123!',
                firstname: 'Guillaume',
                lastname: 'Gamelin',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0654123561',
                confirmed: true,
                service: 'Commercial',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'gustave-belisle@test.test',
                password: 'Test123!',
                firstname: 'Gustave',
                lastname: 'Belisle',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Comptable',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'amelie-emond@test.test',
                password: 'Test123!',
                firstname: 'Amélie',
                lastname: 'Emond',
                birthday: '1978-12-05',
                gender: 'Femme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Ressources humaines',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'caroline-doiron@test.test',
                password: 'Test123!',
                firstname: 'Caroline',
                lastname: 'Doiron',
                birthday: '1978-12-05',
                gender: 'Femme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Direction',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'christian-gingras@test.test',
                password: 'Test123!',
                firstname: 'Christian',
                lastname: 'Gingras',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Logistique',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'olivier-belair@test.test',
                password: 'Test123!',
                firstname: 'Olivier',
                lastname: 'Bélair',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Commercial',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'gaetan-couet@test.test',
                password: 'Test123!',
                firstname: 'Gaetan',
                lastname: 'Couet',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Comptable',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'christiane-langlois@test.test',
                password: 'Test123!',
                firstname: 'Christiane',
                lastname: 'Langlois',
                birthday: '1978-12-05',
                gender: 'Femme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Ressources humaines',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'laurette-tachel@test.test',
                password: 'Test123!',
                firstname: 'Laurette',
                lastname: 'Tachel',
                birthday: '1978-12-05',
                gender: 'Femme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Direction',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'yves-lanteigne@test.test',
                password: 'Test123!',
                firstname: 'Yves',
                lastname: 'Lanteigne',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Logistique',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète'
            },
            {
                email: 'admin@admin.fr',
                password: 'Test123!',
                firstname: 'Admin',
                lastname: 'Admin',
                birthday: '2000-01-01',
                gender: 'Homme',
                phoneNumber: '0000000000',
                confirmed: true,
                service: 'Direction',
                address: 'admin',
                additionalAddress: '',
                postcode: '00000',
                town: 'admin',
                admin: true
            }
        ]
        for(let fakeUser of fakeUsers){
            await User.create({
                ...fakeUser,
                password: await hash(fakeUser.password, 12)
            })
        }
    }

    async getUsers(limit: number, skip: number): Promise<UserGeneric[]> {
        let result: User[] = []
        if(+limit !== 0 && +skip !== 0){
            result = await User.findAll({
                limit,
                offset: skip
            })
        }else{
            result = await User.findAll()
        }
        const users = result.map(el => new SequelizeUserMapper().mapTo(el))
        return users
    }

    async getUserById(userId: ID): Promise<UserGeneric | null> {
        const result = await User.findByPk(userId)
        if(!result){
            return result
        }
        const user = new SequelizeUserMapper().mapTo(result)
        return user
    }

    async getUserByEmail(email: string): Promise<UserGeneric | null> {
        const result = await User.findOne({
            where:{
                email
            }
        })
        if(!result){
            return result
        }
        const user = new SequelizeUserMapper().mapTo(result)
        return user
    }

    async updateUser(userId: ID, userData: UserUpdateBody): Promise<UserGeneric | null> {
        const result = await User.findByPk(userId)
        if(!result){
            return result
        }
        result.set({
            ...userData
        })
        await result.save()
        const user = new SequelizeUserMapper().mapTo(result)
        return user
    }

    async deleteUser(userId: ID): Promise<void> {
        await User.destroy({
            where: {
                id: userId
            }
        })
    }

    async createUser(userData: UserSignupBody): Promise<UserGeneric> {
        const result = await User.create({
            ...userData
        })
        const user = new SequelizeUserMapper().mapTo(result)
        return user
    }

    async updatePassword(userId: ID, password: string): Promise<UserGeneric | null> {
        const result = await User.findByPk(userId)
        if(!result){
            return result
        }
        result.password = password
        await result.save()
        const user = new SequelizeUserMapper().mapTo(result)
        return user
    }

    async confirmInscription(userId: number): Promise<UserGeneric | null> {
        const user = await User.findByPk(userId)
        if(!user){
            return user
        }
        user.confirmed = true
        await user.save()
        const userGeneric = new SequelizeUserMapper().mapTo(user)
        return userGeneric
    }

}