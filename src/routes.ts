import { lazy } from "react";

export const Index = lazy(() => import("./pages/Index"));
export const Shop = lazy(() => import("./pages/Shop"));
export const Affiliate = lazy(() => import("./pages/Affiliate"));
export const Contact = lazy(() => import("./pages/Contact"));
export const About = lazy(() => import("./pages/About"));
export const Checkout = lazy(() => import("./pages/Checkout"));
export const NotFound = lazy(() => import("./pages/NotFound"));