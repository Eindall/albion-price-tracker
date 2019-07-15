import { Item } from './item.model';

export class User {
    // tslint:disable-next-line: variable-name
    _id?: string;
    userNickname: string;
    userPassword: string;
    userSubscribedItems: Array<Item>;
}
