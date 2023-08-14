import { IUserEntity } from "../entities/user.entity";

export interface IUserDto extends IUserEntity {
  userId: string;
  email: string;
  roleId: string;
}
