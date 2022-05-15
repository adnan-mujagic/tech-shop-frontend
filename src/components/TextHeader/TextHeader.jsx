import React from "react";

function TextHeader({ type = "h1", text, color, textAlign, icon }) {
  const getStyle = () => {
    let style = {
      fontSize: "27px",
      display: "flex",
      alignItems: "center",
    };
    if (type === "h2") {
      style.fontSize = "20px";
    } else if (type === "h3") {
      style.fontSize = "18px";
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
