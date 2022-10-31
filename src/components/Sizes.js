import React, { PureComponent } from "react";
import styled from "styled-components";

export default class Sizes extends PureComponent {
  componentDidMount() {
    if (!this.props.inCart && !this.props.productName) {
      this.props.updateAttr("Size", this.props.sizes.items[0].displayValue);
      document.querySelector(".size").classList.add("active");
    }
    if (this.props.productName) {
      this.props.updateAttr("Size", this.props.sizes.items[0].displayValue);
      document
        .querySelector(`.${this.props.productName.split(" ").join("")}-size`)
        .classList.add("active");
      return;
    }
  }

  render() {
    const removeActive = (index) => {
      if (this.props.productName) {
        document
          .querySelectorAll(
            `.${this.props.productName.split(" ").join("")}-size`
          )
          .forEach((ele, i) => {
            if (index === i) return;
            ele.classList.remove("active");
          });
        return;
      }
      document.querySelectorAll(".size").forEach((ele, i) => {
        if (index === i) return;
        ele.classList.remove("active");
      });
    };

    if (this.props.inCart) {
      return (
        <StyledDiv inCart={true} small={true}>
          <h4>size: </h4>
          <div>
            {this.props.sizes.items.map((item, i) => (
              <div
                key={i}
                className={`size-inCart ${
                  this.props.selectedSize === item.displayValue ? "active" : ""
                }`}
              >
                {item.value}
              </div>
            ))}
          </div>
        </StyledDiv>
      );
    }

    return (
      <StyledDiv small={this.props.small}>
        <h4>size: </h4>
        <div>
          {this.props.sizes.items.map((size, i) => (
            <div
              key={i}
              className={`${
                this.props.productName
                  ? `${this.props.productName.split(" ").join("")}-size`
                  : "size"
              }`}
              onClick={(e) => {
                this.props.updateAttr("Size", size.displayValue);
                removeActive(i);
                e.target.classList.toggle("active");
              }}
            >
              {size.value}
            </div>
          ))}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  h4 {
    font-size: 18px;
    text-transform: uppercase;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    > div {
      border: 1px solid var(--black);
      padding: 10px 5px;
      width: ${(props) => (props.small ? "30px" : "70px")};
      text-align: center;
      font-family: "Source Sans Pro", sans-serif;
      cursor: ${(props) => (props.inCart ? "default" : "pointer")};

      &.active {
        background-color: var(--black);
        color: #fff;
      }
    }
  }
`;
