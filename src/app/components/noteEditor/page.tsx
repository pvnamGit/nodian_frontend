import { Box } from '@mui/material';
import TabsSection from './TabsSection';
import Tiptap from '../tiptap/Tiptap';

function NoteEditor() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: '#1e1e1e',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Box>
        <TabsSection />
      </Box>
      <Tiptap />
      <Box sx={{ position: 'absolute' }} />
    </Box>
  );
}

export default NoteEditor;
