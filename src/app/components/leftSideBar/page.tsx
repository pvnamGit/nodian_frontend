/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Button, Divider, Popper, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentNote, currentRepoState, notesInRepo, pathsByOwnerAndRepoState } from '@/app/recoil/atomState';
import { useGetPathsQuery } from '@/app/redux-toolkit/features/pathSlice';
import { buildNode } from '@/app/utils/buildNodeTreeFromPaths';
import { Note, Repository, TreeNode } from '@/app/types/types';
import {
  useCreateNewFolderMutation,
  useDeleteFolderMutation,
  useGetFoldersInRepoQuery,
  useUpdateFolderMutation,
} from '@/app/redux-toolkit/features/folderSlice';
import { useCreateNewNoteMutation, useDeleteNoteMutation, useGetNoteByIdQuery, useGetNotesInRepoQuery } from '@/app/redux-toolkit/features/noteSlice';
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
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);
  const [currentSelectedNode, setCurrentSelectedNode] = useState<TreeNode | null>(null);

  const [currentRepo, setCurrentRepo] = useRecoilState(currentRepoState);
  const setCurrentNote = useSetRecoilState(currentNote);

  // Folder slice
  const [createFolder] = useCreateNewFolderMutation();
  const [editFolder] = useUpdateFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();
  // Note slice
  const [createNewNote] = useCreateNewNoteMutation();
  const [editNote] = useUpdateFolderMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const {
    data: responseFolder,
    isLoading: isLoadingFolder,
    refetch: refetchFolder,
  } = useGetFoldersInRepoQuery(currentRepo?.id, {
    skip: currentRepo === null,
  });

  const {
    data: responseNote,
    isLoading: isLoadingNotes,
    refetch: refetchNotes,
  } = useGetNotesInRepoQuery(currentRepo?.id, {
    skip: currentRepo === null,
  });

  // const { isLoading: loadingNote, data: noteData } = useGetNoteByIdQuery(
  //   { noteId: currentSelectedNode ? parseInt((currentSelectedNode?.id as string).slice(0, -1), 10) : null, repoId: currentRepo?.id },
  //   {
  //     skip: currentSelectedNode === null || currentSelectedNode.isFolder,
  //   },
  // );

  useEffect(() => {
    if (currentRepo) {
      refetchFolder();
    }
  }, [currentRepo]);

  const treeNode = useMemo(() => {
    if (!isLoadingFolder && responseFolder && responseFolder.status && !isLoadingNotes && responseNote && responseNote.status) {
      const { data: folders } = responseFolder;
      const { data: notes } = responseNote;
      const generatedNode = buildNode({ folders, notes });
      return generatedNode;
    }
    return [];
  }, [responseFolder, responseNote]);

  const [notesInCurrentRepo, setNotesInCurrentRepo] = useRecoilState(notesInRepo);
  useEffect(() => {
    if (!isLoadingNotes && responseNote) {
      const { data } = responseNote;
      const notesMap: { [key: number]: Note } = {};
      data.forEach((item: Note) => {
        notesMap[item.id] = item;
      });
      setNotesInCurrentRepo(notesMap);
    }
  }, [responseNote]);

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
    isCreatingNote ? await createNewNote(bodyRequest) : await createFolder(bodyRequest);
    setIsCreating(false);
    setIsCreatingNote(false);
  };

  const handleUpdateSelectRepo = (repo: Repository) => {
    setCurrentSelectedNode(null);
    setCurrentRepo(repo);
  };

  const handleEditNode = async (node: TreeNode, input: any) => {
    const id = (node.id as string).slice(0, -1);
    const bodyRequest = {
      repoId: currentRepo?.id,
      name: input.name,
    };
    node.isFolder ? await editFolder({ folderId: id, bodyRequest }) : await editNote({ noteId: id, bodyRequest });
  };

  const handleDeleteNode = async (node: TreeNode) => {
    const id = (node.id as string).slice(0, -1);
    node.isFolder ? await deleteFolder({ folderId: id }) : await deleteNote({ noteId: id });
  };

  const handleSelectNode = (node: TreeNode) => {
    if (node) {
      setResetSelection(false);
      setCurrentSelectedNode(node);
      if (!node.isFolder && notesInCurrentRepo) {
        const noteId = parseInt((node.id as string).slice(0, -1), 10);
        setCurrentNote(notesInCurrentRepo[noteId]);
        localStorage.setItem('currentNoteId', noteId.toString());
      }
    }
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
        <CreateNoteOrFolderSection
          onCreateFolder={() => setIsCreating(true)}
          onCreateNote={() => {
            setIsCreatingNote(true);
            setIsCreating(true);
          }}
        />
      </Box>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} id="folder-note-section">
        <div>{isCreating && currentSelectedNode === null ? <InputNoteOrFolder onSubmit={handleCreate} /> : null}</div>
        {treeNode && (
          <TreeView
            data={treeNode}
            isCreating={isCreating}
            handleCreate={handleCreate}
            selectedNodeId={currentSelectedNode?.id || null}
            onSelect={handleSelectNode}
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
