import React, { useContext, useEffect, useState } from "react";
import useFonts from "../../../Hooks/useFonts";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const MyContent = () => {
  const [loadTotalFonts, getFont] = useFonts();
  const { user } = useContext(AuthContext);
  const [fonts, setFonts] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  const fetchFont = async () => {
    const res = await axiosSecure.get(`/getFontWithEmail?email=${user?.email}`);
    setFonts(res.data);
  };

  useEffect(() => {
    fetchFont();
  }, [fonts]);

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

  return (
    <div>
      <div className="overflow-x-auto wrapper">
        {fonts.length == 0 ? (
          <h1 className="text-center text-black font-[700] lg:text-[20px]">
            You Have No Fonts
          </h1>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr className="lg:font-[600] md:font-[500] font-[300] lg:text-[18px] md:text-[14px] text-[12px] text-white bg-black">
                <th>No</th>
                <th>Name</th>
                <th>Preview</th>
                <th>Uploaded At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fonts.map((font, index) => (
                <tr
                  key={index}
                  className="lg:font-[500] md:font-[400] font-[300] lg:text-[14px] md:text-[12px] text-[10px] text-black bg-white"
                >
                  <th>{index + 1}</th>
                  <td>{font.fontName}</td>
                  <td>{font.fontName?.split("-")[0]}</td>
                  <td>{font.date}</td>
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
        )}
      </div>
    </div>
  );
};

export default MyContent;
