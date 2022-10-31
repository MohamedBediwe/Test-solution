import React, { PureComponent } from "react";
import styled from "styled-components";

export default class OtherProductDetails extends PureComponent {
  getClassName = () => {
    const {
      details: { name },
    } = this.props;

    const className = name.split(" ").join("");

    return className;
  };

  componentDidMount() {
    if (!this.props.inCart) {
      const { name, items } = this.props.details;
      const className = this.getClassName();
      this.props.updateAttr(name, items[0].value);
      document.querySelector(`.${className} > div`).classList.add("active");
    }
  }

  render() {
    const removeActive = (className) => {
      document.querySelectorAll(`.${className} div`).forEach((item) => {
        item.classList.remove("active");
      });
    };

    const {
      details: { name, items },
    } = this.props;

    const className = name.split(" ").join("");

    if (this.props.inCart) {
      return (
        <StyledDiv inCart={true}>
          <h4>{name}</h4>
          <div className={`${className}-incart`}>
            {items.map((item, i) => (
              <div
                key={i}
                className={`attr-inCart ${
                  this.props.selectedAttr[name] === item.value ? "active" : ""
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
      <StyledDiv>
        <h4>{name}</h4>
        <div className={className}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${item.value}`}
              onClick={(e) => {
                this.props.updateAttr(name, item.displayValue);
                removeActive(className);
                e.target.classList.add("active");
              }}
            >
              {item.value}
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
      padding: 10px;
      width: 70px;
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
