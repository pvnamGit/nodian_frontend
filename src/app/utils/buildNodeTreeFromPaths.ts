import { compact, isEmpty, noop } from 'lodash';
import { Folder, Note, TreeNode } from '../types/types';

type NoteMerged = Note & {
  isNote?: boolean;
};

const buildFolderOption = ({ item, parentId }: { item: Folder; parentId: number | null }): TreeNode => {
  return {
    id: `${item.id}f`,
    label: item.name,
    // relativePath: item.parentId === null ? item.name : parentFolder.relativePath.concat('/').concat(item.name),
    isRoot: item.parentId === null,
    isSelected: false,
    isOpen: true,
    isFolder: true,
    children: [], // Initialize children array
  };
};

const buildNoteOption = ({ item }: { item: Note }): TreeNode => ({
  id: `${item.id}n`,
  label: item.name,
  isRoot: item.parentId === null,
  isSelected: false,
  isOpen: false,
  isFolder: false,
});

const generateFolderAndNoteMap = (data: Folder[] | NoteMerged[], parentId: number | null = null) => {
  const folderNodesMap: { [key: string]: TreeNode } = {};
  const rootFolderNodes: TreeNode[] = [];

  data.forEach((item: any) => {
    if (item.parentId === parentId) {
      const folderNode = item.isNote ? buildNoteOption({ item }) : buildFolderOption({ item, parentId: null });

      if (!item.isNote) {
        const children = generateFolderAndNoteMap(data, item.id);

        if (children.length > 0) {
          folderNode.children = children;
        }
      }

      folderNodesMap[folderNode.id] = folderNode;

      if (parentId === null) {
        rootFolderNodes.push(folderNode);
      }
    }
  });

  return parentId === null ? rootFolderNodes : Object.values(folderNodesMap);
};

export const buildNode = ({ folders, notes }: { folders: Folder[]; notes: Note[] }) => {
  const notesMarked = notes.map(note => ({
    ...note,
    isNote: true,
  }));
  const mergedNoteAndFolder = [...folders, ...notesMarked];
  const treeNode = generateFolderAndNoteMap(mergedNoteAndFolder);

  return treeNode;
};
