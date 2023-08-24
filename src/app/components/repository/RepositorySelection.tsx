import { MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { noop } from 'lodash';
import { Repository } from '@/app/types/types';
import { currentRepoState, newlyCreatedRepoState, reposByOwnerState } from '@/app/recoil/atomState';
import CreateNewRepoModal from '../modal/CreateNewRepoModal';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';

const styles = {
  height: '100%',
  color: 'white',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(228, 219, 233, 0.25)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(228, 219, 233, 0.25)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(228, 219, 233, 0.25)',
  },
  '.MuiSvgIcon-root ': {
    fill: 'white !important',
  },
  '& .MuiOutlinedInput-input': {
    paddingBottom: 'unset',
    paddingTop: 'unset',
  },
};

function RepositorySelection() {
  const [openRepoModal, setOpenRepoModal] = useState(false);
  const [openDeleteRepoModal, setOpenDeleteRepoModal] = useState(false);

  const reposByOwner = useRecoilState(reposByOwnerState);
  const repos: Repository[] = reposByOwner[0];

  const [currentRepoName, setCurrentRepoName] = useState(localStorage.getItem('currentRepoName'));

  const [currentRepo, setCurrentRepo] = useRecoilState(currentRepoState);

  useEffect(() => {
    if (currentRepo) {
      setCurrentRepoName(currentRepo?.name);
    }
  }, [currentRepo]);

  const handleCreateNewRepo = () => {
    setOpenRepoModal(true);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const newSelectedRepo = repos.find(repo => repo.name === event.target.value);
    if (newSelectedRepo) {
      localStorage.setItem('currentRepoName', event.target.value);
      setCurrentRepoName(newSelectedRepo.name);
      setCurrentRepo(newSelectedRepo);
    }
  };

  return (
    <>
      {!repos && null}
      {repos && (
        <>
          <Select sx={{ ...styles }} fullWidth onChange={handleChange} value={currentRepoName || ''}>
            {repos.map((item: Repository) => (
              <MenuItem key={item.id} value={item.name} sx={{ display: 'flex' }}>
                {item.name}
                {currentRepoName !== item.name && ( // Check if the current item is selected
                  <Tooltip title="Delete this repository" onClick={() => setOpenDeleteRepoModal(true)}>
                    <Typography sx={{ marginLeft: 'auto' }}>
                      <DeleteOutlineIcon color="error" />
                    </Typography>
                  </Tooltip>
                )}
              </MenuItem>
            ))}
            <MenuItem onClick={handleCreateNewRepo}>Create new repository</MenuItem>
          </Select>
          <CreateNewRepoModal openModal={openRepoModal} handleClose={() => setOpenRepoModal(false)} />
          <ConfirmDeleteModal open={openDeleteRepoModal} handleClose={() => setOpenDeleteRepoModal(false)} handleConfirm={noop} />
        </>
      )}
    </>
  );
}

export default RepositorySelection;
