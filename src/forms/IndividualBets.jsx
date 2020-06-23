import React from "react";

const IndividualBets = ({ indivBets }) => {
  let amountArray = indivBets.map((bet) => parseInt(bet.amount));
  let total =
    amountArray.length !== 0
      ? amountArray.reduce((accu, currVal) => accu + currVal)
      : 0;
  return (
    <div>
      <table>
        <tr>
          <th>Numero</th>
          <th>Amount</th>
        </tr>
        {indivBets.length !== 0
          ? indivBets.map((bets) => (
              <tr>
                <td>{bets.number}</td>
                <td>{bets.amount}</td>
              </tr>
            ))
          : null}
      </table>
      <br />
      <h4>Total: {total}</h4>
    </div>
  );
};

export default IndividualBets;
