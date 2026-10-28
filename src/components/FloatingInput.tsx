import { type ComponentPropsWithoutRef, type JSX } from "react";
import { FieldControl, FieldLabel, FieldWrapper } from "../constants";

interface FloatingInputProps extends ComponentPropsWithoutRef<"input"> {
    id: string,
    label: string,
    wrapperClassName?: string,
}

/** Bordered input with a label that floats above the value once focused or filled. */
export default function FloatingInput({ id, label, wrapperClassName = "", type = "text", ...props }: FloatingInputProps): JSX.Element {
    return (
        <div className={`${FieldWrapper} ${wrapperClassName}`}>
            <input id={id} type={type} placeholder=" " className={FieldControl} {...props} />
            <label htmlFor={id} className={FieldLabel}>{label}</label>
        </div>
    );
}
