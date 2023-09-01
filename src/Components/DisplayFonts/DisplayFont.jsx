import axios from "axios";
import Swal from "sweetalert2";
import useFonts from "../../Hooks/useFonts";
import { useState } from "react";
import Modal from "../Modal/Modal";
import ModalContent from "../modalContent/ModalContent";

const DisplayFont = () => {
  const [loadFonts, getFont] = useFonts();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //Handle Delete
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
        const res = axios.delete(
          "http://localhost/projects/dragDrop/upload.php/" + id
        );
        if (res) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getFont();
        }
      }
    });
  };
  return (
    <div className="wrapper">
      {loadFonts && (
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
              {loadFonts.map((font, index) => (
                <tr key={index} className="text-[14px]">
                  <td>{index + 1}</td>
                  <td>{font.fontName}</td>
                  <td>Preview</td>
                  <td>{font.upload_at.split(" ")[0]}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(font.id)}
                      className="bg-red-500 py-1 px-3 rounded-md cursor-pointer duration-200 hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className=" min-h-screen flex items-center justify-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={openModal}
        >
          Select Font
        </button>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <div>
            <ModalContent />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayFont;
