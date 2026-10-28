import { useRef } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "../types";
import { useDialog } from "../hooks";

export default function Modal({children, isOpen, toggleFunction, labelledBy}: ModalProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    useDialog(isOpen, panelRef, toggleFunction);

    if (!isOpen) return null;

    return createPortal(
        <div className="flex fixed inset-0 z-50 items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in" onClick={toggleFunction}>
            <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy}
                className="relative z-55 w-full max-w-lg rounded-lg max-h-[92.5dvh] flex flex-col bg-white shadow-2xl sm:p-5.5 p-4 animate-pop-in"
                onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={toggleFunction} aria-label="Close"
                    className="absolute top-2.5 right-2.5 flex items-center justify-center size-9 rounded-full text-black transition-colors hover:bg-sand">
                    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
}
