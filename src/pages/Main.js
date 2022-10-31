import React, { PureComponent } from "react";
import { PRODUCTS_QEURY } from "../gql/Queries";
import client from "../gql/apolloClient";
import { CategoryContext } from "../context/CategoryContext";
import ProductsList from "../components/ProductsList";

export default class Main extends PureComponent {
  static contextType = CategoryContext;

  state = {
    products: [],
  };

  componentDidMount() {
    this.fetchProducts();
  }

  // this one is for when the category changes to set the new products
  componentDidUpdate() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const result = await client.query({
      query: PRODUCTS_QEURY,
      variables: { input: { title: this.context.category } },
    });

    this.setState({ products: result.data.category.products });
  }

  render() {
    const category = this.context.category;
    const products = this.state.products;
    return (
      <main>
        <h2
          style={{
            textTransform: "capitalize",
            fontSize: "42px",
            marginTop: "15px",
          }}
        >
          {category}
        </h2>
        {products.length > 0 ? (
          <ProductsList products={products} />
        ) : (
          <h2>Loading</h2>
        )}
      </main>
    );
  }
}
