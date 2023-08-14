export interface IOrderEntity {
  userId: string;
  created: Date;
  address: string;
  statusId: string;
  discountId?: string;
  orderDetails: {
    inventoryId: string;
    quantity: number;
  };
}
