import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [startDate, setStartDate] = useState(selectedDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        setSelectedDate(date);
      }}
      format={"dd MMMM | HH:mm"}
      maxDate={new Date()}
      showYearDropdown
      showMonthDropdown
      isClearable
      placeholderText="Enter Date here..."
    />
  );
};

export default CustomDatePicker;
