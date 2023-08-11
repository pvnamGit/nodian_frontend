import { Box, Button } from '@mui/material';
import CreateNoteOrFolderSection from './CreateNoteOrFolderSection';

function LeftSideBar() {
  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#1e1e1e',
        borderRight: '0.5px solid white',
      }}
    >
      <Box>
        <CreateNoteOrFolderSection />
      </Box>
    </Box>
  );
}

export default LeftSideBar;
