import React, { createContext, Component } from "react";

export const CurrencyContext = createContext();

class CurrencyContextProvider extends Component {
  state = {
    currency: localStorage.getItem("currency")
      ? JSON.parse(localStorage.getItem("currency"))
      : { label: "USD", symbol: "$" },
  };

  componentDidMount() {
    if (!localStorage.getItem("currency")) {
      localStorage.setItem("currency", JSON.stringify(this.state.currency));
    }
  }

  changeCurrency = (currency) => {
    this.setState({ currency });
    localStorage.setItem("currency", JSON.stringify(currency));
  };

  render() {
    const value = { ...this.state, changeCurrency: this.changeCurrency };
    return (
      <CurrencyContext.Provider value={value}>
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContextProvider;
