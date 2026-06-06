import type { ModalProps } from "../types"

export default function Modal({children, isOpen, toggleFunction}: ModalProps) {
    return (
        <>
            <div className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 items-center justify-center bg-[#00000067] bg-blend-darken backdrop-blur-sm p-4`} onClick={toggleFunction}>
                <div className="relative z-55 w-full max-w-lg rounded-lg min-h-[80dvh] max-h-[92.5dvh] flex flex-col bg-white shadow-2xl p-5.5" onClick={(e) => e.stopPropagation()}>
                    <span className="absolute top-3 5 right-3.5 text-3xl cursor-pointer" onClick={toggleFunction}>&times;</span>
                    {children}
                </div>
            </div>
        </>
    );
}