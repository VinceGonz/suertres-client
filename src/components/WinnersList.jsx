import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";

import { BetContext } from "../context/BetContext";
import CustomTimePicker from "./CustomTimePicker";
import { useState } from "react";

const WinnersList = () => {
  let filteredBetList = [];

  const [winNum, setwinNum] = useState(null);
  const {
    selectedDrawTime,
    selectedDate,
    setSelectedDrawTime,
    setSelectedDate,
    winningInfo,
    setWinningInfo,
    betList,
    getAllBets,
  } = useContext(BetContext);

  useEffect(() => {
    getAllBets();
    //eslint-disable-next-line
  }, []);

  console.log("GAGU BETLIST", betList);

  const setLimitLength = (maxLength, value) => {
    if (value.length > maxLength) {
      value = value.substring(0, 3);
    }
    return value;
  };

  const getTotalAmountPayable = (winnersList) => {
    let amountsArray = winnersList.map((winner) => parseInt(winner.amount));

    console.log(amountsArray);

    let totalAmount =
      amountsArray.length !== 0
        ? amountsArray.reduce((acc, currVal) => acc + currVal)
        : 0;

    return totalAmount;
  };

  // let newBetList =
  //   betList.length !== 0
  //     ? betList.map((bet) => {
  //         return bet.bets.map((eachBet) => {
  //           return {
  //             cellNumber: bet.cellNum,
  //             draw: bet.draw,
  //             date: bet.date,
  //             number: eachBet.number,
  //             amount: eachBet.amount,
  //           };
  //         });
  //       })
  //     : [];

  // newBetList.forEach((newBetz) => {
  //   return newBetz.forEach((eachBetz) => {
  //     if (
  //       moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
  //         moment(selectedDate).format("MM-DD-YYYY").toString() &&
  //       eachBetz.draw === selectedDrawTime &&
  //       eachBetz.number === winNum
  //     ) {
  //       filteredBetList = [...filteredBetList, eachBetz];
  //     } else {
  //       console.log("DIDNT MATCH");
  //       console.log(moment(eachBetz.date).format("MM-DD-YYYY").toString());
  //       console.log(eachBetz.draw, selectedDrawTime);
  //       console.log(eachBetz.number, winNum);
  //       if (
  //         moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
  //         moment(selectedDate).format("MM-DD-YYYY").toString()
  //       ) {
  //         console.log("TRUE POTA");
  //       }
  //     }
  //   });
  // });

  betList.forEach((eachBetz) => {
    if (
      moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
        moment(selectedDate).format("MM-DD-YYYY").toString() &&
      eachBetz.draw === selectedDrawTime &&
      eachBetz.number === winNum
    ) {
      filteredBetList = [...filteredBetList, eachBetz];
    } else {
      console.log("DIDNT MATCH");
      console.log(moment(eachBetz.date).format("MM-DD-YYYY").toString());
      console.log(eachBetz.draw, selectedDrawTime);
      console.log(eachBetz.number, winNum);
      if (
        moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
        moment(selectedDate).format("MM-DD-YYYY").toString()
      ) {
        console.log("TRUE POTA");
      }
    }
  });

  return (
    <Layout headerText={"Winners List"} currentActive={"Winners"}>
      <div>
        <input
          className="winningNumField"
          type="text"
          value={winNum}
          onChange={(e) => {
            setwinNum(setLimitLength(3, e.target.value));
          }}
          placeholder="Enter suertres number here..."
        />
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
            <th>Cell No.</th>
            <th>Numero</th>
            <th>Amount</th>
            <th>Draw</th>
            <th>Date</th>
            <th>Amount receivable</th>
          </tr>
          {filteredBetList.length !== 0
            ? filteredBetList.map((betz) => {
                return (
                  <tr>
                    <td>{betz.cell_num}</td>
                    <td>{betz.number}</td>
                    <td>{betz.amount}</td>
                    <td>{`${betz.draw} ${
                      betz.draw === "11" ? "AM" : "PM"
                    }`}</td>
                    <td>{betz.date}</td>
                    <td>{(betz.amount * 500).toLocaleString()}</td>
                  </tr>
                );
              })
            : null}
        </table>
        <div className="calculationsContainer">
          <div className="totalHits">
            <h2>Total Hits: {getTotalAmountPayable(filteredBetList)}</h2>
          </div>
          <div className="amountPayable">
            <h2>
              Amount Payable:{" "}
              {(getTotalAmountPayable(filteredBetList) * 500).toLocaleString()}
            </h2>
          </div>
          <div className="totalCommission">
            <h2>
              Commission:{" "}
              {(getTotalAmountPayable(filteredBetList) * 150).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WinnersList;
