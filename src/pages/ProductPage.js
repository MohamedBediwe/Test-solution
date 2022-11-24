import React, { PureComponent } from "react";
import Gallery from "../components/Gallery";
import Capacity from "../components/Capacity";
import Sizes from "../components/Sizes";
import Colors from "../components/Colors";
import OtherProductDetails from "../components/OtherProductDetails";

import { CurrencyContext } from "../context/CurrencyContext";
import { CartContext } from "../context/CartContext";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";
import parse from "html-react-parser";
import client from "../gql/apolloClient";
import { PRODUCT_QUERY } from "../gql/Queries";

class ProductPage extends PureComponent {
  state = {
    product: null,
  };

  static contextType = CurrencyContext;

  updataAttr = (attrName, newValue) => {
    this.setState({ [attrName]: newValue });
  };

  async fetchProduct() {
    const result = await client.query({
      query: PRODUCT_QUERY,
      variables: {
        id: this.props.match.params.id,
      },
    });
    this.setState({ product: result.data.product });
  }

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    const product = this.state.product;

    if (product !== null) {
      const price = product.prices.filter(
        (e) => e.currency.label === this.context.currency.label
      )[0];
      return (
        <StyledPage inStock={product.inStock} className="product-page">
          <div className="left">
            <Gallery inStock={product.inStock} gallery={product.gallery} />
          </div>
          <div className="right">
            <h2 className="brand">{product.brand}</h2>
            <p className="name">{product.name}</p>
            {product.attributes.map((e, i) => {
              if (e.name === "Capacity")
                return (
                  <Capacity key={i} capacity={e} updateAttr={this.updataAttr} />
                );
              if (e.name === "Color")
                return (
                  <Colors key={i} colors={e} updateAttr={this.updataAttr} />
                );
              if (e.name === "Size")
                return <Sizes key={i} updateAttr={this.updataAttr} sizes={e} />;
              else
                return (
                  <OtherProductDetails
                    key={i}
                    details={e}
                    updateAttr={this.updataAttr}
                  />
                );
            })}
            <div className="price">
              <h4>price: </h4>
              <div>{`${price.currency.symbol} ${price.amount}`}</div>
            </div>
            {
              <CartContext.Consumer>
                {(context) => {
                  const addToCart = () => {
                    let keys = Object.keys(this.state)
                      .filter((e) => e !== "product")
                      .map((e) => ({ [e]: this.state[e] }));

                    context.addToCart({
                      ...Object.assign(...keys),
                      ...this.state.product,
                      productId: nanoid(),
                      count: 1,
                    });
                  };
                  return (
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        addToCart();
                      }}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "add to cart" : "out of stock"}
                    </button>
                  );
                }}
              </CartContext.Consumer>
            }
            <div className="description">{parse(`${product.description}`)}</div>
          </div>
        </StyledPage>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

const StyledPage = styled.main`
  .right {
    h4 {
      font-size: 18px;
      text-transform: uppercase;
      font-family: "Roboto Condensed", sans-serif;
    }
  }
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 100px;
  .name {
    margin-bottom: 20px;
    font-size: 30px;
  }
  .brand {
    margin-bottom: 10px;
    font-size: 30px;
  }
  .price {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-block: 20px;
    div {
      font-weight: 700;
      font-size: 24px;
    }
  }
  button.add-to-cart {
    text-transform: uppercase;
    color: #fff;
    background-color: ${(props) => (props.inStock ? "var(--green)" : "#333")};
    padding: 16px 32px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 450px;
    font-size: 16px;
    font-weight: 600;
  }
  .description {
    font-family: "Roboto", sans-serif;
    color: var(--black);
    max-width: 450px;
    line-height: 1.4;
    padding-bottom: 20px;
  }
`;

export default withRouter(ProductPage);
