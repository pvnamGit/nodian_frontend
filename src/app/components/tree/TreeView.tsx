import { useState } from 'react';
import { flatMapDeep, flattenDeep, isEmpty } from 'lodash';
import { TreeNode } from '@/app/types/types';
import { getFlattenData, getPaths } from '@/app/utils/treeNodeUtils';
import TreeNodeComponent from './TreeNodeComponent';
import './Tree.css';

function TreeView({
  data,
  isCreating = false,
  selectedNodeId,
  deselected = false,
  handleCreate,
  onSelect,
  handleEditNode,
  handleDeleteNode,
}: {
  data: TreeNode[];
  isCreating: boolean;
  deselected?: boolean;
  selectedNodeId: number | string | null;
  handleCreate: (inputData: any) => void;
  onSelect?: (node: TreeNode) => void;
  handleEditNode?: (nodeEdit: TreeNode, dataInput: any) => void;
  handleDeleteNode?: (node: TreeNode) => void;
}) {
  const [treeData, setTreeData] = useState(data);

  const toggleNode = (node: TreeNode) => {
    node.isOpen = !node.isOpen;
    setTreeData([...data]); // To trigger re-render
  };

  if (deselected) {
    const flattenNode = flatMapDeep(treeData, getFlattenData);
    const currentSelectedNode = flattenNode.find(it => it.isSelected);
    if (currentSelectedNode) {
      currentSelectedNode.isSelected = false;
      setTreeData([...data]);
    }
  }

  const selectNode = (node: TreeNode) => {
    deselected = false;
    const flattenNode = flatMapDeep(treeData, getFlattenData);
    const prevSelectedNode = flattenNode.find(it => it.isSelected);
    if (prevSelectedNode) {
      prevSelectedNode.isSelected = false;
    }
    node.isSelected = !node.isSelected;
    if (onSelect) {
      onSelect(node);
    }
    setTreeData([...data]);
  };

  return (
    <div className="tree-view">
      {data.map((node: TreeNode) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          isCreating={isCreating}
          toggleNode={toggleNode}
          handleSelect={selectNode}
          handleCreate={handleCreate}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
        />
      ))}
    </div>
  );
}

export default TreeView;
