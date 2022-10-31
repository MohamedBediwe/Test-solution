import React, { Component, createContext } from "react";

export const CategoryContext = createContext();

class CategoryContextProvider extends Component {
  state = {
    category: localStorage.getItem("category")
      ? JSON.parse(localStorage.getItem("category"))
      : "all",
  };

  changeCategory = (category) => {
    this.setState({ category });
    localStorage.setItem("category", JSON.stringify(category));
  };

  componentDidMount() {
    !localStorage.getItem("category") &&
      localStorage.setItem("category", JSON.stringify(this.state.category));
  }

  render() {
    const value = { ...this.state, changeCategory: this.changeCategory };
    return (
      <CategoryContext.Provider value={value}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryContextProvider;
