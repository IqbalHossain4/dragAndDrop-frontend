import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
const DragAndDrop = () => {
  const [fontUrl, setFontUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fontName = fontUrl ? fontUrl.name.split(".")[0] : null;

  // start drag and drop area
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  // value from drag and drop
  const fileUploadHandlerDrag = (file) => {
    setFontUrl(file ? file : null);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileWithName = e.dataTransfer.files[0].name.split(".")[1];

    if ((file && file.type === "font/ttf") || fileWithName === "ttf") {
      setErrorMsg("");
      fileUploadHandlerDrag(file ? file : null);
    } else {
      setFontUrl("");
      setErrorMsg("Invalid file type. Only TTF files are allowed.");
    }
  };

  const uploadTtfFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fontUrl", fontUrl);
    formData.append("fontName", fontName);
    const responce = await axios.post(
      "http://localhost/projects/dragDrop/upload.php",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (responce.data.success) {
      setErrorMsg(responce.data.success);
    }
  };

  // if (fontUrl) {
  //   uploadTtfFile();
  // }
  return (
    <div className="containers">
      <form
        onClick={() => document.querySelector(".input-field").click()}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        onSubmit={uploadTtfFile}
        className="dragDropBox"
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
            onChange={(e) => setFontUrl(e.target.files[0])}
            className="input-field hidden"
          />
        </div>
        <div>
          {fontUrl && (
            <h4 className="text-[12px]">
              <span className="font-[600]">File Name:</span> {fontUrl.name}
            </h4>
          )}
        </div>
        {errorMsg && <p className="text-red-500 text-[12px]">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default DragAndDrop;
