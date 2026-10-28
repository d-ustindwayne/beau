import { useMemo, useState, type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";

type Region = "Auckland" | "Wellington" | "Christchurch";

interface Store {
    id: string,
    name: string,
    region: Region,
    address: string,
    phone: string,
    lat: number,
    lon: number,
    flagship?: boolean,
    services: string[],
}

// Illustrative boutiques for the prototype; coordinates are approximate.
const STORES: Store[] = [
    { id: "manukau", name: "Manukau Flagship", region: "Auckland", address: "Manukau Institute of Technology, Manukau Station Road, Manukau 2104", phone: "09 555 0101", lat: -36.9932, lon: 174.8797, flagship: true, services: ["Shade consultations", "Gift wrapping", "Click & collect"] },
    { id: "britomart", name: "Britomart Atelier", region: "Auckland", address: "Galway Street, Britomart, Auckland CBD 1010", phone: "09 555 0102", lat: -36.8442, lon: 174.7686, services: ["Shade consultations", "Click & collect"] },
    { id: "newmarket", name: "Newmarket", region: "Auckland", address: "Broadway, Newmarket, Auckland 1023", phone: "09 555 0103", lat: -36.8697, lon: 174.7781, services: ["Gift wrapping", "Click & collect"] },
    { id: "sylvia-park", name: "Sylvia Park", region: "Auckland", address: "Sylvia Park Road, Mount Wellington, Auckland 1060", phone: "09 555 0104", lat: -36.9174, lon: 174.8413, services: ["Click & collect"] },
    { id: "lambton", name: "Lambton Quay", region: "Wellington", address: "Lambton Quay, Wellington Central 6011", phone: "04 555 0105", lat: -41.2826, lon: 174.7759, services: ["Shade consultations", "Gift wrapping"] },
    { id: "riccarton", name: "Riccarton", region: "Christchurch", address: "Riccarton Road, Riccarton, Christchurch 8041", phone: "03 555 0106", lat: -43.5306, lon: 172.5996, services: ["Click & collect"] },
];

const REGIONS: Array<Region | "All"> = ["All", "Auckland", "Wellington", "Christchurch"];

const HOURS: Array<[day: string, open: number, close: number]> = [
    ["Sunday", 10, 16], ["Monday", 9, 18], ["Tuesday", 9, 18], ["Wednesday", 9, 18],
    ["Thursday", 9, 20], ["Friday", 9, 18], ["Saturday", 10, 17],
];

const formatHour = (h: number) => `${h % 12 || 12}${h < 12 ? "am" : "pm"}`;

/** Opening status in New Zealand time, regardless of the visitor's own time zone. */
function getOpenStatus(): { isOpen: boolean, label: string, today: number } {
    const parts = new Intl.DateTimeFormat("en-NZ", { timeZone: "Pacific/Auckland", weekday: "long", hour: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 12);
    const today = Math.max(0, HOURS.findIndex(([day]) => day === weekday));
    const [, open, close] = HOURS[today];
    if (hour >= open && hour < close) return { isOpen: true, label: `Open until ${formatHour(close)}`, today };
    if (hour < open) return { isOpen: false, label: `Opens ${formatHour(open)} today`, today };
    const [nextDay, nextOpen] = HOURS[(today + 1) % 7];
    return { isOpen: false, label: `Opens ${nextDay} ${formatHour(nextOpen)}`, today };
}

function mapUrl(store: Store): string {
    const pad = 0.012;
    const bbox = [store.lon - pad * 1.6, store.lat - pad, store.lon + pad * 1.6, store.lat + pad].join(",");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${store.lat},${store.lon}`;
}

export default function StoreLocator(): JSX.Element {
    const [region, setRegion] = useState<Region | "All">("All");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(STORES[0].id);
    const [loadedMap, setLoadedMap] = useState<string | null>(null);
    const [status] = useState(getOpenStatus);

    const stores = useMemo(() => {
        const q = query.trim().toLowerCase();
        return STORES.filter((s) => (region === "All" || s.region === region) && (!q || `${s.name} ${s.address} ${s.region}`.toLowerCase().includes(q)));
    }, [region, query]);

    const selected = STORES.find((s) => s.id === selectedId) ?? STORES[0];
    const src = mapUrl(selected);

    return (
        <>
            <title>Store Locator | beau</title>
            <HeroHeading textColor="text-white" alignment="items-center" title="Store Locator" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Find a be•au boutique and try your shade in person." />

            <section className="max-w-7xl mx-auto px-4 md:px-6 md:py-14 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-[26rem] shrink-0 flex flex-col">
                        <div className="relative">
                            <label htmlFor="store-search" className="sr-only">Search by suburb, city or postcode</label>
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
                            <input id="store-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by suburb, city or postcode"
                                className="w-full h-12 ps-10 pe-3 border-2 border-beau bg-field font-sans text-sm outline-0 transition-shadow focus:shadow-[0_0_0_3px_rgb(132_25_16/0.18)]" />
                        </div>
                        <div role="group" aria-label="Filter by region" className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                            {REGIONS.map((r) => (
                                <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)}
                                    className={`shrink-0 h-9 px-4 rounded-full border font-sans text-sm transition-colors ${region === r ? "bg-black border-black text-white" : "border-black/25 bg-white/60 hover:border-black hover:bg-white"}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                        <p aria-live="polite" className="font-sans text-sm text-neutral-700 mt-4">{stores.length} {stores.length === 1 ? "boutique" : "boutiques"}</p>

                        <ul className="mt-3 flex flex-col gap-3 lg:max-h-[34rem] lg:overflow-y-auto lg:pe-1">
                            {stores.map((store) => {
                                const isSelected = store.id === selected.id;
                                return (
                                    <li key={store.id}>
                                        <button type="button" aria-pressed={isSelected} onClick={() => setSelectedId(store.id)}
                                            className={`w-full text-start p-4 border-2 bg-white transition-all duration-200 ${isSelected ? "border-beau shadow-md" : "border-transparent hover:border-black/20"}`}>
                                            <span className="flex items-start justify-between gap-3">
                                                <span className="font-serif text-2xl leading-tight">{store.name}</span>
                                                {store.flagship && <span className="shrink-0 px-2 py-0.5 bg-beau text-white font-sans text-[10px] font-semibold uppercase tracking-wider">Flagship</span>}
                                            </span>
                                            <span className="block font-sans text-sm text-neutral-700 mt-1">{store.address}</span>
                                            <span className="flex items-center gap-1.5 font-sans text-xs mt-2">
                                                <span aria-hidden="true" className={`size-2 rounded-full ${status.isOpen ? "bg-emerald-600" : "bg-neutral-400"}`} />
                                                <span className={status.isOpen ? "text-emerald-800 font-semibold" : "text-neutral-600"}>{status.isOpen ? "Open now" : "Closed"}</span>
                                                <span className="text-neutral-600">· {status.label}</span>
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                            {stores.length === 0 && (
                                <li className="p-6 text-center bg-white border border-black/10">
                                    <p className="font-serif italic text-2xl">No boutiques found</p>
                                    <p className="font-sans text-sm text-neutral-700 mt-1">Try another area, or shop online with free delivery.</p>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col bg-white border border-black/10">
                        <div className="relative h-[22rem] md:h-[28rem] lg:h-[30rem] bg-collection">
                            {loadedMap !== src && <div aria-hidden="true" className="absolute inset-0 skeleton" />}
                            <iframe key={src} src={src} title={`Map showing be•au ${selected.name}`} loading="lazy" onLoad={() => setLoadedMap(src)}
                                className={`absolute inset-0 size-full border-0 [filter:grayscale(0.5)_sepia(0.12)] transition-opacity duration-500 ${loadedMap === src ? "opacity-100" : "opacity-0"}`} />
                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 shadow font-sans text-[11px] font-semibold uppercase tracking-wider text-beau">Prototype</span>
                        </div>
                        <div key={selected.id} className="p-5 md:p-7 grid md:grid-cols-[1fr_auto] gap-6 animate-fade-in">
                            <div>
                                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">{selected.region}</p>
                                <h2 className="font-serif italic text-4xl mt-1">{selected.name}</h2>
                                <p className="font-sans text-neutral-700 mt-2">{selected.address}</p>
                                <p className="font-sans mt-1"><a href={`tel:${selected.phone.replace(/\s/g, "")}`} className="text-beau underline underline-offset-4">{selected.phone}</a></p>
                                <ul aria-label="Services" className="flex flex-wrap gap-2 mt-4">
                                    {selected.services.map((s) => <li key={s} className="px-3 py-1 rounded-full bg-sand font-sans text-xs">{s}</li>)}
                                </ul>
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lon}`} target="_blank" rel="noreferrer"
                                    className="inline-flex items-center gap-2 mt-5 bg-beau text-white uppercase tracking-wide font-sans font-semibold text-sm px-5 py-3 transition-colors hover:bg-beau-dark">
                                    Get directions
                                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                                    <span className="sr-only">(opens in a new tab)</span>
                                </a>
                            </div>
                            <div className="md:min-w-56">
                                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">Opening hours</h3>
                                <dl className="mt-3 font-sans text-sm space-y-1.5">
                                    {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                                        const [day, open, close] = HOURS[d];
                                        const isToday = d === status.today;
                                        return (
                                            <div key={day} className={`flex justify-between gap-6 ${isToday ? "font-semibold text-beau" : "text-neutral-800"}`}>
                                                <dt>{day}{isToday && <span className="sr-only"> (today)</span>}</dt>
                                                <dd className="tabular-nums">{formatHour(open)}–{formatHour(close)}</dd>
                                            </div>
                                        );
                                    })}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="font-sans text-xs text-neutral-600 mt-6 text-center">Boutique locations are illustrative for this UI/UX prototype. Map data © OpenStreetMap contributors.</p>
            </section>
        </>
    );
}
