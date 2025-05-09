import { cache } from "react";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";
import { IWorks, IWorksImage } from "../definations/works-definations";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

export const getWorks = cache(async (): Promise<IWorks[]> => {
    const worksDirectory = path.join(process.cwd(), "public/images/works");
    const clients = fs.readdirSync(worksDirectory);

    const works = clients.map((client) => {
        const clientPath = path.join(worksDirectory, client);
        const files = fs.readdirSync(clientPath);

        const images = files
            .filter((file) => {
                const ext = path.extname(file).toLowerCase();
                return allowedExtensions.includes(ext);
            })
            .map((file) => {
                const filePath = path.join(clientPath, file);
                const fileBuffer = fs.readFileSync(filePath);
                const dimensions = sizeOf(fileBuffer);
                const fileStat = fs.statSync(filePath);

                return {
                    fileName: file,
                    relativePath: `/images/works/${client}/${file}`,
                    width: dimensions.width || 0,
                    height: dimensions.height || 0,
                    createdDate: fileStat.birthtime.toISOString(),
                    lastModifiedDate: fileStat.mtime.toISOString(),
                };
            });

        return {
            client,
            images,
        };
    });

    return works;
});

export const generateMasonryItems = cache((works: IWorks[]): IWorksImage[] => {
    const allImages: IWorksImage[] = works.flatMap((work) => work.images);

    const sortedImages = allImages.sort((a, b) => {
        return new Date(b.lastModifiedDate).getTime() - new Date(a.lastModifiedDate).getTime();
    });

    return sortedImages;
});
