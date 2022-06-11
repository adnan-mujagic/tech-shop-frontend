import React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import constants from "../../../api/constants";
import styles from "./Review.module.scss";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: constants.colors.success,
  },
  "& .MuiRating-iconHover": {
    color: constants.colors.success,
  },
  "& .MuiRating-iconEmpty": {
    color: constants.colors.border,
  },
});

function Review({ review }) {
  return (
    <div className={styles["review-container"]}>
      <div className={styles.name}>
        {review.user.first_name} {review.user.last_name}
      </div>
      <StyledRating
        name="read-only"
        value={review.rating}
        readOnly
        precision={0.5}
      />
      <div className={styles.text}>{review.text}</div>
    </div>
  );
}

export default Review;
