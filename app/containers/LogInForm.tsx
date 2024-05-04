import { Form, useFetcher } from "@remix-run/react";
import { SpinnerCircular } from "spinners-react";
import FormInput from "../components/FormInput";
import { useState, useRef, useEffect, ChangeEventHandler } from "react";

export default function LogInForm({ changeForm }: { changeForm: () => void }) {
  const { formData } = useFetcher();
  const [pwd, setPwd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [, setEmailFocus] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const isEmailLoginSubmitting =
    formData?.get("request-type") === "login-request";

  // Focus email input on load
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, setErrMsg]);

  // HANDLERS
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setEmail(event.currentTarget.value);

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setPwd(event.currentTarget.value);

  const handleEmailFocus = () => setEmailFocus(true);
  const handleEmailExit = () => setEmailFocus(false);

  return (
    <Form
      method="post"
      id="login-form"
      className="flex p-5 flex-col items-center gap-10 rounded-md"
    >
      <header className="text-center">
        <h2 className="mb-5 text-2xl">Welcome back!</h2>

        <p>
          New around here?{" "}
          <button className="underline" type="button" onClick={changeForm}>
            Register now
          </button>
        </p>

        <p
          ref={errorRef}
          className={
            errMsg ? "absolute left-5 text-red-600" : "absolute -left-[9999px]"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </header>
      <FormInput
        id="login-email-input"
        type="text"
        ref={emailRef}
        required
        autoComplete="off"
        label="Email"
        name="email"
        labelClassName={`absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          email ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handleEmailChange}
        handleFocus={handleEmailFocus}
        handleExit={handleEmailExit}
      />

      <FormInput
        id="login-password-input"
        type="password"
        required
        label="Password"
        name="password"
        labelClassName={`absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          pwd ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none tracking-widest"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handlePasswordChange}
      />

      <input type="hidden" name="request-type" value="login-request" />
      <footer className="h-auto w-full flex flex-col text-center gap-5">
        <p>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </p>
        <button
          className="flex flex-auto h-12 items-center justify-center gap-3 cursor-pointer bg-purple-900 hover:bg-purple-700 text-white rounded-full"
          type="submit"
        >
          {isEmailLoginSubmitting ? (
            <SpinnerCircular size={30} color="white" />
          ) : (
            "Log In"
          )}
        </button>
      </footer>
    </Form>
  );
}
