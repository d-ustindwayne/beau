import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../seo.json";

interface RouteSeo { title: string, description: string, noindex?: boolean }

const routes: Record<string, RouteSeo> = seo.routes;
const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

function setHeadTag(selector: string, attribute: "content" | "href", value: string) {
    document.head.querySelector(selector)?.setAttribute(attribute, value);
}

/**
 * Keeps the description, canonical, robots, Open Graph and Twitter tags in sync with the current route.
 * The build step writes the same values into each route's static HTML for crawlers that don't run JavaScript.
 * Page titles are set by each page's own <title>.
 */
export default function Seo() {
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
        const page = routes[path];
        const meta = page ?? seo.notFound;
        const url = `${seo.site.url}${path === "/" ? "/" : path}`;

        setHeadTag('meta[name="description"]', "content", meta.description);
        setHeadTag('meta[name="robots"]', "content", page && !page.noindex ? INDEX_ROBOTS : "noindex, follow");
        setHeadTag('link[rel="canonical"]', "href", url);
        setHeadTag('meta[property="og:url"]', "content", url);
        setHeadTag('meta[property="og:title"]', "content", meta.title);
        setHeadTag('meta[property="og:description"]', "content", meta.description);
        setHeadTag('meta[name="twitter:url"]', "content", url);
        setHeadTag('meta[name="twitter:title"]', "content", meta.title);
        setHeadTag('meta[name="twitter:description"]', "content", meta.description);
    }, [pathname]);

    return null;
}
