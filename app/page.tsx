import Link from "next/link";

import BannerRole from "./_components/Animations/Banner/BannerRole";
import SplitText from "./_components/Animations/Text/SplitText";
import StickyBottom from "./_components/UI/StickyBottom";
import TitleBlock from "./_components/UI/TitleBlock";
import { GetIcon } from "./_components/UI/Icons/GetIcon";
import Career from "./_components/UI/Career";
import Skills from "./_components/UI/Skills/Skills";
import MagicCursor from "./_components/Animations/Canvas/MagicCursor";

export default async function HomePage() {
    return (
        <main id="main" className="relative z-1">
            <section id="siteBanner" className="siteBanner relative">
                <MagicCursor />
                <div className="flex min-h-screen w-full items-center relative z-1">
                    <div className="boxSpacer flex w-full flex-col items-center justify-center gap-y-4">
                        <h1>
                            <SplitText text={"Hi! I'm Mrinmayee"} />
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
                            <h1>
                                <SplitText text={"I'm a"} />
                            </h1>
                            <div className="bg-foreground text-background inline-block rounded px-2 pt-2 pb-4">
                                <BannerRole />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StickyBottom>
                <div className="boxSpacer bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-full pb-6 lg:col-span-2 lg:pr-16">
                            <TitleBlock text="Profile" />
                            <h3>Experienced Graphic Designer with 4+ years in digital and print media, excelling in strategic content creation and innovative design solutions.</h3>
                            <div className="mt-3 text-justify">
                                <p>
                                    I am a creative and detail-oriented Graphic Designer with over four years of experience crafting visually compelling designs across digital and print media. My expertise lies in social media management,
                                    where I drive engagement and brand visibility through strategic content creation and innovative design. With a strong command of Adobe Creative Suite and an eye for design trends, I thrive in delivering
                                    impactful campaigns that align with brand identities and goals. Whether it’s managing social media campaigns, designing for print, or collaborating with cross-functional teams, I am passionate about
                                    enhancing brand presence through exceptional design solutions.
                                </p>
                            </div>
                        </div>
                        <div className="bg-foreground col-span-full p-2 md:col-span-1"></div>
                        <div className="md:col-span-1"></div>
                        <div className="md:col-span-1 lg:hidden"></div>
                        <div className="bg-foreground col-span-full min-h-20 p-2 md:col-span-1"></div>
                    </div>
                </div>
            </StickyBottom>

            <section id="career" className="boxSpacer grid size-full grid-cols-12 gap-x-5 gap-y-14 py-20">
                <div className="col-span-full lg:col-span-4">
                    <div className="sticky top-10">
                        <TitleBlock text="Career" />
                        <h2>My Experience</h2>
                        <br />
                        <p>
                            Throughout my career I&apos;ve had the privilege of working with <br /> some very talented people at a great bunch of companies.
                        </p>
                        <br />
                        <Link target="_blank" className="mainBtn" href={"/resume.pdf"}>
                            <div className="flex items-center justify-center gap-3">
                                Download My CV
                                <GetIcon iconName="Download" />
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                Download My CV
                                <GetIcon iconName="Download" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-span-full lg:col-span-8 lg:pt-72">
                    <Career />
                </div>
            </section>

            <section id="skills" className="boxSpacer grid size-full grid-cols-12 gap-x-5 gap-y-14 bg-white py-20">
                <div className="col-span-full lg:col-span-4">
                    <div className="sticky top-10">
                        <TitleBlock text="Skills" />
                        <h1 className="text-4xl lg:text-5xl">My Skillset</h1>
                        <br />
                        <p>
                            Over the course of my career, I&apos;ve strived <br /> to develop a diverse set of core skills.
                        </p>
                    </div>
                </div>
                <div className="relative col-span-full overflow-hidden lg:col-span-8 lg:pt-72">
                    <Skills />
                </div>
            </section>
        </main>
    );
}
