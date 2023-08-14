export interface IUserAccount {
  password: string;
  roleId: string;
  userId: string;
}

export interface IUserEntity {
  name: string;
  gender?: string;
  address: string;
  phone: string;
  birthday?: Date;
  created: Date;
}
