import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="wrapper fixed inset-0 flex items-center justify-center z-50">
        <div className="w-full bg-white p-4  mx-auto rounded-lg shadow-lg">
          <button
            className="my-4  float-right bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
