import Image from "next/image";
import { IWorksImage } from "@/app/_lib/definations/works-definations";
import { TransitionLink } from "../../Animations/TransitionLink";
import { GetIcon } from "../Icons/GetIcon";

interface Props {
    images: IWorksImage[];
}

const translateYClasses = ["", "translate-y-20", "lg:translate-y-30", "translate-y-20", ""];

export default function GalleryPreview({ images }: Props) {
    return (
        <section className="relative z-1 h-screen overflow-hidden">
            <div className="boxSpacer text-center">
                <h2>Want to see more?</h2>
                <p>Check out the full gallery of my works!</p>
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
            <div className="absolute right-0 bottom-0 left-0 z-2" style={{ background: "linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 85%)", height: "200px" }}></div>
            <div className="pointer-events-none grid grid-cols-3 gap-3 lg:-translate-y-40 lg:grid-cols-5 lg:gap-5">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                    const columnImages = images.slice(colIndex * 3, colIndex * 3 + 3);

                    return (
                        <div key={colIndex} className={`flex w-full flex-col gap-3 lg:gap-5 ${translateYClasses[colIndex]}`}>
                            {columnImages.map((image, imgIndex) => (
                                <div key={imgIndex} className="imageLoader w-full overflow-hidden rounded-lg">
                                    <Image src={image.relativePath} width={image.width} height={image.height} alt={image.fileName.split(".")[0]} />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
