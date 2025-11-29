import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      slug: 'qwertyuiop-' + Math.random().toString(36).substring(2, 8),
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      author,
    });

    const savedPost = await this.postRepository.save(post);

    return savedPost;
  }
}
