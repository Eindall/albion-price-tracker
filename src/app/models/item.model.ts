import { Price } from './price.model';

export class Item {
    itemId: string;
    itemIcon: string;
    itemNameEN: string;
    itemNameFR: string;
    itemPrices?: Price;
}
