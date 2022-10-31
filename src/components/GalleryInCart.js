import React, { Component } from "react";
import styled from "styled-components";
import RightArrow from "../imgs/right-arrow.svg";
import LeftArrow from "../imgs/left-arrow.svg";

export default class GalleryInCart extends Component {
  state = {
    image: 0,
  };

  handleClick = (value) => {
    this.setState({ image: this.state.image + value });
  };

  render() {
    const { gallery } = this.props;
    return (
      <StyledDiv>
        <img
          src={gallery[this.state.image]}
          alt="product"
          className="product-image"
        />
        <div>
          {this.state.image > 0 && (
            <span className="prev" onClick={() => this.handleClick(-1)}>
              <img src={LeftArrow} alt="previous" />
            </span>
          )}

          {this.state.image + 1 < gallery.length && (
            <span className="next" onClick={() => this.handleClick(1)}>
              <img src={RightArrow} alt="next" />
            </span>
          )}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  position: relative;
  max-width: 225px;
  max-height: 280px;
  > img {
    width: 225px;
    height: 280px;
  }
  > div {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 60px;
    height: 24px;
    span {
      background-color: rgba(0, 0, 0, 0.73);
      position: absolute;
      cursor: pointer;
      width: 28px;
      height: 33px;
      padding: 10px;
      top: -5px;
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }
  }
`;
