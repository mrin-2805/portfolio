import MagicCursor from "../_components/Animations/Canvas/MagicCursor";
import GalleryPreview from "../_components/UI/Preview/GalleryPreview";
import SplitText from "../_components/Animations/Text/SplitText";
import TitleBlock from "../_components/UI/TitleBlock";
import { IWorks, IWorksImage } from "../_lib/definations/works-definations";
import { generateMasonryItems, getWorks } from "../_lib/helpers/works";
import Works from "./Works";

const works: IWorks[] = await getWorks();
const images: IWorksImage[] = generateMasonryItems(works);

export default async function PWorks() {
    return (
        <main id="main" className="relative z-1">
            <section className="siteBanner boxSpacer relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden">
                <MagicCursor />
                <div className="relative z-2">
                    <h1 className="text-center">
                        <SplitText text="Works" />
                    </h1>
                </div>
            </section>
            <section className="boxSpacer bg-foreground text-background min-h-screen">
                <TitleBlock revColors={true} text="Work" />
                <h2>Clients</h2>
                <div className="mt-8">
                    <Works works={works} />
                </div>
            </section>
            <GalleryPreview images={images} />
        </main>
    );
}
