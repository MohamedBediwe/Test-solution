import React, { Component } from "react";
import styled from "styled-components";

export default class Gallery extends Component {
  state = {
    mainImage: 0,
  };

  handleClick = (index) => {
    this.setState({ mainImage: index });
  };

  render() {
    const gallery = this.props.gallery;
    return (
      <ImageHolder className="column">
        <div className="small">
          {gallery.map((e, i) => (
            <img
              key={i}
              src={e}
              alt="Product"
              className={`${i === this.state.mainImage ? "active" : ""}`}
              onClick={() => this.handleClick(i)}
            />
          ))}
        </div>
        <div className="main">
          <img src={gallery[this.state.mainImage]} alt="Product" />
        </div>
      </ImageHolder>
    );
  }
}

const ImageHolder = styled.div`
  display: flex;
  .small {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    > img {
      height: 80px;
      width: 80px;
      cursor: pointer;
      &.active {
        border: 2px solid var(--green);
      }
    }
  }
  .main {
    width: 400px;
    height: 350px;
    margin-left: 20px;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;
