import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillGoogleCircle, AiFillApple, AiFillWindows } from "react-icons/ai";
import "font-awesome/css/font-awesome.min.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./login.css";
import axios from "axios";
import googlelogo from "./googlelogo.svg";

import * as Yup from "yup";
import GoogleOauth from "./GoogleOauth";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
});

const JwtLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const handleFormSubmit = async (values) => {
    console.log("Login Form Submitted:", values); // <-- Add this
    setLoading(true);
    try {
      const response = await login(values.email, values.password);

      if (response.status === 200) {
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };
  // const redirectToGoogle = () => {
  //   console.log("Redirecting to Google OAuth...");
  //   window.location.href = `${process.env.REACT_APP_API_URL}/api/google`;
  // };
  const redirectToGoogle = () => {
    console.log("Redirecting to Google OAuth...");
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  useEffect(() => {
    console.log("GoogleOauth useEffect triggered");
    console.log("Full URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("Extracted Tokens from URL:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      console.log("Tokens found! Storing them in localStorage.");
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      console.log("Tokens saved! Navigating to /home...");
      navigate("/home", { replace: true });
    } else {
      console.log("No valid tokens found in URL. Staying on /login.");
    }
  }, [navigate]);

  useEffect(() => {
    console.log("GoogleOauth useEffect triggered");
    console.log("Full URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("Extracted Tokens from URL:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      console.log("Tokens found! Storing them in localStorage.");
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      console.log("Tokens saved! Navigating to /home...");
      navigate("/home", { replace: true });
    } else {
      console.log("No valid tokens found in URL. Staying on /login.");
    }
  }, [navigate]);

  return (
    <>
      <ToastContainer position="top-center" />
      <body class="account-page">
        <div class="main-wrapper" style={{ backgroundColor: "white" }}>
          <div class="account-content">
            <div class="login-wrapper bg-img">
              <div class="login-content logos">
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div class="login-userset">
                        <div className="login-userheading">
                          <div
                            className="logo"
                            style={{ margin: "auto", textAlign: "center" }}
                          >
                            <a
                              style={{
                                fontSize: "30px",
                                color: "black",
                                fontWeight: "800",
                                textAlign: "center",
                                fontFamily: '"Space Grotesk", sans-serif',
                              }}
                            >
                              Finomic AI
                            </a>
                          </div>

                          <h3
                            style={{
                              textAlign: "center",
                              marginTop: "40px",
                              fontFamily: '"Space Grotesk", sans-serif',
                            }}
                          >
                            Welcome back, Sign in here
                          </h3>
                        </div>
                        <div class="form-login mb-3">
                          <label class="form-label">Email Address</label>
                          <div class="form-addons">
                            <input
                              type="email"
                              value={values.email}
                              name="email"
                              onChange={handleChange}
                              class="form-control"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        <div class="form-login mb-3">
                          <label class="form-label">Password</label>
                          <div className="pass-group">
                            <input
                              value={values.password}
                              onChange={handleChange}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              className="pass-input form-control"
                            />
                            <span
                              className="toggle-password"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            marginBottom: "20px",
                          }}
                        >
                          <div>
                            <a
                              class="forgot-link"
                              href="/session/forgot-password"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <div class="form-login" style={{ width: "100%" }}>
                          <button
                            loading={loading}
                            type="submit"
                            class="btn btn-login"
                            style={{ width: "100%" }}
                          >
                            Log in
                          </button>
                        </div>
                        <h5
                          style={{
                            textAlign: "center",
                            color: "black",
                            marginBottom: "20px",
                          }}
                        >
                          Or continue with{" "}
                        </h5>
                        <div class="form-login social-login-buttons">
                          <button
                            onClick={redirectToGoogle}
                            class="btn btn-microsoft d-flex align-items-center justify-content-center mb-2"
                            style={{
                              width: "100%",
                              backgroundColor: "#fff",
                              color: "black",
                              border: "1px solid black",
                            }}
                          >
                            <img
                              src={googlelogo}
                              alt=""
                              style={{
                                width: "25px",
                                height: "25px",
                                marginRight: "10px",
                              }}
                            />
                            Continue with Google
                          </button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                          }}
                        >
                          <div class="text-end">
                            <a
                              class="forgot-link"
                              href="/session/forgot-password"
                            >
                              Dont have an account?
                            </a>
                          </div>
                          <div class="text-end">
                            <a class="forgot-link" href="/register">
                              Create an account
                            </a>
                          </div>
                        </div>
                        {/*} <div class="signinform">
                      <h4>
                        New on our platform?
                        <a
                          href="https://dreamspos.dreamstechnologies.com/html/template/register.html"
                          class="hover-a"
                        >
                          {" "}
                          Create an account
                        </a>
                      </h4>
                    </div>*/}
                        {/*}   <div class="form-setlogin or-text">
                      <h4>OR</h4>
                    </div>
                    <div class="form-sociallink">
                      <ul class="d-flex">
                        <li>
                          <a href="javascript:void(0);" class="facebook-logo">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/facebook-logo.svg"
                              alt="Facebook"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/google.png"
                              alt="Google"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0);" class="apple-logo">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/apple-logo.svg"
                              alt="Apple"
                            />
                          </a>
                        </li>
                      </ul>
                      <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
                        <p>
                          Copyright &copy; 2023 DreamsPOS. All rights reserved
                        </p>
                      </div>
                    </div>*/}
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default JwtLogin;
