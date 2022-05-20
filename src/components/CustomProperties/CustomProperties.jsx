import React from "react";
import TextHeader from "../TextHeader";

import styles from "./CustomProperties.module.scss";

function CustomProperties({ properties }) {
  return (
    <div className={styles["custom-properties"]}>
      <TextHeader padding text={"Properties"} type="h2" underlined />
      {Object.keys(properties).map((property) => (
        <div className={styles["property"]}>
          <strong>
            {property.charAt(0).toUpperCase() +
              property.slice(1).replace("_", " ")}
          </strong>
          :{" "}
          {properties[property].charAt(0).toUpperCase() +
            properties[property].slice(1)}
        </div>
      ))}
    </div>
  );
}

export default CustomProperties;
