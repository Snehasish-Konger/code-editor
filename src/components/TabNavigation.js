import React from "react";
import { classnames } from "../utils/general";

const TabNavigation = ({ tabs, activeTabId, onSelect, onClose }) => {
  return (
    <div className="flex overflow-x-auto bg-gray-200 dark:bg-gray-700 border-b-2 border-gray-900">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={classnames(
            "flex items-center px-3 py-1 cursor-pointer border-r border-gray-400 dark:border-gray-600 whitespace-nowrap",
            activeTabId === tab.id
              ? "bg-white dark:bg-gray-800 text-black dark:text-white"
              : "hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
          )}
        >
          <span className="mr-2 truncate max-w-[10rem]">{tab.filename}</span>
          <button
            className="text-gray-500 hover:text-red-500 ml-1"
            onClick={(e) => {
              e.stopPropagation();
              onClose(tab.id);
            }}
          >
            &#x2715;
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabNavigation;
