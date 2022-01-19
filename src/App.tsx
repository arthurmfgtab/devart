import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [error, setError] = useState("");
  const [passwordTooSmallError, setPasswordTooSmallError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setSignupInput({ ...signupInput, [target.name]: target.value });
  }

  function handleClick(event: any) {
    //MouseEventHandler<HTMLButtonElement>) {
    const { email, password, confirmPassword } = signupInput;

    event.preventDefault();

    if (!validator.isEmail(email)) {
      setError("The email you put in is invalid");
    }

    if (password.length < 5) {
      setPasswordTooSmallError("Password must be at least 5 characters");
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError("mismatching passwords");
    }
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={onChange}
            placeholder="blablabla@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={onChange}
            placeholder="password123"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={onChange}
            placeholder="confirm123"
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {passwordMismatchError && (
          <div className="alert alert-danger">{passwordMismatchError}</div>
        )}
        {passwordTooSmallError && (
          <div className="alert alert-danger">{passwordTooSmallError}</div>
        )}

        <button className="btn btn-primary" onClick={handleClick} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
