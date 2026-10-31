import React, { useEffect, useState, useRef, useContext } from "react";
import CodeEditorWindow from "../components/CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { encodeBase64 } from "../utils/base64";
import { lang } from "../constants/lang";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "../components/OutputWindow";
import CustomInput from "../components/CustomInput";
import OutputDetails from "../components/OutputDetails";
import ThemeDropdown from "../components/ThemeDropdown";
import LanguagesDropdown from "../components/LanguagesDropdown";
import TabNavigation from "../components/TabNavigation";
import Toolbox from "../components/Toolbox";
import { AuthContext } from "../context/AuthProvider";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, addDoc, collection } from "firebase/firestore";

const Default = `/**************************************************
You can write code in any of the languages supported by the compiler.
You can also write your own custom input and see the output. ( Give the input prior to running the code smoothly.)
You can also change the theme of the editor.
**************************************************/
// Sample C code
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {
    int a, b;
    float c, d;
    scanf("%d %d", &a, &b);
    scanf("%f %f", &c, &d);
    printf("%d %d", a+b, a-b);
    printf(" %.1f %.1f", c+d, c-d);
    return 0;
}
`;

const Landing = () => {
  const { user, loggedIn, storage } = useContext(AuthContext);

  const initialLang = lang[4];
  const initialTab = {
    id: 1,
    code: Default,
    filename: "Main.c",
    language: initialLang,
  };

  const [tabs, setTabs] = useState([initialTab]);
  const [activeTab, setActiveTab] = useState(1);
  const [code, setCode] = useState(Default);
  const [filename, setFilename] = useState("Main.c");
  const [language, setLanguage] = useState(initialLang);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("github");
  const idRef = useRef(1);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  // Function starts here ---------------------------------------------------------------------------------------------------

  const onSelectChange = (sl) => {
    updateLanguage(sl);
  };

  // Keep the active tab in sync so switching tabs restores its language.
  const updateLanguage = (newLang) => {
    setLanguage(newLang);
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTab ? { ...t, language: newLang } : t))
    );
  };

  const addEditor = () => {
    idRef.current += 1;
    const newId = idRef.current;
    const newFile = `File${newId}.${language.extension}`;
    const newTab = { id: newId, code: "", filename: newFile, language };
    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newId);
    setCode("");
    setFilename(newFile);
  };

  const switchTab = (id) => {
    const tab = tabs.find((t) => t.id === id);
    if (tab) {
      setActiveTab(id);
      setCode(tab.code);
      setFilename(tab.filename);
      setLanguage(tab.language);
    }
  };

  const closeTab = (id) => {
    let updated = tabs.filter((t) => t.id !== id);
    if (updated.length === 0) {
      idRef.current += 1;
      const fallback = {
        id: idRef.current,
        code: "",
        filename: `File${idRef.current}.${language.extension}`,
        language,
      };
      updated = [fallback];
    }
    setTabs(updated);
    if (activeTab === id) {
      const next = updated[updated.length - 1];
      setActiveTab(next.id);
      setCode(next.code);
      setFilename(next.filename);
      setLanguage(next.language);
    }
  };

  const handleSaveCode = async () => {
    if (loggedIn) {
      const storageRef = ref(storage, `codes/${user.uid}/${filename}`);
      const file = new Blob([code], { type: "application/octet-stream" });
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then(() => {
            showSuccessToast("Code Saved Successfully!");
          });
        })
        .catch(() => {
          showErrorToast("Something went wrong! Please try again.");
        });
    } else {
      showErrorToast("Please login to save your code.");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target.result;
        setCode(text);
        setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, code: text } : t)));
      };
      reader.readAsText(file);
      if (file) {
        const full = file.name;
        setFilename(full);
        setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, filename: full } : t)));
        const idx = full.lastIndexOf(".");
        if (idx !== -1) {
          const ext = full.substring(idx + 1);
          setLanguageByExtension(ext);
        }
      }
    };
    input.click();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    showSuccessToast("Code Copied Successfully!");
  };

  const setLanguageByExtension = (ext) => {
    const found = lang.find((l) => l.extension === ext);
    if (found) {
      updateLanguage(found);
    }
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
      setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, code: data } : t)));
    } else if (action === "filename") {
      setFilename(data);
      setTabs((prev) => prev.map((t) => (t.id === activeTab ? { ...t, filename: data } : t)));
    } else {
      console.warn("case not handled!", action, data);
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      source_file: encodeBase64(filename),
      language_id: language.id,
      // encode source code in base64
      source_code: encodeBase64(code),
      stdin: encodeBase64(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response?.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Try again tomorrow.`,
            10000
          );
        } else {
          showErrorToast();
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("github-dark").then((_) =>
      setTheme({ value: "github-dark", label: "GitHub Dark" })
    );
  }, []);

  // Functions ends here -------------------------------------------------------------------------------------------------------

  // Toasts -------------------------------------------------------------------------------------------------------

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

  // Toasts -------------------------------------------------------------------------------------------------------

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
      <div className="flex justify-center items-center mx-4 my-4">
        <div
          className="border-2 border-black bg-[#e2e4ff]  text-black leading-none rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-6 py-2 hover:shadow transition duration-200 md:flex flex-row"
          role="alert"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-semibold pr-2 flex-auto">
              Your Feedback matters! Please fill this form to help us improve
            </span>
            <a
              href="https://forms.gle/kwMGsyT6jwujcqiZA"
              target="_blank"
              rel="noreferrer noopener"
              className="flex-none rounded-md bg-gray-800 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <svg
                className="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="md:flex flex-row">
        <div className="px-4 py-2">
          <span className="text-lg font-semibold">Code Editor</span>
          <LanguagesDropdown
            value={language}
            onSelectChange={onSelectChange}
          />
        </div>
        <div className="px-4 py-2">
          <span className="text-lg font-semibold">Theme</span>
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <Toolbox
          onCopy={handleCopy}
          onDownload={handleDownload}
          onUpload={handleUpload}
          onSave={handleSaveCode}
        />
      </div>
      <TabNavigation
        tabs={tabs}
        activeTabId={activeTab}
        onSelect={switchTab}
        onClose={closeTab}
      />
      <div className="md:flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            filename={filename}
            onChange={onChange}
            onNewTab={addEditor}
            onLanguageChange={setLanguageByExtension}
            language={language?.value}
            extension={language?.extension}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 md:w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-[#9cff8f] flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Execute"}
            </button>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};
export default Landing;
