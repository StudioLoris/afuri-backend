import { EntityHandler } from '../../index';
import { User } from '../../entity/user';

interface FindUser {
  email? : string;
}
interface CreateUser {
  email : string;
}

export const findUser = (profile : FindUser) => EntityHandler.user.findOne(profile);
export const createUser = async ({ email } : CreateUser) => {
  const user = new User();
  user.email = email;
  await EntityHandler.user.save(user);
  return;
};
