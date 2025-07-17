import React from "react";
import {
  FolderIcon,
  MagnifyingGlassIcon,
  SquaresPlusIcon,
  PuzzlePieceIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const items = [
  { id: "explorer", icon: FolderIcon, title: "Explorer" },
  { id: "search", icon: MagnifyingGlassIcon, title: "Search" },
  { id: "source", icon: SquaresPlusIcon, title: "Source Control" },
  { id: "extensions", icon: PuzzlePieceIcon, title: "Extensions" },
  { id: "settings", icon: Cog6ToothIcon, title: "Settings" },
];

const ActivityBar = ({ active, onChange }) => {
  return (
    <div className="flex flex-col items-center w-12 bg-gray-800 text-gray-300 py-2 space-y-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            title={item.title}
            onClick={() => onChange && onChange(item.id)}
            className={`p-1 rounded-md hover:bg-gray-700 ${active === item.id ? 'bg-gray-700 text-white' : ''}`}
          >
            <Icon className="h-6 w-6" />
          </button>
        );
      })}
    </div>
  );
};

export default ActivityBar;
