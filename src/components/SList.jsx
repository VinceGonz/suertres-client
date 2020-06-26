import React, { useContext } from "react";
import Layout from "./Layout";
import { BetContext } from "../context/BetContext";
import moment from "moment";

const SList = () => {
  const { betList, selectedDrawTime, selectedDate } = useContext(BetContext);

  let filteredNewBetList = [];
  let STList = [];

  betList.forEach((eachBetz) => {
    if (eachBetz.date === moment(selectedDate).format("MM-DD-YYYY")) {
      filteredNewBetList = [...filteredNewBetList, eachBetz];
    }
  });

  // ! FUNCTION TO MERGE DUPLICATE BET NUMBERS
  const mergeDuplicateNumbers = (betsArray) => {
    let numbersList = [];
    let newBetList = betsArray.map((val) =>
      val.bets.map((bet) => {
        return {
          cellNum: val.cellNum,
          draw: val.draw,
          date: val.date,
          number: bet.number,
          amount: bet.amount,
        };
      })
    );

    let bets = newBetList.map((bet) => bet.map((eachBet) => eachBet));

    bets.map((e) => {
      e.forEach((val) => {
        numbersList = [...numbersList, val];
      });
    });

    // !filter duplicate bet numbers
    numbersList.forEach((numBet) => {
      // ! Check if bet number already exists
      if (STList.some((bet) => bet.number === numBet.number)) {
        // console.log('exists!', numBet.number);
        // ! If number already exists, get the index of that element in the array of Numbers
        let indx = STList.findIndex((x) => x.number === numBet.number);
        // console.log('index', indx);
        // ! Update the amount of the number by adding the amounts
        STList[indx] = {
          ...STList[indx],
          amount: parseInt(STList[indx].amount) + parseInt(numBet.amount),
        };
      } else {
        // !If it doesn't exist in the array of numberList, add it as new element
        STList = [...STList, numBet];
        // console.log('STList', STList)
      }
    });

    console.log(STList);
    return STList;
  };

  let arrayOfBetsAmount = [];

  filteredNewBetList.forEach((bet) => {
    bet.bets.forEach((perBet) => {
      arrayOfBetsAmount = [...arrayOfBetsAmount, parseInt(perBet.amount)];
    });
  });

  console.log("bobo", arrayOfBetsAmount);

  const totalAmount =
    arrayOfBetsAmount.length !== 0
      ? arrayOfBetsAmount.reduce((accu, currVal) => accu + currVal)
      : 0;

  console.log("length", totalAmount.length);

  return (
    <Layout headerText={"STL List"} currentActive={"STL"}>
      <table>
        <tr>
          <th>Numero</th>
          <th>Amount</th>
          <th>Draw</th>
          <th>Date</th>
        </tr>
        {mergeDuplicateNumbers(filteredNewBetList).map((bet) => {
          return (
            <tr>
              <td>{bet.number}</td>
              <td>{bet.amount}</td>
              <td>{`${bet.draw} ${bet.draw === "11" ? "AM" : "PM"}`}</td>
              <td>{bet.date}</td>
            </tr>
          );
        })}
      </table>
      <h2>Total: {totalAmount}</h2>
    </Layout>
  );
};

export default SList;
