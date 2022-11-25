import React, { Component, createContext } from "react";

export const CategoryContext = createContext();

class CategoryContextProvider extends Component {
	state = {
		category: sessionStorage.getItem("category")
			? JSON.parse(sessionStorage.getItem("category"))
			: "",
	};

	changeCategory = (category) => {
		this.setState({ category });
		sessionStorage.setItem("category", JSON.stringify(category));
	};

	componentDidMount() {
		!sessionStorage.getItem("category") &&
			sessionStorage.setItem("category", JSON.stringify(this.state.category));
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
