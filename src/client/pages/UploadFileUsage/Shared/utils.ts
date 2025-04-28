import axios from "axios";
import { API_URL_SINGLE } from "./StringConstants";
import { FormMultipleFileValues } from "./UploadMultipleFiles";
import { FormSingleFileValues } from "./UploadSingleFile";


export const uploadSingleFileToServer = async (formData: FormData) => {
    return await axios
        .post(API_URL_SINGLE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
}

export const uploadMultipleFilesToServer = async (formData: FormData) => {
    // TODO: create an API to upload multiple files to server
    console.log(formData);
    return new Promise((resolve) => {
        resolve('multiple files uploaded to server');
    });
}

const packFiles = (files: File[]) => {
    const formData = new FormData();

    for (const [, selectedFileToUpload] of [...files].entries()) {
        formData.append('file', selectedFileToUpload, selectedFileToUpload.name);
    }
    return formData;
};

export const handleMultipleFileSubmission = async (files: FormMultipleFileValues) => {
    const selectedFiles = [...files.imageFiles] as File[];
    if (selectedFiles && selectedFiles.length > 0) {
        const data = packFiles(selectedFiles);
        return await uploadMultipleFilesToServer(data);
    }
};

export const handleSingleFileSubmission = async (file: FormSingleFileValues) => {
    const selectedFile = file.documentFile as unknown as FileList;
    if (selectedFile) {
        const data = packFiles([(selectedFile[0] as File)]);
        return await uploadSingleFileToServer(data);
    }
};

export const validateImageFileSize = (files: File[]) => {
    const selectedFiles = [...(files as File[]) || []]
    // TODO: return the details of the files in the error message that failed te validation
    return (
        selectedFiles?.every((selectedFile) => selectedFile?.size < 1000000) ||
        'File is too large. Please upload a file less than 1MB'
    );
}

export const validateImageFileFormat = (files: File[]) => {
    const selectedFiles = [...(files as File[]) || []]
    // TODO: return the details of the files in the error message that failed te validation
    return (
        selectedFiles?.every((selectedFile) =>
            ['image/jpeg', 'image/png'].includes(selectedFile?.type)
        ) || 'Only PNG, JPEG are accepted formats'
    );
}

export const validateSingleDocumentFileSize = (file: File) => {
    if (!file) {
        return
    }
    const selectedFile = file as unknown as FileList;
    if (!selectedFile.length) { return }
    return (
        selectedFile[0].size < 1000000 ||
        `${selectedFile[0].name} file is too large. Please upload a file less than 1MB`
    );
}

export const validateSingleDocumentFileFormat = (file: File) => {
    if (!file) {
        return
    }
    const selectedFile = file as unknown as FileList;
    if (!selectedFile.length) { return }
    return (
        ['application/pdf'].includes(
            selectedFile[0].type
        ) || "Only 'application/pdf' is accepted formats"
    );
}

// TODO: add resolve for multiple files
// TODO: add types interface in different files
// TODO: fixx css acording to theming

