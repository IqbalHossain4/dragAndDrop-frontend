import React, { useEffect, useState } from "react";
import useFonts from "../../Hooks/useFonts";
import Swal from "sweetalert2";
import axios from "axios";
import useSelectedFonts from "../../Hooks/useSelectedFonts";
import { FaShoppingCart } from "react-icons/fa";

const CreateGroup = () => {
  const [loadTotalFonts, getFont] = useFonts();
  const [loadSelectedFonts, selectFont] = useSelectedFonts();
  const [selectedFont, setSelectedFont] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState([]);
  const [loadedFonts, setLoadedFonts] = useState([]);
  const [groupDatas, setGroupDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageFonts, setPerPageFonts] = useState([]);
  const itemPerPage = 6;
  const totalPages = Math.ceil(loadTotalFonts.length / itemPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const startSerialNumber = (currentPage - 1) * itemPerPage + 1;

  // ====Manag Pagination====
  useEffect(() => {
    handlePagination();
  }, [perPageFonts]);

  const handlePagination = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getFont?page=${currentPage}`
      );
      setPerPageFonts(res.data);
    } catch (error) {
      console.error("Error fetching paginated fonts:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //==== Get Data in groupData  ====
  useEffect(() => {
    getGroupData();
  }, [loadSelectedFonts]);
  const getGroupData = async () => {
    const res = await axios.get("http://localhost:5000/getGroup");
    setGroupDatas(res.data);
  };

  // ==== Filter Data in SelectedFonts ====
  useEffect(() => {
    if (loadSelectedFonts) {
      setSelectedFont(
        loadSelectedFonts.filter((font) => font.fontId !== loadTotalFonts.id)
      );
    }
  }, [loadSelectedFonts]);

  // ==== Store Data Whice are Selected ====
  const uploadSelectedFont = async (fontId) => {
    const selectedFontData = loadTotalFonts.find((font) => font._id === fontId);

    if (!selectedFontData) {
      setErrorMsg("Font data not found");
      return;
    }
    let isFontSelected = selectedGroupId.some(
      (id) => id == selectedFontData._id
    );

    if (isFontSelected) {
      setErrorMsg("Font is already selected");
      return;
    } else {
      if (groupName === "") {
        setErrorMsg("First Define The Group Name");
        return;
      } else {
        setErrorMsg("");
        setInputMsg("");
        setSelectedGroupId((prevData) => [...prevData, selectedFontData._id]);
        const fonts = {
          groupName: groupName,
          status: "Selected",
          fontId: selectedGroupId,
        };
        setSelectedGroup(fonts);
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
        "http://localhost:5000/createFontGroup",
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
        getFont();
      }
    }
  };

  // ==== Font Preview ====
  useEffect(() => {
    loadAndApplyFonts();
  }, [loadTotalFonts]);

  // ...
  const loadAndApplyFonts = () => {
    const fontsToLoad = [];
    loadTotalFonts.forEach((font, index) => {
      const fontName = `"${font.fontName}"`;
      const fontUrl = font.fontUrl;

      if (!loadedFonts.includes(fontName)) {
        fontsToLoad.push({ fontName, fontUrl });
        setLoadedFonts((prevFonts) => [...prevFonts, fontName]);
      }
    });

    const style = document.createElement("style");
    let fontFaceCSS = "";

    fontsToLoad.forEach((font, index) => {
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
          <h3 className="font-[600] text-[18px] mb-4">Group Name:</h3>
          <div className="relative w-[45px]  mt-4 mr-8 mb-8">
            <FaShoppingCart className="text-2xl text-[#2c3845]" />
            <div className="bg-pink-400 text-white text-sm text-center rounded-[100%] w-6 h-6 absolute -top-2 -right-1 flex items-center justify-center">
              <span>{selectedGroup ? selectedGroup.fontId.length + 1 : 0}</span>
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
          {perPageFonts.map((font, index) => (
            <tr key={index} className="text-[14px]">
              <td>{startSerialNumber + index}</td>
              <td className="md:text-[14px] text-[10px]">{font.fontName}</td>
              <td className="md:text-[14px] text-[10px]">
                <div
                  className="font-preview"
                  data-font-name={font.fontName?.split("-")[0]}
                  style={{
                    width: "60px",
                    height: "50px",
                  }}
                >
                  {font.fontName?.split("-")[0]}
                </div>
              </td>
              <td>{font?.date}</td>
              <td className="text-center">
                <button
                  onClick={() => uploadSelectedFont(font._id)}
                  className={`md:w-[120px] w-[40px]  py-1 text-center text-black rounded-md md:text-[18px] text-[8px] font-[600] ${
                    groupDatas.some((fontData) =>
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

      {/* pagination */}
      {totalPages > 1 && (
        <div className="w-full flex items-center justify-center bg-[#202932] text-white">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-[22px] font-[600] mx-2"
          >
            &lt;
          </button>
          {pageNumbers.map((number, index) => (
            <button
              onClick={() => setCurrentPage(number)}
              key={index}
              className={`${
                currentPage === number ? "bg-green-500 text-black" : ""
              } py-2 px-6 text-[18px] font-[600] text-white`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-[22px] font-[600] mx-2"
          >
            &gt;
          </button>
        </div>
      )}
      {errorMsg && <p className="text-red-500 mt-4">{errorMsg}</p>}
      <button onClick={createGroup} className="btn">
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
