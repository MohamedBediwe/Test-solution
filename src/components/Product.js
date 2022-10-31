import { nanoid } from "nanoid";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import addToCartBtn from "../imgs/add-to-cart.svg";

import Capacity from "../components/Capacity";
import Sizes from "../components/Sizes";
import Colors from "../components/Colors";
import OtherProductDetails from "../components/OtherProductDetails";

export default class Product extends PureComponent {
  static contextType = CartContext;

  updataAttr = (attrName, newValue) => {
    this.setState({ [attrName]: newValue });
  };

  addTocart = (product) => {
    this.context.addToCart({
      ...product,
      count: 1,
      productId: nanoid(),
      ...this.state,
    });
  };

  render() {
    const { name, id, inStock, gallery, attributes } = this.props.product;
    const {
      amount,
      currency: { symbol },
    } = this.props.price;
    return (
      <StyledProduct inStock={inStock}>
        <div className="image">
          <img src={gallery[0]} alt="Product" />

          <div className="hovered">
            {attributes.map((e, i) => {
              if (e.name === "Capacity")
                return (
                  <Capacity
                    key={i}
                    productName={name}
                    capacity={e}
                    updateAttr={this.updataAttr}
                  />
                );
              if (e.name === "Color")
                return (
                  <Colors
                    key={i}
                    colors={e}
                    productName={name}
                    updateAttr={this.updataAttr}
                  />
                );
              if (e.name === "Size")
                return (
                  <Sizes
                    key={i}
                    productName={name}
                    updateAttr={this.updataAttr}
                    sizes={e}
                  />
                );
              else
                return (
                  <OtherProductDetails
                    key={i}
                    details={e}
                    updateAttr={this.updataAttr}
                  />
                );
            })}
          </div>
          {!inStock && <p className="out-of-stock">out of stock</p>}
          {inStock && (
            <div
              className="add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                this.addTocart({ ...this.props.product });
              }}
            >
              <img src={addToCartBtn} alt="Add to cart" />
            </div>
          )}
        </div>
        <Link to={`/products/${id}`}>
          <p className="name">{name}</p>
          <p className="price">
            {symbol} {amount}
          </p>
        </Link>
      </StyledProduct>
    );
  }
}

const StyledProduct = styled.div`
  opacity: ${(props) => (props.inStock ? "1" : "0.6")};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: 0.3s ease-in-out all;
  &:hover {
    box-shadow: 0px 0px 20px 1px rgb(133 139 145 / 28%);
    .add-to-cart {
      display: block;
      border-radius: 50%;
      z-index: 100;
      img {
        width: 52px;
        height: 52px;
      }
    }
  }
  > .image {
    position: relative;
    cursor: pointer;
    img {
      height: 330px;
      width: 100%;
    }
  }

  p.out-of-stock {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #8d8f9a;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-size: 24px;
  }
  p.name {
    margin-top: 10px;
    text-transform: capitalize;
    font-size: 18px;
    color: var(--black);
    margin-bottom: 10px;
  }
  p.price {
    color: var(--black);
  }
  .add-to-cart {
    position: absolute;
    display: none;
    bottom: -25px;
    right: 10px;
  }
  .hovered {
    display: none;
    position: absolute;
    background-color: #ffffff61;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  &:hover .hovered {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
