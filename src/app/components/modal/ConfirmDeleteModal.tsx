'use client';

import { Box, Button, Typography } from '@mui/material';
import BaseModal from './BaseModal';

function ConfirmDeleteModal({
  open,
  message,
  handleClose,
  handleConfirm,
}: {
  open: boolean;
  message?: string;
  handleClose: () => void;
  handleConfirm: () => void;
}) {
  const renderTitle = <Typography variant="h3">Confirm To Delete?</Typography>;
  const renderBottom = (
    <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
      <Button variant="outlined" color="error" onClick={handleClose} sx={{ marginRight: 1 }}>
        Cancel
      </Button>
      <Button variant="outlined" color="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Box>
  );
  const renderBody = <Typography sx={{ color: 'white', margin: 'auto' }}>{message}</Typography>;
  return (
    <BaseModal
      props={{
        open,
        onClose: handleClose,
      }}
      sx={{
        width: 400,
        height: 200,
      }}
      headerChildren={renderTitle}
      bodyChildren={renderBody}
      bottomChildren={renderBottom}
    />
  );
}
export default ConfirmDeleteModal;
