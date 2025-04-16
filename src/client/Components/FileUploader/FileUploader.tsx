import { ChangeEvent, useCallback, useRef, type FunctionComponent } from 'react';

export enum ErrorCode {
    FileInvalidType = 'file-invalid-type',
    FileTooLarge = 'file-too-large',
    FileTooSmall = 'file-too-small',
    TooManyFiles = 'too-many-files',
}

export interface FileError {
    message: string;
    code: ErrorCode | string;
}

export interface FileRejection {
    file: File;
    errors: FileError[];
}

export interface FileUploaderProps {
    accept?: string;
    onDismiss?: () => void;
    disabled?: boolean;
    onFileDialogCancel?: () => void;
    onFileDialogOpen?: () => void;
    onError?: (err: Error) => void;
    validator?: <T extends File>(file: T) => FileError | FileError[] | null;
}
export const FileUploader = (props: FileUploaderProps = {}) => {
    const { accept } = {
        ...props,
    };

    const inputRef = useRef(null);

    const packFiles = (files: File[]) => {
        const formData = new FormData();

        for (const [index, selectedFileToUpload] of [...files].entries()) {
            formData.append(`file-${index}`, selectedFileToUpload, selectedFileToUpload.name);
        }

        return formData;
    };

    const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
            // setSelectedFilesToUpload([...files]);
            const packedFileData = packFiles([...files]);
            return packedFileData;
        }
    }, []);

    // const getRootProps = () => ({
    //     tabIndex: 0,
    //     role: 'button',
    // });

    // const getInputProps = () => ({
    //     type: 'file',
    //     onChange: handleInputChange,
    //     style: { display: 'none' },
    // });

    // return {
    //     getRootProps,
    //     getInputProps,
    // };
    // const handleUploadClick = () => inputRef.current?.click();
    return (
        <div>
            {/* <label htmlFor="uploadInput">Browse</label> */}
            <input
                id="uploadInput"
                ref={inputRef}
                type="file"
                onChange={handleFileUpload}
                hidden
                accept={accept}
                {...rest}
            />
            <>{children}</>
        </div>
    );
};
