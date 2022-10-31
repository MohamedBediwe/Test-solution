import React, { PureComponent } from "react";
import Product from "./Product";
import styled from "styled-components";
import { CurrencyContext } from "../context/CurrencyContext";

class ProductsList extends PureComponent {
  static contextType = CurrencyContext;

  render() {
    return (
      <StyledList>
        {this.props.products.map((product) => {
          const price = product.prices.find(
            (e) => e.currency.label === this.context.currency.label
          );
          return <Product product={product} key={product.name} price={price} />;
        })}
      </StyledList>
    );
  }
}

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 386px);
  gap: 30px;
  padding-bottom: 20px;
  justify-content: center;
`;

export default ProductsList;
