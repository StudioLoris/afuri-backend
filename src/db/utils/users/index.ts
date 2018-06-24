import { EntityHandler } from '../../index';
import { User } from '../../entity/user';
import { Wallet } from '../../entity/wallet';
import { getManager, EntityManager } from 'typeorm';

interface FindUser {
  email? : string;
}
interface CreateUser {
  email : string;
}

export const findUser = (profile : FindUser) : Promise<User> => EntityHandler.user.findOne(profile);
export const createWallet = async ({ email }  : CreateUser, transactionalEntityManager : EntityManager) => {
  const wallet = new Wallet();
  wallet.user = await transactionalEntityManager.findOne(User, { email });
  wallet.balance = 0;
  await transactionalEntityManager.save(wallet);
  return;
};
export const createUser = async ({ email } : CreateUser) => {
  const user = new User();
  user.email = email;
  await getManager().transaction(async (transactionalEntityManager : EntityManager) => {
    await transactionalEntityManager.save(user);
    await createWallet({ email }, transactionalEntityManager);
    return;
  });
};
