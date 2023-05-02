import { PostRepository } from "../../../core/repositories/posts.repository"
import { UserRepository } from "../../../core/repositories/users.repository"

import { Post as PostGeneric, PostToCreateData, postToUpdateData } from "../../../core/interfaces/post"
import { User as UserGeneric, UserSignupBody, UserUpdateBody } from "../../../core/interfaces/user"

import { PostModel as Post } from "./post.model"
import { UserModel as User } from "./user.model"

import MongoPostMapper from "./mongo-post.mapper"
import MongoUserMapper from "./mongo-user.mapper"

import { ID } from "../../../core/interfaces/id"


/********************************************************/
/*************************POST***************************/
/********************************************************/
export class MongoPost implements PostRepository {
    async getPosts(limit: number): Promise<PostGeneric[]> {
        const result = await Post.find()
            .limit(limit)
            .populate('UserId', '_id, firstname, lastname, service')
        const posts = result.map(el => new MongoPostMapper().mapTo(el))
        return posts
    }

    async getPostsReverse(limit: number): Promise<PostGeneric[]> {
        const result = await Post.find()
            .limit(limit)
            .sort({id: 'desc'})
            .populate('UserId', '_id, firstname, lastname, service')
        const posts = result.map(el => new MongoPostMapper().mapTo(el))
        return posts
    }
    
    async getPostById(postId: ID): Promise<PostGeneric | null> {
        const result = await Post.findById(postId)
            .populate('UserId', '_id, firstname, lastname, service')
        if(!result){
            return result
        }
        const post = new MongoPostMapper().mapTo(result)
        return post
    }

    async getUserPosts(userId: ID): Promise<PostGeneric[]> {
        const result = await Post.find({
            UserId: userId
        }).populate('user_id', '_id, firstname, lastname, service')
        const posts = result.map(el => new MongoPostMapper().mapTo(el))
        return posts
    }

    async createPost(userId: ID, postData: PostToCreateData): Promise<PostGeneric> {
        const result = await Post.create({
            ...postData,
            UserId: userId
        })
        const post = new MongoPostMapper().mapTo(result)
        return post
    }

    async updatePost(postId: ID, postData: postToUpdateData): Promise<PostGeneric | null> {
        const result = await Post.findByIdAndUpdate(postId, {
            ...postData
        })
        if(!result){
            return result
        }
        const post = new MongoPostMapper().mapTo(result)
        return post
    }
    
    async deletePost(postId: ID): Promise<void> {
        await Post.findByIdAndDelete(postId)
    }

    async createFakePosts(): Promise<void> {
        const fakePosts = [
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 1
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
            },
            {
                title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                nihil, eveniet aliquid culpa officia aut!`,
                UserId: 2
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
/*************************USER***************************/
/********************************************************/
export class MongoUser implements UserRepository {
    async createFakeUsers(): Promise<void> {
        const fakeUsers = [
            {
                email: 'guillaume.gamelin@test.test',
                password: 'Test123!',
                firstname: 'Guillaume',
                lastname: 'Gamelin',
                birthday: '1978-12-05',
                gender: 'Homme',
                phoneNumber: '0600000000',
                confirmed: true,
                service: 'Commercial',
                address: '77 avenue de Bouvines',
                additionalAddress: '',
                postcode: '34200',
                town: 'Sète',
                creationDate: '2023-04-17 18:14:29'
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
                town: 'Sète',
                creationDate: '2023-02-14 11:14:29'
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
                town: 'Sète',
                creationDate: '2023-01-02 12:32:29'
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
                town: 'Sète',
                creationDate: '2022-11-05 18:14:29'
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
                town: 'Sète',
                creationDate: '2023-04-17 18:14:29'
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
                town: 'Sète',
                creationDate: '2023-04-17 18:14:29'
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
                town: 'Sète',
                creationDate: '2023-02-14 11:14:29'
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
                town: 'Sète',
                creationDate: '2023-01-02 12:32:29'
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
                town: 'Sète',
                creationDate: '2022-11-05 18:14:29'
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
                town: 'Sète',
                creationDate: '2023-04-17 18:14:29'
            }
        ]
        for(let fakeUser of fakeUsers){
            await User.create({
                ...fakeUser
            })
        }
    }

    async getUsers(limit: number, skip: number): Promise<UserGeneric[]> {
        const result = await User.find()
            .limit(limit)
            .skip(skip)
        const users = result.map(el => new MongoUserMapper().mapTo(el))
        return users
    }

    async getUserById(userId: ID): Promise<UserGeneric | null> {
        const result = await User.findById(userId)
        if(!result){
            return result
        }
        const user = new MongoUserMapper().mapTo(result)
        return user
    }
    
    async getUserByEmail(email: string): Promise<UserGeneric | null> {
        const result = await User.findOne({
            email
        })
        if(!result){
            return result
        }
        const user = new MongoUserMapper().mapTo(result)
        return user
    }

    async createUser(userData: UserSignupBody): Promise<UserGeneric> {
        const result = await User.create({
            ...userData
        })
        const user = new MongoUserMapper().mapTo(result)
        return user
    }

    async updateUser(userId: ID, userData: UserUpdateBody): Promise<UserGeneric | null> {
        const result = await User.findByIdAndUpdate(userId, {
            ...userData
        })
        if(!result){
            return result
        }
        const user = new MongoUserMapper().mapTo(result)
        return user
    }

    async confirmInscription(userId: ID): Promise<UserGeneric |null> {
        const user = await User.findById(userId)
        if(!user){
            return user
        }
        user.confirmed = true
        const userGeneric = new MongoUserMapper().mapTo(user)
        return userGeneric
    }

    async updatePassword(userId: ID, password: string): Promise<UserGeneric | null> {
        const result = await User.findByIdAndUpdate(userId, {
            password
        })
        if(!result){
            return result
        }
        const user = new MongoUserMapper().mapTo(result)
        return user
    }

    async deleteUser(userId: ID): Promise<void> {
        await Post.findByIdAndDelete(userId)
    }
}