import { type JSX } from "react";
import BrandName from "../components/BrandName";
import { Link } from "react-router-dom";
import LegalPage, { type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
    {
        id: "about", title: "About these terms", body: <>
            <p>These terms apply when you use the <BrandName /> website or buy from us. By placing an order, you agree to them. They don't affect your rights under New Zealand consumer law.</p>
        </>,
    },
    {
        id: "products", title: "Products & shades", body: <>
            <p>We work hard to show every shade accurately, including descriptions of how each one appears. Colours can still vary between screens, which is why we offer a <Link to="/refund-policy">one-time shade exchange</Link>.</p>
        </>,
    },
    {
        id: "pricing", title: "Pricing & payment", body: <>
            <ul>
                <li>All prices are in New Zealand dollars (NZD) and include 15% GST.</li>
                <li>We accept card payments at checkout.</li>
                <li>If a product is listed at an incorrect price, we'll contact you before processing your order.</li>
            </ul>
        </>,
    },
    {
        id: "delivery", title: "Delivery", body: <>
            <p>Delivery is <strong>free</strong> on every order within New Zealand. Most orders arrive within 2–5 business days. Track yours on the <Link to="/order-status">Order Status</Link> page.</p>
        </>,
    },
    {
        id: "returns", title: "Returns", body: <>
            <p>Our <Link to="/refund-policy">Refund Policy</Link> explains how to return or exchange a product.</p>
        </>,
    },
    {
        id: "affiliates", title: "Affiliate programme", body: <>
            <p>Members of our <Link to="/affiliate">affiliate collective</Link> earn commission on qualifying purchases made through their unique link. Commission is paid monthly once a purchase is past its 30-day return window.</p>
        </>,
    },
    {
        id: "content", title: "Our content", body: <>
            <p>All images, product names, designs and text on this site belong to <BrandName />. Please don't reuse them without our written permission.</p>
        </>,
    },
    {
        id: "changes", title: "Changes to these terms", body: <>
            <p>We may update these terms from time to time. The version on this page when you place your order is the one that applies.</p>
        </>,
    },
];

export default function Terms(): JSX.Element {
    return <LegalPage heroName="terms" title="Terms & Conditions" pageTitle="Terms & Conditions" updated="28 October 2026" sections={sections}
        intro="The fine print, written plainly." />;
}
