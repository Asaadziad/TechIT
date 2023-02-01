import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { UserContext } from "../hooks/context/UserContext";
import { sendErrorMessage, sendSuccessMessage } from "../interfaces/feedBack";
import User from "../interfaces/User";
import { addUser } from "../services/userServices";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let userContext = useContext(UserContext);
  let formik = useFormik({
    initialValues: { email: "", name: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().min(5),
      name: yup.string().required().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (user: User) => {
      addUser({ ...user, isAdmin: false } as User)
        .then((res) => {
          sendSuccessMessage("Registered successfully.");
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              isLoggedIn: true,
              isAdmin: false,
              userId: res.data[0].id,
            })
          );
          userContext.setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          sendErrorMessage("Error!");
        });
    },
  });
  let navigate = useNavigate();
  return (
    <>
      <div className="container col-md-6 d-flex flex-column justify-content-center align-items-center">
        <h3 className="display-3">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              id="name"
              name="name"
              type="name"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
          <Link to="/">Already registered? Login here.</Link>

          <button
            type="submit"
            className="btn btn-secondary mt-3 w-100"
            disabled={!formik.dirty || !formik.isValid}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
