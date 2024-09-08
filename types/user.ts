export interface User {
  uid: string;
  login: string;
  email: string;
  password: string;
  userInfo?: UserInfo;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserInfo {
  id: number;
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
  userInfo: CreateUserInfoBody;
}
export interface CreateUserInfoBody {
  firstName: string;
  lastName: string;
  contactPhone?: string;
}
