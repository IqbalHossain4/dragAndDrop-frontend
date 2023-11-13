import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["High Performance", "Hours per Day"],
  ["Daily Upload", 11],
  ["Best Font", 2],
  ["Top-Famous", 2],
  ["Best Groups", 2],
  ["Quality", 7],
];

export const options = {
  title: "Top Activities",
};

export default function PieCharts() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width="100%"
      height={"400px"}
    />
  );
}
