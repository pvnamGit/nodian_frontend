import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useGetReposByOwnerQuery } from '@/app/redux-toolkit/features/repoSlice';
import { currentRepoState, newlyCreatedRepoState, reposByOwnerState } from '@/app/recoil/atomState';
import { Repository } from '@/app/types/types';
import PrimarySearchAppBar from '../header/AppBar';
import LeftSideBar from '../leftSideBar/page';
import NoteEditor from '../noteEditor/page';
import CreateNewRepoModal from '../modal/CreateNewRepoModal';

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
  const [openRepoModal, setOpenRepoModal] = useState(false);

  const { data, isLoading } = useGetReposByOwnerQuery();

  const [disableLeaveModal, setDisableLeaveModal] = useState(false);

  const setRepositories = useSetRecoilState(reposByOwnerState);

  const currentRepoName = localStorage.getItem('currentRepo');
  const setCurrentRepo = useSetRecoilState(currentRepoState);

  const repos = data && data.data;

  useEffect(() => {
    if (!isLoading) {
      if (isEmpty(repos)) {
        setOpenRepoModal(true);
        setDisableLeaveModal(true);
      }
      setRepositories(repos);

      if (isEmpty(currentRepoName)) {
        localStorage.setItem('currentRepoName', repos[0].name);
      }

      const currentRepo = repos.find((repo: Repository) => repo.name === localStorage.getItem('currentRepo'));
      setCurrentRepo(currentRepo);
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading repositories...</p>;
  }

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
        <CreateNewRepoModal openModal={openRepoModal} handleClose={() => setOpenRepoModal(false)} disableLeaveModal={disableLeaveModal} />
      </Body>
    </Container>
  );
}

export default MainLayout;
