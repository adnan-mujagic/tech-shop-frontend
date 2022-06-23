import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import { favorites } from "../../api/admin";
import constants from "../../api/constants";
import TextHeader from "../TextHeader";
import StarIcon from "@mui/icons-material/Star";
import styles from "./FavoriteProducts.module.scss";
import { CustomTable, CustomTableCell } from "../LowestInStock/LowestInStock";

function FavoriteProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    favorites().then((res) => {
      setProducts(res?.data);
    });
  }, []);

  const getPlace = (idx) => {
    let place = idx + 1;
    if (place === 1) {
      return <StarIcon style={{ color: "#FFD700" }} />;
    } else if (place === 2) {
      return <StarIcon style={{ color: "#C0C0C0" }} />;
    } else if (place === 3) {
      return <StarIcon style={{ color: "#CD7F32" }} />;
    } else return place + "th";
  };

  return (
    <div className={styles["favorites"]}>
      <TextHeader
        text={"Favorite items by average rating"}
        underlined
        type="h1"
      />
      {products.length > 0 ? (
        <div>
          <CustomTable>
            <TableHead>
              <CustomTableCell>Rank</CustomTableCell>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Average rating</CustomTableCell>
            </TableHead>
            <TableBody>
              {products.map((product, idx) => {
                return (
                  <TableRow key={idx}>
                    <CustomTableCell>{getPlace(idx)}</CustomTableCell>
                    <CustomTableCell>{product.product._id}</CustomTableCell>
                    <CustomTableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          alt="product"
                          src={product.product.images[0]}
                          style={{
                            height: "48px",
                            aspectRatio: "1 / 1",
                            border: "1px solid " + constants.colors.border,
                            marginRight: "8px",
                            borderRadius: "4px",
                          }}
                        />
                        {product.product.name}
                      </div>
                    </CustomTableCell>
                    <CustomTableCell>{product.average_rating}</CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </CustomTable>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default FavoriteProducts;
