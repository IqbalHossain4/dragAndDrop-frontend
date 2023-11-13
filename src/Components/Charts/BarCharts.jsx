import { Chart } from "react-google-charts";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider";
export const data = [
  ["Year", "Top Fonts", "High Upload", "Groups"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Year of Collection",
    subtitle: "High Upload in: 2020-2023",
  },
};

export default function BarCharts() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
