import Image from "next/image";
import { IWorksImage } from "@/app/_lib/definations/works-definations";
import { TransitionLink } from "../TransitionLink";
import { GetIcon } from "../../UI/Icons/GetIcon";

interface Props {
    images: IWorksImage[];
}

const columns = 5;
const imagesPerColumn = 4;

export default function GalleryPreview({ images }: Props) {
    const visibleImages = images.slice(0, columns * imagesPerColumn);

    const imageColumns = Array.from({ length: columns }, (_, colIndex) => visibleImages.slice(colIndex * imagesPerColumn, (colIndex + 1) * imagesPerColumn));

    return (
        <section className="relative z-1 flex h-screen items-center justify-center overflow-hidden p-2">
            <div className="3xl:grid-cols-5 absolute inset-0 grid h-full -translate-y-15 grid-cols-4 gap-6">
                {imageColumns.map((column, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        {column.map((image, j) => (
                            <div key={image.fileName} className="rounded-lg">
                                <Image quality={20} src={image.relativePath} alt={image.fileName} width={image.width / 4} height={image.height / 4} className="h-auto w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="overlay"></div>
            <div className="bg-background relative z-1 rounded-lg p-3">
                <h3>Want to see more? Check out the full gallery of my work!</h3>
                <br />
                <div className="flex justify-center">
                    <TransitionLink href={"/gallery"} className="bg-foreground text-background flex w-fit items-center rounded px-4 py-2">
                        <div className="doubleTextBtn">
                            <span className="flex items-center gap-2">
                                GALLERY
                                <span className="inline-block rotate-180">
                                    <GetIcon iconName="Arrow" width="18" height="18" />
                                </span>
                            </span>
                            <span className="flex items-center gap-2">
                                GALLERY
                                <span className="inline-block rotate-180">
                                    <GetIcon iconName="Arrow" width="18" height="18" />
                                </span>
                            </span>
                        </div>
                    </TransitionLink>
                </div>
            </div>
        </section>
    );
}
