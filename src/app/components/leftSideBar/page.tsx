/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Button, Divider, Popper, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentRepoState, pathsByOwnerAndRepoState } from '@/app/recoil/atomState';
import { useGetPathsQuery } from '@/app/redux-toolkit/features/pathSlice';
import { buildNode } from '@/app/utils/buildNodeTreeFromPaths';
import { Repository, TreeNode } from '@/app/types/types';
import {
  useCreateNewFolderMutation,
  useDeleteFolderMutation,
  useGetFoldersInRepoQuery,
  useUpdateFolderMutation,
} from '@/app/redux-toolkit/features/folderSlice';
import CreateNoteOrFolderSection from './CreateNoteOrFolderSection';
import RepositorySelection from '../repository/RepositorySelection';
import InputNoteOrFolder from './InputNoteOrFolder';
import TreeView from '../tree/TreeView';

type CreateFolderRequest = {
  repoId?: number | undefined;
  parentFolderId?: number | null;
  name: string;
};

function LeftSideBar() {
  const [isCreating, setIsCreating] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [currentSelectedNode, setCurrentSelectedNode] = useState<TreeNode | null>(null);

  const [currentRepo, setCurrentRepo] = useRecoilState(currentRepoState);

  const [deleteFolder] = useDeleteFolderMutation();
  const [editFolder] = useUpdateFolderMutation();

  const {
    data: response,
    isLoading,
    refetch,
  } = useGetFoldersInRepoQuery(currentRepo?.id, {
    skip: currentRepo === null,
  });

  const treeNode = useMemo(() => {
    if (!isLoading && response && response.status) {
      const { data } = response;
      const generatedNode = buildNode({ data });
      return generatedNode;
    }
    return [];
  }, [response]);

  const [createFolder] = useCreateNewFolderMutation();

  useEffect(() => {
    if (currentRepo) {
      refetch();
    }
  }, [currentRepo]);

  const handleCreate = async (input: any) => {
    let bodyRequest: CreateFolderRequest = {
      repoId: currentRepo?.id,
      name: input.name,
    };
    let parentId: number | null = null;
    if (currentSelectedNode) {
      parentId = parseInt((currentSelectedNode.id as string).slice(0, -1), 10);
    }
    if (parentId) {
      bodyRequest = { ...bodyRequest, parentFolderId: parentId };
    }
    await createFolder(bodyRequest);
    setIsCreating(false);
  };

  const handleUpdateSelectRepo = (repo: Repository) => {
    setCurrentSelectedNode(null);
    setCurrentRepo(repo);
  };

  const handleEditNode = async (node: TreeNode, input: any) => {
    const folderId = (node.id as string).slice(0, -1);
    const bodyRequest = {
      repoId: currentRepo?.id,
      name: input.name,
    };
    await editFolder({ folderId, bodyRequest });
  };

  const handleDeleteNode = async (node: TreeNode) => {
    const params = node.isFolder
      ? {
          folderId: (node.id as string).slice(0, -1),
        }
      : null;

    await deleteFolder(params);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#262626',
      }}
    >
      <Box id="create-section">
        <CreateNoteOrFolderSection onCreateFolder={() => setIsCreating(true)} onCreateNote={() => setIsCreating(true)} />
      </Box>
      <Divider color="white" />
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} id="folder-note-section">
        <div>{isCreating && currentSelectedNode === null ? <InputNoteOrFolder onSubmit={handleCreate} /> : null}</div>
        {treeNode && (
          <TreeView
            data={treeNode}
            isCreating={isCreating}
            handleCreate={handleCreate}
            selectedNodeId={currentSelectedNode?.id || null}
            onSelect={node => {
              if (node) {
                setResetSelection(false);
                setCurrentSelectedNode(node);
              }
            }}
            deselected={resetSelection}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode}
          />
        )}
        {isCreating && <Button onClick={() => setIsCreating(false)}>Cancel</Button>}
        <div
          id="empty-space"
          style={{ flex: 'auto' }}
          onClick={e => {
            setResetSelection(true);
            setCurrentSelectedNode(null);
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          height: 40,
        }}
        id="repository-section"
      >
        <RepositorySelection handleUpdateSelect={handleUpdateSelectRepo} />
      </Box>
    </Box>
  );
}

export default LeftSideBar;
