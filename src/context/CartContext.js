import React, { Component, createContext } from "react";

export const CartContext = createContext();

class CartContextProvider extends Component {
  state = {
    inCart: localStorage.getItem("inCart")
      ? JSON.parse(localStorage.getItem("inCart"))
      : [],
  };

  // this fucntion is for calculating the the 21% taxes and the total amount of money to be paid when checking out
  getPrice = (currency) => {
    let productsPrice = this.state.inCart.map((product) => {
      return (
        product.prices.filter((e) => e.currency.label === currency.label)[0]
          .amount * product.count
      );
    });
    let price = productsPrice.reduce((a, b) => {
      return a + b;
    }, 0);
    return price;
  };

  // this function checks first the product is in cart by its name if not adds it to
  // the cart with a count of 1
  // if yes it checks the if it has the same attributes or not if they do have the same attrs
  // it increaments the count by 1 if not adds it to the cart as a new product
  addToCart = (product) => {
    const attrs = product.attributes.map((e) => e.name);
    let idByName = product.name;
    attrs.forEach((e) => {
      idByName += `-${product[e]}`;
    });
    const products = this.state.inCart;
    const index = products.findIndex((product) => {
      let name = product.name;
      const attrs = product.attributes.map((e) => e.name);
      attrs.forEach((e) => {
        name += `-${product[e]}`;
      });
      return name === idByName;
    });
    if (index === -1) {
      this.setState((old) => ({ inCart: [...old.inCart, product] }));
      localStorage.setItem(
        "inCart",
        JSON.stringify([...this.state.inCart, product])
      );
    } else {
      this.changeCount(products[index].productId, 1);
    }
  };

  // remove a product when its count is 1 and the user clicks in the minus button
  removeProduct = (id) => {
    const products = this.state.inCart;
    const newProducts = products.filter((e) => e.productId !== id);
    this.setState({ inCart: [...newProducts] });
    localStorage.setItem("inCart", JSON.stringify([...newProducts]));
  };

  // changes the count of the products in cart
  changeCount = (id, value) => {
    const products = this.state.inCart;
    const newProducts = products.map((e) => {
      if (e.productId === id) {
        return { ...e, count: e.count + value };
      }
      return e;
    });
    this.setState({ inCart: [...newProducts] });
    localStorage.setItem("inCart", JSON.stringify([...newProducts]));
  };

  // deletes the cart when the order or checkout buttons are clicked
  removeCart = () => {
    this.setState({ inCart: [] });
    localStorage.setItem("inCart", JSON.stringify([]));
  };

  // return the count of products in cart
  productsInCart = () => {
    if (this.state.inCart.length === 0) return 0;
    if (this.state.inCart.length === 1) return this.state.inCart[0].count;

    return this.state.inCart
      .map((e) => e.count)
      .reduce((a, b) => {
        return a + b;
      });
  };

  render() {
    const value = {
      ...this.state,
      addToCart: this.addToCart,
      changeCount: this.changeCount,
      removeProduct: this.removeProduct,
      removeCart: this.removeCart,
      productsInCart: this.productsInCart,
      getPrice: this.getPrice,
    };
    return (
      <CartContext.Provider value={value}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContextProvider;
