import { notFound } from "next/navigation";
import { JSX } from "react";

import { IWorks, IWorksImage } from "@/app/_lib/definations/works-definations";
import { generateMasonryItems, getWorks } from "@/app/_lib/helpers/works";
import Masonry from "@/app/_components/Animations/Image/Masonry";
import MagicCursor from "@/app/_components/Animations/Canvas/MagicCursor";
import GalleryPreview from "@/app/_components/Animations/Image/GalleryPreview";

export async function generateStaticParams() {
    const works: IWorks[] = await getWorks();

    return works.map((work) => ({
        client: encodeURIComponent(work.client),
    }));
}

const works = await getWorks();
const images: IWorksImage[] = generateMasonryItems(works);

export default async function PWork({ params }: { params: Promise<{ work: string }> }): Promise<JSX.Element> {
    const requestedWork = (await params).work;

    const work = works.find((myWork) => myWork.client === decodeURIComponent(requestedWork));

    if (!work) {
        notFound();
    }

    return (
        <main id="main" className="relative z-1">
            <section className="relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden">
                <MagicCursor />
                <div className="relative z-2">
                    <h1 className="text-center">{work.client}</h1>
                </div>
            </section>
            <section id="works" className="boxSpacer bg-foreground text-background">
                <Masonry images={work.images} />
            </section>
            <GalleryPreview images={images} />
        </main>
    );
}
