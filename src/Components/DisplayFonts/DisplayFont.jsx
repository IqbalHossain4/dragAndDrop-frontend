import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useFonts from "../../Hooks/useFonts";
import { AiFillDelete } from "react-icons/ai";
import WebFont from "webfontloader";
const DisplayFont = () => {
  const [loadTotalFonts, getFont] = useFonts();
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
          `http://localhost:5000/deleteFont/${id}`
        );
        if (res.status === 200) {
          getFont();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // ====Manag Pagination====

  useEffect(() => {
    handlePagination();
  }, [perPageFonts]);

  const handlePagination = async () => {
    const res = await axios.get(
      `http://localhost:5000/getFont?page=${currentPage}`
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
    const uniqueFontNames = [
      ...new Set(perPageFonts.map((font) => font.fontName)),
    ];

    WebFont.load({
      custom: {
        families: uniqueFontNames.map((fontName) => fontName),
        urls: perPageFonts.map((fonts) => fonts.font),
      },
      active: () => {
        const previewElements = document.querySelectorAll(".font-preview");
        previewElements.forEach((element) => {
          const fontName = element.getAttribute("data-font-name");
          element.style.fontFamily = fontName;
        });
      },
    });
  }, []);

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
                    <td>{font.fontName}</td>
                    <td>
                      <div
                        className="font-preview"
                        data-font-name={font.fontName}
                        style={{
                          width: "60px",
                          height: "50px",
                        }}
                      >
                        {font.fontName?.split("-")[0]}
                      </div>
                    </td>
                    <td>{font?.date}</td>
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
