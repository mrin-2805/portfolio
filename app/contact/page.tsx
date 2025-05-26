import { JSX } from "react";
import TitleBlock from "../_components/UI/TitleBlock";
import ContactForm from "./ContactForm";
import MagicCursor from "../_components/Animations/Canvas/MagicCursor";

export default async function PContact(): Promise<JSX.Element> {
    return (
        <main id="main" className="relative z-1">
            <section className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden">
                <MagicCursor />
                <div className="relative z-2">
                    <h1 className="text-center">Let&apos;s Work Together!</h1>
                </div>
            </section>
            <section className="boxSpacer bg-white">
                <TitleBlock text="Get In Touch" />
                <h2>Contact Me</h2>
                <div className="flex flex-wrap justify-between gap-x-20 gap-y-4 lg:flex-nowrap">
                    <div className="w-full">
                        <div className="text-justify">
                            <p>
                                I&apos;m open and available to take on new projects. Whether you have a specific project in mind or need expert advice, I&apos;m here to assist you. Don&apos;t hesitate to drop us a line via email or
                                fill out the form I&apos;ll get back to you ASAP. I look forward to collaborating with you!
                            </p>
                        </div>
                    </div>
                    <div className="w-full max-w-xl">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
