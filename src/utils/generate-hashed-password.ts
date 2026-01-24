import { hashPassword } from '@/lib/login/manage-login';

(async () => {
  const myPassword = '<PASSWORD>'; //Colocar a senha que deseja gerar o hash
  const hashedPassword = await hashPassword(myPassword);

  console.log({ hashedPassword });
})();
