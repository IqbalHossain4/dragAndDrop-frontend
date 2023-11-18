import axios from "axios";
import React, { useEffect, useState } from "react";

const useSelectedFonts = () => {
  const [loadSelectedFonts, setloadSelectedFonts] = useState([]);

  // ==== Get data in SelectedFonts Table ====
  useEffect(() => {
    selectFont();
  }, []);

  const selectFont = async () => {
    const res = await axios
      .get("https://tech-charms-seven.vercel.app/getGroup")
      .then((res) => setloadSelectedFonts(res.data));
  };

  return [loadSelectedFonts, selectFont];
};

export default useSelectedFonts;
