import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import { BetContext } from "../context/BetContext";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";
import CustomTimePicker from "./CustomTimePicker";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const BetList = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [betTobeDeleted, setBetTobeDeleted] = useState({});
  const {
    betList,
    selectedDrawTime,
    selectedDate,
    setSelectedDrawTime,
    setSelectedDate,
    getAllBets,
  } = useContext(BetContext);
  //

  // console.log(newBetList);

  useEffect(() => {
    getAllBets();

    //eslint-disable-next-line
  }, []);

  // let newBetList =
  //   betList.length !== 0
  // ? betList.map((bet) => {
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

  let filteredBetList = [];

  betList.forEach((eachBetz) => {
    if (
      moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
        moment(selectedDate).format("MM-DD-YYYY").toString() &&
      eachBetz.draw === selectedDrawTime
    ) {
      filteredBetList = [...filteredBetList, eachBetz];
    } else {
      console.log("DIDNT MATCH");
      console.log(
        moment(eachBetz.date).format("MM-DD-YYYY").toString(),
        console.log(eachBetz.time, selectedDrawTime)
      );
      if (
        moment(eachBetz.date).format("MM-DD-YYYY").toString() ===
        moment(selectedDate).format("MM-DD-YYYY").toString()
      ) {
        console.log("TRUE POTA");
      }
    }
  });

  console.log("FILTERED LIST", filteredBetList);
  console.log(moment(selectedDate).format("MM-DD-YYYY"));
  return (
    <Layout headerText={"Bet List"} currentActive={"Bet"}>
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
          <th colSpan="2">Actions</th>
        </tr>
        {filteredBetList.length !== 0
          ? filteredBetList.map((betz) => {
              return (
                <tr>
                  <td>{betz.cell_num}</td>
                  <td>{betz.number}</td>
                  <td>{betz.amount}</td>
                  <td>{`${betz.draw} ${betz.draw === "11" ? "AM" : "PM"}`}</td>
                  <td>{betz.date}</td>
                  <td>
                    <button
                      className="editBtn"
                      onClick={() => {
                        console.log("Edit");
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => {
                        setDeleteModalVisible(true);
                        setBetTobeDeleted({
                          id: betz.list_id,
                          number: betz.number,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          : null}
      </table>
      <DeleteModal
        visible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        betTobeDeleted={betTobeDeleted}
      />
    </Layout>
  );
};

export default BetList;
