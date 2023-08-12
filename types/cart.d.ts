export interface ICart {
    cartId: string;
    userId: string;
}

export interface ICartDetail {
    cartId: string;
    productId: string;
    sizeId: string;
    colorId: string;
    quantity: number;
}