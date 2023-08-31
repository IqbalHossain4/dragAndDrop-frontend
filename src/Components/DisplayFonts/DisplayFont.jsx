import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayFont = () => {
  const [loadFonts, setLoadFonts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/projects/dragDrop/index.php")
      .then((res) => setLoadFonts(res.data));
  }, []);
  return (
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
              <td>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayFont;
