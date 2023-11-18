import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useFonts from "../../Hooks/useFonts";
import { AiFillDelete } from "react-icons/ai";

const DisplayFont = () => {
  const [loadTotalFonts, getFont] = useFonts();
  const [loadedFonts, setLoadedFonts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPageFonts, setPerPageFonts] = useState([]);
  const itemPerPage = 6;
  const totalPages = Math.ceil(loadTotalFonts.length / itemPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);
  const startSerialNumber = (currentPage - 1) * itemPerPage + 1;

  //==== Handle Delete ====
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://tech-charms-seven.vercel.app/deleteFont/${id}`
        );
        if (res.status === 200) {
          getFont();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // ====Manage Pagination====

  useEffect(() => {
    handlePagination();
  }, [perPageFonts]);

  const handlePagination = async () => {
    const res = await axios.get(
      `https://tech-charms-seven.vercel.app/getFont?page=${currentPage}`
    );
    setPerPageFonts(res.data);
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
    <div>
      <div className="wrapper">
        <div className="text-center text-black mb-16">
          <h2 className="text-xl font-[700]  mb-2">Preview Uploaded Fonts</h2>
          <p className="w-full h-[2px] bg-black"></p>
        </div>

        {loadTotalFonts.length > 0 && (
          <div>
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
                    Added Time
                  </th>
                  <th className="md:font-[600] font-[400]  md:text-[18px] text-[15px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {perPageFonts.map((font, index) => (
                  <tr key={index} className="text-[14px]">
                    <td>{startSerialNumber + index}</td>
                    <td>
                      {" "}
                      <h5 className="md:text-[15px] text-[10px]">
                        {font.fontName}
                      </h5>
                    </td>
                    <td>
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
                    <td>
                      {" "}
                      <p className="md:text-[15px] text-[10px]">{font?.date}</p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(font._id)}
                        className="bg-red-500 py-1 px-4 rounded-md cursor-pointer duration-200 text-black hover:text-white"
                      >
                        <AiFillDelete className="text-[18px] " />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFont;
