import axios from "axios";
import React, { useEffect, useState } from "react";
import useSelectedFonts from "../../Hooks/useSelectedFonts";
import { AiFillPlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import useFonts from "../../Hooks/useFonts";
import { FaShoppingCart } from "react-icons/fa";

const UpdateGroup = ({ groupData }) => {
  const [loadTotalFonts, getFont] = useFonts();
  const [loadSelectedFonts, selectFont] = useSelectedFonts();
  const [groupDatas, setGroupDatas] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState([]);

  // ==== Get Data with GroupName in GroupData Table ====
  useEffect(() => {
    getGroupData();
  }, [loadSelectedFonts]);

  const getGroupData = async () => {
    const res = await axios
      .get(
        `http://localhost/projects/dragDrop/groupData.php?groupName=${groupData}`
      )
      .then((res) => setGroupDatas(res.data));
  };

  //==== process Group Data ====
  let storeGroupData = [];
  for (const x in groupDatas) {
    const moreData = groupDatas[x];
    for (const y in moreData) {
      const singleData = moreData[y];
      for (const i in singleData) {
        storeGroupData.push(singleData[i]);
      }
    }
  }

  // ==== Filter Data Whice are contain fontName ====
  const remainingFont = storeGroupData.filter((fontData) => fontData.fontName);

  // ==== Find Out Remaining Fonts ====
  const remainingFonts = loadTotalFonts.filter((font) => {
    return !loadSelectedFonts.some((fontData) => fontData.fontId === font.id);
  });

  // ==== Handle Add New Font whice are remaining ====
  const handleAddNew = async (id) => {
    const selectedFontData = loadTotalFonts.find((font) => font.id === id);
    const fontData = [
      {
        fontUrl: selectedFontData.fontUrl,
        fontName: selectedFontData.fontName,
        status: "Selected",
        fontId: selectedFontData.id,
        groupName: groupData,
      },
    ];

    const res = await axios.post(
      "http://localhost/projects/dragDrop/selectedFonts.php",
      fontData
    );
    if (res.status === 200) {
      selectFont();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Post Your Font",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  //==== Handle Remove with specific id in selectedFonts Table====
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axios.delete(
          "http://localhost/projects/dragDrop/selectedFonts.php/" + id
        );
        if (res.status === 200) {
          getFont();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // ==== Font Preview ====
  useEffect(() => {
    loadAndApplyFonts();
  }, [loadTotalFonts]);

  // ...
  const loadAndApplyFonts = () => {
    const fontsToLoad = [];
    loadTotalFonts.forEach((font) => {
      const fontName = `"${font.fontName}"`;
      const fontUrl = font.fontUrl;

      if (!loadedFonts.includes(fontName)) {
        fontsToLoad.push({ fontName, fontUrl });
        setLoadedFonts((prevFonts) => [...prevFonts, fontName]);
      }
    });

    const style = document.createElement("style");
    let fontFaceCSS = "";

    fontsToLoad.forEach((font) => {
      fontFaceCSS += `
      @font-face {
        font-family: ${font.fontName?.split("-")[0]};
        src: url(${font.fontUrl}) format('truetype');
      }
    `;
    });

    style.appendChild(document.createTextNode(fontFaceCSS));
    document.head.appendChild(style);
    const previewElements = document.querySelectorAll(".font-preview");
    previewElements.forEach((element) => {
      const fontName = element.getAttribute("data-font-name");
      element.style.fontFamily = fontName;
    });
  };

  return (
    <div className="modal_container">
      <div className="mt-12 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setAddNew(!addNew)}
            className="mb-6 shadow py-3 px-3 text-[40px] text-green-500 cursor-pointer"
            title="Add New Title"
          >
            <AiFillPlusCircle />
          </button>

          <div className="relative w-[45px]  mt-4 mr-8 mb-8">
            <FaShoppingCart className="text-2xl text-[#2c3845]" />
            <div className="bg-pink-400 text-white text-sm text-center rounded-[100%] w-6 h-6 absolute -top-2 -right-1 flex items-center justify-center">
              <span>{remainingFont.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-[600] text-[18px] mb-4">Group Name:</h3>
        </div>
        <input
          type="text"
          placeholder="Enter Group Name"
          className="w-full py-2 px-2 bg-[#2c3845] text-white outline-none border rounded "
          readOnly
          defaultValue={groupData}
        />
      </div>

      <h3 className="font-[600] text-[18px] mb-4">Existing Fonts:</h3>
      <table id="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Font Name</th>
            <th>Preview</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {remainingFont.map((fontData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="w-1/3 md:text-[14px] text-[10px]">
                {fontData.fontName}
              </td>
              <td className="w-1/3 md:text-[14px] text-[10px]">
                <div
                  className="font-preview"
                  data-font-name={fontData.fontName?.split("-")[0]}
                  style={{
                    width: "60px",
                    height: "50px",
                  }}
                >
                  {fontData.fontName?.split("-")[0]}
                </div>
              </td>
              <td className="w-1/3">
                <button
                  onClick={() => handleRemove(fontData.fontId)}
                  className="bg-red-500 md:text-[14px] text-[8px] py-1 md:px-3 px-1  rounded-md cursor-pointer duration-200 hover:bg-red-400"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Manage Remaining Fonts */}

      {addNew && (
        <div className="mt-16">
          {remainingFonts.length !== 0 ? (
            <div>
              <hr className="mb-8" />
              <h3 className="font-[600] text-[18px] mb-4">Remaining Fonts:</h3>
              <table id="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Font Name</th>
                    <th>Preview</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {remainingFonts.map((fontData, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="w-1/3">{fontData.fontName}</td>
                      <td className="w-1/3">
                        <div
                          className="font-preview"
                          data-font-name={fontData.fontName?.split("-")[0]}
                          style={{
                            width: "60px",
                            height: "50px",
                          }}
                        >
                          {fontData.fontName?.split("-")[0]}
                        </div>
                      </td>
                      <td className="w-1/3">
                        <button
                          onClick={() => handleAddNew(fontData.id)}
                          className="md:w-[120px] w-[40px]  py-2 text-center text-black rounded-md md:text-[18px] text-[8px] font-[600] bg-white"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-red-500 font-[600] text-xl">
              !No Reamaining Any Fonts, Please Upload New Fonts
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateGroup;