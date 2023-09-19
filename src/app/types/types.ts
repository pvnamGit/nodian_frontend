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

export type TreeNode = {
  id: number | string;
  label: string;
  isFolder: boolean;
  isRoot: boolean;
  relativePath?: string;
  children?: TreeNode[];
  isOpen: boolean;
  isSelected?: boolean;
};

export type Path = BaseType & {
  path: string;
  owner: Account;
  repo: Repository;
};

export type Folder = BaseType & {
  parentId: number;
  name: string;
};

export type Note = BaseType & {
  parentId: number;
  name: string;
  content: string;
};
