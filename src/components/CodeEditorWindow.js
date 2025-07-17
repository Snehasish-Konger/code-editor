import React, { useContext, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { AuthContext } from "../context/AuthProvider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeEditorWindow = ({ onChange, onLanguageChange, language, extension, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const [fileName, setFileName] = useState("Main");
  const { user, loggedIn, storage } = useContext(AuthContext);

  useEffect(() => {
    setValue(code || "");
  }, [code]);

  // ---------------------------------------------------------------
  const handleEditorChange = (val) => {
    setValue(val);
    onChange("code", val);
  };

  const handleFileNameChange = (e) => {
    const newFileName = e.target.value;
    setFileName(newFileName);
    const file = `${newFileName}.${extension}`;
    onChange("filename", file);
  };

  const handleSaveCode = async (e) => {
    e.preventDefault();
    if (loggedIn) {
      const storageRef = ref(storage, `codes/${user.uid}/${fileName}.${extension}`);
      const file = new Blob([value], { type: "application/octet-stream" });
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Uploaded a blob or file!");
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("File available at", downloadURL);
        showSuccessToast("Code Saved Successfully!");
      } catch (error) {
        console.log(error);
        showErrorToast("Something went wrong! Please try again.");
      }
    } else {
      showErrorToast("Please login to save your code.");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.${extension}`;
    document.body.appendChild(element);
    element.click();
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        setValue(text);
        onChange("code", text);
      };
      reader.readAsText(file);
      if (file) {
        const full = file.name;
        const idx = full.lastIndexOf(".");
        if (idx !== -1) {
          const base = full.substring(0, idx);
          const ext = full.substring(idx + 1);
          setFileName(base);
          onChange("filename", full);
          if (onLanguageChange) onLanguageChange(ext);
        } else {
          setFileName(full);
          onChange("filename", full);
        }
      }
    };
    input.click();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    showSuccessToast("Code Copied Successfully!");
  };

  // Success and Error Toasts ---------------------------------------
  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="md:flex flex-row">
        <div className="px-4 py-2">
          <button onClick={handleSaveCode} title="Save Code">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-save"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl border-2 border-gray-900">
        <div className="flex justify-between items-center bg-[#f6f8fa] text-gray-800 p-2 border-b-2 border-gray-900">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-body-text"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
            <span className="text-gray-800 font-medium text-lg">
              <input
                className="bg-transparent focus:outline-none text-gray-800 text-right"
                size={fileName.length || 1}
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
              />
              <span className="pl-0">.{extension}</span>
            </span>
            <button
              className="text-gray-800 p-2 rounded-lg"
              onClick={() => {
                setFileName("New");
                setValue("");
                onChange("code", "");
                onChange("filename", `New.${extension}`);
              }}
              title="New File"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center">
            <button
              className="text-gray-800 p-2 rounded-lg"
              onClick={handleCopy}
              title="Copy"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
              </svg>
            </button>
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
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
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                transform="rotate(180)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        </div>
        <Editor
          height="85vh"
          width={`100%`}
          file={`${fileName}.${extension}`}
          language={language || "javascript"}
          value={value}
          theme={theme}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
      </div>
    </>
  );
};

export default CodeEditorWindow;
