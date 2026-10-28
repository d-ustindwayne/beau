import { type JSX } from "react";

interface QuantityStepperProps {
    value: number,
    onDecrement: () => void,
    onIncrement: () => void,
    itemLabel: string,
    size?: "sm" | "md",
}

export default function QuantityStepper({ value, onDecrement, onIncrement, itemLabel, size = "md" }: QuantityStepperProps): JSX.Element {
    const buttonSize = size === "sm" ? "size-7 text-base" : "size-10 text-xl";
    const buttonClass = `${buttonSize} flex items-center justify-center font-extrabold transition-colors hover:bg-sand focus-visible:outline-offset-0 cursor-pointer`;

    return (
        <div role="group" aria-label={`Quantity for ${itemLabel}`} className="w-fit flex flex-row items-stretch border border-black bg-white text-black mt-2">
            <button type="button" className={`${buttonClass} border-r border-black`} onClick={onDecrement} aria-label={`Decrease quantity of ${itemLabel}`}>&minus;</button>
            <span aria-live="polite" className={`${size === "sm" ? "w-8 text-xs" : "w-10 text-base"} flex items-center justify-center font-semibold tabular-nums`}>{value}</span>
            <button type="button" className={`${buttonClass} border-l border-black`} onClick={onIncrement} aria-label={`Increase quantity of ${itemLabel}`}>+</button>
        </div>
    );
}
