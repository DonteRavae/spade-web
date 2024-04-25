import { ReactNode, forwardRef } from "react";

type ModalRef = {
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, ModalRef>(function Modal(
  { children },
  ref
) {
  return <dialog ref={ref}>{children}</dialog>;
});
