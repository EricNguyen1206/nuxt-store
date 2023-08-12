export interface IOrder {
    orderId: string;
    userId: string;
    address: string;
    discountId: string;
    day: string;
    statusId: string;
}

export interface IOrderDetail {
    orderId: string;
    productId: string;
    quantity: number;
    sizeId: string;
    colorId: string;
}

export interface IStatus {
    statusId: string;
    status: string;
}