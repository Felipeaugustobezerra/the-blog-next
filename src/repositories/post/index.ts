import { PostRepository } from './post-repository';
import { DrizzlePostRepository } from '../../db/drizzle/drizzle-post-repository';

export const postRepository: PostRepository = new DrizzlePostRepository();
