import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentActive }) => {
  return (
    <nav>
      <ul>
        <Link to="/addBet" className="text-link">
          <li className={currentActive === "Add" ? "active-link" : ""}>
            Add Bet
          </li>
        </Link>

        <Link to="/sList" className="text-link">
          <li className={currentActive === "STL" ? "active-link" : ""}>
            STL List
          </li>
        </Link>

        <Link to="/betList" className="text-link">
          <li className={currentActive === "Bet" ? "active-link" : ""}>
            Bet List
          </li>
        </Link>

        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
