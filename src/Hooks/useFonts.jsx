import axios from "axios";
import React, { useEffect, useState } from "react";

const useFonts = () => {
  const [loadTotalFonts, setLoadFonts] = useState([]);
  // ==== Get data in uploadFonts Table ====

  useEffect(() => {
    getFont();
  }, []);

  const getFont = async () => {
    const res = await axios
      .get("http://localhost/projects/dragDrop/uploadFonts.php")
      .then((res) => setLoadFonts(res.data));
  };

  return [loadTotalFonts, getFont];
};

export default useFonts;
