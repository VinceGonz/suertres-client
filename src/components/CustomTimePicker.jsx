import React from "react";
import { useState } from "react";

const CustomTimePicker = ({ selectedDrawTime, setSelectedDrawTime }) => {
  return (
    <select
      className="timePicker"
      value={selectedDrawTime}
      onChange={(e) => {
        setSelectedDrawTime(e.target.value);
      }}
    >
      <option value="11">11 AM</option>
      <option value="4">4 PM</option>
      <option value="9">9 PM</option>
    </select>
  );
};

export default CustomTimePicker;
