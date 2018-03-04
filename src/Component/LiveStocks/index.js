import React, { Component } from "react";

export default class LiveStocks extends Component {
  render() {
    const { stocks } = this.props;

    return (
      <div>
        <p>Create Table Here</p>
        <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
            {stocks.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
