import React from "react";

const HeaderText = ({ headerText }) => {
  return (
    <React.Fragment>
      <h2 className="HeaderText">{headerText}</h2>
    </React.Fragment>
  );
};

export default HeaderText;
