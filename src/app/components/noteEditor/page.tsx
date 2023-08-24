import { Box } from '@mui/material';
import TabsSection from './TabsSection';

function NoteEditor() {
  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#1e1e1e',
      }}
    >
      <Box>
        <TabsSection />
      </Box>
    </Box>
  );
}

export default NoteEditor;
