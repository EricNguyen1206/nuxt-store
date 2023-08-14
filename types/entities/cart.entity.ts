export interface ICartEntity {
  userId: string;
  cartDetails: ICartDetailEntity[];
}

export interface ICartDetailEntity {
  inventoryId: string;
  quantity: number;
}
