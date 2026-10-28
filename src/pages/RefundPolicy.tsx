import { type JSX } from "react";
import BrandName from "../components/BrandName";
import { Link } from "react-router-dom";
import LegalPage, { type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
    {
        id: "overview", title: "Our promise", body: <>
            <p>We want every <BrandName /> piece to feel like it was made for you. If something isn't right, we'll make it right, whether that's an exchange, a refund or store credit.</p>
            <p>Nothing in this policy limits your rights under the <strong>Consumer Guarantees Act 1993</strong> or the <strong>Fair Trading Act 1986</strong>.</p>
        </>,
    },
    {
        id: "change-of-mind", title: "Change of mind", body: <>
            <p>Changed your mind? You can return <strong>unopened, unused</strong> products within <strong>30 days</strong> of delivery for a full refund to your original payment method.</p>
            <ul>
                <li>Products must be in their original packaging with the seal intact.</li>
                <li>Gift sets must be returned complete.</li>
                <li>Items bought in a promotion are refunded at the price you paid.</li>
            </ul>
        </>,
    },
    {
        id: "opened", title: "Opened products & shade matching", body: <>
            <p>Finding your shade online isn't always easy. If you've opened a lipstick and the shade isn't quite you, we'll offer a <strong>one-time shade exchange</strong> within 14 days of delivery.</p>
            <p>For hygiene reasons, opened products can't be resold, so they're exchanged rather than refunded unless they're faulty.</p>
        </>,
    },
    {
        id: "faulty", title: "Faulty or damaged items", body: <>
            <p>If your order arrives damaged, or a product is faulty, contact us within <strong>14 days</strong> with your order number and a photo. We'll send a replacement or refund you in full, including any delivery costs.</p>
            <p>A fault includes a broken bullet, a damaged case, or a product that's significantly different from its description.</p>
        </>,
    },
    {
        id: "how-to-return", title: "How to return", body: <>
            <ul>
                <li>Start a return through our <Link to="/contact">Contact page</Link> with your order number.</li>
                <li>We'll email you a prepaid courier label within one business day.</li>
                <li>Pack items securely and drop them at any NZ Post location.</li>
                <li>Prefer to return in person? Visit any boutique listed on our <Link to="/store-locator">Store Locator</Link>.</li>
            </ul>
        </>,
    },
    {
        id: "timing", title: "Refund timing", body: <>
            <p>Once your return reaches us, we inspect it within <strong>3 business days</strong>. Approved refunds are processed straight away and usually appear in your account within <strong>5–10 business days</strong>, depending on your bank.</p>
            <p>You can follow your return on the <Link to="/order-status">Order Status</Link> page.</p>
        </>,
    },
];

export default function RefundPolicy(): JSX.Element {
    return <LegalPage heroName="refund-policy" title="Refund Policy" pageTitle="Refund Policy" updated="28 October 2026" sections={sections}
        intro="Simple, fair returns: 30 days for change of mind, and faulty items always made right." />;
}
