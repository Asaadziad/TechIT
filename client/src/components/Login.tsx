import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ThemeContext } from "../hooks/context/ThemeContext";
import { UserContext } from "../hooks/context/UserContext";
import { sendErrorMessage, sendSuccessMessage } from "../services/feedBack";
import User from "../interfaces/User";
import { checkUser } from "../services/userServices";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const userContext = useContext(UserContext);
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (user: User) => {
      checkUser(user)
        .then(async (res) => {
          if (res.data.token) {
            sendSuccessMessage("Logged in successfully");
            sessionStorage.setItem(
              "userData",
              JSON.stringify({
                isLoggedIn: true,
                isAdmin: res.data.isAdmin,
                token: res.data.token,
              })
            );

            userContext.setIsLoggedIn(true);
            userContext.setIsAdmin(res.data.isAdmin);
            navigate("/home");
          } else {
            sendErrorMessage("Error!");
          }
        })
        .catch((err) => {
          console.log(err);

          sendErrorMessage(err.response.data.message);
        });
    },
  });
  let navigate = useNavigate();
  let themeContext = useContext(ThemeContext);
  return (
    <>
      <div
        className={`container bg-${
          themeContext.isLight ? "light" : "dark text-light"
        } py-5`}
      >
        <div className="container mt-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h3 className="display-3">Login</h3>
          <form onSubmit={formik.handleSubmit}>
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
            <Link to="/register">Dont have an account? Register here.</Link>

            <button
              type="submit"
              className="btn btn-secondary mt-3 w-100"
              disabled={!formik.dirty || !formik.isValid}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
