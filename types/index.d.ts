export interface IUser {
    username: string;
    email?: string;
    created?: Date;
    password?: string;
    avatar?: string;
    isAdmin?: boolean;
}

export interface IProductMetadata {
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface IProduct extends IProductMetadata {
    id: string;
    created?: Date;
}

export interface IResponse<T> {
    message: string;
    status: number;
    payload: T | null;
}
