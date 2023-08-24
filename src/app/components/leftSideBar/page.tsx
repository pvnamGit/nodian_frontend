import { Box, Button, Divider, Typography } from '@mui/material';
import CreateNoteOrFolderSection from './CreateNoteOrFolderSection';
import RepositorySelection from '../repository/RepositorySelection';

function LeftSideBar() {
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
        <CreateNoteOrFolderSection />
      </Box>
      <Divider color="white" />
      <Box id="folder-note-section" />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          height: 40,
        }}
        id="repository-section"
      >
        <RepositorySelection />
      </Box>
    </Box>
  );
}

export default LeftSideBar;
