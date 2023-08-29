import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const DragAndDrop = () => {
  const [fileName, setFileName] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  // start input area
  //value from input
  const fileUploadHandlerInput = (e) => {
    // e.preventDefault();
    const clickValue = e.target.value;
    console.log(e.target.value, e.target.files[0]);
    setFileName(clickValue);
  };

  // value from drag and drop
  const fileUploadHandlerDrag = (file) => {
    console.log(file, file.name);
    setFileName(file.name);
  };

  // start drag and drop area
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileWithName = e.dataTransfer.files[0].name.split(".")[1];

    if ((file && file.type === "font/ttf") || fileWithName === "ttf") {
      setErrorMsg("");
      fileUploadHandlerDrag(file);
    } else {
      setFileName("");
      setErrorMsg("Invalid file type. Only TTF files are allowed.");
    }
  };

  return (
    <div className="containers">
      <form
        onClick={() => document.querySelector(".input-field").click()}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
      >
        <div className="w-full text-center text-gray-500">
          <p>
            <AiOutlineCloudUpload className="w-full text-center text-[35px]" />
          </p>
          <h3>
            <span className="text-[black] font-[600]">Click to Upload</span> or
            drag and drop
          </h3>
          <p className="text-[12px]">Only TTF File Allowed</p>
        </div>

        <div>
          <input
            type="file"
            accept=".ttf"
            name="valuesd"
            onChange={fileUploadHandlerInput}
            className="input-field hidden"
          />
        </div>
        <div>
          {fileName && (
            <h4 className="text-[12px]">
              <span className="font-[600]">File Name:</span> {fileName}
            </h4>
          )}
        </div>
        <p className="text-red-500 text-[12px]">{errorMsg}</p>
      </form>
    </div>
  );
};

export default DragAndDrop;
