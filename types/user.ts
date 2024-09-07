export interface User {
  uid: string;
  login: string;
  email: string;
  info: UserInfo;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserInfo {
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateUserBody {
  login: string;
  email: string;
  password: string;
  info: CreateUserInfoBody;
}
export interface CreateUserInfoBody {
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone?: string;
}
