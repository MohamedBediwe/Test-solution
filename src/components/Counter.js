import React, { Component } from "react";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";

export default class Counter extends Component {
  static contextType = CartContext;

  render() {
    const { removeProduct, changeCount } = this.context;
    const { id, count } = this.props;
    return (
      <StyledDiv className="count">
        <button onClick={() => changeCount(id, 1)}>+</button>
        <p>{count}</p>
        <button
          onClick={() => {
            if (count - 1 === 0) return removeProduct(id);
            changeCount(id, -1);
          }}
        >
          -
        </button>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-right: 15px;
  button {
    border: 1px solid var(--black);
    padding: 20px;
  }
  p {
    font-weight: 500;
    font-size: 24px;
  }
`;
