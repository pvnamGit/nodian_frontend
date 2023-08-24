'use client';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCreateNewRepoMutation } from '@/app/redux-toolkit/features/repoSlice';
import { currentRepoState, newlyCreatedRepoState, reposByOwnerState } from '@/app/recoil/atomState';
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

    const { data, error } = response;

    if (data && data.status) {
      toast.success('Create New Repository Success', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

      const newRepo = data.data;

      setCurrentRepo(newRepo);
      localStorage.setItem('currentRepoName', newRepo.name);
      setReposByOwner([...reposByOwner, newRepo]);

      handleClose();
    }
    if (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const renderModalTitle = (
    <Typography variant="h3" id="parent-modal-title" sx={{ color: '#dadada', display: 'flex', alignItems: 'center' }}>
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
    <Button
      sx={{
        marginLeft: 'auto',
        backgroundColor: 'peru',
      }}
      variant="outlined"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    >
      Create Repository
    </Button>
  );

  return (
    <BaseModal
      sx={{
        width: 800,
        height: 400,
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
