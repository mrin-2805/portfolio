import Image from "next/image";
import Link from "next/link";
import { IWorksImage } from "../../../_lib/definations/works-definations";
import FancyBox from "../../UI/Common/FancyBox";

interface Props {
    images: IWorksImage[];
}

export default function Masonry({ images }: Props) {
    return (
        <FancyBox
            options={{
                Carousel: {
                    infinite: false,
                },
            }}>
            <div className="3xl:columns-5 w-full columns-2 gap-3 space-y-4 lg:columns-3 lg:gap-6 lg:space-y-6 2xl:columns-4">
                {images.map((image, index) => (
                    <div key={image.relativePath} className="imageLoader break-inside-avoid rounded-lg">
                        <Link href={image.relativePath} data-fancybox={"gallery"}>
                            <Image
                                src={image.relativePath}
                                alt={image.fileName}
                                priority={index < 5}
                                width={image.width}
                                height={image.height}
                                className="h-auto w-full rounded-lg"
                                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        (max-width: 1800px) 33vw,
                        25vw"
                            />
                        </Link>
                        {/* <div className="mb-3">
                            <p>{image.fileName.split(".")[0]}</p>
                        </div> */}
                    </div>
                ))}
            </div>
        </FancyBox>
    );
}
