import { type JSX } from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
    label?: string,
}

/** Page numbers to show, with "…" gaps once there are more than 7 pages. */
function getPageRange(current: number, total: number): Array<number | "…"> {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
    if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "…", current - 1, current, current + 1, "…", total];
}

const baseButton = "flex items-center justify-center min-w-10 h-10 px-3 border font-sans text-base transition-colors duration-200";

export default function Pagination({ currentPage, totalPages, onPageChange, label = "Pagination" }: PaginationProps): JSX.Element | null {
    if (totalPages <= 1) return null;

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    return (
        <nav aria-label={label} className="flex justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-2">
                <li>
                    <button type="button" onClick={() => onPageChange(currentPage - 1)} disabled={isFirst} aria-label="Previous page"
                        className={`${baseButton} gap-1 border-beau text-beau hover:bg-beau hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-beau`}>
                        <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" /></svg>
                        <span className="hidden sm:inline">Prev</span>
                    </button>
                </li>
                {getPageRange(currentPage, totalPages).map((page, i) => (
                    <li key={`${page}-${i}`}>
                        {page === "…"
                            ? <span aria-hidden="true" className="flex items-end justify-center min-w-6 h-10 text-beau">…</span>
                            : <button type="button" onClick={() => onPageChange(page)}
                                aria-label={`Page ${page}`}
                                aria-current={page === currentPage ? "page" : undefined}
                                className={`${baseButton} border-beau ${page === currentPage ? "bg-beau text-white font-semibold" : "text-beau hover:bg-sand"}`}>
                                {page}
                            </button>}
                    </li>
                ))}
                <li>
                    <button type="button" onClick={() => onPageChange(currentPage + 1)} disabled={isLast} aria-label="Next page"
                        className={`${baseButton} gap-1 border-beau text-beau hover:bg-beau hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-beau`}>
                        <span className="hidden sm:inline">Next</span>
                        <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" /></svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
