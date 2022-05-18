import React from "react";
import constants from "../../api/constants";

function TextHeader({ type = "h1", text, color, textAlign, icon }) {
  const getStyle = () => {
    let style = {
      fontSize: "27px",
      display: "flex",
      alignItems: "center",
    };
    if (type === "h2") {
      style.fontSize = constants.fontSizes.h2;
    } else if (type === "h3") {
      style.fontSize = constants.fontSizes.h3;
    } else if (type === "title") {
      style.fontSize = constants.fontSizes.title;
    }

    if (color) {
      style["color"] = color;
    }
    if (textAlign) {
      style["textAlign"] = textAlign;
    }
    return style;
  };
  return (
    <div style={getStyle()}>
      {icon ? icon : null}
      {icon ? "-- " + text : text}
    </div>
  );
}

export default TextHeader;
