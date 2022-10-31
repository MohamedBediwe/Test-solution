import React, { PureComponent } from "react";
import styled from "styled-components";

export default class Colors extends PureComponent {
  componentDidMount() {
    if (!this.props.inCart && !this.props.productName) {
      this.props.updateAttr("Color", this.props.colors.items[0].displayValue);
      document.querySelector(".color").classList.add("active");
    }
    if (this.props.productName) {
      this.props.updateAttr("Color", this.props.colors.items[0].displayValue);
      document
        .querySelector(`.${this.props.productName.split(" ").join("")}-color`)
        .classList.add("active");
      return;
    }
  }

  render() {
    const removeActive = (index) => {
      if (this.props.productName) {
        document
          .querySelectorAll(
            `.${this.props.productName.split(" ").join("")}-color`
          )
          .forEach((ele, i) => {
            if (index === i) return;
            ele.classList.remove("active");
          });
        return;
      }
      document.querySelectorAll(".color").forEach((ele, i) => {
        if (index === i) return;
        ele.classList.remove("active");
      });
    };

    if (this.props.inCart) {
      return (
        <StyledDiv inCart={true} small={true}>
          <h4>color: </h4>
          <div>
            {this.props.colors.items.map((item, i) => (
              <div
                className={`color-inCart ${
                  this.props.selectedColor === item.displayValue ? "active" : ""
                }`}
                key={i}
                style={{ backgroundColor: item.value }}
              ></div>
            ))}
          </div>
        </StyledDiv>
      );
    }

    return (
      <StyledDiv small={this.props.small}>
        <h4>color: </h4>
        <div>
          {this.props.colors.items.map((item, i) => (
            <div
              className={`${
                this.props.productName
                  ? `${this.props.productName.split(" ").join("")}-color`
                  : "color"
              }`}
              onClick={(e) => {
                this.props.updateAttr("Color", item.displayValue);
                removeActive(i);
                e.target.classList.toggle("active");
              }}
              key={i}
              style={{ backgroundColor: item.value }}
            ></div>
          ))}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  margin-top: 20px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    > div {
      width: ${(props) => (props.small ? "20px" : "36px")};
      aspect-ratio: 1;
      cursor: ${(props) => (props.inCart ? "default" : "pointer")};

      box-shadow: 0px 0px 15px 1px rgb(10 10 10 / 18%);
      &.active {
        outline: 3px solid var(--green);
        outline-offset: 2px;
      }
    }
  }
`;
