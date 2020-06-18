import React, { useState } from "react";
import Layout from "../components/Layout";

const NewBet = () => {
  const [cellNum, setCellNum] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(0);
  const [draw, setDraw] = useState(null);
  const [date, setDate] = useState("");

  return (
    <Layout currentActive={"Add"} headerText={"New Bet Form"}>
      <div className="newBetBox">
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Cell No
          </label>
          <input type="text" className="newBetBoxFields" />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Number
          </label>
          <input type="text" className="newBetBoxFields" />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Amount
          </label>
          <input type="text" className="newBetBoxFields" />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Draw
          </label>
          <input type="text" className="newBetBoxFields" />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Date
          </label>
          <input type="text" className="newBetBoxFields" />
        </div>
        <button className="submitBtn">Submit</button>
      </div>
    </Layout>
  );
};

export default NewBet;
