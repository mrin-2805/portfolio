import { JSX } from "react";
import { IWorks } from "../_lib/definations/works-definations";
import { getWorks, generateMasonryItems } from "../_lib/helpers/works";
import Masonry from "../_components/Animations/Image/Masonry";
import MagicCursor from "../_components/Animations/Canvas/MagicCursor";

const works: IWorks[] = await getWorks();
const masonryItems = generateMasonryItems(works);

export default async function Gallery(): Promise<JSX.Element> {
    return (
        <main id="main" className="relative z-1">
            <section className="relative flex min-h-[75vh] w-full items-center justify-center">
                <MagicCursor />
                <div className="relative z-2">
                    <h1 className="text-center">Gallery</h1>
                </div>
            </section>
            <section className="boxSpacer bg-foreground text-background">
                <Masonry images={masonryItems} />
            </section>
            <section className="boxSpacer"></section>
        </main>
    );
}
