import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BetContext } from "../context/BetContext";

const Navbar = ({ currentActive }) => {
  const { setFlashMsg } = useContext(BetContext);

  return (
    <nav>
      <ul>
        <Link
          to="/addBet"
          className="text-link"
          onClick={() => setFlashMsg({ type: "", msgText: "" })}
        >
          <li className={currentActive === "Add" ? "active-link" : ""}>
            Add Bet
          </li>
        </Link>

        <Link
          to="/sList"
          className="text-link"
          onClick={() => setFlashMsg({ type: "", msgText: "" })}
        >
          <li className={currentActive === "STL" ? "active-link" : ""}>
            STL List
          </li>
        </Link>

        <Link
          to="/betList"
          className="text-link"
          onClick={() => setFlashMsg({ type: "", msgText: "" })}
        >
          <li className={currentActive === "Bet" ? "active-link" : ""}>
            Bet List
          </li>
        </Link>

        <Link
          to="/winnersList"
          className="text-link"
          onClick={() => setFlashMsg({ type: "", msgText: "" })}
        >
          <li className={currentActive === "Winners" ? "active-link" : ""}>
            Winners List
          </li>
        </Link>

        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
