import { useEffect, useRef, useState, type JSX } from "react";

/** A number that counts up from zero the first time it scrolls into view. */
export default function CountUp({ value, duration = 1200 }: { value: number, duration?: number }): JSX.Element {
    const ref = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let frame = 0;
        const run = () => {
            const start = performance.now();
            const tick = (now: number) => {
                const progress = Math.min(1, (now - start) / duration);
                setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
        };
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            frame = requestAnimationFrame(() => setShown(value));
            return () => cancelAnimationFrame(frame);
        }
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            run();
        });
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            <span aria-hidden="true">{shown}</span>
            <span className="sr-only">{value}</span>
        </span>
    );
}
