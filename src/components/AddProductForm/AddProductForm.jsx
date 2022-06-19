import React, { useState } from "react";
import styles from "./AddProductForm.module.scss";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextHeader from "../TextHeader";
import { addProduct } from "../../api/products";
import { Button } from "@mui/material";
import Input from "../Input";

function AddProductForm() {
  const [inputFormOpen, setInputFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: null,
    quantity: null,
    properties: {},
  });

  const [customPropertyKey, setCustomPropertyKey] = useState("");
  const [customPropertyValue, setCustomPropertyValue] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const validateForm = () => {
    let badInput = Object.keys(formData).filter((key) => {
      return (
        (formData[key] === null || formData[key] === "") && key !== "properties"
      );
    });

    if (badInput.length > 0) {
      return false;
    }

    return true;
  };

  const addToDatabase = () => {
    if (!validateForm()) {
      return;
    }
    addProduct(formData)
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const appendImage = () => {
    console.log(imageUrl);
    setFormData({ ...formData, images: [...formData.images, imageUrl] });
    setImageUrl("");
  };

  const handleAddNewProperty = () => {
    if (customPropertyKey == "" || customPropertyValue == "") {
      return;
    }
    setFormData({
      ...formData,
      properties: {
        ...formData.properties,
        [customPropertyKey.trim().replace(" ", "_").toLowerCase()]:
          customPropertyValue,
      },
    });

    setCustomPropertyKey("");
    setCustomPropertyValue("");
  };

  console.log(formData);

  return (
    <div className={styles["add-product-form"]}>
      <div>
        <Button
          onClick={() => setInputFormOpen(!inputFormOpen)}
          variant="outlined"
          startIcon={inputFormOpen ? <ExpandLessIcon /> : <ChevronRightIcon />}
        >
          Add Product
        </Button>

        {inputFormOpen && (
          <div className={styles["add-product-inputs"]}>
            <Input
              fullWidth
              margin="dense"
              name="name"
              onChange={onChange}
              label="Product name"
              placeholder="Product name"
            />
            <Input
              fullWidth
              margin="dense"
              name="description"
              onChange={onChange}
              label="Description"
              placeholder="Description"
            />
            <Input
              fullWidth
              margin="dense"
              name="price"
              onChange={onChange}
              label="Price"
              placeholder="Price"
            />
            <Input
              fullWidth
              margin="dense"
              name="quantity"
              onChange={onChange}
              label="Quantity"
              placeholder="Quantity"
            />
            <TextHeader type="h2" text="Images" />
            <div className={styles["current-images"]}>
              {formData.images.map((imageUrl, idx) => (
                <div className={styles["url-container"]}>
                  Image {idx + 1}: {imageUrl}
                </div>
              ))}
            </div>

            <div className={styles["image-adder"]}>
              <Input
                fullWidth
                margin="dense"
                onChange={(e) => setImageUrl(e.target.value)}
                label="Image URL"
                placeholder="Image URL"
                value={imageUrl}
              />
              <Button
                style={{
                  width: "150px",
                  height: "56px",
                  marginTop: "4px",
                  marginLeft: "8px",
                }}
                variant="outlined"
                onClick={() => appendImage()}
              >
                Add image
              </Button>
            </div>
            <TextHeader type="h2" text="Custom properties" />
            {Object.keys(formData.properties).length > 0 && (
              <div className={styles["custom-properties-container"]}>
                {Object.keys(formData.properties).map((property) => {
                  return (
                    <div
                      style={{
                        marginTop: "10px",
                        marginBottom: "5px",
                        marginLeft: "8px",
                      }}
                    >
                      <strong>{property}</strong>:{" "}
                      {formData.properties[property]}
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                fullWidth
                margin="dense"
                onChange={(e) => setCustomPropertyKey(e.target.value)}
                label="Property name"
                placeholder="Property name"
                value={customPropertyKey}
              />
              <div style={{ marginLeft: "8px" }}></div>
              <Input
                fullWidth
                margin="dense"
                onChange={(e) => setCustomPropertyValue(e.target.value)}
                label="Property value"
                placeholder="Property value"
                value={customPropertyValue}
              />
              <Button
                variant="outlined"
                style={{
                  marginTop: "4px",
                  width: "100px",
                  height: "56px",
                  marginLeft: "8px",
                }}
                onClick={() => handleAddNewProperty()}
              >
                Add
              </Button>
            </div>
            <Button
              onClick={addToDatabase}
              sx={{ marginTop: "10px" }}
              variant="outlined"
            >
              Add to database
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProductForm;
