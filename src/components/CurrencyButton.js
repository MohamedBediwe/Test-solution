import React, { Component } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../context/CurrencyContext";
import downArrow from "../imgs/ardown.svg";
import upArrow from "../imgs/up-arrow.svg";
import CurrenciesList from "./CurrenciesList";

class CurrencyButton extends Component {
  static contextType = CurrencyContext;

  handleClick = (e) => {
    e.target.classList.toggle("show-list");
  };
  // Removes the currencies list when clicking outside of it
  componentDidMount() {
    window.addEventListener("click", (e) => {
      const currencyHolder = document.querySelector(".currency-holder");

      if (
        currencyHolder.classList.contains("show-list") &&
        e.target !== currencyHolder
      ) {
        currencyHolder.classList.remove("show-list");
      }
    });
  }

  render() {
    return (
      <StyledSpan
        className="currency-holder"
        onClick={(e) => this.handleClick(e)}
      >
        {this.context.currency.symbol}
        <img className="down" src={downArrow} alt="Open" />
        <img src={upArrow} className="up" alt="Close" />
        <CurrenciesList />
      </StyledSpan>
    );
  }
}

const StyledSpan = styled.span`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 30px;
  margin-right: 15px;
  font-size: 18px;
  font-weight: 500;
  &.show-list {
    img.down {
      display: none;
    }
    .currencies-list {
      display: flex;
    }
    img.up {
      display: block;
    }
  }
  img.up {
    display: none;
  }
  .currencies-list {
    display: none;
  }
`;

export default CurrencyButton;
