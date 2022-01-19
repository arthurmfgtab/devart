import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("inputs should initially be empty", () => {
  render(<App />);
  const emailInputElement: HTMLInputElement = screen.getByRole("textbox");
  const passwordInputElement: HTMLInputElement =
    screen.getByLabelText("Password");
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(passwordInputElement.value).toBe("");
  expect(emailInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement: HTMLInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  const email = "arthurmfgtab@gmail.com";
  userEvent.type(emailInputElement, email);
  expect(emailInputElement.value).toBe(email);
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement: HTMLInputElement =
    screen.getByLabelText("Password");

  const password = "12345678";
  userEvent.type(passwordInputElement, password);
  expect(passwordInputElement.value).toBe(password);
});

test("should be able to type confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByLabelText("Password");

  const confirmPassword = "12345678";
  userEvent.type(confirmPasswordInputElement, confirmPassword);
  expect(confirmPasswordInputElement.value).toBe(confirmPassword);
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailErrorMessageElement = screen.queryByText(
    /the email you put in is invalid/i
  );
  const email = "arthurmfgtabgmail.com";
  const submitBtnElement = screen.getByRole("button", { name: /submit/i });

  expect(emailErrorMessageElement).not.toBeInTheDocument();

  const emailInputElement: HTMLInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailInputElement, email);
  userEvent.click(submitBtnElement);

  const emailErrorMessageElementAgain = screen.queryByText(
    /the email you put in is invalid/i
  );
  expect(emailErrorMessageElementAgain).toBeInTheDocument();
});

test("should show error if provided password is less than 5 characters", () => {
  render(<App />);

  const email = "arthurmfgtabgmail.com";
  const password = "1234";
  const confirmPassword = "1234";

  const emailInputElement: HTMLInputElement = screen.getByPlaceholderText(
    "blablabla@example.com"
  );
  const passwordInputElement: HTMLInputElement =
    screen.getByPlaceholderText("password123");
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByPlaceholderText("confirm123");

  userEvent.type(emailInputElement, email);
  userEvent.type(passwordInputElement, password);
  userEvent.type(confirmPasswordInputElement, confirmPassword);

  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtnElement);

  const emailErrorMessageElementAgain = screen.queryByText(
    /password must be at least 5 characters/i
  );
  expect(emailErrorMessageElementAgain).toBeInTheDocument();
});

test("should show error if passwords are not matching", () => {
  render(<App />);

  const email = "arthurmfgtabgmail.com";
  const password = "1234";
  const confirmPassword = "12344";

  const emailErrorMessageElement1 = screen.queryByText(
    /mismatching passwords/i
  );
  expect(emailErrorMessageElement1).not.toBeInTheDocument();

  const emailInputElement: HTMLInputElement = screen.getByPlaceholderText(
    "blablabla@example.com"
  );
  const passwordInputElement: HTMLInputElement =
    screen.getByPlaceholderText("password123");
  const confirmPasswordInputElement: HTMLInputElement =
    screen.getByPlaceholderText("confirm123");

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");

  userEvent.type(emailInputElement, email);
  const emailInputElementWithValue: HTMLInputElement =
    screen.getByPlaceholderText("blablabla@example.com");
  expect(emailInputElementWithValue.value).toBe(email);

  userEvent.type(passwordInputElement, password);
  const passwordInputElementWithValue: HTMLInputElement =
    screen.getByPlaceholderText("password123");
  expect(passwordInputElementWithValue.value).toBe(password);

  userEvent.type(confirmPasswordInputElement, confirmPassword);
  const confirmPasswordInputElementWithValue: HTMLInputElement =
    screen.getByPlaceholderText("confirm123");
  expect(confirmPasswordInputElementWithValue.value).toBe(confirmPassword);

  const emailErrorMessageElement2 = screen.queryByText(
    /mismatching passwords/i
  );
  expect(emailErrorMessageElement2).not.toBeInTheDocument();

  const submitBtnElement = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtnElement);

  const emailErrorMessageElement3 = screen.queryByText(
    /mismatching passwords/i
  );
  expect(emailErrorMessageElement3).toBeInTheDocument();
});
