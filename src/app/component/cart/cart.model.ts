export class CartItem {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: string;
  public price!: number;
  public image!: string;
  public rating!: ItemRating;
  public quantity!: number;
  public total!: number;
}

class ItemRating {
  public rate!: number;
  public count!: number;
}
