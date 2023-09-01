import React, { useState } from "react";
import useFonts from "../../Hooks/useFonts";
import Swal from "sweetalert2";
import axios from "axios";

const ModalContent = () => {
  const [loadFonts, getFont] = useFonts();
  const [storeFont, setStoreFont] = useState([]);

  const uploadSelectedFont = async (fontId) => {
    setStoreFont(loadFonts.find((font) => font.id === fontId));
    if (!storeFont) {
      return;
    }
    const fontData = {
      fontUrl: storeFont.fontUrl,
      fontName: storeFont.fontName,
      status: "Selected",
      fontId: storeFont.id,
    };
    const res = await axios
      .post("http://localhost/projects/dragDrop/selectedFonts.php", fontData)
      .then(res.data);
  };

  return (
    <div>
      <h3 className="font-[600] text-[18px] mb-4">Upload Fonts</h3>
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
                <button onClick={() => uploadSelectedFont(font.id)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalContent;
