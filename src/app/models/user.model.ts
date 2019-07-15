import { Item } from './item.model';

export class User {
    userNickname: string;
    userPassword: string;
    userSubscribedItems: Array<Item>;
}