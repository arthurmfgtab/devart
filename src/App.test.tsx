import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
