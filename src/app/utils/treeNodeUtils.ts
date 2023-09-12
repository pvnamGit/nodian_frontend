import { flatMapDeep } from 'lodash';
import { TreeNode } from '../types/types';

export const getFlattenData = (node: TreeNode): any => {
  if (!node.children || !node.children.length) {
    return node;
  }

  return [node, flatMapDeep(node.children, getFlattenData)];
};

export const getPaths = ({ name, data }: { name: string; data: TreeNode | TreeNode[] }): string[] => {
  return Array.isArray(data) ? data.flatMap(it => getPaths(it).map(path => (name != null ? `${name}.${path}` : path))) : [name];
};
