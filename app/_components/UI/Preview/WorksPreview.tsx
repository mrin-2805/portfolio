import Image from "next/image";
import { IWorks } from "@/app/_lib/definations/works-definations";
import { TransitionLink } from "../../Animations/TransitionLink";
import { GetIcon } from "../Icons/GetIcon";

interface Props {
    works: IWorks[];
}

export default function WorksPreview({ works }: Props) {
    return (
        <section className="flex h-screen flex-col overflow-hidden pb-0 lg:flex-row">
            <div className="flex size-full items-center">
                <div className="boxSpacer">
                    <h2>Want to see more?</h2>
                    <p>Check out the full list of Clients I&apos;ve worked with!</p>
                    <br />
                    <div className="flex justify-center">
                        <TransitionLink href={"/works"} className="bg-foreground text-background flex w-fit items-center rounded px-4 py-2">
                            <div className="doubleTextBtn">
                                <span className="flex items-center gap-2">
                                    WORKS
                                    <span className="inline-block rotate-180">
                                        <GetIcon iconName="Arrow" width="18" height="18" />
                                    </span>
                                </span>
                                <span className="flex items-center gap-2">
                                    WORKS
                                    <span className="inline-block rotate-180">
                                        <GetIcon iconName="Arrow" width="18" height="18" />
                                    </span>
                                </span>
                            </div>
                        </TransitionLink>
                    </div>
                </div>
            </div>
            <div className="size-full">
                <div className="imageLoader h-1/2 w-1/2">
                    <Image src={works[0].images[0].relativePath} width={works[0].images[0].width} height={works[0].images[0].height} alt={works[0].images[0].fileName.split(".")[0]} />
                </div>
                <div className="imageLoader ml-auto h-1/2 w-1/2">
                    <Image src={works[2].images[0].relativePath} width={works[2].images[0].width} height={works[2].images[0].height} alt={works[2].images[0].fileName.split(".")[0]} />
                </div>
                <div className="imageLoader ml-auto h-1/2 w-1/2">
                    <Image src={works[2].images[0].relativePath} width={works[2].images[0].width} height={works[2].images[0].height} alt={works[2].images[0].fileName.split(".")[0]} />
                </div>
            </div>
        </section>
    );
}
