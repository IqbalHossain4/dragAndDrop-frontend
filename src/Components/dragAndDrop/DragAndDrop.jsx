import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const DragAndDrop = () => {
  return (
    <div className="containers">
      <form
        action=""
        onClick={() => document.querySelector(".input-field").click()}
      >
        <div className="w-full text-center text-gray-500">
          <p>
            <AiOutlineCloudUpload className="w-full text-center text-[35px]" />
          </p>
          <h3>
            <span className="text-[black]">Click to Upload</span>or drag and
            drop
          </h3>
          <p className="text-[14px]">Only TTF File Allowed</p>
        </div>
        <input
          type="file"
          accept=".ttf"
          name=""
          className="input-field "
          hidden
        />
      </form>
    </div>
  );
};

export default DragAndDrop;
