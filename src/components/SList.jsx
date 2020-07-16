import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import { BetContext } from "../context/BetContext";
import moment from "moment";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";

const SList = () => {
  const {
    betList,
    selectedDrawTime,
    setSelectedDrawTime,
    setSelectedDate,
    selectedDate,
    getAllBets,
  } = useContext(BetContext);

  useEffect(() => {
    getAllBets();
    //eslint-disable-next-line
  }, []);

  let filteredNewBetList = [];

  betList.forEach((eachBetz) => {
    if (
      moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
        moment(selectedDate).format("MM-DD-YYYY").toString() &&
      eachBetz.draw === selectedDrawTime
    ) {
      filteredNewBetList = [...filteredNewBetList, eachBetz];
    }
  });

  // ! FUNCTION TO MERGE DUPLICATE BET NUMBERS
  const mergeDuplicateNumbers = (betsArray) => {
    let numbersList = [];
    let STList = [];

    betsArray.map((e) => {
      numbersList = [...numbersList, e];
    });

    // !filter duplicate bet numbers
    numbersList.forEach((numBet) => {
      // ! Check if bet number already exists
      if (STList.some((bet) => bet.number === numBet.number)) {
        // ! If number already exists, get the index of that element in the array of Numbers
        let indx = STList.findIndex((x) => x.number === numBet.number);
        // ! Update the amount of the number by adding the amounts
        STList[indx] = {
          ...STList[indx],
          amount: parseInt(STList[indx].amount) + parseInt(numBet.amount),
        };
      } else {
        // !If it doesn't exist in the array of numberList, add it as new element
        STList = [...STList, numBet];
      }
    });

    console.log(STList);
    return STList;
  };

  let arrayOfBetsAmount = [];

  filteredNewBetList.forEach((bet) => {
    arrayOfBetsAmount = [...arrayOfBetsAmount, parseInt(bet.amount)];
  });


  const totalAmount =
    arrayOfBetsAmount.length !== 0
      ? arrayOfBetsAmount.reduce((accu, currVal) => accu + currVal)
      : 0;

  return (
    <Layout headerText={"STL List"} currentActive={"STL"}>
      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CustomTimePicker
        selectedDrawTime={selectedDrawTime}
        setSelectedDrawTime={setSelectedDrawTime}
      />
      <table>
        <tr>
          <th>Numero</th>
          <th>Amount</th>
          <th>Draw</th>
          <th>Date</th>
        </tr>
        {mergeDuplicateNumbers(filteredNewBetList).length !== 0
          ? mergeDuplicateNumbers(filteredNewBetList).map((bet) => {
              return (
                <tr>
                  <td>{bet.number}</td>
                  <td>{bet.amount}</td>
                  <td>{`${bet.draw} ${bet.draw === "11" ? "AM" : "PM"}`}</td>
                  <td>{bet.date}</td>
                </tr>
              );
            })
          : null}
      </table>
      <h2 className="totalBets">Total: {totalAmount}</h2>
    </Layout>
  );
};

export default SList;
