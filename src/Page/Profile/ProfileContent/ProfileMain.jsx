import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineFontSize,
  AiOutlineFieldTime,
  AiOutlineLineChart,
} from "react-icons/ai";

import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import BarCharts from "../../../Components/Charts/BarCharts";
import PieCharts from "../../../Components/Charts/PieCharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ProfileMain = () => {
  const { user } = useContext(AuthContext);
  const [fonts, setFonts] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  const fetchFont = async () => {
    const res = await axiosSecure.get(`/getFontWithEmail?email=${user?.email}`);
    setFonts(res.data);
  };

  useEffect(() => {
    fetchFont();
  }, [fonts]);

  return (
    <div>
      <div className="wrapper">
        <div className="grid-3 gap-[25px]">
          <div className="bg-black text-white h-[200px] p-[15px]">
            <div>
              <h1 className="text-[18px] font-[700]">Total Fonts</h1>
              <div className="mt-[30px] flex items-center justify-center gap-[25px]">
                <div className="w-[80px] h-[80px] border-[10px] p-[20px] rounded-full flex items-center justify-center">
                  <h1 className="text-[18px] font-[700]">
                    {fonts.length < 0 ? "Please Upload Fonts" : fonts.length}
                  </h1>
                </div>
                <span className="text-[35px]">
                  <AiOutlineFontSize />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white h-[200px] p-[15px]">
            <div>
              <h1 className="text-[18px] font-[700]">Last Upload</h1>
              <div className="mt-[30px] flex items-center justify-center gap-[25px]">
                <div className="p-[20px] pr-[0px]">
                  <h1 className="text-[18px] font-[700]">
                    {fonts.length < 0 ? "Please Upload Fonts" : fonts[0]?.date}
                  </h1>
                </div>
                <span className="text-[35px]">
                  <AiOutlineFieldTime />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-black text-white h-[200px] p-[15px]">
            <div>
              <h1 className="text-[18px] font-[700]">Upload Percentage</h1>
              <div className="mt-[30px] flex items-center justify-center gap-[25px]">
                <div className="w-[80px] h-[80px] border-[10px] p-[20px] rounded-full flex items-center justify-center">
                  <h1 className="text-[18px] font-[700]">
                    {fonts.length < 0
                      ? "Please Upload Fonts"
                      : (100 / 10) * fonts.length}
                    %
                  </h1>
                </div>
                <span className="text-[35px]">
                  <AiOutlineLineChart />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-[30px] md:flex items-center gap-[25px]">
          <BarCharts />

          <PieCharts />
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
