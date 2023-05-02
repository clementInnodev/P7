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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePost = exports.UpdatePost = exports.CreatePost = exports.GetPosts = exports.GetPostById = void 0;
class GetPostById {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepo.getPostById(postId);
            return post;
        });
    }
}
exports.GetPostById = GetPostById;
class GetPosts {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(POSTS_PER_PAGE, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postRepo.getPosts(POSTS_PER_PAGE, skip);
            return posts;
        });
    }
}
exports.GetPosts = GetPosts;
class CreatePost {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(title, content, imageUrl, creator) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepo.createPost(title, content, imageUrl, creator);
            return post;
        });
    }
}
exports.CreatePost = CreatePost;
class UpdatePost {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(postToUpdate, title, content, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepo.updatePost(postToUpdate, title, content, imageUrl);
            return post;
        });
    }
}
exports.UpdatePost = UpdatePost;
class DeletePost {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    execute(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepo.deletePost(postId);
            return post;
        });
    }
}
exports.DeletePost = DeletePost;
