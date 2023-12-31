'use client';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCreateNewRepoMutation } from '@/app/redux-toolkit/features/repoSlice';
import { currentRepoState, newlyCreatedRepoState, reposByOwnerState } from '@/app/recoil/atomState';
import { SuccessfulResponse } from '@/app/types/types';
import BaseModal from './BaseModal';

function CreateNewRepoModal({
  openModal,
  disableLeaveModal = false,
  handleClose,
}: {
  openModal: boolean;
  disableLeaveModal?: boolean;
  handleClose: () => void;
}) {
  const [createNewRepo] = useCreateNewRepoMutation();

  const [currentRepo, setCurrentRepo] = useRecoilState(currentRepoState);

  const [reposByOwner, setReposByOwner] = useRecoilState(reposByOwnerState);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      repoName: '',
    },
  });

  const onSubmit = async (inputData: any) => {
    const { repoName: name } = inputData;
    if (isEmpty(name)) {
      toast.error('Fill in the Repository Name', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    const response = await createNewRepo(name);

    const responseData = (response as SuccessfulResponse).data;

    if (responseData && responseData.status) {
      toast.success('Create New Repository Success', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      const newRepo = responseData.data;

      setCurrentRepo(newRepo);
      localStorage.setItem('currentRepoName', newRepo.name);
      if (reposByOwner) {
        reposByOwner[newRepo.id] = newRepo;
        setReposByOwner({ ...reposByOwner });
      }

      handleClose();
    }
  };

  const renderModalTitle = (
    <Typography id="parent-modal-title" sx={{ color: '#dadada', paddingLeft: 2, fontSize: 18 }}>
      CREATE A REPOSITORY
    </Typography>
  );

  const renderModalBody = (
    <form style={{ width: '90%', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <Controller
        name="repoName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            required
            autoComplete="off"
            id="outlined-required"
            placeholder="Repository Name"
            InputProps={{
              sx: {
                '& input': {
                  color: '#dadada',
                  borderColor: '#dadada',
                },
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: 'white' },
              },
            }}
          />
        )}
      />
    </form>
  );

  const renderModalBottom = (
    <div style={{ marginLeft: 'auto' }}>
      <Button
        sx={{
          marginRight: 2,
        }}
        color="error"
        variant="text"
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button variant="text" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
        Create
      </Button>
    </div>
  );

  return (
    <BaseModal
      sx={{
        width: 400,
        height: 200,
      }}
      headerChildren={renderModalTitle}
      bodyChildren={renderModalBody}
      props={{
        open: openModal,
        onClose: handleClose,
        disableEscapeKeyDown: disableLeaveModal,
      }}
      bottomChildren={renderModalBottom}
    />
  );
}

export default CreateNewRepoModal;
