import React, { Component } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../context/CurrencyContext";
import client from "../gql/apolloClient";
import { CURRENCIES_QUERY } from "../gql/Queries";

class CurrenciesList extends Component {
  static contextType = CurrencyContext;

  state = {
    currencies: [],
  };

  async fetchCurrencies() {
    const result = await client.query({
      query: CURRENCIES_QUERY,
    });
    this.setState({ currencies: result.data.currencies });
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  render() {
    const currencies = this.state.currencies;
    const changeCurrency = this.context.changeCurrency;
    return (
      <StyledDiv className="currencies-list">
        {currencies.length > 0 &&
          currencies.map(({ symbol, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                changeCurrency({ label, symbol });
                document
                  .querySelector(".currency-holder")
                  .classList.remove("show-list");
              }}
            >
              {symbol} {label}
            </button>
          ))}
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 0px 20px 1px rgb(133 139 145 / 28%);
  top: ${(props) => (props.display ? "30px" : "30px")};
  left: -20px;
  width: 80px;
  z-index: 100;
  background-color: #fff;
  button {
    display: flex;
    gap: 5px;
    align-items: center;
    flex-direction: row;
    padding: 15px 10px;
    transition: 0.3s ease-in-out background;
    &:hover {
      background: #efefef;
    }
  }
`;

export default CurrenciesList;
