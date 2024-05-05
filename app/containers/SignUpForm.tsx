import { SpinnerCircular } from "spinners-react";
import FormInput from "../components/FormInput";
import { useState, useRef, useEffect, ChangeEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useFetcher } from "@remix-run/react";

// eslint-disable-next-line no-useless-escape
const EMAIL_VALIDATION = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const PWD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignUpForm({
  changeForm,
  closeForm,
}: {
  changeForm: () => void;
  closeForm: () => void;
}) {
  const { Form, state, data } = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const [errMsg, setErrMsg] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [, setUsernameFocus] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [, setEmailFocus] = useState<boolean>(true);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  // Focus username input on load
  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  // Check email validity on input change
  useEffect(() => {
    setValidEmail(EMAIL_VALIDATION.test(email));
  }, [email]);

  // Check password validity on input change
  useEffect(() => {
    setValidPwd(PWD_VALIDATION.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd, setErrMsg]);

  useEffect(() => {
    if (data) {
      const { success, message } = data.data;
      if (success) {
        closeForm();
        formRef.current?.reset();
      } else {
        console.error(message);
        setErrMsg(message);
      }
    }
  }, [data, closeForm]);

  // HANDLERS
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPwd(value);
        break;
      case "passwordMatch":
        setMatchPwd(value);
        break;
      default:
        return;
    }
  };

  const handleUsernameFocus = () => setUsernameFocus(true);
  const handleUsernameExit = () => setUsernameFocus(false);

  const handleEmailFocus = () => setEmailFocus(true);
  const handleEmailExit = () => setEmailFocus(false);

  const handlePasswordFocus = () => setPwdFocus(true);
  const handlePasswordExit = () => setPwdFocus(false);

  const handleMatchPasswordFocus = () => setMatchFocus(true);
  const handleMatchPasswordExit = () => setMatchFocus(false);

  return (
    <Form
      method="post"
      id="registration-form"
      className="flex p-5 flex-col items-center gap-10 rounded-md"
      ref={formRef}
    >
      <header className="text-center">
        <h2 className="mb-5 text-2xl">Create an account with us today!</h2>

        <p>
          Already have an account?{" "}
          <button className="underline" type="button" onClick={changeForm}>
            Login
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
        id="registration-username-input"
        type="text"
        ref={usernameRef}
        required
        autoComplete="off"
        label="Username"
        name="username"
        value={username}
        labelClassName={`flex items-center absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          username ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handleInputChange}
        handleFocus={handleUsernameFocus}
        handleExit={handleUsernameExit}
      />

      <FormInput
        id="registration-email-input"
        type="text"
        ref={emailRef}
        ariaInvalid={!validEmail}
        value={email}
        required
        autoComplete="off"
        label="Email"
        name="email"
        labelClassName={`flex items-center absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          email ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handleInputChange}
        handleFocus={handleEmailFocus}
        handleExit={handleEmailExit}
      />

      <FormInput
        id="registration-password-input"
        type="password"
        required
        ariaInvalid={!validPwd}
        ariaDescribedBy="pwdnote"
        value={pwd}
        label="Password"
        name="password"
        labelClassName={`flex items-center absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          pwd ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none tracking-widest"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handleInputChange}
        handleFocus={handlePasswordFocus}
        handleExit={handlePasswordExit}
      />

      <div
        className={
          pwdFocus && !validPwd
            ? "flex items-center gap-7 w-full leading-6 rounded-md bg-gray-300 p-2 relative"
            : "absolute -left-[9999px]"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} size="lg" color="blue" />
        <ul id="pwdnote" className="list-disc">
          <li>8 to 24 characters.</li>
          <li>
            Must include uppercase and lowercase letters, a number, and a
            special character.
          </li>
          <li>
            Allowed special characters:{" "}
            <span aria-label="exclamation-mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>{" "}
          </li>
        </ul>
      </div>

      <FormInput
        id="registration-match-password-input"
        type="password"
        required
        value={matchPwd}
        ariaInvalid={!validMatch}
        ariaDescribedBy="pwdconfirmnote"
        label="Confirm Password"
        name="passwordMatch"
        labelClassName={`flex items-center absolute bg-transparent focus:outline-none peer-focus:-top-6 peer-focus:left-0 peer-focus: text-sm transition-all ${
          matchPwd ? "-top-6 left-0 text-sm" : "top-2 left-2 text-lg"
        }`}
        inputClassName="h-full w-full px-1 text-lg border-b bg-transparent peer focus:outline-none tracking-widest"
        inputContainerClassName="w-full h-10 relative rounded-md bg-transparent"
        handleChange={handleInputChange}
        handleFocus={handleMatchPasswordFocus}
        handleExit={handleMatchPasswordExit}
      />

      <div
        className={
          matchFocus && !validMatch
            ? "flex items-center gap-3 w-full leading-6 rounded-md bg-gray-300 p-2 relative"
            : "absolute -left-[9999px]"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} color="blue" />
        <p id="pwdconfirmnote" className="m-0">
          Must match the first password input.
        </p>
      </div>

      <footer className="h-auto w-full flex flex-col gap-5 text-center">
        <p>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </p>
        <button
          className="flex flex-auto h-12 items-center justify-center gap-3 cursor-pointer bg-purple-900 hover:bg-purple-700 text-white rounded-full"
          type="submit"
          name="requestType"
          value="registration-request"
        >
          {state === "submitting" ? (
            <SpinnerCircular size={30} color="white" />
          ) : (
            "Register"
          )}
        </button>
      </footer>
    </Form>
  );
}
