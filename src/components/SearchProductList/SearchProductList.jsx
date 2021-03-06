import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../api/constants";
import TextHeader from "../TextHeader";
import useOutsideClick from "./../../hooks/useOutsideClick";
import styles from "./SearchProductList.module.scss";

function SearchProductList({ products }) {
  const [showList, setShowList] = useState(true);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  const listRef = useRef();
  useOutsideClick(listRef, toggleList);

  const navigate = useNavigate();
  return (
    <>
      {showList && (
        <div ref={listRef} className={styles["search-product-list"]}>
          {products.map((product) => (
            <div
              className={styles["search-product-item"]}
              onClick={() => navigate("/products/" + product._id)}
            >
              <img
                src={product.images[0]}
                style={{
                  height: "48px",
                  aspectRatio: "1 / 1",
                  borderRadius: "4px",
                  border: `1px solid ${constants.colors.border}`,
                  marginRight: "16px",
                }}
              />
              <div>
                <TextHeader text={product.name} type={"h2"} />
                <TextHeader
                  text={`$ ${product.price}`}
                  type={"h3"}
                  color={constants.colors.success}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchProductList;
