import { JsonPostRepository } from '@/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
    console.log();
    console.error(`${posts.length} Posts inseridos com sucesso!`);
    console.log();
  } catch (e) {
    console.log();
    console.log('Banco de dados populado com posts com sucesso!');
    console.log();
    console.log(e);
  }
})();
