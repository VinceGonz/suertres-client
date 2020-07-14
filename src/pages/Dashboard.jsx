import React, { useContext } from "react";
import Layout from "../components/Layout";
import SList from "../components/SList";
import { useState } from "react";
import { useEffect } from "react";
import { BetContext } from "../context/BetContext";

const Dashboard = () => {
  const [fname, setFname] = useState("");
  const { setFlashMsg } = useContext(BetContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setFname(user.fname);
    setFlashMsg({ msgType: "", msgText: "" });
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1>Welcome, {fname}</h1>
    </Layout>
  );
};

export default Dashboard;
