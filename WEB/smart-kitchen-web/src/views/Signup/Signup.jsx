import { signupSchema } from "../../schemas/signup.schema";
import FormControl from "../../components/FormControl/FormControl";
import Input from '../../components/Input/Input';


const initialValues = {
    firstName: "",
    lastName: "",
    restaurantName: "",
    email: "",
    password: "",
  };

  




return (
    <div>
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