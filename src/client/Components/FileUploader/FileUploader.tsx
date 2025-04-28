import { ErrorMessage } from '@hookform/error-message';
import { type PropsWithChildren, useRef, useState } from 'react';
import './Shared/FileUploader.css';
import { type FieldValues, type FieldErrors, type UseFormRegisterReturn, type UseFormClearErrors } from 'react-hook-form';
import { PreviewFiles, ResetFilesButton, Click_Or_Drag_File } from './Shared';

export interface FileUploaderProps {
    register: UseFormRegisterReturn;
    label?: string;
    setIsFileToUploadSelected: React.Dispatch<React.SetStateAction<boolean>>;
    reset: () => void;
    errors: FieldErrors<FieldValues>;
    className?: string;
    clearErrors: UseFormClearErrors<any>;
    accept?: string;
    multiple?: boolean;
    preview?: boolean;
}

export const FileUploader = (props: PropsWithChildren<FileUploaderProps>) => {
    const {
        register,
        label,
        reset,
        children,
        setIsFileToUploadSelected,
        errors,
        className,
        clearErrors,
        accept = '',
        multiple = false,
        preview = true,
    } = {
        ...props,
    };

    const [selectedFilesToUpload, setSelectedFilesToUpload] = useState<File[] | undefined>(undefined);

    const { ref, name: inputName, ...rest } = register;

    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    // TODO: Integrate Drag and Drop
    /*
    const [isDragOver, setIsDragOver] = useState(false);

    // Define the event handlers
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files);
        setSelectedFilesToUpload(droppedFiles);
    };
    */

    const clearAll = () => {
        reset();
        setSelectedFilesToUpload(undefined);
        setIsFileToUploadSelected(false);
    };

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = (e.target as HTMLInputElement).files || [];
        clearErrors(inputName);
        setSelectedFilesToUpload([...selectedFiles]);
        setIsFileToUploadSelected(true);
    };

    return (
        <div className='file-upload-wrapper'>
            <div aria-label="upload-files" className="file-upload">
                <label aria-labelledby="uploadInput" className="file-upload-text" htmlFor="uploadInput">
                    {label || Click_Or_Drag_File}
                </label>
                <input
                    name={inputName}
                    className={`file-upload-input ${className}`}
                    id="uploadInput"
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    {...rest}
                    onChange={handleSelectFiles}
                    ref={(e) => {
                        ref(e);
                        hiddenFileInput.current = e;
                    }}
                />
            </div>
            {preview && <PreviewFiles filesToPreview={selectedFilesToUpload} />}
            {children}
            {selectedFilesToUpload && <ResetFilesButton clearAll={clearAll} />}
            <ErrorMessage errors={errors} name={inputName} render={({ message }) => <p style={{ color: 'red' }}>{message}</p>} />
        </div>
    );
};
