import { EntityHandler } from '../../index';
import { Test } from '../../entity/test';

export const createTest = (firstName : string, lastName : string) => {
    const test = new Test();
    test.firstName = firstName;
    test.lastName = lastName;
    return EntityHandler.mongoManager.save(test);
};

export const findTest = () => {
    return EntityHandler.mongoManager.find(Test);
};
