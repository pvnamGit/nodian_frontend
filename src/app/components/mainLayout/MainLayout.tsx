'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Stack, styled } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Skeleton from '@mui/material/Skeleton';
import { redirect, useNavigate } from 'react-router-dom';
import { useGetReposByOwnerQuery } from '@/app/redux-toolkit/features/repoSlice';
import { currentRepoState, currentUserState, newlyCreatedRepoState, reposByOwnerState } from '@/app/recoil/atomState';
import { Repository, SuccessfulResponse } from '@/app/types/types';
import PrimarySearchAppBar from '../header/AppBar';
import LeftSideBar from '../leftSideBar/LeftSideBar';
import NoteEditor from '../noteEditor/NoteEditor';
import CreateNewRepoModal from '../modal/CreateNewRepoModal';
import './mainLayout.css';

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
  const navigate = useNavigate();

  const currentUser = useRecoilValue(currentUserState);

  if (!currentUser) {
    navigate('/');
  }

  const [openRepoModal, setOpenRepoModal] = useState(false);

  const [disableLeaveModal, setDisableLeaveModal] = useState(false);

  // Resizeable left size bar
  const sidebarRef = useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  const startResizing = useCallback((mouseDownEvent: MouseEvent) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left);
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const setRepositories = useSetRecoilState(reposByOwnerState);

  const { data: reposByOwnerResponse, isLoading, isError } = useGetReposByOwnerQuery();

  const currentRepoId = localStorage.getItem('currentRepoId');
  const setCurrentRepo = useSetRecoilState(currentRepoState);

  useEffect(() => {
    if (!isLoading) {
      const reposData = (reposByOwnerResponse as SuccessfulResponse)?.data;
      if (isEmpty(reposData)) {
        setOpenRepoModal(true);
        setDisableLeaveModal(true);
        return;
      }
      const repos: { [key: number]: Repository } = {};
      reposData.forEach((repo: Repository) => {
        repos[repo.id] = repo;
      });

      setRepositories(repos);

      const currentRepo = currentRepoId === null ? reposData[0] : repos[parseInt(currentRepoId, 10)];
      localStorage.setItem('currentRepoId', currentRepo.id);

      setCurrentRepo(currentRepo);
    }
  }, [isLoading, reposByOwnerResponse]);

  if (isLoading) {
    return (
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    );
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
        <div ref={sidebarRef} className="app-sidebar" style={{ width: sidebarWidth }}>
          <div className="app-sidebar-content">
            <Box sx={{ height: '100%' }}>
              <LeftSideBar />
            </Box>
          </div>
          <div className="app-sidebar-resizer" onMouseDown={(e: any) => startResizing(e)} />
        </div>
        <Box className="note-section" sx={{ flexGrow: 5 }}>
          <NoteEditor />
        </Box>
        <CreateNewRepoModal openModal={openRepoModal} handleClose={() => setOpenRepoModal(false)} disableLeaveModal={disableLeaveModal} />
      </Body>
    </Container>
  );
}

export default MainLayout;
