import Image from "next/image";

import { IWorks } from "../_lib/definations/works-definations";
import InViewClippy from "../_components/Animations/Image/InViewClippy";
import { TransitionLink } from "../_components/Animations/TransitionLink";


export default async function Works({ works }: { works: IWorks[] }) {
    return (
        <>
            {works.length &&
                works.map((work, index) => {
                    if (work.images && work.images.length > 0) {
                        return (
                            <article key={work.client} className={`mt-20 flex w-full flex-col lg:mt-0 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                <div className="imageLoader max-h-screen w-full overflow-hidden">
                                    <InViewClippy className="w-full" direction={index % 2 !== 0 ? "left" : "right"} index={index}>
                                        <TransitionLink href={"/works/" + work.client}>
                                            <Image className="h-auto w-full" src={work.images[0].relativePath} alt={work.client} width={work.images[0].width} height={work.images[0].height} />
                                        </TransitionLink>
                                    </InViewClippy>
                                </div>
                                <div className="flex w-full items-center">
                                    <div className={`flex w-full items-center justify-between gap-5 px-4 py-7 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                        <div className="">
                                            {/* <InviewCounter fontSize={45} countNumber={index + 1} minDigits={2} /> */}
                                            <h1>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</h1>
                                        </div>
                                        <p className="text-3xl lg:text-5xl">{work.client}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    }
                })}
        </>
    );
}
