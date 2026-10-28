import { type JSX } from "react";
import { Link } from "react-router-dom";
import LegalPage, { type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
    {
        id: "who-we-are", title: "Who we are", body: <>
            <p>be•au is a lipstick boutique based in Manukau City, Auckland. This policy explains how we collect, use and protect your personal information, in line with the <strong>Privacy Act 2020</strong> and its Information Privacy Principles.</p>
        </>,
    },
    {
        id: "what-we-collect", title: "What we collect", body: <>
            <ul>
                <li><strong>Order details:</strong> your name, email, phone, delivery address and the products you buy.</li>
                <li><strong>Payment details:</strong> handled by our payment provider. We never store full card numbers.</li>
                <li><strong>Messages:</strong> anything you send through our contact form or our assistant, Jinny.</li>
                <li><strong>Preferences:</strong> your cart and chat history are stored in your own browser, so they're there when you come back.</li>
            </ul>
        </>,
    },
    {
        id: "how-we-use", title: "How we use it", body: <>
            <ul>
                <li>To process, deliver and support your orders.</li>
                <li>To answer your questions and improve our service.</li>
                <li>To send our newsletter, only if you subscribe. Every email has a one-click unsubscribe link.</li>
            </ul>
            <p>We never sell your personal information.</p>
        </>,
    },
    {
        id: "jinny", title: "Jinny, our AI assistant", body: <>
            <p>When you chat with Jinny, your messages are sent to an AI provider to generate a reply. Please don't share sensitive information such as card numbers in the chat. Your conversation is kept in your browser for the current session and cleared when you close the tab or start a new conversation.</p>
        </>,
    },
    {
        id: "sharing", title: "Who we share it with", body: <>
            <p>We share only what's needed with trusted partners who help us run the store: payment processors, courier companies and email services. Each is required to protect your information.</p>
        </>,
    },
    {
        id: "your-rights", title: "Your rights", body: <>
            <p>You can ask to see or correct the personal information we hold about you at any time. Just <Link to="/contact">contact us</Link>. If you're not happy with how we've handled your information, you can contact the Office of the Privacy Commissioner.</p>
        </>,
    },
    {
        id: "security", title: "Keeping it safe", body: <>
            <p>Our site uses encrypted connections (HTTPS), and access to customer information is limited to the people who need it to help you.</p>
        </>,
    },
];

export default function PrivacyPolicy(): JSX.Element {
    return <LegalPage title="Privacy Policy" pageTitle="Privacy Policy" updated="28 October 2026" sections={sections}
        intro="What we collect, why we collect it, and how we keep it safe." />;
}
