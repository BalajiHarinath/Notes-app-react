import "../../css/main.css";
import "./authentication.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context";

export const SignUp = () => {
  const { authState, signUp } = useAuth();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState({ isError: false, text: "" });

  const [showPasswordToggle, setShowPasswordToggle] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setError({ ...error, isError: false });
    }, 3000);

    return () => clearTimeout(timeoutID);
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passwordValidation = /^(?=.*\d)(?=.*[a-z]).{5,10}$/;

    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.confirmPassword
    ) {
      setError({ isError: true, text: "Please enter all the fields" });
    } else if (!userDetails.email.includes("@")) {
      setError({ isError: true, text: "Invalid email ID" });
    } else if (!userDetails.password.match(passwordValidation)) {
      setError({
        isError: true,
        text: "The password must be alphanumberic and atleast 5 characters long",
      });
    } else if (userDetails.password !== userDetails.confirmPassword) {
      setError({
        isError: true,
        text: "The password and confirm password are not matching",
      });
    } else if (!userDetails.terms) {
      setError({ isError: true, text: "Please accept the terms & conditions" });
    } else {
      signUp(userDetails);
      if (authState.isError) {
        setError({ isError: true, text: authState.errorMessage });
      }
      setUserDetails({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });
    }
  };

  return (
    <main className="main-sign-up flex flex-justify-center flex-align-center mt-4 mb-4">
      <form className="form-sign-up">
        {error.isError ? (
          <p className="text-alert pdt-1">{error.text}</p>
        ) : null}
        <div className="flex flex-column flex-gap-1-5 mt-2 mr-4 mb-2 ml-4">
          <h3>Signup</h3>

          <div className="flex flex-column">
            <label className="text-sm font-semibold" htmlFor="first-name">
              First Name
            </label>
            <input
              className="form-field"
              type="text"
              name="first-name"
              id="f-name"
              value={userDetails.firstName}
              onChange={(e) => {
                setUserDetails({ ...userDetails, firstName: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-column">
            <label className="text-sm font-semibold" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="form-field"
              type="text"
              name="last-name"
              id="l-name"
              value={userDetails.lastName}
              onChange={(e) => {
                setUserDetails({ ...userDetails, lastName: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-column">
            <label className="text-sm font-semibold" htmlFor="email-id">
              Email address
            </label>
            <input
              className="form-field"
              name="email-id"
              id="email-id"
              type="email"
              placeholder="example@easymart.com"
              value={userDetails.email}
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-column">
            <label className="text-sm font-semibold" htmlFor="pwd">
              Password
            </label>
            <div className="flex">
              <input
                className="form-field flex-grow-1 pwd-box"
                type={showPasswordToggle ? "password" : "text"}
                name="pwd"
                id="pwd"
                value={userDetails.password}
                placeholder="************"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
              />
              <button
                className="btn-password-hide-show btn-transparent"
                type="button"
                onClick={() => setShowPasswordToggle(!showPasswordToggle)}
              >
                <span className="material-icons text-lg">
                  {showPasswordToggle ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-column">
            <label className="text-sm font-semibold" htmlFor="confirm-pwd">
              Confirm Password
            </label>
            <div className="flex">
              <input
                className="form-field flex-grow-1 pwd-box"
                type={showPasswordToggle ? "password" : "text"}
                name="confirm-pwd"
                id="confirm-pwd"
                placeholder="************"
                value={userDetails.confirmPassword}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              <button
                className="btn-password-hide-show btn-transparent"
                type="button"
                onClick={() => setShowPasswordToggle(!showPasswordToggle)}
              >
                <span className="material-icons text-lg">
                  {showPasswordToggle ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          <div>
            <label
              className="text-sm font-semibold flex flex-justify-center flex-align-center"
              htmlFor="terms&conditions"
            >
              <input
                className="profile-checkbox"
                type="checkbox"
                name="terms&conditions"
                id="t&c"
                checked={userDetails.terms}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, terms: !userDetails.terms });
                }}
              />
              I accept all Terms & Conditions
            </label>
          </div>
          <button
            className="btn-form-submit btn-solid btn-medium text-base"
            type="submit"
            onClick={(e) => submitHandler(e)}
          >
            Create New Account
          </button>

          <Link
            className="signup-login-switch-link text-sm font-semibold flex flex-justify-center flex-align-center"
            to="/login"
          >
            Already have an account{" "}
            <span className="material-icons">navigate_next</span>
          </Link>
        </div>
      </form>
    </main>
  );
};
