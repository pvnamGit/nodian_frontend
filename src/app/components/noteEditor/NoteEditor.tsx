'use client';

import { Box, TextField, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { KeyboardEvent, useState } from 'react';
import { currentNote, currentRepoState } from '@/app/recoil/atomState';
import { useUpdateNoteMutation } from '@/app/redux-toolkit/features/noteSlice';
import TabsSection from './TabsSection';
import Tiptap from '../tiptap/Tiptap';

function NoteEditor() {
  const [currentNoteSelected, setCurrentNoteSelected] = useRecoilState(currentNote);
  const [currentContent, setCurrentContent] = useState(currentNoteSelected?.content);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteName, setCurrentNoteName] = useState(currentNoteSelected?.name);

  const [saveContent] = useUpdateNoteMutation();
  const currentRepo = useRecoilValue(currentRepoState);

  const handleContentChange = (content: string) => {
    setIsEditing(true);
    setCurrentContent(content);
  };

  const handleSaveContent = async () => {
    if (isEditing) {
      const repoId = currentRepo?.id;
      const bodyRequest = {
        repoId,
        content: currentContent,
      };
      const noteId = currentNoteSelected?.id;
      await saveContent({ noteId, scope: 'content', bodyRequest });
      setIsEditing(false);
    }
  };

  const handleSaveNoteName = async () => {
    if (isEditing) {
      const repoId = currentRepo?.id;
      const bodyRequest = {
        repoId,
        name: currentNoteName,
      };
      const noteId = currentNoteSelected?.id;
      await saveContent({ noteId, scope: 'title', bodyRequest });
      setIsEditing(false);
    }
  };

  const handleLeaveNote = async () => {
    await handleSaveContent();
  };

  const handleKeyDownOnTitle = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSaveNoteName();
    }
  };

  return (
    <Box
      key={currentNoteSelected?.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '100%',
        backgroundColor: '#1e1e1e',
        overflow: 'auto',
      }}
    >
      {/* <Box>
        <TabsSection />
      </Box> */}

      <Box
        sx={{
          margin: '2em 12em',
          padding: '0 2rem',
        }}
      >
        {currentNoteSelected && (
          <TextField
            placeholder={currentNoteSelected?.name ? '' : 'Untitled'}
            autoComplete="off"
            fullWidth
            defaultValue={currentNoteSelected.name}
            InputProps={{
              sx: {
                '& input': {
                  color: '#dadada',
                  border: 'none',
                  padding: 'unset',
                  fontWeight: 'bold',
                  fontSize: '2em',
                },
              },
            }}
            sx={{
              '& fieldset': { border: 'none' },
            }}
            onChange={e => {
              setIsEditing(true);
              setCurrentNoteName(e.target.value);
            }}
            onBlur={async () => {
              await handleSaveNoteName();
            }}
            onKeyDown={handleKeyDownOnTitle}
          />
        )}
      </Box>
      {currentNoteSelected && <Tiptap contentProps={currentNoteSelected.content} onDestroy={handleLeaveNote} onChange={handleContentChange} />}
    </Box>
  );
}

export default NoteEditor;
