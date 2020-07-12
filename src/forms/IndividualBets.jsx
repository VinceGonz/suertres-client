import React from "react";
import UpdateIndividualBetModal from "../components/UpdateIndividualBetModal";
import { useState } from "react";

const IndividualBets = ({
  indivBets,
  setIndivBets,
  visible,
  setUpdateIndividualBetModalVisible,
  updateIndivBets,
}) => {
  const [individualBetToBeUpdated, setIndividualBetToBeUpdated] = useState({});
  let amountArray = indivBets.map((bet) => parseInt(bet.amount));
  let total =
    amountArray.length !== 0
      ? amountArray.reduce((accu, currVal) => accu + currVal)
      : 0;
  return (
    <div className="individualBets">
      <table>
        <tr>
          <th>Numero</th>
          <th>Amount</th>
        </tr>
        {indivBets.length !== 0
          ? indivBets.map((bets) => (
              <tr
                onClick={(bet) => {
                  setIndividualBetToBeUpdated({
                    id: bets.id,
                    number: bets.number,
                    amount: bets.amount,
                  });
                  setUpdateIndividualBetModalVisible(true);
                }}
              >
                <td>{bets.number}</td>
                <td>{bets.amount}</td>
              </tr>
            ))
          : null}
      </table>
      <UpdateIndividualBetModal
        visible={visible}
        setIndivBets={setIndivBets}
        indivBets={indivBets}
        setUpdateIndividualBetModalVisible={setUpdateIndividualBetModalVisible}
        individualBetToBeUpdated={individualBetToBeUpdated}
        updateIndivBets={updateIndivBets}
        setIndividualBetToBeUpdated={setIndividualBetToBeUpdated}
      />
      <br />
      <h2>Total: {total}</h2>
    </div>
  );
};

export default IndividualBets;
