import React from "react";

const FlashMessage = ({ flashMsg: { msgType, msgText } }) => {
  return (
    <h2 className={`flashMsg ${msgType === "danger" ? "textRed" : null}`}>
      {msgText}
    </h2>
  );
};

export default FlashMessage;
