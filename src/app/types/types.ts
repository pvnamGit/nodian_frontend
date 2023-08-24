export type BaseType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
};

export type Account = BaseType & {
  email: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
};

export type Repository = BaseType & {
  name: string;
  owner: Account;
};

export type SuccessfulResponse = {
  status: boolean;
  data: any | any[];
};

export type ErrorResponse = {
  status: boolean;
  message: null | string;
};
