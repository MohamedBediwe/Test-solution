import React, { PureComponent } from "react";
import { CategoryContext } from "../context/CategoryContext";
import client from "../gql/apolloClient";
import { CATEGORIES_QUERY } from "../gql/Queries";

class CategoriesList extends PureComponent {
  state = {
    categories: [],
  };

  async fetchCategories() {
    let result = await client
      .query({
        query: CATEGORIES_QUERY,
      })
      .then((res) => res.data.categories.map((e) => e.name));
    this.setState({ categories: [...result] });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  static contextType = CategoryContext;
  render() {
    const { category, changeCategory } = this.context;
    const categories = this.state.categories;
    return (
      <div>
        {categories.length > 0 &&
          categories.map((e) => (
            <button
              className={`${category === e ? "active" : ""}`}
              key={e}
              onClick={() => changeCategory(e)}
            >
              {e}
            </button>
          ))}
      </div>
    );
  }
}

export default CategoriesList;
