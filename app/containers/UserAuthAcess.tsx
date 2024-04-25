import { useRef } from "react";
import Modal from "../components/Modal";

export default function UserAuthAccess() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal();
  const exitModal = () => modalRef.current?.close();

  return (
    <>
      <button className="h-3/4 rounded-full bg-purple-900 hover:bg-purple-700 text-white px-3" type="button" onClick={openModal}>
        Sign In
      </button>
      <Modal ref={modalRef}>
        <header>
          <button onClick={exitModal}>Exit</button>
        </header>
      </Modal>
    </>
  );
}
