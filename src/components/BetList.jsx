import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import { BetContext } from "../context/BetContext";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";
import CustomTimePicker from "./CustomTimePicker";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import UpdateModal from "./UpdateModal";

const BetList = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [betToBeDeleted, setBetToBeDeleted] = useState({});
  const [betToBeUpdated, setBetToBeUpdated] = useState({});
  const {
    betList,
    selectedDrawTime,
    selectedDate,
    setSelectedDrawTime,
    setSelectedDate,
    getAllBets,
  } = useContext(BetContext);
  //

  useEffect(() => {
    getAllBets();

    //eslint-disable-next-line
  }, []);

  let filteredBetList = [];
  console.log("POTANG INA MO BOI", betList);

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
              let { bets_id, cell_num, number, amount, draw, date } = betz;
              return (
                <tr>
                  <td>{cell_num}</td>
                  <td>{number}</td>
                  <td>{amount}</td>
                  <td>{`${draw} ${draw === "11" ? "AM" : "PM"}`}</td>
                  <td>{date}</td>
                  <td>
                    <button
                      className="editBtn"
                      onClick={() => {
                        setUpdateModalVisible(true);
                        setBetToBeUpdated({
                          bets_id,
                          cell_num,
                          number,
                          amount,
                          draw,
                          date,
                        });
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
                        setBetToBeDeleted({
                          id: bets_id,
                          number: number,
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
        betTobeDeleted={betToBeDeleted}
      />
      <UpdateModal
        visible={updateModalVisible}
        setUpdateModalVisible={setUpdateModalVisible}
        betToBeUpdated={betToBeUpdated}
        setBetToBeUpdated={setBetToBeUpdated}
      />
    </Layout>
  );
};

export default BetList;
