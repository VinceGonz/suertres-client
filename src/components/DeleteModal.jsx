import React, { useState } from "react";
import { useEffect } from "react";
import { BetContext } from "../context/BetContext";
import { useContext } from "react";

const DeleteModal = ({
  visible,
  setDeleteModalVisible,
  betTobeDeleted: { id, number },
}) => {
  const { deleteBetNumber, setFlashMsg } = useContext(BetContext);
  return (
    <div className={`deleteModal-bg ${visible ? "deleteModalVisible" : null}`}>
      <div className="deleteModal-modal">
        <h3>Are you sure you want to Delete it?</h3>
        <br />
        <button
          className="confirmDeleteBtn"
          onClick={() => {
            deleteBetNumber(id);
            setDeleteModalVisible(false);
            setFlashMsg({
              type: "success",
              msgText: `Successfully deleted number ${number}`,
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
          className="cancelDeleteBtn"
          onClick={() => setDeleteModalVisible(false)}
        >
          Cancel
        </button>
        <span
          className="modal-close"
          onClick={() => setDeleteModalVisible(false)}
        >
          X
        </span>
      </div>
    </div>
  );
};

export default DeleteModal;
