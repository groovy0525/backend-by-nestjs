import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { FindAllPostDto } from './dto/find-all-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const { title, content, tags } = createPostDto;

    const post = await this.postModel.create({
      title,
      content,
      tags,
      user,
    });

    return post;
  }

  async findAll(query: FindAllPostDto) {
    const page = parseInt(query.page);
    const { username, tag } = query;

    if (page < 1) {
      console.log(typeof query.page);
      throw new BadRequestException();
    }

    const queryPartial = {
      ...(username ? { 'user.username': username } : {}),
      ...(tag ? { tags: tag } : {}),
    };

    const posts = await this.postModel
      .find(queryPartial)
      .sort({ updatedAt: -1 })
      .limit(5)
      .skip((page - 1) * 5);
    const lastPage = Math.ceil(
      (await this.postModel.countDocuments(queryPartial)) / 5,
    );

    return {
      posts,
      lastPage,
    };
  }

  async findOne(postId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async remove(postId: string, user: User) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (user.id !== post.user.id) {
      throw new ForbiddenException();
    }

    await this.postModel.findByIdAndRemove(postId);
  }

  async update(postId: string, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (user.id !== post.user.id) {
      throw new ForbiddenException();
    }

    return await this.postModel.findByIdAndUpdate(postId, updatePostDto, {
      new: true,
    });
  }
}
