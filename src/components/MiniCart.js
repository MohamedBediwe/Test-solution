import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import Price from "./Price";
import ProductInCart from "./ProductInCart";
import PropTypes from "prop-types";

class MiniCart extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleCheckout = () => {
    setTimeout(this.context.removeCart, 1000);
    this.props.history.push("/");
  };

  render() {
    return (
      <CartContext.Consumer>
        {({ inCart, removeCart, changeAttr }) => {
          return (
            <StyledMiniCart
              onClick={(e) => e.stopPropagation()}
              className="mini-cart"
            >
              {inCart.length > 0 ? (
                inCart.map((product) => (
                  <ProductInCart
                    changeAttr={changeAttr}
                    key={product.productId}
                    product={product}
                  />
                ))
              ) : (
                <div className="empty">
                  <h4>cart is empty</h4>
                  <Link to="/">Add Some Products</Link>
                </div>
              )}
              <Price inMiniCart={true} />
              <div className="cart-buttons">
                <Link to="/cart">
                  <button
                    onClick={() => document.querySelector(".cart-btn").click()}
                  >
                    View Bag
                  </button>
                </Link>
                {inCart.length > 0 && (
                  <button
                    className="checkout"
                    onClick={() => {
                      setTimeout(removeCart, 1000);
                      this.props.history.push("/");
                    }}
                  >
                    checkout
                  </button>
                )}
              </div>
            </StyledMiniCart>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

const StyledMiniCart = styled.div`
  position: absolute;
  // display: none;
  width: 415px;
  background-color: #fff;
  z-index: 10;
  right: 0;
  top: 64px;
  padding: 15px;
  max-height: calc(100vh - 80px);
  overflow-y: scroll;
  .empty {
    h4 {
      text-transform: capitalize;
      font-size: 24px;
      margin-bottom: 30px;
    }
    a {
      margin-bottom: 20px;
      text-transform: uppercase;
      font-size: 20px;
      color: #fff;
      background-color: var(--green);
      padding: 10px 20px;
      font-weight: 500;
    }
  }
  img.product-image {
    width: 121px;
    height: 190px;
  }
  .count > button {
    padding: 10px;
  }
  > div.cart-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-top: 30px;
    justify-content: space-between;
    button {
      padding: 16px 50px;
      font-weight: 600;
      text-transform: uppercase;
      &:first-child {
        border: 1px solid var(--black);
        color: var(--black);
      }
      &.checkout {
        background-color: var(--green);
        color: #fff;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--green);
  }
`;

export default withRouter(MiniCart);
