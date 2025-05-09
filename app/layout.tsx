import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lexend } from "next/font/google";
import "./globals.css";
import Footer from "./_components/UI/Common/Footer";
import Header from "./_components/UI/Common/Header";
import ClientJS from "./_components/UI/Common/ClientJS";

export const metadata: Metadata = {
    title: "Mrinmayee",
    description: "Hey! I'm Mrinmayee this my personal portfolio as a Graphic Designer, Hope you like it!",
};

const headingsFont = localFont({
    src: [
        {
            path: "../public/fonts/CanelaDeck/CanelaDeck-Black.woff",
            weight: "900",
            style: "normal",
        },
        {
            path: "../public/fonts/CanelaDeck/CanelaDeck-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/CanelaDeck/CanelaDeck-Bold.woff",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--headingsFont",
    preload: true,
    display: "swap",
});

const bodyFont = Lexend({
    preload: true,
    variable: "--bodyFont",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={`${headingsFont.variable} ${bodyFont.variable}`}>
                <ClientJS />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
