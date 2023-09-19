'use client';

/* eslint-disable no-undef */
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

function ContextMenuSideBar({
  anchorEl,
  open = false,
  handleEdit,
  handleDelete,
  handleClose,
}: {
  anchorEl: any;
  open: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleClose: () => void;
}) {
  const MENU_CONTEXT = [
    { name: 'Edit', icon: <EditIcon sx={{ marginRight: 2 }} />, action: handleEdit },
    { name: 'Delete', icon: <DeleteIcon sx={{ marginRight: 2 }} />, action: handleDelete },
  ];

  return (
    <Menu
      sx={{
        position: 'absolute',
        top: 0,
      }}
      id="context-menu-side-bar"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {MENU_CONTEXT.map(menu => (
        <MenuItem key={menu.name} onClick={menu.action}>
          {menu.icon}

          {menu.name}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default ContextMenuSideBar;
