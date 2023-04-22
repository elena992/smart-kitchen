import { useFormik } from "formik";
import { useContext } from "react";
import FormControl from "../../components/FormControl/FormControl";
import Input from "../../components/Input/Input";
import AuthContext from "../../contexts/AuthContext";
import { signup as signupService } from "../../services/AuthService";
import { setAccessToken } from "../../stores/AccessTokenStore";
import { signupSchema } from "../../schemas/signup.schema";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const initialValues = {
  firstName: "",
  lastName: "",
  restaurantName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
    setFieldError,
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: signupSchema,
    onSubmit: (values) => {
      signupService(values)
        .then((response) => {
          navigate("/login");
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            setFieldError("email", err?.response?.data?.message);
          } else {
            setFieldError("email", err.message);
          }
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="container my-3">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          text="Email"
          error={touched.email && errors.email}
          htmlFor="email"
        >
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Enter your email..."
          />
        </FormControl>

        <FormControl
          text="Password"
          error={touched.password && errors.password}
          htmlFor="password"
        >
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Enter your password..."
            type="password"
          />
        </FormControl>
        <FormControl
          text="First Name"
          error={touched.firstName && errors.firstName}
          htmlFor="firstName"
        >
          <Input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && errors.firstName}
            placeholder="Enter your First Name..."
            type="firstName"
          />
        </FormControl>
        <FormControl
          text="Last Name"
          error={touched.lastName && errors.lastName}
          htmlFor="lastName"
        >
          <Input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && errors.lastName}
            placeholder="Enter your Last Name..."
            type="lastName"
          />
        </FormControl>
        <FormControl
          text="Restaurant Name"
          error={touched.restaurantName && errors.restaurantName}
          htmlFor="restaurantName"
        >
          <Input
            id="restaurantName"
            name="restaurantName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.restaurantName}
            error={touched.restaurantName && errors.restaurantName}
            placeholder="Enter your Restaurant's Name..."
            type="restaurantName"
          />
        </FormControl>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
