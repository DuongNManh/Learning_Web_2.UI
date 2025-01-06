export interface ImageDTO {
    file: File;
    file_name: string;
    title: string;
}

export type ImageModel = {
    id: string;
    fileName: string;
    fileExtension: string;
    title: string;
    url: string;
    dateCreated: Date;
}
