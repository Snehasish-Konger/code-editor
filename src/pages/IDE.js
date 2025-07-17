import React, { useState } from "react";
import ActivityBar from "../components/ActivityBar";
import ExplorerSidebar from "../components/ExplorerSidebar";
import CodeEditorWindow from "../components/CodeEditorWindow";
import Panel from "../components/Panel";
import StatusBar from "../components/StatusBar";
import TabNavigation from "../components/TabNavigation";

const initialTree = [
  {
    id: "root",
    type: "folder",
    name: "project",
    children: [
      {
        id: "src",
        type: "folder",
        name: "src",
        children: [
          { id: "index", type: "file", name: "index.js", content: "console.log('Hello');" },
        ],
      },
      { id: "readme", type: "file", name: "README.md", content: "# Project" },
    ],
  },
];

const IDE = () => {
  const [tree, setTree] = useState(initialTree);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");

  const openFile = (node) => {
    setFilename(node.name);
    setCode(node.content || "");
    setActiveTab(node.id);
    if (!tabs.find((t) => t.id === node.id)) {
      setTabs([...tabs, { id: node.id, filename: node.name, node }]);
    }
  };

  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
      setTree((prev) => {
        const update = JSON.parse(JSON.stringify(prev));
        const updateNode = (nodes) => {
          nodes.forEach((n) => {
            if (n.id === activeTab) {
              n.content = data;
            } else if (n.children) {
              updateNode(n.children);
            }
          });
        };
        updateNode(update);
        return update;
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <ActivityBar />
        <ExplorerSidebar tree={tree} setTree={setTree} onOpenFile={openFile} />
        <div className="flex-1 flex flex-col">
          <TabNavigation
            tabs={tabs}
            activeTabId={activeTab}
            onSelect={(id) => {
              const t = tabs.find((tb) => tb.id === id);
              if (t) {
                setActiveTab(id);
                setFilename(t.filename);
                setCode(t.node.content || "");
              }
            }}
            onClose={(id) => {
              setTabs(tabs.filter((t) => t.id !== id));
              if (activeTab === id) {
                const next = tabs.filter((t) => t.id !== id)[0];
                if (next) {
                  setActiveTab(next.id);
                  setFilename(next.filename);
                  setCode(next.node.content || "");
                } else {
                  setActiveTab(null);
                  setFilename("");
                  setCode("");
                }
              }
            }}
          />
          {activeTab && (
            <CodeEditorWindow
              code={code}
              filename={filename}
              onChange={onChange}
              language="javascript"
              extension="js"
              theme="vs-dark"
            />
          )}
          <Panel />
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default IDE;
