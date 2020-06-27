import React, { useContext } from "react";
import Layout from "./Layout";
import { BetContext } from "../context/BetContext";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";

const BetList = () => {
  const {
    betList,
    selectedDrawTime,
    selectedDate,
    setSelectedDrawTime,
    setSelectedDate,
  } = useContext(BetContext);
  let newBetList =
    betList.length !== 0
      ? betList.map((bet) => {
          return bet.bets.map((eachBet) => {
            return {
              cellNumber: bet.cellNuPm,
              draw: bet.draw,
              date: bet.date,
              number: eachBet.number,
              amount: eachBet.amount,
            };
          });
        })
      : [];

  let filteredBetList = [];

  newBetList.map((newBetz) => {
    return newBetz.forEach((eachBetz) => {
      if (eachBetz.date === moment(selectedDate).format("MM-DD-YYYY")) {
        filteredBetList = [...filteredBetList, eachBetz];
      }
    });
  });

  console.log("FILTERED LIST", filteredBetList);
  console.log(moment(selectedDate).format("MM-DD-YYYY"));
  return (
    <Layout headerText={"Bet List"} currentActive={"Bet"}>
      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <table>
        <tr>
          <th>Cell No.</th>
          <th>Numero</th>
          <th>Amount</th>
          <th>Draw</th>
          <th>Date</th>
        </tr>
        {filteredBetList.length !== 0
          ? filteredBetList.map((betz) => {
              return (
                <tr>
                  <td>{betz.cellNumber}</td>
                  <td>{betz.number}</td>
                  <td>{betz.amount}</td>
                  <td>{`${betz.draw} ${betz.draw === "11" ? "AM" : "PM"}`}</td>
                  <td>{betz.date}</td>
                </tr>
              );
            })
          : null}
      </table>
    </Layout>
  );
};

export default BetList;
