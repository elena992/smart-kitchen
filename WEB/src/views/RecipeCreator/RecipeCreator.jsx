import { useFormik } from "formik";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import { createRecipe } from "../../services/RecipeService";
import { recipeSchema } from "../../schemas/recipes.schema";
import "./RecipeCreator.css";

const initialValues = {
  name: "",
  servings: "",
  ingredients: "",
  instructions: "",
  notes: "",
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
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: recipeSchema,
    onSubmit: (values) => {
      console.log(values);
      const recipe = {
        name: values.name,
        servings: values.servings,
        ingredients: values.ingredients.split(" "),
        instructions: values.instructions.split("\n"),
        photo: values.photo,
        notes: values.notes,
      };
      createRecipe(recipe)
        .then((response) => {
          resetForm();
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
            placeholder="Enter recipe name..."
          />
        </FormControl>
        <FormControl
          text="Servings"
          error={touched.servings && errors.servings}
          htmlFor="servings"
        >
          <Input
            id="servings"
            name="servings"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.servings}
            error={touched.servings && errors.servings}
            placeholder="Enter recipe servings..."
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
            error={touched.ingredients && errors.ingredients}
            placeholder="Enter recipe ingredients..."
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
            placeholder="Enter recipe instructions..."
          />
        </FormControl>
        <FormControl
          text="Notes"
          error={touched.notes && errors.notes}
          htmlFor="notes"
        >
          <Input
            id="notes"
            name="notes"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.notes}
            error={touched.notes && errors.notes}
            placeholder="Enter recipe notes..."
          />
        </FormControl>
        <FormControl
          text="Photo"
          error={touched.photo && errors.photo}
          htmlFor="photo"
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
