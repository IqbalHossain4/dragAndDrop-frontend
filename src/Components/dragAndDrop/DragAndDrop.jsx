import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import useFonts from "../../Hooks/useFonts";

const DragAndDrop = () => {
  const { user } = useContext(AuthContext);
  const [loadTotalFonts, getFont] = useFonts();
  const [fontUrl, setFontUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fontName = fontUrl ? fontUrl.name.split(".")[0] : null;
  const [dragOver, setDragOver] = useState(false);

  //==== start drag and drop area ====
  const dragOverHandler = (e) => {
    e.preventDefault();
    setDragOver(!dragOver);
    if (e.dataTransfer.types.includes("Files")) {
      setDragOver(true);
    } else {
      setDragOver(false);
    }
  };

  // ==== value from drag and drop ====
  const fileUploadHandlerDrag = (file) => {
    setFontUrl(file ? file : null);
  };

  //=== Filter Font ====
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
    setDragOver(false);
  };

  // ==== post Fonts File ====
  const email = user?.email;
  const uploadFont = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("font", fontUrl);
    formData.append("fontName", fontName);
    const res = await axios.post(
      "https://tech-charms-seven.vercel.app/postFont",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      }
    );

    if (uploadProgress == 100) {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        getFont();
      }
    }
  };

  // ==== call Post Function ====
  if (fontUrl) {
    if (!fontUrl) {
      return;
    } else {
      uploadFont();
      setFontUrl("");
    }
  }
  return (
    <div className="pb-24 mb-8 pt-16 bg-black">
      <div className="wrapper">
        <div className="text-center mb-8 text-white">
          <h2 className="text-xl font-[600] ">
            Drag & Drop your Favorite Font
          </h2>
          <p className="mb-4 mt-2 md:font-[600] font-[400]  md:text-xs text-[15px] text-gray-400">
            Upload Click and Drag & Drop
          </p>
          <hr className="bg-black" />
        </div>
        <div className="md:w-[500px] w-[90%] mx-auto mb-2">
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress > 0 && (
                <span className="progress-label">{uploadProgress}%</span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <form
            onClick={() => document.querySelector(".input-field").click()}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            className={`dragDropBox  ${
              dragOver ? "bg-gray-800 bg-opacity-50" : "bg-black"
            } `}
          >
            <div className="w-full text-center text-gray-500">
              <p>
                <AiOutlineCloudUpload className="w-full text-center text-[35px]" />
              </p>
              <h3 className="text-gray-400 md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                <span className="text-white ">Click to Upload</span> or drag and
                drop
              </h3>
              <p className="text-[12px] text-gray-400">Only TTF File Allowed</p>
            </div>

            <div>
              <input
                type="file"
                accept=".ttf"
                name="font"
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
      </div>
    </div>
  );
};

export default DragAndDrop;
