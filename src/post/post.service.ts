import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { generateSlug } from 'src/common/utils/generate-slug';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User) {
    const post = this.postRepository.create({
      slug: generateSlug(dto.title),
      author,
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      coverImageUrl: dto.coverImageUrl,
    });

    const savedPost = await this.postRepository
      .save(post)
      .catch((e: unknown) => {
        if (e instanceof Error) {
          this.logger.error('Erro ao criar post', e.stack);
        }

        throw new BadRequestException('Erro ao criar post');
      });

    return savedPost;
  }
}
