import React, { useEffect, useState } from "react";
import useSelectedFonts from "../../Hooks/useSelectedFonts";
import axios from "axios";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../Modal/Modal";
import UpdateGroup from "../modalContent/UpdateGroup";
import Swal from "sweetalert2";
import useFonts from "../../Hooks/useFonts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ListAllGroups = () => {
  const [loadTotalFonts, getFont] = useFonts();
  const [loadSelectedFonts, selectFont] = useSelectedFonts();
  const [groupDatas, setGroupDatas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(null);

  //==== Get Data in groupData  ====
  useEffect(() => {
    getGroupData();
  }, [loadSelectedFonts]);
  const getGroupData = async () => {
    const res = await axios.get("http://localhost:5000/getGroup");
    setGroupDatas(res.data);
  };

  // ==== Handle Delete Group ====
  const handleDelete = (id) => {
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
        axios.delete(`http://localhost:5000/deleteGroup/${id}`).then((res) => {
          if (res.status === 200) {
            Swal.fire("Deleted!", "List are Deleted deleted.", "success");
            selectFont();
          } else {
            Swal.fire("Error", "Failed to delete data.", "error");
          }
        });
      }
    });
  };

  // ===Handle Modal open and Close ====
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // ==== Push Group Name ====
  const handleSelectFont = (font) => {
    setSelectedFont(font);
  };
  //==== Manage Modal Funtion and selected Font ====
  const handleGroupData = (font) => {
    handleSelectFont(font);
    openModal();
  };

  return (
    <div>
      <div className="wrapper">
        <div className="text-center text-black mb-16">
          <h2 className="text-xl font-[700] mb-2">Group Lists</h2>
          <p className="w-full h-[2px] bg-black"></p>
        </div>

        <table id="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Group Name</th>
              <th>Font Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groupDatas.map((fontData, index) => (
              <tr key={index} className="text-[14px]">
                <td>{index + 1}</td>
                <td className="w-1/3">{fontData?.groupName}</td>
                <td className="flex flex-wrap items-center">
                  {loadTotalFonts.map((font, fontIndex) => (
                    <p key={fontIndex}>
                      {fontData.fontId.includes(font._id) &&
                        font.fontName?.split("-")[0] + ","}
                    </p>
                  ))}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-8">
                    <div>
                      <button
                        onClick={() => handleGroupData(fontData)}
                        className="bg-green-500 py-1 px-4 rounded-md cursor-pointer duration-200 text-black hover:text-white  flex items-center"
                      >
                        <AiOutlineEdit className="text-[18px] " />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(fontData._id)}
                      className="bg-red-500 py-1 px-4 rounded-md cursor-pointer duration-200 text-black hover:text-white"
                    >
                      <AiFillDelete className="text-[18px] " />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div>
          {selectedFont && <UpdateGroup groupData={selectedFont.groupName} />}
        </div>
      </Modal>
    </div>
  );
};

export default ListAllGroups;
