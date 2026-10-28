import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared behaviour for modal-style surfaces (product modal, cart drawer):
 * moves focus inside, traps Tab, closes on the given keys, locks page scroll,
 * and returns focus to the previously focused element on close.
 */
export function useDialog(
    isOpen: boolean,
    containerRef: RefObject<HTMLElement | null>,
    onClose: () => void,
    closeKeys: string[] = ["Escape"],
    initialFocusRef?: RefObject<HTMLElement | null>,
): void {
    const onCloseRef = useRef(onClose);
    const closeKeysRef = useRef(closeKeys);
    useEffect(() => {
        onCloseRef.current = onClose;
        closeKeysRef.current = closeKeys;
    });

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const { overflow, paddingRight } = document.body.style;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

        const getFocusable = () => Array.from(containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
        (initialFocusRef?.current ?? getFocusable()[0])?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
            if (closeKeysRef.current.includes(e.key) && (e.key === "Escape" || !isTyping)) {
                e.preventDefault();
                onCloseRef.current();
                return;
            }
            if (e.key !== "Tab") return;

            const items = getFocusable();
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
            previouslyFocused?.focus({ preventScroll: true });
        };
    }, [isOpen, containerRef, initialFocusRef]);
}
