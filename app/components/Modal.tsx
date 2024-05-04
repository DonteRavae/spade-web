import { ReactNode, forwardRef } from "react";

type ModalRef = {
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, ModalRef>(function Modal(
  { children },
  ref
) {
  return (
    <dialog className="w-[500px] rounded-md p-5 transition-all" ref={ref}>
      {children}
    </dialog>
  );
});
