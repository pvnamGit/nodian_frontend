'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { noop } from 'lodash';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TreeNode } from '@/app/types/types';
import InputNoteOrFolder from '../leftSideBar/InputNoteOrFolder';
import './Tree.scss';
import ContextMenuSideBar from '../leftSideBar/ContextMenu';

function TreeNodeComponent({
  isCreating,
  node,
  toggleNode,
  handleSelect,
  handleCreate,
  handleEditNode,
  handleDeleteNode,
}: {
  isCreating: boolean;
  node: TreeNode;
  toggleNode: (nodeChild: TreeNode) => void;
  handleSelect: (nodeChild: TreeNode) => void;
  handleCreate: (data: any) => void;
  handleEditNode?: (nodeEdit: TreeNode, dataInput: any) => void;
  handleDeleteNode?: (nodeDelete: TreeNode) => void;
}) {
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditInput, setOpenEditInput] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenContextMenu(false);
  };

  const handleOpenMenu = (event: any) => {
    setOpenContextMenu(!openContextMenu);
    setAnchorEl(event.currentTarget);
  };

  const handlePreEdit = (value: any) => {
    if (handleEditNode) {
      handleEditNode(node, value);
    }
  };

  return (
    <div className="tree-node ">
      {openEditInput ? (
        <InputNoteOrFolder
          key={node.id}
          onSubmit={(data: any) => {
            handlePreEdit(data);
            setOpenEditInput(false);
          }}
          valueProps={node.label}
        />
      ) : (
        <div className={`${node.isSelected ? 'node-selected' : ''} row`}>
          <div
            style={{ flex: '1 1 auto', cursor: 'pointer' }}
            onClick={() => {
              handleSelect(node);
              node.isFolder ? toggleNode(node) : noop;
            }}
          >
            {node.isFolder && (
              <span className="folder">
                <span className="toggle-icon">{node.isOpen ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}</span>
              </span>
            )}
            <span className={node.isFolder ? 'folder' : 'file'}>{node.label}</span>
          </div>
          <IconButton onClick={e => handleOpenMenu(e)} sx={{ marginLeft: 'auto', padding: 0, marginRight: 2 }}>
            <MoreHorizIcon color="secondary" sx={{ opacity: 0.5 }} />
          </IconButton>
          <ContextMenuSideBar
            anchorEl={anchorEl}
            open={openContextMenu}
            handleEdit={() => {
              setOpenContextMenu(false);
              setOpenEditInput(true);
            }}
            handleDelete={() => {
              handleDeleteNode ? handleDeleteNode(node) : noop;
              setOpenContextMenu(false);
            }}
            handleClose={handleClose}
          />
        </div>
      )}
      {isCreating && node.isSelected && <InputNoteOrFolder onSubmit={handleCreate} key={node.id} />}
      <ul>
        {node.children &&
          node.isOpen &&
          node.children.map(child => (
            <li key={child.id}>
              <TreeNodeComponent
                key={child.id}
                node={child}
                isCreating={isCreating}
                // eslint-disable-next-line no-shadow
                toggleNode={(child: TreeNode) => toggleNode(child)}
                handleSelect={handleSelect}
                handleCreate={handleCreate}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TreeNodeComponent;
