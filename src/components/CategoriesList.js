import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
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

  componentDidUpdate() {
    if (this.context.category === "") {
      this.context.changeCategory(this.state.categories[0]);
    }
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
              key={e}
              onClick={() => changeCategory(e)}
              className={`${category === e ? "active" : ""}`}
            >
              <Link to="/">{e}</Link>
            </button>
          ))}
      </div>
    );
  }
}

export default CategoriesList;
