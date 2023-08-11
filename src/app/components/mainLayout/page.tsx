import { Box, styled } from '@mui/material';
import PrimarySearchAppBar from '../header/AppBar';
import LeftSideBar from '../leftSideBar/page';
import NoteEditor from '../noteEditor/page';

const Container = styled('div')({
  height: '100vh',
});

const Header = styled('div')({
  height: '64px',
});

const Body = styled('div')({
  height: 'calc(100vh - 64px)',
});

function MainLayout() {
  return (
    <Container>
      <Header>
        <PrimarySearchAppBar />
      </Header>
      <Body
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <LeftSideBar />
        </Box>
        <Box sx={{ flexGrow: 5 }}>
          <NoteEditor />
        </Box>
      </Body>
    </Container>
  );
}

export default MainLayout;
