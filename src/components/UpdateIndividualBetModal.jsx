import React from "react";

import { BetContext } from "../context/BetContext";
import { useContext } from "react";

const UpdateIndividualBetModal = ({
  visible,
  indivBets,
  setIndivBets,
  individualBetToBeUpdated,
  setUpdateIndividualBetModalVisible,
  // updateIndivBets,
  setIndividualBetToBeUpdated,
}) => {
  const { setFlashMsg } = useContext(BetContext);
  // ! Limit lenght of characters in a input field
  const setLimitLength = (maxLength, value) => {
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
    }
    return value;
  };

  const updateIndivBet = (updatedBet) => {
    console.log("UPDATED BET", updatedBet);
    console.log("LENGHT OF INDIVBETS", indivBets);
    let updatedBets = indivBets.map((bet) => {
      if (bet.id === updatedBet.id) {
        bet = { ...bet, number: updatedBet.number, amount: updatedBet.amount };
      }
      return bet;
    });

    setIndivBets(updatedBets);
    localStorage.setItem("indivBets", JSON.stringify(updatedBets));
  };

  const deleteIndivBet = (betId) => {
    let updatedBetAfterRemovingOneBet = indivBets.filter(
      (bet) => bet.id !== betId
    );
    setIndivBets(updatedBetAfterRemovingOneBet);
    localStorage.setItem(
      "indivBets",
      JSON.stringify(updatedBetAfterRemovingOneBet)
    );
  };

  return (
    <div
      className={`updateIndividualBetModal-wrapper ${
        visible ? "updateIndividualBetModalVisible" : null
      }`}
    >
      <div className="updateIndividualBet-modal">
        <h3>Are you sure you want to Update it?</h3>
        <br />
        <div>
          <label htmlFor="number">
            <strong>Number:</strong>{" "}
          </label>
          <input
            type="text"
            className="updateIndividualBetBoxFields"
            value={individualBetToBeUpdated.number}
            onChange={(e) =>
              setIndividualBetToBeUpdated({
                ...individualBetToBeUpdated,
                number: setLimitLength(3, e.target.value),
              })
            }
            disabled="true"
          />
        </div>
        <div>
          <label htmlFor="amount">
            <strong>Amount:</strong>{" "}
          </label>
          <input
            type="number"
            className="updateIndividualBetBoxFields"
            value={individualBetToBeUpdated.amount}
            onChange={(e) =>
              setIndividualBetToBeUpdated({
                ...individualBetToBeUpdated,
                amount: e.target.value,
              })
            }
          />
        </div>
        <br />
        <button
          className="confirmDeleteBtn"
          onClick={() => {
            updateIndivBet({
              id: individualBetToBeUpdated.id,
              number: individualBetToBeUpdated.number,
              amount: individualBetToBeUpdated.amount,
            });
            setUpdateIndividualBetModalVisible(false);
            setFlashMsg({
              type: "success",
              msgText: `Successfully Updated number ${individualBetToBeUpdated.number}`,
            });
            setTimeout(() => {
              setFlashMsg({
                msgType: "",
                msgText: "",
              });
            }, 4000);
          }}
        >
          Update
        </button>
        <button
          className="cancelDeleteBtn"
          onClick={() => {
            deleteIndivBet(individualBetToBeUpdated.id);
            setUpdateIndividualBetModalVisible(false);
            setFlashMsg({
              type: "success",
              msgText: `Successfully Deleted number ${individualBetToBeUpdated.number}`,
            });
            setTimeout(() => {
              setFlashMsg({
                msgType: "",
                msgText: "",
              });
            }, 8000);
          }}
        >
          Delete
        </button>
        <span
          className="modal-close"
          onClick={() => setUpdateIndividualBetModalVisible(false)}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default UpdateIndividualBetModal;
