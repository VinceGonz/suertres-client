import React, { useState, useContext } from "react";
import moment from "moment";
import { uuid } from "uuidv4";

// * CUSTOM COMPONENTS
import IndividualBets from "./IndividualBets";
import FlashMessage from "../components/FlashMessage";
import Layout from "../components/Layout";
import CustomDatePicker from "react-datepicker";

// * CONTEXTS
import { BetContext } from "../context/BetContext";
import { useEffect } from "react";

const NewBet = () => {
  // * CONTEXT IMPORTED
  const {
    addNewBet,
    setFlashMsg,
    flashMsg,
    selectedDrawTime,
    setSelectedDrawTime,
    betList,
    getAllBets,
  } = useContext(BetContext);
  const [cellNum, setCellNum] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [draw, setDraw] = useState(selectedDrawTime);
  const [date, setDate] = useState(moment(new Date()).format("MM-DD-YYYY"));
  const [indivBets, setIndivBets] = useState([]);
  const [newBetErrors, setNewBetErrors] = useState({});
  const [
    updateIndividualBetModalVisible,
    setUpdateIndividualBetModalVisible,
  ] = useState(false);

  useEffect(() => {
    // if(localStorage.getItem('indiBets') ? setIndivBets(JSON.parse(localStorage.get("indivBets"))) : null))
    const indivBetsData = localStorage.getItem("indivBets");
    const cellNumData = localStorage.getItem("cellNum");
    if (indivBetsData && cellNumData) {
      setIndivBets(JSON.parse(indivBetsData));
      setCellNum(JSON.parse(cellNumData));
    }
  }, []);

  // ! Limit lenght of characters in a input field
  const setLimitLength = (maxLength, value) => {
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
    }
    return value;
  };

  const resetBetData = () => {
    setCellNum("");
    setDraw("");
    // setDate("");
    setIndivBets([]);
  };

  const resetIndivBets = () => {
    setNumber("");
    setAmount("");
  };

  const resetFlashMessage = () => {
    setTimeout(() => {
      setFlashMsg({
        msgType: "",
        msgText: "",
      });
    }, 5000);
  };

  const checkIfIndivBetAlreadyExists = (number) => {
    let exists = false;
    indivBets.map((eachBet) => {
      if (eachBet.number === number) {
        setFlashMsg({
          msgType: "danger",
          msgText: "Number already exists",
        });
        exists = true;
      }
    });

    return exists;
  };

  const updateIndivBets = (bet) => {
    indivBets.map((eachBet) => {
      if (eachBet.id === bet.id) {
        eachBet = { ...eachBet, number: bet.number, amount: bet.amount };
      }
      return eachBet;
    });
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
    let errors = {};
    if (number === null || number < 0 || number.length < 3 || number === "") {
      errors.number = "Invalid number";
    }

    if (amount === null || amount <= 0 || amount === "") {
      errors.amount = "Invalid Amount";
    }

    return errors;
  };

  const onSubmit = (suertresData) => {
    // onSubmit({
    //   cellNum,
    //   draw: selectedDrawTime,
    //   date,
    //   bets: indivBets,
    // })
    let errors = suertresDataValidator(suertresData);
    let newList;
    let { cellNum, draw, date, bets } = errors;
    setNewBetErrors({ ...newBetErrors, cellNum, draw, date, bets });
    if (Object.keys(errors).length === 0) {
      newList = indivBets.map((bet) => {
        return {
          cellNum: suertresData.cellNum,
          draw: selectedDrawTime,
          date: suertresData.date,
          number: bet.number,
          amount: bet.amount,
        };
      });
      addNewBet(newList);
      localStorage.setItem("betList", JSON.stringify([...betList, newList]));
      localStorage.setItem("indivBets", JSON.stringify([]));
      localStorage.setItem("cellNum", "");
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

    setNewBetErrors({
      ...newBetErrors,
      amount: errors.amount,
      number: errors.number,
    });

    if (Object.keys(errors).length === 0) {
      // setNewBetErrors({ ...newBetErrors, amount, number });
      if (!checkIfIndivBetAlreadyExists(number)) {
        setIndivBets([
          ...indivBets,
          { id: indivBet.id, number: indivBet.number, amount: indivBet.amount },
        ]);
        localStorage.setItem(
          "indivBets",
          JSON.stringify([
            ...indivBets,
            {
              id: indivBet.id,
              number: indivBet.number,
              amount: indivBet.amount,
            },
          ])
        );
        localStorage.setItem("cellNum", JSON.stringify(cellNum));
        resetIndivBets();
        setFlashMsg({
          msgType: "success",
          msgText: "Successfully added new number",
        });
        resetFlashMessage();
      }
    } else {
      setFlashMsg({
        msgType: "danger",
        msgText: "Failed to add new number",
      });
      resetFlashMessage();
    }
  };

  return (
    <Layout currentActive={"Add"} headerText={"New Bet Form"}>
      <div className="mainWrapper">
        <div className="newBetBox">
          <div className="form">
            <div className="form-group">
              <label className="newBetBoxLabels" htmlFor="cellNum">
                Cell No
              </label>
              <input
                type="number"
                className={`newBetBoxFields ${
                  newBetErrors.cellNum ? "ErrorBetBoxFields" : null
                }`}
                value={cellNum}
                onChange={(e) => setCellNum(setLimitLength(10, e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="newBetBoxLabels" htmlFor="amount">
                Draw
              </label>
              <select
                className="newBetBoxFields drawSelectInput"
                value={selectedDrawTime}
                onChange={(e) => setSelectedDrawTime(e.target.value)}
              >
                <option value="11" selected="selected">
                  11AM
                </option>
                <option value="4">4PM</option>
                <option value="9">9PM</option>
              </select>
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
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <hr />
            <br />
            <div className="form-group">
              <label className="newBetBoxLabels" htmlFor="number">
                Number
              </label>
              <input
                type="number"
                className={`newBetBoxFields ${
                  newBetErrors.number ? "ErrorBetBoxFields" : null
                }`}
                value={number}
                onChange={(e) => {
                  setNumber(setLimitLength(3, e.target.value));
                }}
              />
            </div>
            <div className="form-group">
              <label className="newBetBoxLabels" htmlFor="amount">
                Amount
              </label>
              <input
                type="number"
                className={`newBetBoxFields ${
                  newBetErrors.amount ? "ErrorBetBoxFields" : null
                }`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <button
            className="addBetBtn"
            onClick={() => addNewIndivBet({ id: uuid(), number, amount })}
          >
            Add Number
          </button>
          <button
            className="submitBtn"
            onClick={() =>
              onSubmit({
                cellNum,
                draw: selectedDrawTime,
                date,
                bets: indivBets,
              })
            }
          >
            Submit
          </button>
        </div>
        <div className="betTable indivBetTable">
          <IndividualBets
            indivBets={indivBets}
            setIndivBets={setIndivBets}
            visible={updateIndividualBetModalVisible}
            setUpdateIndividualBetModalVisible={
              setUpdateIndividualBetModalVisible
            }
            updateIndivBets={updateIndivBets}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewBet;
