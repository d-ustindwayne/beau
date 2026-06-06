import type { JSX } from "react"

export default function LoadingScreen(): JSX.Element {
    return (
        <div className="flex items-center justify-center space-x-7 min-h-dvh">
            <div className="w-10 h-10 bg-[#841910] rounded-full animate-bounce [animation-delay:-1s]"></div>
            <div className="w-10 h-10 bg-[#841910] rounded-full animate-bounce [animation-delay:-1.2s]"></div>
            <div className="w-10 h-10 bg-[#841910] rounded-full animate-bounce [animation-delay:-1.5s]"></div>
        </div>
    );
}