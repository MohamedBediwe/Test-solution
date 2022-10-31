import React, { PureComponent } from "react";
import styled from "styled-components";

export default class Capacity extends PureComponent {
  componentDidMount() {
    if (!this.props.inCart && !this.props.productName) {
      this.props.updateAttr(
        "Capacity",
        this.props.capacity.items[0].displayValue
      );
      document.querySelector(".capacity").classList.add("active");
      return;
    }
    if (this.props.productName) {
      this.props.updateAttr(
        "Capacity",
        this.props.capacity.items[0].displayValue
      );
      document
        .querySelector(
          `.${this.props.productName.split(" ").join("")}-capacity`
        )
        .classList.add("active");
      return;
    }
  }

  render() {
    const removeActive = (index) => {
      if (this.props.productName) {
        document
          .querySelectorAll(
            `.${this.props.productName.split(" ").join("")}-capacity`
          )
          .forEach((ele, i) => {
            if (index === i) return;
            ele.classList.remove("active");
          });
        return;
      }
      document.querySelectorAll(".capacity").forEach((ele, i) => {
        if (index === i) return;
        ele.classList.remove("active");
      });
    };

    if (this.props.inCart) {
      return (
        <StyledDiv inCart={true}>
          <h4>Capacity: </h4>
          <div>
            {this.props.capacity.items.map((item, i) => (
              <div
                className={`capacity-inCart ${
                  this.props.selectedCapacity === item.displayValue
                    ? "active"
                    : ""
                }`}
                key={i}
              >
                {item.displayValue}
              </div>
            ))}
          </div>
        </StyledDiv>
      );
    }

    return (
      <StyledDiv small={this.props.small}>
        <h4>Capacity: </h4>
        <div>
          {this.props.capacity.items.map((item, i) => (
            <div
              className={`${
                this.props.productName
                  ? `${this.props.productName.split(" ").join("")}-capacity`
                  : "capacity"
              }`}
              onClick={(e) => {
                this.props.updateAttr("Capacity", item.displayValue);
                removeActive(i);
                e.target.classList.toggle("active");
              }}
              key={i}
            >
              {item.displayValue}
            </div>
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
      border: 1px solid var(--black);
      padding: ${(props) => (props.small ? "5px" : "10px")};
      width: ${(props) => (props.small ? "50px" : "70px")};
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
