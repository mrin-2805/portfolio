import Link from "next/link";
import { GetIcon } from "../Icons/GetIcon";
import StickyBottom from "../StickyBottom";
import FooterSwiper from "./FooterSwiper";
import { TransitionLink } from "../../Animations/TransitionLink";

export default function Footer() {
    return (
        <StickyBottom>
            <footer className="bg-foreground text-background boxSpacer overflow-hidden pb-6">
                <div className="grid gap-x-4 gap-y-8 pb-6 lg:grid-cols-3">
                    <div className="">
                        <p>Have a project in mind?</p>
                        <TransitionLink href={"/contact"} className="bg-background text-foreground flex w-fit items-center rounded px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Let&apos;s Talk</span>
                                <span>Let&apos;s Talk</span>
                            </div>
                        </TransitionLink>
                    </div>
                    <div className="flex flex-wrap items-start gap-3 uppercase lg:justify-center">
                        <TransitionLink href={"/"} className="border-background flex w-fit items-center rounded border px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Home</span>
                                <span>Home</span>
                            </div>
                        </TransitionLink>
                        <TransitionLink href={"/works"} className="border-background flex w-fit items-center rounded border px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Works</span>
                                <span>Works</span>
                            </div>
                        </TransitionLink>
                        <TransitionLink href={"/gallery"} className="border-background flex w-fit items-center rounded border px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Gallery</span>
                                <span>Gallery</span>
                            </div>
                        </TransitionLink>
                        <TransitionLink href={"/contact"} className="border-background flex w-fit items-center rounded border px-4 py-2">
                            <div className="doubleTextBtn">
                                <span>Contact</span>
                                <span>Contact</span>
                            </div>
                        </TransitionLink>
                    </div>
                    <div className="flex items-start gap-2 lg:justify-end">
                        <Link href={"mailto:ghanekarmrinmayee@gmail.com"} target="_blank" className="border-background flex w-fit items-center rounded border p-2">
                            <div className="doubleTextBtn">
                                <GetIcon iconName="Mail" />
                                <GetIcon iconName="Mail" />
                            </div>
                        </Link>
                        <Link href={"https://www.linkedin.com/in/mrinmayee-ghanekar-354237189/"} target="_blank" className="border-background flex w-fit items-center rounded border p-2">
                            <div className="doubleTextBtn">
                                <GetIcon iconName="LinkedIn" />
                                <GetIcon iconName="LinkedIn" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="boxSpacer relative w-full px-0">
                    <FooterSwiper reverseDirection={true} />
                    <FooterSwiper reverseDirection={false} />
                    <div className="footerContactIcon absolute top-1/2 left-1/2 z-1 w-40 -translate-1/2 rounded-full p-2 md:w-50">
                        <TransitionLink href={"/contact"}>
                            <div className="animate-[spin_20s_linear_infinite] duration-1000">
                                <GetIcon iconName="FooterContactIcon" width="100%" height="100%" />
                            </div>
                            <div className="doubleTextBtn absolute top-1/2 left-1/2 max-w-7 -translate-1/2 rotate-145">
                                <GetIcon iconName="Arrow" width="100%" height="100%" />
                                <GetIcon iconName="Arrow" width="100%" height="100%" />
                            </div>
                        </TransitionLink>
                    </div>
                </div>
                <div className="">
                    <p>
                        Designed and Developed by{" "}
                        <Link href={"https://ajay2505.netlify.app/"} target="_blank" className="font-semibold underline">
                            Ajay Kumar
                        </Link>
                    </p>
                </div>
            </footer>
        </StickyBottom>
    );
}
