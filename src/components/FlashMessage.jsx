import React from "react";

const FlashMessage = ({ flashMsg: { msgType, msgText } }) => {
  return (
    <h3
      className={`${
        msgType === "danger" ? "flashMsgError" : "flashMsgSuccess"
      }`}
    >
      {msgText}
    </h3>
  );
};

export default FlashMessage;
