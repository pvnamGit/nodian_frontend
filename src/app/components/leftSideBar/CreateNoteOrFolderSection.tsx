'use client';

import { Box, Button, Tooltip } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

function CreateNoteOrFolderSection() {
  return (
    <Box
      sx={{
        borderBottom: '0.5px solid white',
        height: '48px',
      }}
    >
      <div style={{ marginLeft: 'auto', width: 'fit-content' }}>
        <Tooltip title="Create a Note">
          <Button sx={{ marginTop: 1 }} startIcon={<NoteAddIcon sx={{ color: 'white' }} />} />
        </Tooltip>
        <Tooltip title="Create a Folder">
          <Button sx={{ marginTop: 1 }} startIcon={<CreateNewFolderIcon sx={{ color: 'white' }} />} />
        </Tooltip>
      </div>
    </Box>
  );
}

export default CreateNoteOrFolderSection;
