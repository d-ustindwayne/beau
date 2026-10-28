import { useState, type ComponentPropsWithoutRef, type JSX } from "react";

interface LazyImageProps extends ComponentPropsWithoutRef<"img"> {
    /** Above-the-fold images load immediately with high priority instead of lazily. */
    eager?: boolean,
}

/** An <img> that lazy-loads, shows a shimmering skeleton while loading, then fades in. */
export default function LazyImage({ className = "", eager = false, onLoad, onError, ...props }: LazyImageProps): JSX.Element {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <img {...props}
            ref={(img) => { if (img?.complete && img.naturalWidth > 0) setIsLoaded(true); }}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            decoding="async"
            onLoad={(e) => { setIsLoaded(true); onLoad?.(e); }}
            onError={(e) => { setIsLoaded(true); onError?.(e); }}
            className={`${className} ${isLoaded ? "animate-fade-in" : "skeleton"}`} />
    );
}
