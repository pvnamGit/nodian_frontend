/* eslint-disable no-undef */
import { Box, Divider, Modal, ModalProps, SxProps, Typography } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 250,
  backgroundColor: '#2b2b2b',
  border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function BaseModal({
  sx,
  props,
  headerChildren,
  bodyChildren,
  bottomChildren,
}: {
  sx?: any;
  props: any;
  headerChildren: JSX.Element | null;
  bodyChildren: JSX.Element | null;
  bottomChildren: JSX.Element | null;
}) {
  return (
    <Modal {...props}>
      <Box sx={{ ...style, ...sx }}>
        <Box sx={{ display: 'flex', color: 'white', height: 80, alignItems: 'center' }} id="modal-header">
          {headerChildren}
        </Box>
        <Divider light />
        <Box sx={{ display: 'flex', margin: 'auto', height: `calc(${sx.height}px - 180px)`, minHeight: '100px' }} id="modal-body">
          {bodyChildren}
        </Box>
        <Divider light />
        <Box sx={{ alignItems: 'center', alignContent: 'center', display: 'flex', padding: 2 }} id="moda-bottom">
          {bottomChildren}
        </Box>
      </Box>
    </Modal>
  );
}

export default BaseModal;
