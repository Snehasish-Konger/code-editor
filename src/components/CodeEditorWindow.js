import React, { useState } from "react";
import Editor from "@monaco-editor/react";


const CodeEditorWindow = ({ onChange, language, extension, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [fileName, setFileName] = useState("Untitled");



  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.${extension}`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.file = `${fileName}.${extension}`;
    // input.accept = `.${extension}`;
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setValue(text);
        onChange("code", text);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl border-2 border-gray-900">
      <div className="flex justify-between items-center bg-[#f6f8fa] text-gray-800 p-2 border-b-2 border-gray-900">
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
              stroke-width="1"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <input
            className="bg-transparent focus:outline-none  text-gray-800"
            size={fileName.length}
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <span className="text-gray-800 font-medium text-lg">
            .{extension}
          </span>
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-800 p-2 rounded-lg"
            onClick={handleDownload}
            title="Download"
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
                stroke-width="1"
                d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
          <button
            className="text-gray-800 p-2 rounded-lg"
            onClick={handleUpload}
            title="Upload"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              transform="rotate(180)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
