import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { CurrencyContext } from "../context/CurrencyContext";

export default class Price extends Component {
  static contextType = CurrencyContext;
  render() {
    return (
      <CartContext.Consumer>
        {({ getPrice, productsInCart }) => (
          <STYLED_DIV inMiniCart={this.props.inMiniCart}>
            {!this.props.inMiniCart && (
              <Fragment>
                <p>
                  <span>tax 21%: </span>
                  <span>
                    {this.context.currency.symbol}
                    {((getPrice(this.context.currency) * 21) / 100).toFixed(2)}
                  </span>
                </p>
                <p>
                  <span>quantity:</span> <span>{productsInCart()}</span>
                </p>
              </Fragment>
            )}
            <p>
              <span>total: </span>
              <span>
                {this.context.currency.symbol}
                {(
                  getPrice(this.context.currency) +
                  (getPrice(this.context.currency) * 21) / 100
                ).toFixed(2)}
              </span>
            </p>
          </STYLED_DIV>
        )}
      </CartContext.Consumer>
    );
  }
}

const STYLED_DIV = styled.div`
  margin-top: 20px;
  p {
    margin-bottom: 10px;
    text-transform: capitalize;
    font-size: 24px;
    font-family: "Raleway", sans-serif;
    color: var(--black);
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: ${(props) =>
      props.inMiniCart ? "space-between" : "flex-start"};
    span:nth-child(2) {
      font-weight: 700;
      felx: 1;
      text-align: ;
    }
    span:nth-child(1) {
      min-width: 120px;
    }
  }
`;
