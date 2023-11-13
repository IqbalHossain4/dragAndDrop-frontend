import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFonts = () => {
  const { getFont, data: loadTotalFonts = [] } = useQuery({
    ueryKey: ["totalFonts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/getFonts");
      return res.data;
    },
  });

  return [loadTotalFonts, getFont];
};

export default useFonts;
