'use client';

import { Box, Button, Tooltip } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

function CreateNoteOrFolderSection({ onCreateFolder, onCreateNote }: { onCreateFolder: () => void; onCreateNote: () => void }) {
  return (
    <Box
      sx={{
        height: '48px',
      }}
    >
      <div style={{ margin: 'auto', width: 'fit-content' }}>
        <Tooltip title="Create a Note">
          <Button onClick={onCreateNote} sx={{ marginTop: 2 }} startIcon={<NoteAddIcon sx={{ color: 'white' }} />} />
        </Tooltip>
        <Tooltip title="Create a Folder">
          <Button onClick={onCreateFolder} sx={{ marginTop: 2 }} startIcon={<CreateNewFolderIcon sx={{ color: 'white' }} />} />
        </Tooltip>
      </div>
    </Box>
  );
}

export default CreateNoteOrFolderSection;
