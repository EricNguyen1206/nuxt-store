import { ICartEntity } from "../entities/cart.entity";

export interface ICartDto extends ICartEntity {
  cartId: string;
  cartDetails: IProductDto[];
}
