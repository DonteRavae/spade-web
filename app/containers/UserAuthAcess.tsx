import { useRef, useState } from "react";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

export default function UserAuthAccess() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [authForm, setAuthForm] = useState<"login" | "register">("login");

  const openModal = () => modalRef.current?.showModal();
  const exitModal = () => modalRef.current?.close();

  return (
    <>
      <button
        className="h-3/4 rounded-full bg-purple-900 hover:bg-purple-700 text-white px-3"
        type="button"
        onClick={openModal}
      >
        Log In
      </button>
      <Modal ref={modalRef}>
        <header className="h-12 flex items-center px-5 py-2">
          <button
            className="ml-auto h-7 w-7 bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={exitModal}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </header>
        {authForm === "login" ? (
          <LogInForm
            closeForm={exitModal}
            changeForm={() => setAuthForm("register")}
          />
        ) : (
          <SignUpForm
            closeForm={exitModal}
            changeForm={() => setAuthForm("login")}
          />
        )}
      </Modal>
    </>
  );
}
