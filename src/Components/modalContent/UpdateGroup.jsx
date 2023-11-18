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
  const [allGroup, setAllGroup] = useState(null);
  const [selectedFont, setSelectedFont] = useState([]);

  // ==== Get Data with GroupName ====
  useEffect(() => {
    getGroupData();
  }, [loadSelectedFonts]);

  const getGroupData = async () => {
    const res = await axios
      .get(
        `https://tech-charms-seven.vercel.app/getSpecificGrp?group=${groupData}`
      )
      .then((res) => setGroupDatas(res.data));
  };

  useEffect(() => {
    const allGroup = async () => {
      const res = await axios.get(
        "https://tech-charms-seven.vercel.app/getGroup"
      );
      setAllGroup(res.data);
    };
    allGroup();
  }, []);

  // ==== Filter Data in SelectedFonts ====
  useEffect(() => {
    if (loadSelectedFonts) {
      setSelectedFont(
        loadSelectedFonts.filter((font) => font.fontId !== loadTotalFonts.id)
      );
    }
  }, [loadSelectedFonts]);

  // Process Data
  let groupFontId = [];
  for (const groups of groupDatas) {
    let group = groups.fontId;
    for (const groupFont of group) {
      groupFontId.push(groupFont);
    }
  }

  // ==== Find Out Remaining Fonts ====
  const remainingFonts = loadTotalFonts.filter((font) => {
    return !groupFontId.includes(font._id);
  });

  // ==== Find Out Existing Fonts ====
  const existingFont = loadTotalFonts.filter((font) => {
    return groupFontId.includes(font._id);
  });

  // ==== Handle Add New Font whice are remaining ====
  const handleAddNew = async (id) => {
    if (!id) {
      return;
    } else {
      const res = await axios.post(
        `https://tech-charms-seven.vercel.app/updateGroupFont?group=${groupData}`,
        id
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
        getFont();
      }
    }
  };

  //Handle Remove with specific id in selectedFonts
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
          `https://tech-charms-seven.vercel.app/deleteGroupFont?id=${id}`
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
              <span>{existingFont.length}</span>
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
            <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
              No
            </th>
            <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
              Font Name
            </th>
            <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
              Preview
            </th>
            <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {existingFont.map((fontData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="w-1/3">
                <h5 className="font-[400] md:text-[15px] text-[12px]">
                  {" "}
                  {fontData.fontName}
                </h5>
              </td>
              <td className="w-1/3">
                <h5
                  className="font-preview md:font-[600] font-[400] md:text-[15px] text-[12px]"
                  data-font-name={fontData.fontName?.split("-")[0]}
                  style={{
                    width: "60px",
                    height: "50px",
                  }}
                >
                  {fontData.fontName?.split("-")[0]}
                </h5>
              </td>
              <td className="w-1/3">
                <button
                  onClick={() => handleRemove(fontData._id)}
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
                    <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                      No
                    </th>
                    <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                      Font Name
                    </th>
                    <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                      Preview
                    </th>
                    <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {remainingFonts.map((font, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="w-1/3">
                        <h5 className="font-[400] md:text-[15px] text-[12px]">
                          {font.fontName}
                        </h5>{" "}
                      </td>
                      <td className="w-1/3">
                        <h5
                          className="font-preview md:font-[600] font-[400] md:text-[15px] text-[12px]"
                          data-font-name={font.fontName?.split("-")[0]}
                          style={{
                            width: "60px",
                            height: "50px",
                          }}
                        >
                          {font.fontName?.split("-")[0]}
                        </h5>
                      </td>
                      <td className="w-1/3">
                        <button
                          onClick={() => handleAddNew(font._id)}
                          className={`md:w-[120px] w-[40px]  py-1 text-center text-black rounded-md md:text-[18px] text-[8px] font-[600] ${
                            allGroup.some((fontData) =>
                              fontData.fontId.includes(font._id)
                            )
                              ? "bg-green-400 cursor-not-allowed"
                              : "bg-white cursor-pointer"
                          }`}
                        >
                          {loadSelectedFonts &&
                          selectedFont.some((fontData) =>
                            fontData.fontId.includes(font._id)
                          )
                            ? "Selected"
                            : "Select"}
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
