import React from "react";
import CustomDatePicker from "./CustomDatePicker";
import moment from "moment";
import UpdateModalDatePicker from "./UpdateModalDatePicker";
import { BetContext } from "../context/BetContext";
import { useContext } from "react";

const UpdateModal = ({
  visible,
  setUpdateModalVisible,
  betToBeUpdated,
  setBetToBeUpdated,
}) => {
  const { bets_id, cell_num, number, amount, draw, date } = betToBeUpdated;

  const { updateBetData, setFlashMsg } = useContext(BetContext);

  // ! Limit lenght of characters in a input field
  const setLimitLength = (maxLength, value) => {
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
    }
    return value;
  };

  return (
    <div
      className={`updateModal-wrapper ${visible ? "updateModalVisible" : null}`}
    >
      <div className="updateModal-modal">
        <h3>Update Bet</h3>
        <div className="form-group">
          <label htmlFor="Cell Num">Cell No.</label>
          <input
            type="number"
            value={cell_num}
            className="updateBetBoxFields"
            onChange={(e) =>
              setBetToBeUpdated({
                ...betToBeUpdated,
                cell_num: setLimitLength(10, e.target.value),
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="Numero">Numero</label>
          <input
            type="number"
            value={number}
            className="updateBetBoxFields"
            onChange={(e) =>
              setBetToBeUpdated({
                ...betToBeUpdated,
                number: setLimitLength(3, e.target.value),
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            className="updateBetBoxFields"
            onChange={(e) =>
              setBetToBeUpdated({ ...betToBeUpdated, amount: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="draw">Draw</label>
          <select
            className="newBetBoxFields drawSelectInput"
            value={draw}
            onChange={(e) =>
              setBetToBeUpdated({ ...betToBeUpdated, draw: e.target.value })
            }
            // onChange={(e) => setSelectedDrawTime(e.target.value)}
          >
            <option value="11" selected="selected">
              11AM
            </option>
            <option value="4">4PM</option>
            <option value="9">9PM</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <UpdateModalDatePicker
            selectedDate={moment(date).toDate()}
            setSelectedDate={setBetToBeUpdated}
            betToBeUpdated={betToBeUpdated}
          />
        </div>
        <button
          className="confirmUpdateBtn"
          onClick={() => {
            console.log(betToBeUpdated);
            updateBetData(betToBeUpdated);
            setUpdateModalVisible(false);
            setFlashMsg({
              type: "success",
              msgText: `Successfully updated number ${betToBeUpdated.number}`,
            });
            setTimeout(() => {
              setFlashMsg({
                msgType: "",
                msgText: "",
              });
            }, 4000);
          }}
        >
          Confirm
        </button>
        <button
          className="cancelUpdateBtn"
          onClick={() => setUpdateModalVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateModal;
