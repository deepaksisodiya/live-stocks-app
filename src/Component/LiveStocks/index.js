import React, { Component } from "react";
import PropTypes from "prop-types";

import "./liveStocks.css";

export default class LiveStocks extends Component {
  renderData = () => {
    const { stocks, isLoading, isError } = this.props;

    console.log("stocks ", stocks);

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div>
          <p>Some Error, Please try again!</p>
        </div>
      );
    }

    if (stocks) {
      return (
        <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Last Update</th>
            </tr>
            {stocks.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td style={{ backgroundColor: stock.color }}>
                    {stock.price}
                  </td>
                  <td>{stock.lastUpdate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  render() {
    return <div>{this.renderData()}</div>;
  }
}

LiveStocks.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  stocks: PropTypes.array.isRequired
};
