import React from "react";

const Button = (props) => {
  return (
    <button
      style={{ backgroundColor: props.color }}
      className="btn"
      onClick={props.onAdd}
    >
      {props.children}
    </button>
  );
};

export default Button;
