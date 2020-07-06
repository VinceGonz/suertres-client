import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useEffect } from "react";

const UpdateModalDatePicker = ({
  selectedDate,
  setSelectedDate,
  betToBeUpdated,
}) => {
  const [startDate, setStartDate] = useState(selectedDate);

  useEffect(() => {
    setStartDate(selectedDate);
  }, [selectedDate]);

  return (
    <React.Fragment>
      <DatePicker
        className="datePicker"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setSelectedDate({ ...betToBeUpdated, date: date });
        }}
        dateFormat="MM-dd-yyyy"
        maxDate={new Date()}
        showYearDropdown
        showMonthDropdown
        isClearable
        placeholderText="Enter Date here..."
      />
    </React.Fragment>
  );
};

export default UpdateModalDatePicker;
