import axios from "axios";
import React, { useEffect, useState } from "react";

const useFonts = () => {
  const [loadFonts, setLoadFonts] = useState([]);

  useEffect(() => {
    getFont();
  }, []);

  const getFont = async () => {
    const res = await axios
      .get("http://localhost/projects/dragDrop/upload.php")
      .then((res) => setLoadFonts(res.data));
  };

  return [loadFonts, getFont];
};

export default useFonts;
