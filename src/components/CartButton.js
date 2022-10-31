import React, { Component, Fragment } from "react";
import MiniCart from "./MiniCart";
import cart from "../imgs/cart.svg";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

export default class CartButton extends Component {
  static contextType = CartContext;
  state = {
    showMiniCart: false,
  };

  handleClick = () => {
    this.setState((old) => ({ showMiniCart: !old.showMiniCart }));
  };

  render() {
    return (
      <Fragment>
        <StyledSpan
          showMiniCart={this.state.showMiniCart}
          className="cart-btn"
          onClick={this.handleClick}
        >
          <img src={cart} alt="Open Cart" className="cart-image" />
          <div className="products-count">{this.context.productsInCart()}</div>
        </StyledSpan>
        {this.state.showMiniCart && <MiniCart />}
      </Fragment>
    );
  }
}

const StyledSpan = styled.span`
  cursor: pointer;
  position: relative;
  padding: 10px;
  .products-count {
    position: absolute;
    background-color: var(--black);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    aspect-ratio: 1;
    font-weight: 700;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    top: -10px;
    right: -9px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100vw;
    height: 100vh;
    right: -25px;
    top: 40px;
    background-color: rgba(57, 55, 72, 0.22);
    display: ${(props) => (props.showMiniCart ? "block" : "none")};
    z-index: 5;
    cursor: default;
  }
`;
