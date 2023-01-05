import React from "react";
import { classnames } from "../utils/general";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className={classnames(
      "outline-none w-full border-2 border-black z-10 rounded-lg shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 mt-4"
    )}>
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-lg bg-gray-100">
          {outputDetails?.status?.description}
          {outputDetails?.status?.description === "Accepted" ? (
            <span className="text-green-500 ml-2">✔</span>
          ) : (
            <span className="text-red-500 ml-2">✘</span>
          )}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-lg bg-gray-100">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-lg bg-gray-100">
          {outputDetails?.time}
        </span>
      </p>
    </div>
    </div>
  );
};

export default OutputDetails;
