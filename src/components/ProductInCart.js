import React, { PureComponent } from "react";
import GalleryInCart from "./GalleryInCart";
import { CurrencyContext } from "../context/CurrencyContext";
import Counter from "./Counter";
import styled from "styled-components";
import Capacity from "../components/Capacity";
import Sizes from "../components/Sizes";
import Colors from "../components/Colors";
import OtherProductDetails from "../components/OtherProductDetails";

export default class ProductInCart extends PureComponent {
  static contextType = CurrencyContext;

  render() {
    const { gallery, name, brand, prices, attributes, count, productId } =
      this.props.product;
    const price = prices.filter(
      (e) => e.currency.label === this.context.currency.label
    )[0];

    return (
      <StyledDiv>
        <div className="left">
          <h2 className="brand">{brand}</h2>
          <h3 className="name">{name}</h3>
          <h4 className="price">
            {price.currency.symbol}
            {price.amount}
          </h4>
          <div className="attrs">
            {attributes.map((e, i) => {
              if (e.name === "Capacity")
                return (
                  <Capacity
                    key={i}
                    capacity={e}
                    inCart={true}
                    selectedCapacity={this.props.product.Capacity}
                  />
                );
              if (e.name === "Color")
                return (
                  <Colors
                    key={i}
                    colors={e}
                    inCart={true}
                    selectedColor={this.props.product.Color}
                  />
                );
              if (e.name === "Size")
                return (
                  <Sizes
                    key={i}
                    inCart={true}
                    sizes={e}
                    selectedSize={this.props.product.Size}
                  />
                );
              else
                return (
                  <OtherProductDetails
                    key={i}
                    details={e}
                    inCart={true}
                    selectedAttr={this.props.product}
                  />
                );
            })}
          </div>
        </div>
        <div className="right">
          <Counter count={count} id={productId} />
          <GalleryInCart gallery={gallery} />
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  .right {
    display: flex;
    align-items: center;
  }
  &:last-child {
    border-bottom-color: #e5e5e5;
  }
  border: 0.5px solid transparent;
  border-color: #e5e5e5 transparent transparent;
  padding-block: 15px;
  .name {
    margin-bottom: 10px;
  }
  .brand {
    margin-bottom: 10px;
  }
  .price {
    margin-bottom: 15px;
  }
`;
