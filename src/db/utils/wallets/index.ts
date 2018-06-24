import { EntityHandler } from '../../index';
import { User } from '../../entity/user';

interface FindWallet {
    user : User;
}

export const findWallet = (user : FindWallet) => {
    return EntityHandler.wallet.findOne(user);
};
