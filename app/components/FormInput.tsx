import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, ComponentProps, forwardRef } from "react";

export interface FormInputProps extends ComponentProps<"input"> {
  id: string;
  type?: string;
  label?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  handleChange?: ChangeEventHandler;
  handleFocus?: () => void;
  handleExit?: () => void;
}

export default forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  {
    id,
    type,
    label,
    inputContainerClassName,
    inputClassName,
    labelClassName,
    ariaInvalid,
    ariaDescribedBy,
    handleChange,
    handleFocus,
    handleExit,
    ...otherAttrs
  },
  ref
) {
  return (
    <div className={inputContainerClassName}>
      <input
        id={id}
        type={type ? type : "text"}
        ref={ref}
        className={inputClassName}
        aria-invalid={ariaInvalid} // Lets the screen reader know if adjustments are needed before submission
        aria-describedby={ariaDescribedBy} // Describes the input requirements using the ID of the correlating desription element.
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleExit}
        {...otherAttrs}
      />
      {label && (
        <label className={labelClassName} htmlFor={id}>
          {label}
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            className={`ml-1 ${
              !otherAttrs.value || ariaInvalid ? "hidden" : "block"
            }`}
          />
          <FontAwesomeIcon
            icon={faX}
            color="red"
            size="sm"
            className={`ml-1 ${
              !otherAttrs.value || !ariaInvalid ? "hidden" : "block"
            } `}
          />
        </label>
      )}
    </div>
  );
});
