import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Add");

  return (
    <nav>
      <ul>
        <Link to="/addBet" className="Links">
          <li
            className={active === "Add" ? "active-link" : "not-active"}
            onClick={(e) => setActive("Add")}
          >
            Add Bet
          </li>
        </Link>
        <Link to="/sList" className="Links">
          <li
            className={active === "STL" ? "active-link" : "not-active"}
            onClick={(e) => setActive("STL")}
          >
            STL List
          </li>
        </Link>
        <Link to="/betList" className="Links">
          <li
            className={active === "View" ? "active-link" : "not-active"}
            onClick={(e) => setActive("View")}
          >
            Bet List
          </li>
        </Link>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
