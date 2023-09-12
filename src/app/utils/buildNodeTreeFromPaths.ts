import { compact, isEmpty } from 'lodash';
import { Folder, TreeNode } from '../types/types';

const buildFolderOption = ({ item, parentId }: { item: Folder; parentId: number | null }): TreeNode => {
  return {
    id: `${item.id}f`,
    label: item.name,
    // relativePath: item.parentId === null ? item.name : parentFolder.relativePath.concat('/').concat(item.name),
    isRoot: item.parentId === null,
    isSelected: false,
    isOpen: true,
    isFolder: true,
  };
};

const buildFileOption = ({ item, parentFolder }: { item: any; parentFolder?: any }) => ({
  id: `${item.id}n`,
  label: item.name,
  // relativePath: item.parentId === null ? item.name : parentFolder.relativePath.concat('/').concat(item.name),
  isRoot: item.parentId === null,
  isSelected: false,
  isOpen: false,
  isFolder: false,
});

const generateFolderMap = (data: any[], parentId: number | null = null) => {
  const folderNodes: TreeNode[] = [];
  data.forEach((item: any) => {
    if (item.parentId === parentId) {
      const folderNode = buildFolderOption({ item, parentId: null }); // build parent folder
      const children = generateFolderMap(data, item.id); // recursive to build nested object of children

      if (children.length > 0) {
        folderNode.children = children;
      }

      folderNodes.push(folderNode);
    }
  });
  return folderNodes;
};

export const buildNode = ({ data }: { data: any }) => {
  const folderMap = generateFolderMap(data);
  return folderMap;
};
