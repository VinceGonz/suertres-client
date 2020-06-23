import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
import { BetContext } from "../context/BetContext";
import IndividualBets from "./IndividualBets";
import FlashMessage from "../components/FlashMessage";

const NewBet = () => {
  const [cellNum, setCellNum] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [draw, setDraw] = useState(null);
  const [date, setDate] = useState(null);
  const [indivBets, setIndivBets] = useState([]);
  const [newBetErrors, setNewBetErrors] = useState({});

  // * CONTEXT IMPORTED
  const { addNewBet, setFlashMsg, flashMsg } = useContext(BetContext);

  const resetBetData = () => {
    setCellNum("");
    setDraw("");
    setDate("");
    setIndivBets([]);
  };

  const resetIndivBets = () => {
    setNumber("");
    setAmount("");
    // setIndivBets([{}]);
  };

  // ! Use to validate overall suertres bet fields
  const suertresDataValidator = ({ cellNum, draw, date, bets }) => {
    let errors = {};

    if (cellNum === null || cellNum === "") {
      errors.cellNum = "Missing Cell Num";
    }
    if (draw === null || draw === "") {
      errors.draw = "Missing Draw";
    }

    if (date === null || date === "") {
      errors.date = "Missing Date";
    }

    if (bets.length === 0) {
      errors.bets = "Must have atleast 1 bet";
    }

    return errors;
  };

  // ! Use to validate each bet inputted
  const eachBetValidator = ({ number, amount }) => {
    console.log(number, amount);
    let errors = {};
    if (number === null || number < 0 || number.length < 3 || number === "") {
      errors.number = "Invalid number";
    }

    if (amount === null || amount < 0 || amount === "") {
      errors.amount = "Invalid Amount";
    }

    return errors;
  };

  const onSubmit = (suertresData) => {
    let errors = suertresDataValidator(suertresData);
    let { cellNum, draw, date, bets } = errors;
    setNewBetErrors({ ...newBetErrors, cellNum, draw, date, bets });
    if (Object.keys(errors).length === 0) {
      addNewBet(suertresData);
      console.log(suertresData);
      resetBetData();
      setFlashMsg({
        msgType: "success",
        msgText: "Successfully added new Bet",
      });
    } else {
      setFlashMsg({ msgType: "danger", msgText: "Failed to add new Bet" });
    }
  };

  const addNewIndivBet = (indivBet) => {
    let errors = eachBetValidator(indivBet);
    console.log(errors);
    let { amount, number } = errors;

    setNewBetErrors({ ...newBetErrors, amount, number });

    if (Object.keys(errors).length === 0) {
      // setNewBetErrors({ ...newBetErrors, amount, number });
      setIndivBets([
        ...indivBets,
        { number: indivBet.number, amount: indivBet.amount },
      ]);
      resetIndivBets();
      setFlashMsg({
        msgType: "success",
        msgText: "Successfully added new number",
      });
    } else {
      setFlashMsg({
        msgType: "danger",
        msgText: "Failed to add new number",
      });
    }
  };

  return (
    <Layout currentActive={"Add"} headerText={"New Bet Form"}>
      <div className="newBetBox">
        <FlashMessage flashMsg={flashMsg} />
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="cellNum">
            Cell No
          </label>
          <input
            type="text"
            className={`newBetBoxFields ${
              newBetErrors.cellNum ? "ErrorBetBoxFields" : null
            }`}
            value={cellNum}
            onChange={(e) => setCellNum(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="draw">
            Draw
          </label>
          <input
            type="text"
            className={`newBetBoxFields ${
              newBetErrors.draw ? "ErrorBetBoxFields" : null
            }`}
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
            className={`newBetBoxFields ${
              newBetErrors.date ? "ErrorBetBoxFields" : null
            }`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <hr />
        <br />
        <div className="form-group">
          <label className="newBetBoxLabels" htmlFor="number">
            Number
          </label>
          <input
            type="text"
            className={`newBetBoxFields ${
              newBetErrors.number ? "ErrorBetBoxFields" : null
            }`}
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
            className={`newBetBoxFields ${
              newBetErrors.amount ? "ErrorBetBoxFields" : null
            }`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="addBetBtn"
          onClick={() => addNewIndivBet({ number, amount })}
        >
          Add Number
        </button>
        <button
          className="submitBtn"
          onClick={() => onSubmit({ cellNum, draw, date, bets: indivBets })}
        >
          Submit
        </button>
        <IndividualBets indivBets={indivBets} />
      </div>
    </Layout>
  );
};

export default NewBet;
