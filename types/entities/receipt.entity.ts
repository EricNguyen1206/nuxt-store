export interface IReceiptDetailEntity {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
  price: number;
}

export interface IReceiptEntity {
  day: Date;
  details: IReceiptDetailEntity[];
}
