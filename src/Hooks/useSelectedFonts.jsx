import axios from "axios";
import React, { useEffect, useState } from "react";

const useSelectedFonts = () => {
  const [selectFonts, setSelectFonts] = useState([]);

  useEffect(() => {
    selectFont();
  }, []);

  const selectFont = async () => {
    const req = await axios.get(
      "http://localhost/projects/dragDrop/selectedFonts.php"
    );
    const res = await req.json();
    setSelectFonts(res);
  };

  return [selectFonts, selectFont];
};

export default useSelectedFonts;
