import React, { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

const ExplorerSidebar = ({ tree, setTree, onOpenFile }) => {
  const [expanded, setExpanded] = useState({});
  const [context, setContext] = useState(null);

  const toggle = (id) => {
    setExpanded({ ...expanded, [id]: !expanded[id] });
  };

  const handleContextMenu = (e, node) => {
    e.preventDefault();
    setContext({ x: e.clientX, y: e.clientY, node });
  };

  const closeContext = () => setContext(null);

  const addFile = (folder) => {
    const name = window.prompt("File name");
    if (!name) return;
    const file = { id: generateId(), type: "file", name, content: "" };
    folder.children = folder.children ? [...folder.children, file] : [file];
    setTree([...tree]);
  };

  const addFolder = (folder) => {
    const name = window.prompt("Folder name");
    if (!name) return;
    const dir = { id: generateId(), type: "folder", name, children: [] };
    folder.children = folder.children ? [...folder.children, dir] : [dir];
    setTree([...tree]);
  };

  const renameNode = (node) => {
    const name = window.prompt("Rename", node.name);
    if (!name) return;
    node.name = name;
    setTree([...tree]);
  };

  const deleteNode = (folder, node) => {
    folder.children = folder.children.filter((n) => n.id !== node.id);
    setTree([...tree]);
  };

  const renderNodes = (nodes, depth = 0, parent = null) => {
    return nodes.map((node) => {
      const isFolder = node.type === "folder";
      const isOpen = expanded[node.id];
      return (
        <div key={node.id} className="select-none">
          <div
            onContextMenu={(e) => handleContextMenu(e, { node, parent })}
            onClick={() => (isFolder ? toggle(node.id) : onOpenFile(node))}
            className="flex items-center pr-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            style={{ paddingLeft: depth * 16 }}
          >
            {isFolder ? (
              isOpen ? (
                <ChevronDownIcon className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRightIcon className="w-4 h-4 mr-1" />
              )
            ) : (
              <span className="w-4 h-4 mr-1" />
            )}
            {isFolder ? (
              <FolderIcon className="w-4 h-4 mr-1" />
            ) : (
              <DocumentIcon className="w-4 h-4 mr-1" />
            )}
            <span>{node.name}</span>
          </div>
          {isFolder && isOpen && node.children && (
            <div>
              {renderNodes(node.children, depth + 1, node)}
            </div>
          )}
        </div>
      );
    });
  };

  const handleAction = (action) => {
    const { node, parent } = context;
    if (action === "newFile") addFile(node);
    if (action === "newFolder") addFolder(node);
    if (action === "rename") renameNode(node);
    if (action === "delete" && parent) deleteNode(parent, node);
    closeContext();
  };

  return (
    <div className="relative w-64 bg-gray-100 dark:bg-gray-800 text-sm overflow-auto" onClick={closeContext}>
      {renderNodes(tree)}
      {context && (
        <ul
          className="absolute bg-white dark:bg-gray-700 border rounded shadow text-gray-800 dark:text-gray-100 z-50"
          style={{ top: context.y, left: context.x }}
        >
          {context.node.type === "folder" && (
            <>
              <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleAction("newFile")}>New File</li>
              <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleAction("newFolder")}>New Folder</li>
            </>
          )}
          <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleAction("rename")}>Rename</li>
          {context.node !== tree && (
            <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer" onClick={() => handleAction("delete")}>Delete</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ExplorerSidebar;
