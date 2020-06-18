import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import { BetContext } from "../context/BetContext";

const NewBet = () => {
  const [cellNum, setCellNum] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [draw, setDraw] = useState(null);
  const [date, setDate] = useState("");

  // * CONTEXT IMPORTED
  const { test } = useContext(BetContext);

  const onSubmit = (suertresData) => {
    console.log(suertresData);
  };

  return (
    <Layout currentActive={"Add"} headerText={"New Bet Form"}>
      <div className="newBetBox">
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Cell No
          </label>
          <input
            type="text"
            className="newBetBoxFields"
            value={cellNum}
            onChange={(e) => setCellNum(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="number">
            Number
          </label>
          <input
            type="text"
            className="newBetBoxFields"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="amount">
            Amount
          </label>
          <input
            type="text"
            className="newBetBoxFields"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="draw">
            Draw
          </label>
          <input
            type="text"
            className="newBetBoxFields"
            value={draw}
            onChange={(e) => setDraw(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="date">
            Date
          </label>
          <input
            type="text"
            className="newBetBoxFields"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          className="submitBtn"
          onClick={() => onSubmit({ cellNum, number, amount, draw, date })}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default NewBet;
