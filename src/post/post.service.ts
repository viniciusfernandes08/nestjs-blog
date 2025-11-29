import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { generateSlug } from 'src/common/utils/generate-slug';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async findOne(postData: Partial<Post>) {
    const post = await this.postRepository.findOne({
      where: postData,
      relations: ['author'],
    });

    return post;
  }

  async findOneOrFail(postData: Partial<Post>) {
    const findedPost = await this.findOne(postData);

    if (!findedPost) {
      throw new NotFoundException('Post não encontrado');
    }

    return findedPost;
  }

  async findOneOwned(postData: Partial<Post>, author: User) {
    const post = await this.postRepository.findOne({
      where: {
        ...postData,
        author: {
          id: author.id,
        },
      },
      relations: ['author'],
    });

    return post;
  }

  async findOneOwnedOrFail(postData: Partial<Post>, author: User) {
    const findedOwnedPost = await this.findOneOwned(postData, author);

    if (!findedOwnedPost) {
      throw new NotFoundException('Post não encontrado');
    }

    return findedOwnedPost;
  }

  async findAllOwned(author: User) {
    const posts = await this.postRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return posts;
  }

  async update(postData: Partial<Post>, dto: UpdatePostDto, author: User) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Dados não enviados');
    }

    const post = await this.findOneOwnedOrFail(postData, author);

    post.title = dto.title ?? post.title;
    post.content = dto.content ?? post.content;
    post.excerpt = dto.excerpt ?? post.excerpt;
    post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
    post.published = dto.published ?? post.published;

    return this.postRepository.save(post);
  }
}
