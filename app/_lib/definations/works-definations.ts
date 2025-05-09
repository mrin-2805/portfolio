
export interface IWorksImage {
    fileName: string;
    relativePath: string;
    width: number;
    height: number;
    createdDate: string;
    lastModifiedDate: string;
}

export interface IWorks {
    client: string;
    images: IWorksImage[];
}