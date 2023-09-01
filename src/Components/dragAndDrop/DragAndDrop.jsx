import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import DisplayFont from "../DisplayFonts/DisplayFont";
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

  //Filter Font
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

  // post Fonts File
  const uploadFont = async () => {
    const formData = new FormData();
    formData.append("fontUrl", fontUrl);
    formData.append("fontName", fontName);
    const res = await axios.post(
      "http://localhost/projects/dragDrop/upload.php",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (res) {
      setErrorMsg(res.data.success);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Font Successfully Uploaded",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //call Post Function
  if (fontUrl) {
    uploadFont();
  }

  return (
    <div className="wrapper">
      <div className="containers">
        <form
          onClick={() => document.querySelector(".input-field").click()}
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
          className="dragDropBox"
        >
          <div className="w-full text-center text-gray-500">
            <p>
              <AiOutlineCloudUpload className="w-full text-center text-[35px]" />
            </p>
            <h3>
              <span className="text-[black] font-[600]">Click to Upload</span>{" "}
              or drag and drop
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
      {/* Display Font */}
      <div className="my-16">
        <DisplayFont />
      </div>
    </div>
  );
};

export default DragAndDrop;
