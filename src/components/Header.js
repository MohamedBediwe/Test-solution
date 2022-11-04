import React, { Component } from "react";
import styled from "styled-components";

import CurrencyButton from "./CurrencyButton";
import CategoriesList from "./CategoriesList";

import logo from "../imgs/logo.svg";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <nav>
          <div className="buttons">
            <CategoriesList />
          </div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div>
            <CurrencyButton />
            <CartButton />
          </div>
        </nav>
      </StyledHeader>
    );
  }
}

const StyledHeader = styled.header`
  height: 80px;
  position: sticky;
  z-index: 2;
  top: 0;
  background-color: #fff;
  nav {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div.buttons {
      button {
        margin-right: 5px;
        text-transform: uppercase;
        padding: 10px 16px 20px;
        transition: 0.3s ease-in-out all;
      }
      button.active {
        color: var(--green);
        border-bottom: 2px solid var(--green);
        font-weight: 600;
      }
    }
    .logo {
      position: absolute;
      left: 50%;
      translate: -50%;
    }
  }
`;

export default Header;
