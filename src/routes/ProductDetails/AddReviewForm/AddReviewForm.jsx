import React, { useState } from "react";
import Input from "../../../components/Input";
import { Button, Rating, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { addProductReview } from "../../../api/products";
import constants from "../../../api/constants";
import styles from "./AddReviewForm.module.scss";

function AddReviewForm({ product_id }) {
  const [formData, setFormData] = useState({
    product: product_id,
    rating: 2.5,
  });
  const [hasError, setHasError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.text) {
      setHasError(true);
      setMessage("Make sure you added text review and selected your rating.");
      setShowSnackbar(true);
    } else {
      addProductReview(formData)
        .then(() => {
          setMessage("Successfully added your review.");
          setShowSnackbar(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("Submitted!");
  };

  const StyledAlert = styled(Alert)({
    "& .MuiSvgIcon-root": {
      color: constants.colors.mainText,
    },
  });

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

  return (
    <div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <StyledAlert
          onClose={handleClose}
          severity={hasError ? "error" : "success"}
          sx={{
            color: "white",
            width: "100%",
            background: `${hasError ? "#f53d56" : "#78cece"}`,
          }}
        >
          {message}
        </StyledAlert>
      </Snackbar>
      <StyledRating
        defaultValue={2.5}
        name="read-only"
        value={formData.rating}
        onChange={(event, newValue) => {
          setFormData({ ...formData, rating: newValue });
        }}
        precision={0.5}
      />
      <div className={styles.form}>
        <Input
          fullWidth
          name="text"
          onChange={onChange}
          placeholder="Enter your review"
          label="Your review"
          margin="normal"
        />
        <Button
          className={styles.button}
          variant="outlined"
          type="submit"
          onClick={onSubmit}
          size="large"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default AddReviewForm;
