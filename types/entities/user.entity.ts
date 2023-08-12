export interface IUserAccount {
    password: string;
    roleId: string;
}

export interface IUserEntity {
    email: string;
    name: string;
    accounts: IUserAccount[];
}