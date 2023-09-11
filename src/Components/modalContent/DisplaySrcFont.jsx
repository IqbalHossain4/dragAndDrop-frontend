import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import useSelectedFonts from "../../Hooks/useSelectedFonts";
import useFonts from "../../Hooks/useFonts";

const DisplaySrcFont = ({ srcData }) => {
  const srcFonts = srcData;
  const [loadTotalFonts, getFont] = useFonts();
  const [loadSelectedFonts, selectFont] = useSelectedFonts();
  const [selectedFont, setSelectedFont] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState([]);

  // ==== Filter Data in SelectedFonts Hook and loadTotalFonts Hook ====
  useEffect(() => {
    if (loadSelectedFonts) {
      setSelectedFont(
        loadSelectedFonts.filter((font) => font.fontId !== loadTotalFonts.id)
      );
    }
  }, [loadSelectedFonts]);

  // ==== Store Data Whice are Selected ====
  const uploadSelectedFont = async (fontId) => {
    const selectedFontData = loadTotalFonts.find((font) => font.id === fontId);

    if (!selectedFontData) {
      setErrorMsg("Font data not found");
      return;
    }

    const isFontSelected = selectedGroup.some(
      (font) => font.fontId === selectedFontData.id
    );

    if (isFontSelected) {
      setErrorMsg("Font is already selected");
    } else {
      if (groupName === "") {
        setErrorMsg("First Define The Group Name");
        return;
      } else {
        setErrorMsg("");
        setInputMsg("");
        let fonts = {
          fontUrl: selectedFontData.fontUrl,
          fontName: selectedFontData.fontName,
          status: "Selected",
          fontId: selectedFontData.id,
          groupName: groupName,
        };
        setSelectedGroup((prevData) => [...prevData, fonts]);
      }
    }
  };

  // ==== Post Font ====
  const createGroup = async () => {
    if (groupName === "") {
      setInputMsg("Enter The Group Name");
      return;
    }
    if (selectedGroup.length === 0) {
      setErrorMsg("Please Select a Font");
      return;
    } else {
      setErrorMsg("");
      setInputMsg("");
      const fontData = selectedGroup;
      const res = await axios.post(
        "http://localhost/projects/dragDrop/selectedFonts.php",
        fontData
      );
      if (res.status === 200) {
        selectFont();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Create a Group",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <div className="mt-12 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-[600] text-[18px] mb-4">Group Name:</h3>
          <div className="relative w-[45px]  mt-4 mr-8 mb-8">
            <FaShoppingCart className="text-2xl text-[#2c3845]" />
            <div className="bg-pink-400 text-white text-sm text-center rounded-[100%] w-6 h-6 absolute -top-2 -right-1 flex items-center justify-center">
              <span>
                {selectedFont
                  ? selectedFont.length
                    ? srcFonts.length !== loadSelectedFonts.length
                      ? selectedGroup.length + selectedFont.length
                      : srcFonts.length == loadSelectedFonts.length &&
                        srcFonts.length
                    : 0
                  : 0}
              </span>
            </div>
          </div>
        </div>
        <input
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter Group Name"
          className="w-full py-2 px-2 bg-[#2c3845] text-white outline-none border rounded"
        />
        {inputMsg && <p className="text-red-500 mt-4">{inputMsg}</p>}
      </div>

      <h3 className="font-[600] text-[18px] mb-4">Upload Fonts:</h3>
      <table id="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Font Name</th>
            <th>Preview</th>
            <th>Added Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {srcFonts.map((font, index) => (
            <tr key={index} className="text-[14px]">
              <td>{index + 1}</td>
              <td>{font.fontName}</td>
              <td>{font.fontName?.split("-")[0]}</td>
              <td>{font.upload_at.split(" ")[0]}</td>
              <td className="text-center">
                <button
                  onClick={() => uploadSelectedFont(font.id)}
                  className={`md:w-[120px] py-1 text-center text-black rounded-md md:text-[18px] text-[12px] font-[600] ${
                    selectedFont.some((fontData) => fontData.fontId === font.id)
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-white cursor-pointer"
                  }`}
                >
                  {loadSelectedFonts &&
                  selectedFont.some((fontData) => fontData.fontId === font.id)
                    ? "Selected"
                    : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
      <button onClick={createGroup} className="btn">
        Create Group
      </button>
    </div>
  );
};

export default DisplaySrcFont;
