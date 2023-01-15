import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { value: code || "", language: language || "clang", fileName: "Main" },
  ]);

  const handleEditorChange = (value, index) => {
    const newTabs = [...tabs];
    newTabs[index].value = value;
    setTabs(newTabs);
    onChange("code", value);
  };

  const handleFileNameChange = (e, index) => {
    const newTabs = [...tabs];
    newTabs[index].fileName = e.target.value;
    setTabs(newTabs);
  };

  const handleNewFile = () => {
    setTabs([...tabs, { value: "", language: "clang", fileName: "New File" }]);
    setActiveTab(tabs.length);
    onChange("code", "");
  };

  const handleDeleteEditor = (index) => {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);
    if (activeTab === index) {
      setActiveTab(0);
    }
    else if (activeTab > index) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleDownload = (activeTab) => {
    const file = new Blob([tabs[activeTab].value], { type: "text/plain" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${tabs[activeTab].fileName}.${tabs[activeTab].language}`;
    link.click();
  };

  const handleNavigate = (index) => {
    setActiveTab(index);
    onChange("code", tabs[index].value);
    Editor.current.setValue(tabs[index].value);
  };
  

  return (
    <div className="overlay rounded-lg overflow-hidden w-full h-full shadow-4xl border-2 border-black">
      <div className="flex justify-between items-center bg-gray-800 text-gray-100 p-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <input
            type="text"
            className="bg-gray-800 text-gray-100 text:border-none"
            placeholder="File name"
            value={tabs[activeTab].fileName}
            onChange={(e) => handleFileNameChange(e, activeTab)}
          />
          <span className="text-gray-100">.{language}</span>
          {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <button onClick={() => handleNavigate(index)}>{tab.fileName}</button>
            <button
              className="text-gray-100 p-2 rounded-lg"
              onClick={() => handleDeleteEditor(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-100 p-2 rounded-lg"
            onClick={handleNewFile}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
          <button
            className="text-gray-100 p-2 rounded-lg"
            onClick={() => handleDownload(activeTab)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
        <Editor
          height="85vh"
          width={`100%`}
          defaultLanguage={tabs[activeTab].language}
          defaultValue={tabs[activeTab].value}
          onChange={(value) => handleEditorChange(value, activeTab)}
          theme={theme}
        />
    </div>
  );
};

export default CodeEditorWindow;
