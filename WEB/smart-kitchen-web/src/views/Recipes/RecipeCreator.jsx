import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import { createRecipe } from "../../services/RecipeService";
import { recipeSchema } from "../../schemas/recipes.schema";
import "./RecipeCreator.css";

const initialValues = {
  name: "",
  ingredients: "",
  instructions: "",
  photo: "",
};

const RecipeCreator = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: recipeSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("ingredients", values.ingredients);
      formData.append("instructions", values.instructions);
      formData.append("photo", values.photo);

      console.log("values", values);
      console.log(formData.get("name"));

      createRecipe(formData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      setSubmitting(false);
    },
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormControl
          text="Name"
          error={touched.name && errors.name}
          htmlFor="name"
        >
          <Input
            id="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={touched.name && errors.name}
            placeholder="Enter recipe name"
          />
        </FormControl>
        <FormControl
          text="Ingredients"
          error={touched.ingredients && errors.ingredients}
          htmlFor="ingredients"
        >
          <Input
            id="ingredients"
            name="ingredients"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ingredients}
            error={touched.ingredients && errors.pingredients}
            placeholder="Enter recipe ingredients"
          />
        </FormControl>
        <FormControl
          text="Instructions"
          error={touched.instructions && errors.instructions}
          htmlFor="instructions"
        >
          <Input
            id="instructions"
            name="instructions"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.instructions}
            error={touched.instructions && errors.instructions}
            placeholder="Enter recipe instructions"
          />
        </FormControl>
        <FormControl
            text="Photos"
            error={touched.photos && errors.photos}
            htmlFor="photos"
          >
            <input
              id="photo"
              name="photo"
              type="file"
              multiple
              onChange={(event) => {
                setFieldValue("photo", event.currentTarget.files[0]);
              }}
            />
         </FormControl> 

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default RecipeCreator;
