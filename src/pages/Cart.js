import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import ProductInCart from "../components/ProductInCart";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";
import Price from "../components/Price";

class Cart extends Component {
  static contextType = CartContext;

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleCheckout = () => {
    setTimeout(this.context.removeCart, 1000);
    this.props.history.push("/");
  };

  render() {
    const { inCart } = this.context;
    return (
      <StyledMain>
        <h2>Cart</h2>
        {inCart.length > 0 ? (
          inCart.map((product) => (
            <ProductInCart key={product.productId} product={product} />
          ))
        ) : (
          <div>
            <h4>cart is empty</h4>
            <Link to="/">Add Some Products</Link>
          </div>
        )}
        <Price />
        {inCart.length > 0 && (
          <button
            className="checkout"
            type="button"
            onClick={this.handleCheckout}
          >
            order
          </button>
        )}
      </StyledMain>
    );
  }
}

const StyledMain = styled.main`
  > h2 {
    text-transform: uppercase;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 30px;
  }
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
  button.checkout {
    padding: 15px 50px;
    margin-block: 15px;
    background-color: var(--green);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

export default withRouter(Cart);
