import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-lg overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "clang"}
        value={value}
        theme={theme}
        defaultValue="// Add your code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
