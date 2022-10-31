import React, { PureComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartContextProvider from "./context/CartContext";
import CategoryContextProvider from "./context/CategoryContext";
import CurrencyContextProvider from "./context/CurrencyContext";
import Main from "./pages/Main";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";

class App extends PureComponent {
  render() {
    return (
      <div className="container">
        <Router>
          <CurrencyContextProvider>
            <CartContextProvider>
              <CategoryContextProvider>
                <Header />
                <Switch>
                  <Route exact path="/">
                    <Main />
                  </Route>
                  <Route path="/cart">
                    <Cart />
                  </Route>
                  <Route exact path="/products/:id">
                    <ProductPage />
                  </Route>
                </Switch>
              </CategoryContextProvider>
            </CartContextProvider>
          </CurrencyContextProvider>
        </Router>
      </div>
    );
  }
}

export default App;
